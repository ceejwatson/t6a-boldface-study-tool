"use client";

import { useState, useRef } from "react";
import { FileText, ChevronDown, GripHorizontal } from "lucide-react";

export default function CockpitReference({ darkMode = true }) {
  const [selectedProcedure, setSelectedProcedure] = useState("emergency-shutdown");
  const [topPanelHeight, setTopPanelHeight] = useState(1000); // Height in pixels for top panel
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  const boldfaceProcedures = [
    {
      id: "emergency-shutdown",
      title: "Emergency Engine Shutdown on the Ground",
      panel: "side",
      steps: [
        { step: "PCL - OFF", location: "Left side panel, throttle quadrant" },
        { step: "FIREWALL SHUTOFF HANDLE - PULL", location: "Left side panel, below glare shield" },
      ],
    },
    {
      id: "fire-in-flight",
      title: "Fire In Flight (if fire confirmed)",
      panel: "side",
      steps: [
        { step: "PCL - OFF", location: "Left side panel, throttle quadrant" },
        { step: "FIREWALL SHUTOFF HANDLE - PULL", location: "Left side panel, below glare shield" },
        { step: "OBOGS SUPPLY LEVER - OFF (BOTH)", location: "Right side panel, oxygen controls" },
        { step: "DESCENT BELOW 10,000 FEET MSL - INITIATE", location: "Instrument panel, altimeter" },
        { step: "EMER LDG GR HANDLE - PULL (AS REQUIRED)", location: "Right side panel, emergency landing gear handle" },
      ],
    },
    {
      id: "obogs-failure",
      title: "OBOGS Failure / Physiological Symptoms",
      panel: "side",
      steps: [
        { step: "OBOGS SUPPLY LEVER - OFF (BOTH)", location: "Right side panel, oxygen controls" },
        { step: "BOS PUSH MAN - PRESS ON", location: "Right side panel, oxygen controls" },
        { step: "GREEN RING - PULL (AS REQUIRED)", location: "Right side panel, oxygen controls" },
        { step: "DESCENT BELOW 10,000 FEET MSL - INITIATE", location: "Instrument panel, altimeter" },
        { step: "ALTITUDE - CHECK", location: "Instrument panel, altimeter" },
      ],
    },
    {
      id: "spin-recovery",
      title: "Inadvertent Departure From Controlled Flight (Spin Recovery)",
      panel: "side",
      steps: [
        { step: "PCL - IDLE", location: "Left side panel, throttle quadrant" },
        { step: "CONTROLS - NEUTRAL", location: "Control stick and rudder pedals" },
        { step: "AIRSPEED - 110 KNOTS (MINIMUM)", location: "Instrument panel, airspeed indicator" },
        { step: "PCL - OFF", location: "Left side panel, throttle quadrant (if spin continues)" },
      ],
    },
    {
      id: "engine-failure-airstart",
      title: "Engine Failure During Flight - Immediate Airstart (PMU NORM)",
      panel: "side",
      steps: [
        { step: "PCL - MID RANGE", location: "Left side panel, throttle quadrant" },
        { step: "PMU SWITCH - OFF", location: "Left side panel, engine controls" },
      ],
    },
    {
      id: "uncommanded-power",
      title: "Uncommanded Power Changes / Loss of Power / Uncommanded Propeller Feather",
      panel: "side",
      steps: [
        { step: "PCL - AS REQUIRED", location: "Left side panel, throttle quadrant" },
        { step: "PMU SWITCH - OFF", location: "Left side panel, engine controls" },
      ],
    },
    {
      id: "engine-failure-takeoff",
      title: "Engine Failure Immediately After Takeoff (Sufficient Runway Remaining)",
      panel: "side",
      steps: [
        { step: "PCL - IDLE", location: "Left side panel, throttle quadrant" },
        { step: "BRAKES - AS REQUIRED", location: "Rudder pedals, top of pedals" },
      ],
    },
    {
      id: "abort-takeoff",
      title: "Abort Takeoff",
      panel: "side",
      steps: [
        { step: "PCL - IDLE", location: "Left side panel, throttle quadrant" },
        { step: "BRAKES - AS REQUIRED", location: "Rudder pedals, top of pedals" },
      ],
    },
    {
      id: "ejection",
      title: "Ejection",
      panel: "both",
      steps: [
        { step: "EJECTION HANDLE - PULL", location: "Between legs, yellow and black striped handles" },
      ],
    },
  ];

  const selectedProc = boldfaceProcedures.find(p => p.id === selectedProcedure);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartHeight.current = topPanelHeight;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaY = e.clientY - dragStartY.current;
    const newHeight = dragStartHeight.current + deltaY;

    // Constrain between 400px and 1400px
    setTopPanelHeight(Math.min(Math.max(newHeight, 400), 1400));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="flex flex-col lg:flex-row gap-3 px-3 py-3"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left Side - Procedure Selector (Full width on mobile, sidebar on desktop) */}
      <div className={`w-full lg:w-72 lg:flex-shrink-0 lg:sticky lg:top-3 lg:h-[calc(100vh-100px)] ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-xl p-3 sm:p-4 shadow-xl flex flex-col overflow-y-auto`}>
        {/* Dropdown Selector */}
        <div className="mb-4">
          <label className={`text-sm font-bold mb-2 block ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            BOLDFACE Procedure
          </label>
          <div className="relative">
            <select
              value={selectedProcedure}
              onChange={(e) => setSelectedProcedure(e.target.value)}
              className={`w-full p-3 pr-10 rounded-lg font-medium text-sm appearance-none cursor-pointer ${
                darkMode
                  ? "bg-red-600 text-white border-2 border-red-500"
                  : "bg-red-500 text-white border-2 border-red-400"
              } focus:outline-none focus:ring-2 focus:ring-red-400`}
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

        {/* Selected Procedure Steps */}
        {selectedProc && (
          <div className="flex-1">
            <h4 className={`text-sm font-bold mb-3 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              Procedure Steps:
            </h4>
            <div className="space-y-2">
              {selectedProc.steps.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${darkMode ? "bg-slate-700/70" : "bg-slate-100"}`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
                      darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        {item.step}
                      </div>
                      <div className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
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

      {/* Right Side - Cockpit Panels (Stacked on mobile, resizable on desktop) */}
      <div className="flex-1 flex flex-col gap-3 lg:gap-0">
        {/* Instrument Panel - Top */}
        <div
          className={`${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-xl lg:rounded-t-2xl lg:rounded-b-none shadow-xl overflow-auto relative`}
          style={{ height: window.innerWidth >= 1024 ? `${topPanelHeight}px` : '400px', minHeight: '300px' }}
        >
          <div className="w-full h-full bg-slate-900">
            <iframe
              src="/CockpitInstrtFrt_V300.pdf#view=FitH"
              className="w-full h-full"
              title="Instrument Panel Reference"
            />
          </div>
          <a
            href="/CockpitInstrtFrt_V300.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
              darkMode ? "bg-slate-900/80 text-blue-400 hover:text-blue-300" : "bg-white/80 text-blue-600 hover:text-blue-500"
            } transition backdrop-blur-sm z-10`}
          >
            <FileText className="w-3 h-3" />
            Open
          </a>
        </div>

        {/* Resizable Divider (Desktop only) */}
        <div
          className={`hidden lg:flex h-2 cursor-ns-resize group relative items-center justify-center ${
            isDragging ? "bg-blue-500" : darkMode ? "bg-slate-700 hover:bg-blue-600" : "bg-slate-300 hover:bg-blue-500"
          } transition-colors`}
          onMouseDown={handleMouseDown}
        >
          <GripHorizontal className={`w-6 h-6 ${isDragging ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
        </div>

        {/* Side Panel - Bottom */}
        <div
          className={`flex-1 ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-xl lg:rounded-t-none lg:rounded-b-2xl shadow-xl overflow-auto relative`}
          style={{ height: window.innerWidth >= 1024 ? 'auto' : '400px', minHeight: window.innerWidth >= 1024 ? '1000px' : '300px' }}
        >
          <div className="w-full h-full bg-slate-900">
            <iframe
              src="/SidePanelsFront_V300.pdf#view=FitH"
              className="w-full h-full"
              title="Side Panels Reference"
            />
          </div>
          <a
            href="/SidePanelsFront_V300.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
              darkMode ? "bg-slate-900/80 text-blue-400 hover:text-blue-300" : "bg-white/80 text-blue-600 hover:text-blue-500"
            } transition backdrop-blur-sm z-10`}
          >
            <FileText className="w-3 h-3" />
            Open
          </a>
        </div>
      </div>
    </div>
  );
}
