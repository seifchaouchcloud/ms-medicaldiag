import React, { useState } from 'react';
import { REGIONS_DATA } from '../data/fifaData';
import { CheckCircle2, RotateCw } from 'lucide-react';

export const BodyChart = ({ selectedRegion, selectedSubzone, onSelectRegion, onSelectSubzone, lang }) => {
  const [view, setView] = useState('front'); // 'front' or 'back'

  const handleRegionClick = (regionId) => {
    onSelectRegion(regionId);
    // Auto-select first subzone or clear
    if (REGIONS_DATA[regionId]?.subzones?.length > 0) {
      onSelectSubzone(REGIONS_DATA[regionId].subzones[0].id);
    }
  };

  const isRtl = lang === 'tn';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {lang === 'tn' ? 'المخطط الجسدي التفاعلي (Body Chart)' : 'Carte Corporelle Interactive'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'tn' 
              ? 'انزل ع البلاصة اللي توجعك في بدن الملاعبي' 
              : 'Touchez directement la zone douloureuse sur le schéma corporel'}
          </p>
        </div>

        {/* View Switcher: Front / Back */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            type="button"
            onClick={() => setView('front')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              view === 'front'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {lang === 'tn' ? 'من القدام (Face)' : 'Face'}
          </button>
          <button
            type="button"
            onClick={() => setView('back')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              view === 'back'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {lang === 'tn' ? 'من التالي (Dos)' : 'Dos'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive SVG Athlete Silhouette */}
        <div className="md:col-span-6 flex justify-center relative bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
          <svg
            viewBox="0 0 300 560"
            className="w-full max-w-[260px] sm:max-w-[290px] h-auto drop-shadow-2xl select-none"
          >
            <defs>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Athletic Outline Path */}
            {view === 'front' ? (
              <g className="transition-all duration-300">
                {/* Head */}
                <ellipse cx="150" cy="45" rx="24" ry="30" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2.5" />
                {/* Neck */}
                <rect x="141" y="75" width="18" height="24" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
                
                {/* Torso & Shoulders */}
                <path
                  d="M141,95 L100,105 L60,140 L70,225 L85,295 L115,295 L125,245 L150,250 L175,245 L185,295 L215,295 L230,225 L240,140 L200,105 L159,95 Z"
                  fill="url(#bodyGrad)"
                  stroke="#334155"
                  strokeWidth="2.5"
                />

                {/* Left Arm & Wrist */}
                <path d="M60,140 L45,210 L38,285 L32,320 L44,324 L52,285 L65,215 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
                {/* Right Arm & Wrist */}
                <path d="M240,140 L255,210 L262,285 L268,320 L256,324 L248,285 L235,215 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />

                {/* Pelvis & Sfak */}
                <path d="M115,295 L185,295 L175,345 L125,345 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />

                {/* Left Leg */}
                <path d="M125,345 L110,410 L108,460 L102,515 L124,520 L130,460 L138,410 L146,345 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
                {/* Right Leg */}
                <path d="M175,345 L190,410 L192,460 L198,515 L176,520 L170,460 L162,410 L154,345 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
              </g>
            ) : (
              <g className="transition-all duration-300">
                {/* Head (Back) */}
                <ellipse cx="150" cy="45" rx="24" ry="30" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2.5" />
                {/* Cervical Spine Area */}
                <rect x="141" y="75" width="18" height="30" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
                
                {/* Back Torso */}
                <path
                  d="M141,95 L100,105 L60,140 L70,225 L85,295 L115,295 L125,245 L150,250 L175,245 L185,295 L215,295 L230,225 L240,140 L200,105 L159,95 Z"
                  fill="url(#bodyGrad)"
                  stroke="#334155"
                  strokeWidth="2.5"
                />

                {/* Left Arm & Hand (Back) */}
                <path d="M60,140 L45,210 L38,285 L32,320 L44,324 L52,285 L65,215 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
                {/* Right Arm & Hand (Back) */}
                <path d="M240,140 L255,210 L262,285 L268,320 L256,324 L248,285 L235,215 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />

                {/* Gluteus & Sacrum */}
                <path d="M115,295 L185,295 L175,345 L125,345 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />

                {/* Left Leg (Back) */}
                <path d="M125,345 L110,410 L108,460 L102,515 L124,520 L130,460 L138,410 L146,345 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
                {/* Right Leg (Back) */}
                <path d="M175,345 L190,410 L192,460 L198,515 L176,520 L170,460 L162,410 L154,345 Z" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />
              </g>
            )}

            {/* Clickable Hotspots overlay based on view */}
            {/* Cervical (Cervical Spine) - Visible on Back and Front */}
            <g
              onClick={() => handleRegionClick('rachis_cervical')}
              className="cursor-pointer group"
            >
              <circle
                cx="150"
                cy="85"
                r={selectedRegion === 'rachis_cervical' ? "18" : "14"}
                fill={selectedRegion === 'rachis_cervical' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'rachis_cervical' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'rachis_cervical' ? "#34d399" : "#38bdf8"}
                strokeWidth="2.5"
                className="transition-all duration-300 group-hover:scale-110"
              />
              <text x="150" y="88" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                C
              </text>
            </g>

            {/* Lumbar Spine - Visible mostly on Back */}
            {view === 'back' && (
              <g
                onClick={() => handleRegionClick('rachis_lombaire')}
                className="cursor-pointer group"
              >
                <circle
                  cx="150"
                  cy="260"
                  r={selectedRegion === 'rachis_lombaire' ? "22" : "16"}
                  fill={selectedRegion === 'rachis_lombaire' ? "#10b981" : "#0284c7"}
                  fillOpacity={selectedRegion === 'rachis_lombaire' ? "0.85" : "0.4"}
                  stroke={selectedRegion === 'rachis_lombaire' ? "#34d399" : "#38bdf8"}
                  strokeWidth="2.5"
                  className="transition-all duration-300 group-hover:scale-110"
                />
                <text x="150" y="264" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  L
                </text>
              </g>
            )}

            {/* Shoulders (Left & Right) */}
            <g onClick={() => handleRegionClick('epaule')} className="cursor-pointer group">
              <circle
                cx="80"
                cy="118"
                r={selectedRegion === 'epaule' ? "18" : "14"}
                fill={selectedRegion === 'epaule' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'epaule' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'epaule' ? "#34d399" : "#38bdf8"}
                strokeWidth="2"
                className="transition-all duration-300 group-hover:scale-110"
              />
              <circle
                cx="220"
                cy="118"
                r={selectedRegion === 'epaule' ? "18" : "14"}
                fill={selectedRegion === 'epaule' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'epaule' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'epaule' ? "#34d399" : "#38bdf8"}
                strokeWidth="2"
                className="transition-all duration-300 group-hover:scale-110"
              />
            </g>

            {/* Elbows (Left & Right) */}
            <g onClick={() => handleRegionClick('coude')} className="cursor-pointer group">
              <circle
                cx="48"
                cy="210"
                r={selectedRegion === 'coude' ? "16" : "12"}
                fill={selectedRegion === 'coude' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'coude' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'coude' ? "#34d399" : "#38bdf8"}
                strokeWidth="2"
                className="transition-all duration-300 group-hover:scale-110"
              />
              <circle
                cx="252"
                cy="210"
                r={selectedRegion === 'coude' ? "16" : "12"}
                fill={selectedRegion === 'coude' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'coude' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'coude' ? "#34d399" : "#38bdf8"}
                strokeWidth="2"
                className="transition-all duration-300 group-hover:scale-110"
              />
            </g>

            {/* Wrists (Left & Right) */}
            <g onClick={() => handleRegionClick('poignet')} className="cursor-pointer group">
              <circle
                cx="36"
                cy="305"
                r={selectedRegion === 'poignet' ? "15" : "11"}
                fill={selectedRegion === 'poignet' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'poignet' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'poignet' ? "#34d399" : "#38bdf8"}
                strokeWidth="2"
                className="transition-all duration-300 group-hover:scale-110"
              />
              <circle
                cx="264"
                cy="305"
                r={selectedRegion === 'poignet' ? "15" : "11"}
                fill={selectedRegion === 'poignet' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'poignet' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'poignet' ? "#34d399" : "#38bdf8"}
                strokeWidth="2"
                className="transition-all duration-300 group-hover:scale-110"
              />
            </g>

            {/* Hanche / Aine (Sfak - Front) */}
            {view === 'front' && (
              <g onClick={() => handleRegionClick('hanche_aine')} className="cursor-pointer group">
                <ellipse
                  cx="150"
                  cy="325"
                  rx={selectedRegion === 'hanche_aine' ? "28" : "22"}
                  ry={selectedRegion === 'hanche_aine' ? "20" : "16"}
                  fill={selectedRegion === 'hanche_aine' ? "#10b981" : "#0284c7"}
                  fillOpacity={selectedRegion === 'hanche_aine' ? "0.85" : "0.4"}
                  stroke={selectedRegion === 'hanche_aine' ? "#34d399" : "#38bdf8"}
                  strokeWidth="2.5"
                  className="transition-all duration-300 group-hover:scale-110"
                />
                <text x="150" y="328" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  SFAK
                </text>
              </g>
            )}

            {/* Knees (Left & Right) */}
            <g onClick={() => handleRegionClick('genou')} className="cursor-pointer group">
              <circle
                cx="116"
                cy="435"
                r={selectedRegion === 'genou' ? "19" : "15"}
                fill={selectedRegion === 'genou' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'genou' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'genou' ? "#34d399" : "#38bdf8"}
                strokeWidth="2.5"
                className="transition-all duration-300 group-hover:scale-110"
              />
              <circle
                cx="184"
                cy="435"
                r={selectedRegion === 'genou' ? "19" : "15"}
                fill={selectedRegion === 'genou' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'genou' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'genou' ? "#34d399" : "#38bdf8"}
                strokeWidth="2.5"
                className="transition-all duration-300 group-hover:scale-110"
              />
            </g>

            {/* Ankles (Left & Right) */}
            <g onClick={() => handleRegionClick('cheville')} className="cursor-pointer group">
              <circle
                cx="110"
                cy="510"
                r={selectedRegion === 'cheville' ? "18" : "14"}
                fill={selectedRegion === 'cheville' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'cheville' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'cheville' ? "#34d399" : "#38bdf8"}
                strokeWidth="2.5"
                className="transition-all duration-300 group-hover:scale-110"
              />
              <circle
                cx="190"
                cy="510"
                r={selectedRegion === 'cheville' ? "18" : "14"}
                fill={selectedRegion === 'cheville' ? "#10b981" : "#0284c7"}
                fillOpacity={selectedRegion === 'cheville' ? "0.85" : "0.4"}
                stroke={selectedRegion === 'cheville' ? "#34d399" : "#38bdf8"}
                strokeWidth="2.5"
                className="transition-all duration-300 group-hover:scale-110"
              />
            </g>
          </svg>
        </div>

        {/* 8 Regions Grid & Subzones Selector */}
        <div className="md:col-span-6 space-y-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            {lang === 'tn' ? 'المفاصل الـ 8 المستهدفة (FIFA) :' : 'Les 8 Régions Anatomiques FIFA :'}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {Object.values(REGIONS_DATA).map((reg) => {
              const isSelected = selectedRegion === reg.id;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => handleRegionClick(reg.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500/50'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base">
                      {lang === 'tn' ? reg.nameAr : reg.nameFr}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1">
                    {lang === 'tn' ? reg.nameFr : reg.nameAr}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subzones Accordion / Selector */}
          {selectedRegion && REGIONS_DATA[selectedRegion] && (
            <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
              <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {lang === 'tn' ? 'حدد البلاصة بالضبط وين :' : 'Précisez la localisation anatomique exacte :'}
              </div>
              <div className="flex flex-wrap gap-2">
                {REGIONS_DATA[selectedRegion].subzones.map((sub) => {
                  const isSubSelected = selectedSubzone === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onSelectSubzone(sub.id)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                        isSubSelected
                          ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {lang === 'tn' ? sub.labelAr : sub.labelFr}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
