"use client";

import { useState } from "react";
import { FileText, Gauge, Maximize2 } from "lucide-react";

export default function CockpitReference({ darkMode = true }) {
  const [selectedProcedure, setSelectedProcedure] = useState(null);

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

  const categories = [...new Set(boldfaceProcedures.map((p) => p.category))];

  return (
    <div className="px-3 py-3 max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`${darkMode ? "bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30" : "bg-white"} backdrop-blur-xl rounded-2xl p-6 mb-6 shadow-xl`}
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-teal-500/40 rounded-xl">
            <Gauge className="w-8 h-8 text-teal-200" />
          </div>
          <div>
            <h2
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Cockpit Reference
            </h2>
            <p
              className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Quick access to BOLDFACE procedures and cockpit diagrams
            </p>
          </div>
        </div>
      </div>

      {/* PDF Reference Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Instrument Panel */}
        <div
          className={`${darkMode ? "bg-slate-800/50 border border-slate-700/50" : "bg-white"} backdrop-blur-xl rounded-xl p-4 shadow-lg`}
        >
          <h3
            className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            <FileText className="w-5 h-5 text-blue-400" />
            Instrument Panel
          </h3>
          <div className="relative bg-slate-900 rounded-lg overflow-hidden h-64 mb-3">
            <iframe
              src="/CockpitInstrtFrt_V300.pdf#view=FitH&zoom=page-width"
              className="w-full h-full"
              title="Instrument Panel Reference"
            />
          </div>
          <a
            href="/CockpitInstrtFrt_V300.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition shadow-lg hover:shadow-xl active:scale-95`}
          >
            <Maximize2 className="w-4 h-4" />
            <span>Open Full View</span>
          </a>
        </div>

        {/* Side Panels */}
        <div
          className={`${darkMode ? "bg-slate-800/50 border border-slate-700/50" : "bg-white"} backdrop-blur-xl rounded-xl p-4 shadow-lg`}
        >
          <h3
            className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            <FileText className="w-5 h-5 text-teal-400" />
            Side Panels
          </h3>
          <div className="relative bg-slate-900 rounded-lg overflow-hidden h-64 mb-3">
            <iframe
              src="/SidePanelsFront_V300.pdf#view=FitH&zoom=page-width"
              className="w-full h-full"
              title="Side Panels Reference"
            />
          </div>
          <a
            href="/SidePanelsFront_V300.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-teal-500 hover:bg-teal-600 text-white"
            } transition shadow-lg hover:shadow-xl active:scale-95`}
          >
            <Maximize2 className="w-4 h-4" />
            <span>Open Full View</span>
          </a>
        </div>
      </div>

      {/* BOLDFACE Procedures Section */}
      <div
        className={`${darkMode ? "bg-slate-800/50 border border-slate-700/50" : "bg-white"} backdrop-blur-xl rounded-xl p-6 shadow-xl`}
      >
        <h3
          className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
        >
          BOLDFACE Procedures
        </h3>

        {/* Procedures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {boldfaceProcedures.map((procedure) => (
            <button
              key={procedure.id}
              onClick={() =>
                setSelectedProcedure(
                  selectedProcedure === procedure.id ? null : procedure.id,
                )
              }
              className={`text-left p-4 rounded-lg transition-all ${
                selectedProcedure === procedure.id
                  ? darkMode
                    ? "bg-red-600 border-2 border-red-500 shadow-lg shadow-red-500/20"
                    : "bg-red-500 border-2 border-red-400 shadow-lg"
                  : darkMode
                    ? "bg-slate-700/70 hover:bg-slate-700 border-2 border-slate-600/50"
                    : "bg-slate-100 hover:bg-slate-200 border-2 border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div
                    className={`text-xs font-bold mb-1 ${
                      selectedProcedure === procedure.id
                        ? "text-red-200"
                        : darkMode
                          ? "text-slate-400"
                          : "text-slate-600"
                    }`}
                  >
                    {procedure.category}
                  </div>
                  <div
                    className={`font-bold text-sm ${
                      selectedProcedure === procedure.id
                        ? "text-white"
                        : darkMode
                          ? "text-white"
                          : "text-slate-900"
                    }`}
                  >
                    {procedure.title}
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 px-2 py-1 rounded text-xs font-bold ${
                    selectedProcedure === procedure.id
                      ? "bg-white/20 text-white"
                      : darkMode
                        ? "bg-slate-600 text-slate-300"
                        : "bg-slate-300 text-slate-700"
                  }`}
                >
                  {procedure.steps.length} steps
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Procedure Details */}
        {selectedProcedure && (
          <div
            className={`${darkMode ? "bg-slate-900/50 border border-red-500/30" : "bg-red-50 border border-red-200"} rounded-xl p-6 mt-4`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-600 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <div
                  className={`text-sm font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}
                >
                  {
                    boldfaceProcedures.find((p) => p.id === selectedProcedure)
                      ?.category
                  }
                </div>
                <h4
                  className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  {
                    boldfaceProcedures.find((p) => p.id === selectedProcedure)
                      ?.title
                  }
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              {boldfaceProcedures
                .find((p) => p.id === selectedProcedure)
                ?.steps.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${darkMode ? "bg-slate-800/80" : "bg-white"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-red-600 text-white shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {item.step} <span className="text-red-400">→</span>{" "}
                          <span className="text-red-400">{item.action}</span>
                        </div>
                        <div
                          className={`text-xs leading-relaxed flex items-start gap-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                        >
                          <span className="text-base">📍</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
