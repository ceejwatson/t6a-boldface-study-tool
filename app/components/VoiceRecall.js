"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, Volume2, VolumeX, CheckCircle2, XCircle, BookOpen } from "lucide-react";

export default function VoiceRecall({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  showCorrectness = true,
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [matchConfidence, setMatchConfidence] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const recognitionRef = useRef(null);

  // Text-to-speech function
  const speakText = useCallback((text, rate = 1.0) => {
    if (!speechEnabled || typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }, [speechEnabled]);

  const checkVoiceAnswer = useCallback((spokenText) => {
    const normalized = spokenText.toLowerCase().trim();
    let confidence = 0;
    let selectedAnswer = null;

    switch (question.questionType) {
      case "multipleChoice":
        const correctOption = question.options[question.correctAnswer].toLowerCase();

        // Check each option for match
        let bestMatch = -1;
        let bestConfidence = 0;

        question.options.forEach((option, index) => {
          const optionLower = option.toLowerCase();
          const optionWords = optionLower.split(/\s+/).filter(word => word.length > 3);
          const matchCount = optionWords.filter(word => normalized.includes(word)).length;
          const optionConfidence = optionWords.length > 0 ? (matchCount / optionWords.length) * 100 : 0;

          if (optionConfidence > bestConfidence) {
            bestConfidence = optionConfidence;
            bestMatch = index;
          }
        });

        // Check option letter (A, B, C, D)
        const letterMatch = normalized.match(/option\s+([a-d])|^([a-d])$/);
        if (letterMatch) {
          const letter = (letterMatch[1] || letterMatch[2]).toLowerCase();
          bestMatch = letter.charCodeAt(0) - 97; // a=0, b=1, c=2, d=3
          bestConfidence = 100;
        }

        confidence = bestConfidence;
        selectedAnswer = bestMatch;
        setMatchConfidence(Math.round(confidence));
        break;

      case "trueFalse":
        const correctAnswer = question.correctAnswer;
        const isTrue = normalized.includes("true") || normalized.includes("yes") ||
                       normalized === "t" || normalized.includes("correct");
        const isFalse = normalized.includes("false") || normalized.includes("no") ||
                        normalized === "f" || normalized.includes("incorrect");

        if (isTrue) {
          selectedAnswer = true;
          confidence = correctAnswer === true ? 100 : 0;
        } else if (isFalse) {
          selectedAnswer = false;
          confidence = correctAnswer === false ? 100 : 0;
        }

        setMatchConfidence(confidence);
        break;

      default:
        setMatchConfidence(0);
        return { answer: null, confidence: 0 };
    }

    return { answer: selectedAnswer, confidence };
  }, [question]);

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

          const result = checkVoiceAnswer(spokenText);

          if (result.answer !== null && result.confidence >= 30) {
            setHasAnswered(true);
            onAnswer(result.answer);

            if (result.confidence >= 60) {
              speakText("Answer recorded", 1.2);
            } else {
              speakText("I think you said... answer recorded", 1.0);
            }
          } else {
            speakText("I didn't understand. Please try again or click an option.", 1.0);
          }
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);

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
  }, [checkVoiceAnswer, onAnswer, speakText]);

  // Auto-speak question when component mounts
  useEffect(() => {
    if (voiceSupported && !hasAnswered && !showExplanation) {
      const timer = setTimeout(() => {
        speakText(question.question, 1.0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [question, voiceSupported, hasAnswered, showExplanation, speakText]);

  // Reset when question changes
  useEffect(() => {
    setTranscript("");
    setMatchConfidence(null);
    setHasAnswered(false);
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
  }, [question, isListening]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current || disabled) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setMatchConfidence(null);
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening, disabled]);

  // Keyboard shortcut
  useEffect(() => {
    if (disabled || showExplanation) return;

    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleListening();
      }
      if (e.code === "KeyR") {
        e.preventDefault();
        speakText(question.question, 1.0);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [disabled, showExplanation, toggleListening, speakText, question]);

  if (!voiceSupported) {
    return (
      <div className={`text-center p-6 rounded-lg ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
        <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
          Voice recognition is not supported in your browser.
        </p>
      </div>
    );
  }

  const getAnswerDisplay = () => {
    if (question.questionType === "multipleChoice" && userAnswer !== undefined) {
      return question.options[userAnswer];
    }
    if (question.questionType === "trueFalse" && userAnswer !== undefined) {
      return userAnswer ? "TRUE" : "FALSE";
    }
    return null;
  };

  const isCorrect = () => {
    if (question.questionType === "multipleChoice") {
      return userAnswer === question.correctAnswer;
    }
    if (question.questionType === "trueFalse") {
      return userAnswer === question.correctAnswer;
    }
    return false;
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
        {question.question}
      </h3>

      {/* Voice Controls */}
      {!showExplanation && (
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="relative">
            <button
              onClick={toggleListening}
              disabled={disabled}
              className={`p-8 rounded-full transition-all relative ${
                disabled
                  ? "bg-slate-600 cursor-not-allowed"
                  : isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <Mic className="w-12 h-12 text-white relative z-10" />

              {isListening && (
                <>
                  <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
                  <span className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-50"></span>
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <div className={`text-base font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              {isListening ? "🎤 Listening..." : "Tap mic or press Space to answer"}
            </div>

            {transcript && (
              <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-slate-700/50" : "bg-slate-100"} max-w-md mx-auto`}>
                <div className={`text-xs font-semibold mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  You said:
                </div>
                <div className={`text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
                  &quot;{transcript}&quot;
                </div>
                {matchConfidence !== null && (
                  <div className={`mt-2 text-xs ${
                    matchConfidence >= 60 ? "text-green-400" : matchConfidence >= 30 ? "text-yellow-400" : "text-orange-400"
                  }`}>
                    Confidence: {matchConfidence}%
                  </div>
                )}
              </div>
            )}

            {userAnswer !== undefined && (
              <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-blue-900/30 border-2 border-blue-600" : "bg-blue-50 border-2 border-blue-400"}`}>
                <div className={`text-xs font-semibold mb-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  Your Answer:
                </div>
                <div className={`text-sm font-medium ${darkMode ? "text-white" : "text-slate-900"}`}>
                  {getAnswerDisplay()}
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2 justify-center">
              <button
                onClick={() => speakText(question.question, 1.0)}
                className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                } transition`}
              >
                <Volume2 className="w-4 h-4" />
                Repeat (R)
              </button>

              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
                  speechEnabled
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                      ? "bg-slate-700 text-slate-300"
                      : "bg-slate-200 text-slate-700"
                } transition`}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                Audio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show explanation after answering */}
      {showExplanation && showCorrectness && (
        <div className={`mt-3 p-4 rounded-lg ${
          isCorrect()
            ? "bg-green-900/30 border-2 border-green-600"
            : "bg-red-900/30 border-2 border-red-600"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect() ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={`font-semibold ${isCorrect() ? "text-green-400" : "text-red-400"}`}>
              {isCorrect() ? "Correct!" : "Incorrect"}
            </span>
          </div>
          <p className={`text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
            {question.explanation}
          </p>
          {!isCorrect() && (
            <div className={`mt-3 p-2 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}>
              <p className={`text-xs mb-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                Correct Answer:
              </p>
              <p className={`font-medium text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
                {question.questionType === "multipleChoice"
                  ? question.options[question.correctAnswer]
                  : question.correctAnswer ? "TRUE" : "FALSE"}
              </p>
            </div>
          )}
        </div>
      )}

      {showExplanation && !showCorrectness && (
        <div className={`mt-3 p-4 rounded-lg ${
          darkMode
            ? "bg-yellow-900/20 border-2 border-yellow-600/50"
            : "bg-yellow-50 border-2 border-yellow-300"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className={`w-5 h-5 ${darkMode ? "text-yellow-400" : "text-yellow-800"}`} />
            <span className={`font-semibold ${darkMode ? "text-yellow-400" : "text-yellow-800"}`}>
              Explanation
            </span>
          </div>
          <p className={`text-sm ${darkMode ? "text-white" : "text-slate-800"}`}>
            {question.explanation}
          </p>
          <div className={`mt-3 p-2 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}>
            <p className={`text-xs mb-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
              Correct Answer:
            </p>
            <p className={`font-medium text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
              {question.questionType === "multipleChoice"
                ? question.options[question.correctAnswer]
                : question.correctAnswer ? "TRUE" : "FALSE"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
