"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw, ChevronRight, ChevronLeft, Eye, Mic, MicOff, Volume2, VolumeX, Settings } from "lucide-react";

export default function Flashcard({
  question,
  onNext,
  onPrevious,
  onRate,
  currentIndex,
  totalCards,
  darkMode = true,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [matchConfidence, setMatchConfidence] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = useCallback((quality) => {
    onRate(quality);
    setIsFlipped(false); // Reset for next card
    setTranscript("");
    setMatchConfidence(null);
  }, [onRate]);

  // Text-to-speech function
  const speakText = useCallback((text, rate = speechRate) => {
    if (!speechEnabled || typeof window === "undefined") return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }, [speechEnabled, speechRate]);

  const checkVoiceAnswer = useCallback((spokenText) => {
    // Normalize the spoken text
    const normalized = spokenText.toLowerCase().trim();
    let confidence = 0;

    switch (question.questionType) {
      case "multipleChoice":
        const correctOption = question.options[question.correctAnswer].toLowerCase();
        const allOptions = question.options.map(opt => opt.toLowerCase());

        // Check if the spoken text contains key words from the correct answer
        const correctWords = correctOption.split(/\s+/).filter(word => word.length > 3);
        const matchCount = correctWords.filter(word => normalized.includes(word)).length;
        confidence = correctWords.length > 0 ? (matchCount / correctWords.length) * 100 : 0;

        // Also check if they said option letter (A, B, C, D)
        const optionIndex = question.options.findIndex(opt => opt.toLowerCase() === correctOption);
        const optionLetter = String.fromCharCode(65 + optionIndex).toLowerCase();
        if (normalized.includes(`option ${optionLetter}`) || normalized === optionLetter) {
          confidence = 100;
        }

        setMatchConfidence(Math.round(confidence));
        return confidence >= 60; // 60% word match threshold

      case "trueFalse":
        const correctAnswer = question.correctAnswer ? "true" : "false";
        const isMatch = normalized.includes(correctAnswer) ||
               (correctAnswer === "true" && (normalized.includes("yes") || normalized === "t" || normalized === "correct")) ||
               (correctAnswer === "false" && (normalized.includes("no") || normalized === "f" || normalized.includes("incorrect")));

        confidence = isMatch ? 100 : 0;
        setMatchConfidence(confidence);
        return isMatch;

      default:
        // For complex types, just show the answer
        setMatchConfidence(0);
        return false;
    }
  }, [question.questionType, question.options, question.correctAnswer]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setVoiceSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          const spokenText = event.results[0][0].transcript.toLowerCase().trim();
          setTranscript(spokenText);
          setIsListening(false);

          // Check if answer is correct
          const isCorrect = checkVoiceAnswer(spokenText);

          if (isCorrect) {
            // Play success sound feedback
            speakText("Correct!", 1.2);
            // Auto-rate as "Good" and move to next card after brief delay
            setTimeout(() => {
              handleRating(4);
            }, 1500);
          } else {
            // Play incorrect feedback
            speakText("Not quite. Let me show you the answer.", 1.0);
            // Show explanation after brief delay
            setTimeout(() => {
              setIsFlipped(true);
            }, 2000);
          }
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);

          // Provide user-friendly error feedback
          if (event.error === 'no-speech') {
            speakText("I didn't hear anything. Please try again.");
          } else if (event.error === 'audio-capture') {
            speakText("No microphone detected. Please check your settings.");
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [checkVoiceAnswer, handleRating, speakText]);

  // Auto-speak question when voice mode is enabled and card changes
  useEffect(() => {
    if (voiceMode && autoSpeak && !isFlipped && question) {
      // Small delay to ensure card has rendered
      const timer = setTimeout(() => {
        speakText(question.question, speechRate);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [voiceMode, autoSpeak, question, isFlipped, speakText, speechRate]);

  // Reset state when question changes
  useEffect(() => {
    setIsFlipped(false);
    setTranscript("");
    setMatchConfidence(null);
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    // Cancel any ongoing speech
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
  }, [question, isListening]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setMatchConfidence(null);
      // Cancel any ongoing speech before listening
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  // Keyboard shortcut for voice mode (Space bar)
  useEffect(() => {
    if (!voiceMode || isFlipped) return;

    const handleKeyPress = (e) => {
      if (e.code === "Space" && !isFlipped) {
        e.preventDefault();
        toggleListening();
      }
      // R key to repeat question
      if (e.code === "KeyR" && !isFlipped) {
        e.preventDefault();
        speakText(question.question, speechRate);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [voiceMode, isFlipped, toggleListening, speakText, question, speechRate]);

  // Get the answer text based on question type
  const getAnswerText = () => {
    switch (question.questionType) {
      case "multipleChoice":
        return `${question.options[question.correctAnswer]}\n\n${question.explanation}`;
      case "trueFalse":
        return `${question.correctAnswer ? "TRUE" : "FALSE"}\n\n${question.explanation}`;
      case "reorderSequence":
        return `Correct Order:\n${question.correctOrder.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\n${question.explanation}`;
      case "matchItems":
        return `Correct Matches:\n${question.pairs.map(pair => `${pair.left} → ${pair.right}`).join("\n")}\n\n${question.explanation}`;
      default:
        return question.explanation || "No explanation available";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header with Progress Counter and Voice Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Card {currentIndex + 1} of {totalCards}
        </div>

        {/* Voice Mode Controls */}
        {voiceSupported && (
          <div className="flex items-center gap-2">
            {/* Voice Settings */}
            {voiceMode && (
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-lg transition ${
                    darkMode
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                  title="Voice Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* Settings Dropdown */}
                {showSettings && (
                  <div className={`absolute right-0 mt-2 p-4 rounded-lg shadow-lg z-50 w-64 ${
                    darkMode ? "bg-slate-800 border border-slate-600" : "bg-white border border-slate-300"
                  }`}>
                    <h4 className={`text-sm font-semibold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
                      Voice Settings
                    </h4>

                    {/* Speech Rate */}
                    <div className="mb-3">
                      <label className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-700"} block mb-1`}>
                        Speech Rate: {speechRate.toFixed(1)}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={speechRate}
                        onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Auto Speak */}
                    <div className="mb-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoSpeak}
                          onChange={(e) => setAutoSpeak(e.target.checked)}
                          className="rounded"
                        />
                        <span className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                          Auto-read questions
                        </span>
                      </label>
                    </div>

                    {/* Speech Enabled */}
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={speechEnabled}
                          onChange={(e) => setSpeechEnabled(e.target.checked)}
                          className="rounded"
                        />
                        <span className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                          Enable voice feedback
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Speech Toggle */}
            {voiceMode && (
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-2 rounded-lg transition ${
                  speechEnabled
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
                title={speechEnabled ? "Disable Voice Feedback" : "Enable Voice Feedback"}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            {/* Voice Mode Toggle */}
            <button
              onClick={() => {
                setVoiceMode(!voiceMode);
                if (voiceMode && typeof window !== "undefined") {
                  window.speechSynthesis.cancel();
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                voiceMode
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                    ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {voiceMode ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              Voice Mode {voiceMode ? "ON" : "OFF"}
            </button>
          </div>
        )}
      </div>

      {/* Flashcard */}
      <div
        className={`relative w-full h-96 perspective-1000 ${!voiceMode || isFlipped ? "cursor-pointer" : ""}`}
        onClick={voiceMode && !isFlipped ? undefined : handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card (Question) */}
          <div
            className={`absolute w-full h-full backface-hidden ${
              darkMode ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"
            } border-2 rounded-xl p-8 flex flex-col items-center justify-center shadow-lg`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className={`text-xs mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"} font-semibold uppercase tracking-wide`}>
              {question.category} • {question.topic}
            </div>
            <div className={`text-xl md:text-2xl font-semibold text-center ${darkMode ? "text-white" : "text-slate-900"}`}>
              {question.question}
            </div>

            {/* Voice Mode Controls */}
            {voiceMode ? (
              <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-md">
                {/* Listening Animation */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleListening();
                    }}
                    className={`p-6 rounded-full transition-all relative ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600"
                        : darkMode
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    <Mic className="w-10 h-10 text-white relative z-10" />

                    {/* Pulsing rings when listening */}
                    {isListening && (
                      <>
                        <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
                        <span className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-50"></span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center w-full">
                  <div className={`text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                    {isListening ? "🎤 Listening..." : "Tap mic or press Space"}
                  </div>

                  {transcript && (
                    <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-slate-700/50" : "bg-slate-100"}`}>
                      <div className={`text-xs font-semibold mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        You said:
                      </div>
                      <div className={`text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
                        &quot;{transcript}&quot;
                      </div>
                      {matchConfidence !== null && (
                        <div className={`mt-2 text-xs ${
                          matchConfidence >= 60
                            ? "text-green-400"
                            : "text-orange-400"
                        }`}>
                          Match: {matchConfidence}%
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(question.question, speechRate);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg ${
                        darkMode
                          ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                          : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                      } transition`}
                      title="Press R to repeat"
                    >
                      🔊 Repeat Question (R)
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip();
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg ${
                        darkMode
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-500"
                      } underline transition`}
                    >
                      or click to reveal answer
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`mt-8 flex items-center gap-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                <Eye className="w-4 h-4" />
                <span className="text-sm">Click to reveal answer</span>
              </div>
            )}
          </div>

          {/* Back of card (Answer) */}
          <div
            className={`absolute w-full h-full backface-hidden ${
              darkMode ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"
            } border-2 rounded-xl p-8 flex flex-col shadow-lg overflow-y-auto`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className={`text-xs mb-4 ${darkMode ? "text-green-400" : "text-green-600"} font-semibold uppercase tracking-wide text-center`}>
              Answer
            </div>
            <div className={`text-lg whitespace-pre-wrap ${darkMode ? "text-white" : "text-slate-900"}`}>
              {getAnswerText()}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Buttons (shown when flipped) */}
      {isFlipped && (
        <div className="mt-6">
          <div className={`text-center mb-3 text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            Did you know this?
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(0);
              }}
              className={`p-4 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-red-900/20 border-red-600 hover:bg-red-900/40 text-red-400"
                  : "bg-red-50 border-red-400 hover:bg-red-100 text-red-700"
              }`}
            >
              <div className="font-bold text-lg">Don&apos;&apos;t Know</div>
              <div className="text-xs mt-1">Review soon</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(5);
              }}
              className={`p-4 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-green-900/20 border-green-600 hover:bg-green-900/40 text-green-400"
                  : "bg-green-50 border-green-400 hover:bg-green-100 text-green-700"
              }`}
            >
              <div className="font-bold text-lg">Know It</div>
              <div className="text-xs mt-1">Review later</div>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {!isFlipped && (
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : darkMode
                  ? "border-slate-600 hover:border-blue-500 text-slate-300"
                  : "border-slate-300 hover:border-blue-500 text-slate-700"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={currentIndex === totalCards - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition ${
              currentIndex === totalCards - 1
                ? "opacity-50 cursor-not-allowed"
                : darkMode
                  ? "border-slate-600 hover:border-blue-500 text-slate-300"
                  : "border-slate-300 hover:border-blue-500 text-slate-700"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
