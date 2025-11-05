"use client";

import { useState, useRef } from "react";
import { FileText, ChevronDown, GripHorizontal, Maximize2 } from "lucide-react";

export default function CockpitReference({ darkMode = true }) {
  const [selectedProcedure, setSelectedProcedure] =
    useState("emergency-shutdown");
  const [topPanelHeight, setTopPanelHeight] = useState(800);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  const boldfaceProcedures = [
    {
      id: "emergency-shutdown",
      title: "Emergency Engine Shutdown on Ground",
      category: "Engine",
      steps: [
        {
          step: "PCL",
          action: "OFF",
          location: "Left side panel, throttle quadrant",
        },
        {
          step: "FIREWALL SHUTOFF HANDLE",
          action: "PULL",
          location: "Left side panel, below glare shield",
        },
      ],
    },
    {
      id: "fire-in-flight",
      title: "Fire In Flight (if confirmed)",
      category: "Fire",
      steps: [
        {
          step: "PCL",
          action: "OFF",
          location: "Left side panel, throttle quadrant",
        },
        {
          step: "FIREWALL SHUTOFF HANDLE",
          action: "PULL",
          location: "Left side panel, below glare shield",
        },
        {
          step: "OBOGS SUPPLY LEVER",
          action: "OFF (BOTH)",
          location: "Right side panel, oxygen controls",
        },
        {
          step: "DESCENT BELOW 10,000 FEET MSL",
          action: "INITIATE",
          location: "Instrument panel, altimeter",
        },
        {
          step: "EMER LDG GR HANDLE",
          action: "PULL (AS REQUIRED)",
          location: "Right side panel, emergency landing gear handle",
        },
      ],
    },
    {
      id: "obogs-failure",
      title: "OBOGS Failure / Physiological Symptoms",
      category: "Oxygen",
      steps: [
        {
          step: "OBOGS SUPPLY LEVER",
          action: "OFF (BOTH)",
          location: "Right side panel, oxygen controls",
        },
        {
          step: "BOS PUSH MAN",
          action: "PRESS ON",
          location: "Right side panel, oxygen controls",
        },
        {
          step: "GREEN RING",
          action: "PULL (AS REQUIRED)",
          location: "Right side panel, oxygen controls",
        },
        {
          step: "DESCENT BELOW 10,000 FEET MSL",
          action: "INITIATE",
          location: "Instrument panel, altimeter",
        },
        {
          step: "ALTITUDE",
          action: "CHECK",
          location: "Instrument panel, altimeter",
        },
      ],
    },
    {
      id: "spin-recovery",
      title: "Spin Recovery",
      category: "Flight Control",
      steps: [
        {
          step: "PCL",
          action: "IDLE",
          location: "Left side panel, throttle quadrant",
        },
        {
          step: "CONTROLS",
          action: "NEUTRAL",
          location: "Control stick and rudder pedals",
        },
        {
          step: "AIRSPEED",
          action: "110 KNOTS (MIN)",
          location: "Instrument panel, airspeed indicator",
        },
        {
          step: "PCL",
          action: "OFF (if spin continues)",
          location: "Left side panel, throttle quadrant",
        },
      ],
    },
    {
      id: "engine-failure-airstart",
      title: "Engine Failure - Immediate Airstart",
      category: "Engine",
      steps: [
        {
          step: "PCL",
          action: "MID RANGE",
          location: "Left side panel, throttle quadrant",
        },
        {
          step: "PMU SWITCH",
          action: "OFF",
          location: "Left side panel, engine controls",
        },
      ],
    },
    {
      id: "uncommanded-power",
      title: "Uncommanded Power Changes",
      category: "Engine",
      steps: [
        {
          step: "PCL",
          action: "AS REQUIRED",
          location: "Left side panel, throttle quadrant",
        },
        {
          step: "PMU SWITCH",
          action: "OFF",
          location: "Left side panel, engine controls",
        },
      ],
    },
    {
      id: "engine-failure-takeoff",
      title: "Engine Failure After Takeoff",
      category: "Engine",
      steps: [
        {
          step: "PCL",
          action: "IDLE",
          location: "Left side panel, throttle quadrant",
        },
        {
          step: "BRAKES",
          action: "AS REQUIRED",
          location: "Rudder pedals, top of pedals",
        },
      ],
    },
    {
      id: "abort-takeoff",
      title: "Abort Takeoff",
      category: "Takeoff/Landing",
      steps: [
        {
          step: "PCL",
          action: "IDLE",
          location: "Left side panel, throttle quadrant",
        },
        {
          step: "BRAKES",
          action: "AS REQUIRED",
          location: "Rudder pedals, top of pedals",
        },
      ],
    },
    {
      id: "ejection",
      title: "Ejection",
      category: "Emergency",
      steps: [
        {
          step: "EJECTION HANDLE",
          action: "PULL",
          location: "Between legs, yellow and black striped handles",
        },
      ],
    },
  ];

  const selectedProc = boldfaceProcedures.find(
    (p) => p.id === selectedProcedure,
  );

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartHeight.current = topPanelHeight;
    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    const newHeight = dragStartHeight.current + deltaY;
    const constrainedHeight = Math.min(Math.max(newHeight, 300), 1400);
    setTopPanelHeight(constrainedHeight);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartY.current = touch.clientY;
    dragStartHeight.current = topPanelHeight;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const deltaY = touch.clientY - dragStartY.current;
    const newHeight = dragStartHeight.current + deltaY;
    const constrainedHeight = Math.min(Math.max(newHeight, 300), 1400);
    setTopPanelHeight(constrainedHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="flex flex-col lg:flex-row gap-4 px-3 py-3"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left Sidebar - Procedure Selector */}
      <div
        className={`w-full lg:w-80 flex-shrink-0 ${darkMode ? "bg-slate-800/50 border border-slate-700/50" : "bg-white"} backdrop-blur-xl rounded-xl p-4 shadow-xl lg:sticky lg:top-3 lg:h-fit lg:max-h-[calc(100vh-100px)] overflow-y-auto`}
      >
        {/* Header */}
        <div className="mb-4">
          <h3
            className={`text-lg font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            BOLDFACE Procedures
          </h3>
          <p
            className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Select a procedure to view steps
          </p>
        </div>

        {/* Procedure Dropdown */}
        <div className="mb-4">
          <div className="relative">
            <select
              value={selectedProcedure}
              onChange={(e) => setSelectedProcedure(e.target.value)}
              className={`w-full p-3 pr-10 rounded-lg font-bold text-sm appearance-none cursor-pointer ${
                darkMode
                  ? "bg-red-600 text-white border-2 border-red-500"
                  : "bg-red-500 text-white border-2 border-red-400"
              } focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg`}
            >
              {boldfaceProcedures.map((procedure) => (
                <option key={procedure.id} value={procedure.id}>
                  {procedure.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
          </div>
        </div>

        {/* Selected Procedure Details */}
        {selectedProc && (
          <div>
            <div
              className={`text-xs font-bold mb-3 px-2 py-1 rounded inline-block ${
                darkMode
                  ? "bg-slate-700 text-slate-300"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {selectedProc.category} • {selectedProc.steps.length} Steps
            </div>

            <div className="space-y-2">
              {selectedProc.steps.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${darkMode ? "bg-slate-900/60 border border-slate-700/50" : "bg-slate-50 border border-slate-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm bg-red-600 text-white shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-bold text-sm mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {item.step}
                      </div>
                      <div
                        className={`text-xs font-bold mb-2 ${darkMode ? "text-red-400" : "text-red-600"}`}
                      >
                        → {item.action}
                      </div>
                      <div
                        className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        📍 {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Cockpit Panel PDFs */}
      <div className="flex-1 flex flex-col gap-0 min-w-0">
        {/* Instrument Panel - Top */}
        <div
          className={`${darkMode ? "bg-slate-800/50 border border-slate-700/50" : "bg-white"} backdrop-blur-xl rounded-t-xl shadow-xl overflow-hidden relative ${!isDragging ? "transition-all duration-150" : ""}`}
          style={{
            height: window.innerWidth >= 1024 ? `${topPanelHeight}px` : "400px",
            minHeight: "300px",
          }}
        >
          <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-slate-900/90 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Instrument Panel
              </h3>
              <a
                href="/CockpitInstrtFrt_V300.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                } transition shadow-lg active:scale-95`}
              >
                <Maximize2 className="w-3 h-3" />
                <span>Open Full View</span>
              </a>
            </div>
          </div>
          <div className="w-full h-full bg-slate-900">
            <iframe
              src="/CockpitInstrtFrt_V300.pdf#view=FitH&zoom=page-width"
              className="w-full h-full"
              title="Instrument Panel Reference"
            />
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          className={`hidden lg:flex h-10 cursor-ns-resize group relative items-center justify-center select-none ${
            isDragging
              ? "bg-teal-500 shadow-lg"
              : darkMode
                ? "bg-slate-700/80 hover:bg-teal-600 hover:shadow-md"
                : "bg-slate-300 hover:bg-teal-500 hover:shadow-md"
          } transition-all duration-200`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col gap-0.5 items-center">
            <GripHorizontal
              className={`w-6 h-6 ${isDragging ? "text-white animate-pulse" : "text-slate-400 group-hover:text-white"} transition-colors`}
            />
            <div
              className={`text-xs font-bold ${isDragging ? "text-white" : "text-slate-400 group-hover:text-white opacity-0 group-hover:opacity-100"} transition-all`}
            >
              Drag to resize
            </div>
          </div>
        </div>

        {/* Side Panels - Bottom */}
        <div
          className={`flex-1 ${darkMode ? "bg-slate-800/50 border border-slate-700/50" : "bg-white"} backdrop-blur-xl rounded-b-xl shadow-xl overflow-hidden relative`}
          style={{ minHeight: window.innerWidth >= 1024 ? "600px" : "400px" }}
        >
          <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-slate-900/90 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                Side Panels
              </h3>
              <a
                href="/SidePanelsFront_V300.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold ${
                  darkMode
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                } transition shadow-lg active:scale-95`}
              >
                <Maximize2 className="w-3 h-3" />
                <span>Open Full View</span>
              </a>
            </div>
          </div>
          <div className="w-full h-full bg-slate-900">
            <iframe
              src="/SidePanelsFront_V300.pdf#view=FitH&zoom=page-width"
              className="w-full h-full"
              title="Side Panels Reference"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
