"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Brain,
  Target,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Shuffle,
  Award,
  TrendingUp,
  Clock,
  AlertCircle,
  Flame,
  ChevronRight,
} from "lucide-react";

// All flashcards from the T-6A BoldFace document
const flashcardsData = [
  // Emergency Procedures
  {
    id: 1,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question:
      "Emergency Engine Shutdown on the Ground - Complete the procedure",
    answer: "1. PCL - OFF\n2. FIREWALL SHUTOFF HANDLE - PULL",
    shortAnswer: "PCL OFF, FIREWALL SHUTOFF HANDLE PULL",
  },

  {
    id: 2,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question:
      "Engine Failure Immediately After Takeoff (Sufficient Runway Remaining)",
    answer: "1. PCL - IDLE\n2. BRAKES - AS REQUIRED",
    shortAnswer: "PCL IDLE, BRAKES AS REQUIRED",
  },

  {
    id: 3,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question: "Engine Failure During Flight - Immediate Airstart (PMU NORM)",
    answer:
      "1. PCL - IDLE, ABOVE 13% N1\n2. STARTER SWITCH - AUTO/RESET\n3. PCL - AS REQUIRED",
    shortAnswer: "PCL IDLE ABOVE 13% N1, STARTER AUTO/RESET, PCL AS REQUIRED",
  },

  {
    id: 4,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question:
      "Uncommanded Power Changes / Loss of Power / Uncommanded Propeller Feather",
    answer: "1. PCL - MID RANGE\n2. PMU SWITCH - OFF",
    shortAnswer: "PCL MID RANGE, PMU SWITCH OFF",
  },

  {
    id: 5,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question: "Inadvertent Departure From Controlled Flight",
    answer:
      "1. PCL - IDLE\n2. CONTROLS - NEUTRAL\n3. AIRSPEED - 110 KNOTS (MINIMUM)\n4. PCL - OFF",
    shortAnswer: "PCL IDLE, CONTROLS NEUTRAL, 110 KNOTS MIN, PCL OFF",
  },

  {
    id: 6,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question: "Fire In Flight, If Fire is Confirmed",
    answer:
      "1. PCL - OFF\n2. FIREWALL SHUTOFF HANDLE - PULL\n3. OBOGS SUPPLY LEVER - OFF (BOTH)\n4. DESCENT BELOW 10,000 FEET MSL - INITIATE\n5. EMER LDG GR HANDLE - PULL (AS REQUIRED)",
    shortAnswer:
      "PCL OFF, FIREWALL HANDLE PULL, OBOGS OFF, DESCEND <10K, EMER GEAR",
  },

  {
    id: 7,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question:
      "OBOGS Failure / Overtemp / Physiological Symptoms / OXY CRIT Annunciator",
    answer:
      "1. OBOGS SUPPLY LEVER - OFF (BOTH)\n2. BOS PUSH MAN - PRESS ON\n3. GREEN RING - PULL (AS REQUIRED)\n4. DESCENT BELOW 10,000 FEET MSL - INITIATE\n5. ALTITUDE - CHECK",
    shortAnswer: "OBOGS OFF, BOS ON, GREEN RING, DESCEND <10K, CHECK ALT",
  },

  {
    id: 8,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question: "Ejection - When required",
    answer: "1. EJECTION HANDLE - PULL",
    shortAnswer: "EJECTION HANDLE PULL",
  },

  {
    id: 9,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question: "Abort Procedure",
    answer: "1. PCL - IDLE\n2. BRAKES - AS REQUIRED",
    shortAnswer: "PCL IDLE, BRAKES AS REQUIRED",
  },

  {
    id: 10,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question: "Zoom/Glide Speed (MINIMUM)",
    answer: "125 KNOTS",
    shortAnswer: "125 KNOTS",
  },

  {
    id: 11,
    category: "Emergency",
    difficulty: "critical",
    type: "boldface",
    question: "What action if Np STABLE BELOW 40%?",
    answer: "PROP SYS CIRCUIT BREAKER (left front console) - PULL",
    shortAnswer: "PULL PROP SYS CB",
  },

  // Engine Limits
  {
    id: 12,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Maximum Torque for Starter Limit",
    answer: "20 Seconds",
    shortAnswer: "20 SEC",
  },

  {
    id: 13,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Takeoff / Max Torque",
    answer: "100%",
    shortAnswer: "100%",
  },

  {
    id: 14,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Transient Torque Limits",
    answer: "101% to 107% (5 Seconds)",
    shortAnswer: "101-107% 5 SEC",
  },

  {
    id: 15,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Maximum ITT for engine starting",
    answer: "871 to 1,000°C for 5 Seconds",
    shortAnswer: "871-1000°C 5 SEC",
  },

  {
    id: 16,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Maximum ITT - Idle",
    answer: "750°C",
    shortAnswer: "750°C",
  },

  {
    id: 17,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Maximum ITT - Takeoff/Max",
    answer: "820°C",
    shortAnswer: "820°C",
  },

  {
    id: 18,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Transient ITT Limits",
    answer: "821 to 870°C (20 Seconds)",
    shortAnswer: "821-870°C 20 SEC",
  },

  {
    id: 19,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Oil Pressure",
    answer: "200 PSI",
    shortAnswer: "200 PSI",
  },

  {
    id: 20,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Minimum Oil Temperature",
    answer: "-40°C",
    shortAnswer: "-40°C",
  },

  {
    id: 21,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Minimum Battery Voltage",
    answer: "23.5 V",
    shortAnswer: "23.5V",
  },

  {
    id: 22,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "N₁ Idle Range",
    answer: "60 to 61%",
    shortAnswer: "60-61%",
  },

  {
    id: 23,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Minimum N₁ in Flight",
    answer: "67%",
    shortAnswer: "67%",
  },

  {
    id: 24,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Normal Pressurization Above 18,000 Ft MSL",
    answer: "3.6 ± 0.2 PSI",
    shortAnswer: "3.6±0.2 PSI",
  },

  {
    id: 25,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Np Overpressurization Safety Valve Opens at",
    answer: "4.0 PSI",
    shortAnswer: "4.0 PSI",
  },

  {
    id: 26,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Np Idle Range",
    answer: "46 to 50%",
    shortAnswer: "46-50%",
  },

  {
    id: 27,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Takeoff / Max Np",
    answer: "100% (100% ± 2% PMU Off)",
    shortAnswer: "100% ±2% PMU OFF",
  },

  {
    id: 28,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Avoid stabilized ground operations from __ to __ % Np",
    answer: "62 to 80%",
    shortAnswer: "62-80%",
  },

  {
    id: 29,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Oil Pressure - Takeoff/Max Range",
    answer: "90 to 120 PSI",
    shortAnswer: "90-120 PSI",
  },

  {
    id: 30,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Oil Pressure - Aerobatics/Spins Range",
    answer: "40 to 130 PSI",
    shortAnswer: "40-130 PSI",
  },

  {
    id: 31,
    category: "Engine Limits",
    difficulty: "high",
    type: "limit",
    question: "Oil Pressure - Aerobatics/Spins (Idle)",
    answer: "15 to 40 PSI (5 Seconds)",
    shortAnswer: "15-40 PSI 5 SEC",
  },

  {
    id: 32,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Oil Temp - Takeoff/Max Range",
    answer: "10 to 105°C",
    shortAnswer: "10-105°C",
  },

  {
    id: 33,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Oil Temp - Transient",
    answer: "106 to 110°C (10 Minutes)",
    shortAnswer: "106-110°C 10 MIN",
  },

  {
    id: 34,
    category: "Engine Limits",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Fuel Flow - All phases",
    answer: "799 PPH",
    shortAnswer: "799 PPH",
  },

  // Fuel Limits
  {
    id: 35,
    category: "Fuel Limits",
    difficulty: "high",
    type: "limit",
    question: "Normal Recovery Fuel",
    answer: "200 Pounds",
    shortAnswer: "200 LBS",
  },

  {
    id: 36,
    category: "Fuel Limits",
    difficulty: "high",
    type: "limit",
    question: "Minimum Fuel",
    answer: "150 Pounds (200 Pounds Solo)",
    shortAnswer: "150 LBS (200 SOLO)",
  },

  {
    id: 37,
    category: "Fuel Limits",
    difficulty: "high",
    type: "limit",
    question: "Emergency Fuel",
    answer: "100 Pounds",
    shortAnswer: "100 LBS",
  },

  {
    id: 38,
    category: "Fuel Limits",
    difficulty: "medium",
    type: "limit",
    question: "Minimum Fuel for Aerobatics",
    answer: "150 Pounds per side",
    shortAnswer: "150 LBS/SIDE",
  },

  // Airspeed Limits
  {
    id: 39,
    category: "Airspeed",
    difficulty: "high",
    type: "limit",
    question: "Max Airspeed Gear and/or Flaps",
    answer: "150 KIAS",
    shortAnswer: "150 KIAS",
  },

  {
    id: 40,
    category: "Airspeed",
    difficulty: "high",
    type: "limit",
    question: "Max Operating Speed",
    answer: "316 KIAS or 0.67 Mach",
    shortAnswer: "316 KIAS / 0.67M",
  },

  {
    id: 41,
    category: "Airspeed",
    difficulty: "high",
    type: "limit",
    question: "Full rudder deflection limit",
    answer:
      "Full rudder deflection above 150 KIAS will exceed the limits of the rudder control system",
    shortAnswer: "150 KIAS MAX",
  },

  // Runway Limits
  {
    id: 42,
    category: "Runway",
    difficulty: "medium",
    type: "limit",
    question: "Minimum Landing Distance Available (LDA)",
    answer:
      "4,000 Feet, or heavy weight flaps up landing ground roll plus 500 Feet, whichever is greater",
    shortAnswer: "4000 FT or GR+500",
  },

  {
    id: 43,
    category: "Runway",
    difficulty: "medium",
    type: "limit",
    question: "Minimum Runway Width",
    answer: "75 Feet",
    shortAnswer: "75 FT",
  },

  // Wind Limits
  {
    id: 44,
    category: "Wind Limits",
    difficulty: "high",
    type: "limit",
    question: "Maximum Crosswinds - Dry Runway",
    answer: "25 Knots",
    shortAnswer: "25 KTS",
  },

  {
    id: 45,
    category: "Wind Limits",
    difficulty: "high",
    type: "limit",
    question: "Maximum Crosswinds - Wet Runway",
    answer: "10 Knots",
    shortAnswer: "10 KTS",
  },

  {
    id: 46,
    category: "Wind Limits",
    difficulty: "high",
    type: "limit",
    question: "Maximum Crosswinds - Icy Runway",
    answer: "5 Knots",
    shortAnswer: "5 KTS",
  },

  {
    id: 47,
    category: "Wind Limits",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Crosswinds - Touch-and-Go",
    answer: "20 Knots",
    shortAnswer: "20 KTS",
  },

  {
    id: 48,
    category: "Wind Limits",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Crosswinds - Formation Takeoff/Landing",
    answer: "15 Knots",
    shortAnswer: "15 KTS",
  },

  {
    id: 49,
    category: "Wind Limits",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Tailwind Component for Takeoff",
    answer: "10 Knots",
    shortAnswer: "10 KTS",
  },

  {
    id: 50,
    category: "Wind Limits",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Wind with Canopy Open",
    answer: "40 Knots",
    shortAnswer: "40 KTS",
  },

  // G Limits
  {
    id: 51,
    category: "G Limits",
    difficulty: "high",
    type: "limit",
    question: "Acceleration Limits - Symmetric Clean",
    answer: "-3.5 to 7.0 Gs",
    shortAnswer: "-3.5 to +7.0G",
  },

  {
    id: 52,
    category: "G Limits",
    difficulty: "high",
    type: "limit",
    question: "Acceleration Limits - Symmetric Gear/Flaps",
    answer: "0 to 2.5 Gs",
    shortAnswer: "0 to +2.5G",
  },

  {
    id: 53,
    category: "G Limits",
    difficulty: "high",
    type: "limit",
    question: "Acceleration Limits - Asymmetric Clean",
    answer: "-1.0 to 4.7 Gs",
    shortAnswer: "-1.0 to +4.7G",
  },

  {
    id: 54,
    category: "G Limits",
    difficulty: "high",
    type: "limit",
    question: "Acceleration Limits - Asymmetric Gear/Flaps",
    answer: "0 to 2.0 Gs",
    shortAnswer: "0 to +2.0G",
  },

  // Spin Limits
  {
    id: 55,
    category: "Spins",
    difficulty: "high",
    type: "limit",
    question: "Minimum Altitude for Intentional Spin Entry",
    answer: "13,500 Feet MSL",
    shortAnswer: "13,500 MSL",
  },

  {
    id: 56,
    category: "Spins",
    difficulty: "medium",
    type: "limit",
    question: "Minimum Cloud Clearance for Spins",
    answer: "7,000 Feet above clouds",
    shortAnswer: "7000 FT",
  },

  // Prohibited Maneuvers
  {
    id: 57,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "List the prohibited maneuver involving stalls",
    answer: "Inverted Stalls",
    shortAnswer: "INVERTED STALLS",
  },

  {
    id: 58,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "List the prohibited maneuver involving spins",
    answer: "Inverted Spins",
    shortAnswer: "INVERTED SPINS",
  },

  {
    id: 59,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Aggravated spins limitation",
    answer: "Aggravated spins past 2 turns",
    shortAnswer: "PAST 2 TURNS",
  },

  {
    id: 60,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Spin limitation with PCL",
    answer: "Spins with the PCL above idle",
    shortAnswer: "PCL ABOVE IDLE",
  },

  {
    id: 61,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Configuration limitations for spins",
    answer: "Spins with landing gear, flaps, or speed brake extended",
    shortAnswer: "GEAR/FLAPS/SB EXTENDED",
  },

  {
    id: 62,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "PMU limitation for spins",
    answer: "Spins with the PMU off",
    shortAnswer: "PMU OFF",
  },

  {
    id: 63,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Minimum altitude for spins",
    answer: "Spins below 10,000 feet pressure altitude",
    shortAnswer: "BELOW 10,000 FT PA",
  },

  {
    id: 64,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Maximum altitude for spins",
    answer: "Spins above 22,000 feet pressure altitude",
    shortAnswer: "ABOVE 22,000 FT PA",
  },

  {
    id: 65,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Prohibited cross-controlled maneuvers",
    answer: "Abrupt cross-controlled (snap) maneuvers",
    shortAnswer: "SNAP MANEUVERS",
  },

  {
    id: 66,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Maximum fuel imbalance for aerobatics/spins/stalls",
    answer:
      "Aerobatic maneuvers, spins, or stalls with greater than 50 pounds fuel imbalance",
    shortAnswer: ">50 LBS IMBALANCE",
  },

  {
    id: 67,
    category: "Prohibited",
    difficulty: "critical",
    type: "limit",
    question: "Prohibited sliding maneuver",
    answer: "Tail slides",
    shortAnswer: "TAIL SLIDES",
  },

  // Icing Limits
  {
    id: 68,
    category: "Icing",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Icing Band",
    answer: "5,000 Feet",
    shortAnswer: "5000 FT",
  },

  {
    id: 69,
    category: "Icing",
    difficulty: "medium",
    type: "limit",
    question: "Maximum Icing Type",
    answer: "Light rime",
    shortAnswer: "LIGHT RIME",
  },

  // Temperature Limits
  {
    id: 70,
    category: "Temperature",
    difficulty: "medium",
    type: "limit",
    question: "Ground operation temperature limits",
    answer: "-23 to 43°C",
    shortAnswer: "-23 to +43°C",
  },
];

export default function T6AStudyTool() {
  const [activeTab, setActiveTab] = useState("flashcards");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyStats, setStudyStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
  });
  const [missedCards, setMissedCards] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [studyMode, setStudyMode] = useState("all"); // 'all', 'missed', 'category'
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [cardStats, setCardStats] = useState({}); // Track individual card performance for spaced repetition

  // Load saved progress on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("t6a-study-stats");
    const savedMissed = localStorage.getItem("t6a-missed-cards");
    const savedCardStats = localStorage.getItem("t6a-card-stats");

    if (savedStats) {
      setStudyStats(JSON.parse(savedStats));
    }
    if (savedMissed) {
      setMissedCards(JSON.parse(savedMissed));
    }
    if (savedCardStats) {
      setCardStats(JSON.parse(savedCardStats));
    }
  }, []);

  // Save progress whenever stats or missed cards change
  useEffect(() => {
    localStorage.setItem("t6a-study-stats", JSON.stringify(studyStats));
  }, [studyStats]);

  useEffect(() => {
    localStorage.setItem("t6a-missed-cards", JSON.stringify(missedCards));
  }, [missedCards]);

  useEffect(() => {
    localStorage.setItem("t6a-card-stats", JSON.stringify(cardStats));
  }, [cardStats]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts when typing in textarea
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")
        return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "f":
          e.preventDefault();
          if (!quizMode) handleFlip();
          break;
        case "arrowright":
        case "n":
          e.preventDefault();
          handleNext();
          break;
        case "arrowleft":
        case "p":
          e.preventDefault();
          handlePrevious();
          break;
        case "s":
          e.preventDefault();
          handleShuffle();
          break;
        case "c":
          if (isFlipped) {
            e.preventDefault();
            markCorrect();
          }
          break;
        case "x":
          if (isFlipped) {
            e.preventDefault();
            markIncorrect();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFlipped, quizMode, currentCardIndex]);

  // Spaced Repetition: Calculate next review date for a card
  const calculateNextReview = (cardId, wasCorrect) => {
    const now = Date.now();
    const stats = cardStats[cardId] || {
      interval: 1, // days until next review
      easeFactor: 2.5, // how easy the card is (higher = easier)
      consecutiveCorrect: 0,
      lastReviewed: now,
      nextReview: now,
    };

    let newInterval = stats.interval;
    let newEaseFactor = stats.easeFactor;
    let newConsecutiveCorrect = stats.consecutiveCorrect;

    if (wasCorrect) {
      newConsecutiveCorrect += 1;

      // SM-2 algorithm simplified
      if (newConsecutiveCorrect === 1) {
        newInterval = 1;
      } else if (newConsecutiveCorrect === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.round(stats.interval * stats.easeFactor);
      }

      newEaseFactor = Math.max(1.3, stats.easeFactor + 0.1);
    } else {
      // Reset on incorrect
      newConsecutiveCorrect = 0;
      newInterval = 1;
      newEaseFactor = Math.max(1.3, stats.easeFactor - 0.2);
    }

    const nextReview = now + newInterval * 24 * 60 * 60 * 1000; // convert days to ms

    return {
      interval: newInterval,
      easeFactor: newEaseFactor,
      consecutiveCorrect: newConsecutiveCorrect,
      lastReviewed: now,
      nextReview: nextReview,
    };
  };

  // Get cards due for review (spaced repetition)
  const getCardsDueForReview = () => {
    const now = Date.now();
    return flashcardsData.filter((card) => {
      const stats = cardStats[card.id];
      if (!stats) return true; // Never studied, should review
      return stats.nextReview <= now; // Due for review
    });
  };

  // Filter cards based on study mode
  const getFilteredCards = () => {
    let cards = flashcardsData;

    if (studyMode === "smart") {
      cards = getCardsDueForReview();
    } else if (studyMode === "missed" && missedCards.length > 0) {
      cards = flashcardsData.filter((card) => missedCards.includes(card.id));
    } else if (
      studyMode === "category" &&
      !selectedCategories.includes("all")
    ) {
      cards = flashcardsData.filter((card) =>
        selectedCategories.includes(card.category),
      );
    }

    return cards;
  };

  const filteredCards = getFilteredCards();
  const currentCard = filteredCards[currentCardIndex];

  // Get unique categories
  const categories = [
    "all",
    ...new Set(flashcardsData.map((card) => card.category)),
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowQuizResult(false);
    setQuizAnswer("");
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setShowQuizResult(false);
    setQuizAnswer("");
    setCurrentCardIndex(
      (prev) => (prev - 1 + filteredCards.length) % filteredCards.length,
    );
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false);
    setShowQuizResult(false);
    setQuizAnswer("");
  };

  const markCorrect = () => {
    setStudyStats((prev) => ({
      correct: prev.correct + 1,
      incorrect: prev.incorrect,
      streak: prev.streak + 1,
      bestStreak: Math.max(prev.streak + 1, prev.bestStreak),
    }));

    // Remove from missed cards if it was there
    setMissedCards((prev) => prev.filter((id) => id !== currentCard.id));

    // Update spaced repetition stats
    const newStats = calculateNextReview(currentCard.id, true);
    setCardStats((prev) => ({
      ...prev,
      [currentCard.id]: newStats,
    }));

    handleNext();
  };

  const markIncorrect = () => {
    setStudyStats((prev) => ({
      correct: prev.correct,
      incorrect: prev.incorrect + 1,
      streak: 0,
      bestStreak: prev.bestStreak,
    }));

    // Add to missed cards if not already there
    if (!missedCards.includes(currentCard.id)) {
      setMissedCards((prev) => [...prev, currentCard.id]);
    }

    // Update spaced repetition stats
    const newStats = calculateNextReview(currentCard.id, false);
    setCardStats((prev) => ({
      ...prev,
      [currentCard.id]: newStats,
    }));

    handleNext();
  };

  const checkQuizAnswer = () => {
    const userAnswer = quizAnswer.trim().toUpperCase();
    const correctAnswer = currentCard.shortAnswer.toUpperCase();
    const fullAnswer = currentCard.answer.toUpperCase();

    // Check if answer contains key terms
    const keyTerms = correctAnswer
      .split(/[\s,]+/)
      .filter((term) => term.length > 2);
    const matchedTerms = keyTerms.filter((term) => userAnswer.includes(term));

    const correct = matchedTerms.length >= keyTerms.length * 0.7; // 70% match threshold

    setIsCorrect(correct);
    setShowQuizResult(true);

    if (correct) {
      markCorrect();
    } else {
      markIncorrect();
    }
  };

  const toggleCategory = (category) => {
    if (category === "all") {
      setSelectedCategories(["all"]);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== "all"), category];

      setSelectedCategories(
        newCategories.length === 0 ? ["all"] : newCategories,
      );
    }
    setCurrentCardIndex(0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const getTypeIcon = (type) => {
    return type === "boldface" ? (
      <Flame className="w-5 h-5" />
    ) : (
      <Target className="w-5 h-5" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-blue-700/50 sticky top-0 z-20 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">T-6A Texan II</h1>
                <p className="text-blue-300 text-sm">BoldFace Study Tool</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm">
              <div className="bg-green-600/20 border border-green-500/50 rounded-lg px-4 py-2">
                <div className="text-green-400 font-semibold">
                  {studyStats.correct}
                </div>
                <div className="text-green-300 text-xs">Correct</div>
              </div>
              <div className="bg-red-600/20 border border-red-500/50 rounded-lg px-4 py-2">
                <div className="text-red-400 font-semibold">
                  {studyStats.incorrect}
                </div>
                <div className="text-red-300 text-xs">Incorrect</div>
              </div>
              <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg px-4 py-2">
                <div className="text-yellow-400 font-semibold">
                  {studyStats.streak}
                </div>
                <div className="text-yellow-300 text-xs">Streak</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab("flashcards")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === "flashcards"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Flashcards
            </button>
            <button
              onClick={() => {
                setActiveTab("quiz");
                setQuizMode(true);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === "quiz"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Brain className="w-4 h-4" />
              Quiz Mode
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === "progress"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Progress
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Study Mode Selection */}
        <div className="mb-6 flex gap-3 flex-wrap">
          <button
            onClick={() => {
              setStudyMode("all");
              setCurrentCardIndex(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              studyMode === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            All Cards ({flashcardsData.length})
          </button>
          <button
            onClick={() => {
              setStudyMode("smart");
              setCurrentCardIndex(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              studyMode === "smart"
                ? "bg-green-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Brain className="w-4 h-4" />
            Smart Review ({getCardsDueForReview().length})
          </button>
          <button
            onClick={() => {
              setStudyMode("missed");
              setCurrentCardIndex(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              studyMode === "missed"
                ? "bg-red-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Review Missed ({missedCards.length})
          </button>
          <button
            onClick={() => {
              setStudyMode("category");
              setCurrentCardIndex(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              studyMode === "category"
                ? "bg-purple-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            By Category
          </button>
        </div>

        {/* Category Filter (shown when category mode is active) */}
        {studyMode === "category" && (
          <div className="mb-6 bg-slate-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Select Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    selectedCategories.includes(cat)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {activeTab === "flashcards" && !quizMode && (
          <div className="max-w-4xl mx-auto">
            {/* Card Counter */}
            <div className="text-center mb-4">
              <span className="text-white text-lg font-semibold">
                Card {currentCardIndex + 1} of {filteredCards.length}
              </span>
            </div>

            {/* Flashcard */}
            <div
              className="relative h-96 cursor-pointer perspective-1000"
              onClick={handleFlip}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front of Card */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-2xl p-8 h-full flex flex-col justify-between border-4 border-blue-400">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`${getDifficultyColor(currentCard.difficulty)} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}
                        >
                          {currentCard.difficulty}
                        </span>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                          {getTypeIcon(currentCard.type)}
                          <span className="text-white text-xs font-semibold uppercase">
                            {currentCard.type}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-lg px-4 py-2 mb-6">
                        <span className="text-blue-200 text-sm font-medium">
                          {currentCard.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <h2 className="text-white text-2xl font-bold text-center leading-relaxed">
                        {currentCard.question}
                      </h2>
                    </div>

                    <div className="text-center">
                      <p className="text-blue-200 text-sm">
                        Click to reveal answer
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-2xl p-8 h-full flex flex-col justify-between border-4 border-green-400">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`${getDifficultyColor(currentCard.difficulty)} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}
                        >
                          {currentCard.difficulty}
                        </span>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                          <span className="text-white text-xs font-semibold">
                            ANSWER
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-lg px-4 py-2 mb-6">
                        <span className="text-green-200 text-sm font-medium">
                          {currentCard.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-white text-xl font-semibold text-center leading-relaxed whitespace-pre-line">
                        {currentCard.answer}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-green-200 text-sm">
                        Click to flip back
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <button
                onClick={handlePrevious}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Previous
              </button>

              <button
                onClick={handleShuffle}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
              >
                <Shuffle className="w-5 h-5" />
                Shuffle
              </button>

              <button
                onClick={handleNext}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Self-Assessment (only shown when flipped) */}
            {isFlipped && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={markIncorrect}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2 shadow-lg"
                >
                  <XCircle className="w-5 h-5" />I Got It Wrong
                </button>
                <button
                  onClick={markCorrect}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2 shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5" />I Got It Right
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quiz Mode */}
        {(activeTab === "quiz" || quizMode) && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-white text-lg font-semibold">
                Question {currentCardIndex + 1} of {filteredCards.length}
              </span>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border-2 border-blue-500">
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`${getDifficultyColor(currentCard.difficulty)} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}
                >
                  {currentCard.difficulty}
                </span>
                <div className="flex items-center gap-2 bg-blue-600/20 px-3 py-1 rounded-full">
                  {getTypeIcon(currentCard.type)}
                  <span className="text-blue-300 text-xs font-semibold uppercase">
                    {currentCard.type}
                  </span>
                </div>
              </div>

              <div className="bg-blue-900/30 rounded-lg px-4 py-2 mb-6">
                <span className="text-blue-300 text-sm font-medium">
                  {currentCard.category}
                </span>
              </div>

              <h2 className="text-white text-2xl font-bold mb-8 leading-relaxed">
                {currentCard.question}
              </h2>

              {!showQuizResult ? (
                <div>
                  <textarea
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full bg-slate-700 text-white rounded-lg p-4 mb-4 min-h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) {
                        checkQuizAnswer();
                      }
                    }}
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={checkQuizAnswer}
                      disabled={!quizAnswer.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                      Submit Answer
                    </button>
                    <button
                      onClick={() => {
                        setIsFlipped(true);
                        setShowQuizResult(true);
                      }}
                      className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                      Show Answer
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm mt-2 text-center">
                    Press Ctrl+Enter to submit
                  </p>
                </div>
              ) : (
                <div>
                  <div
                    className={`rounded-lg p-6 mb-6 ${isCorrect ? "bg-green-600/20 border-2 border-green-500" : "bg-red-600/20 border-2 border-red-500"}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-8 h-8 text-green-400" />
                          <span className="text-green-400 text-xl font-bold">
                            Correct!
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-8 h-8 text-red-400" />
                          <span className="text-red-400 text-xl font-bold">
                            Not Quite
                          </span>
                        </>
                      )}
                    </div>

                    {quizAnswer && (
                      <div className="mb-4">
                        <p className="text-slate-300 text-sm mb-2">
                          Your Answer:
                        </p>
                        <p className="text-white bg-slate-700/50 rounded p-3">
                          {quizAnswer}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-slate-300 text-sm mb-2">
                        Correct Answer:
                      </p>
                      <p className="text-white bg-slate-700/50 rounded p-3 whitespace-pre-line font-semibold">
                        {currentCard.answer}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                  >
                    Next Question
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Stats Card */}
              <div className="bg-slate-800 rounded-xl p-6 border-2 border-blue-500">
                <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  Study Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Attempts:</span>
                    <span className="text-white font-bold text-xl">
                      {studyStats.correct + studyStats.incorrect}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Correct:</span>
                    <span className="text-green-400 font-bold text-xl">
                      {studyStats.correct}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Incorrect:</span>
                    <span className="text-red-400 font-bold text-xl">
                      {studyStats.incorrect}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Accuracy:</span>
                    <span className="text-blue-400 font-bold text-xl">
                      {studyStats.correct + studyStats.incorrect > 0
                        ? Math.round(
                            (studyStats.correct /
                              (studyStats.correct + studyStats.incorrect)) *
                              100,
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Current Streak:</span>
                      <span className="text-yellow-400 font-bold text-xl">
                        {studyStats.streak}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-slate-300">Best Streak:</span>
                      <span className="text-yellow-400 font-bold text-xl">
                        {studyStats.bestStreak}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Missed Cards */}
              <div className="bg-slate-800 rounded-xl p-6 border-2 border-red-500">
                <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  Cards to Review
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-red-400">
                    {missedCards.length}
                  </div>
                  <div className="text-slate-400 text-sm">
                    cards need more practice
                  </div>
                </div>
                {missedCards.length > 0 ? (
                  <button
                    onClick={() => {
                      setStudyMode("missed");
                      setActiveTab("flashcards");
                      setCurrentCardIndex(0);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    Review Missed Cards
                  </button>
                ) : (
                  <div className="bg-green-600/20 border border-green-500 rounded-lg p-4 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-semibold">
                      Perfect! No cards to review
                    </p>
                  </div>
                )}
              </div>

              {/* Category Breakdown */}
              <div className="md:col-span-2 bg-slate-800 rounded-xl p-6 border-2 border-purple-500">
                <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-400" />
                  Category Breakdown
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {categories
                    .filter((cat) => cat !== "all")
                    .map((category) => {
                      const categoryCards = flashcardsData.filter(
                        (card) => card.category === category,
                      );
                      return (
                        <div
                          key={category}
                          className="bg-slate-700 rounded-lg p-4"
                        >
                          <div className="text-slate-300 text-sm mb-2">
                            {category}
                          </div>
                          <div className="text-white font-bold text-2xl">
                            {categoryCards.length}
                          </div>
                          <div className="text-slate-400 text-xs">cards</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to reset all progress?")) {
                    setStudyStats({
                      correct: 0,
                      incorrect: 0,
                      streak: 0,
                      bestStreak: 0,
                    });
                    setMissedCards([]);
                  }
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Reset Progress
              </button>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="mt-12 max-w-4xl mx-auto space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
              <Flame className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="text-blue-300 font-semibold mb-2">
                BoldFace Items
              </h3>
              <p className="text-slate-400 text-sm">
                Critical emergency procedures you must know by heart. These are
                life-saving actions.
              </p>
            </div>
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
              <Brain className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-blue-300 font-semibold mb-2">Smart Review</h3>
              <p className="text-slate-400 text-sm">
                The app tracks cards you miss and helps you focus on areas that
                need more practice.
              </p>
            </div>
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-blue-300 font-semibold mb-2">
                Track Progress
              </h3>
              <p className="text-slate-400 text-sm">
                Monitor your accuracy and streaks to see your improvement over
                time.
              </p>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              ⌨️ Keyboard Shortcuts
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  Space
                </kbd>
                <span className="text-slate-400">or</span>
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  F
                </kbd>
                <span className="text-slate-300">Flip card</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  →
                </kbd>
                <span className="text-slate-400">or</span>
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  N
                </kbd>
                <span className="text-slate-300">Next card</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  ←
                </kbd>
                <span className="text-slate-400">or</span>
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  P
                </kbd>
                <span className="text-slate-300">Previous card</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  S
                </kbd>
                <span className="text-slate-300">Shuffle</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  C
                </kbd>
                <span className="text-slate-300">
                  Mark correct (when flipped)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">
                  X
                </kbd>
                <span className="text-slate-300">
                  Mark incorrect (when flipped)
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
