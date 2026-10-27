import React from 'react';
import { translations } from '../data/translations';
import { Flame } from 'lucide-react';

export const PainScale = ({ painValues, onChangePain, lang }) => {
  const t = translations[lang] || translations.fr;

  const getEmoji = (val) => {
    if (val === 0) return '😌';
    if (val <= 2) return '🙂';
    if (val <= 4) return '😐';
    if (val <= 6) return '😣';
    if (val <= 8) return '😫';
    return '😭';
  };

  const getColorClass = (val) => {
    if (val <= 2) return 'from-emerald-500 to-teal-600 text-emerald-400 border-emerald-500/40';
    if (val <= 5) return 'from-amber-500 to-yellow-600 text-amber-400 border-amber-500/40';
    if (val <= 7) return 'from-orange-500 to-amber-600 text-orange-400 border-orange-500/40';
    return 'from-rose-600 to-red-700 text-rose-400 border-rose-500/40';
  };

  const getPainDescriptor = (val) => {
    if (lang === 'tn') {
      if (val === 0) return 'ما فما حتى وجعة (مرتاح جملة)';
      if (val <= 2) return 'وجعة خفيفة ما تقلقش (وجيعة صغيرة)';
      if (val <= 5) return 'وجعة متوسطة تقلق في الجري (متوسطة)';
      if (val <= 7) return 'وجعة قوية تمنعك من اللعب (قوية)';
      return 'وجعة حادة لا تطاق وما تنجمش تمسها (حادة ع الآخر)';
    } else {
      if (val === 0) return 'Aucune douleur (Confortable)';
      if (val <= 2) return 'Douleur légère et supportable';
      if (val <= 5) return 'Douleur modérée gênant la course';
      if (val <= 7) return 'Douleur sévère empêchant le jeu';
      return 'Douleur intolérable / insupportable';
    }
  };

  const contexts = [
    { key: 'atRest', labelFr: t.painAtRest, labelAr: t.painAtRest, icon: '🛌' },
    { key: 'moving', labelFr: t.painMoving, labelAr: t.painMoving, icon: '🏃' },
    { key: 'atAction', labelFr: t.painAtAction, labelAr: t.painAtAction, icon: '⚽' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            {t.painScaleTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'tn'
              ? 'حرك الكورسار باش تحدد قوة الوجعة في وضعيات مختلفة'
              : 'Évaluez le niveau de douleur de 0 à 10 selon le contexte de jeu'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {contexts.map((ctx) => {
          const val = painValues[ctx.key] || 0;
          return (
            <div
              key={ctx.key}
              className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <span className="text-base">{ctx.icon}</span>
                  {lang === 'tn' ? ctx.labelAr : ctx.labelFr}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-2xl select-none">{getEmoji(val)}</span>
                  <div
                    className={`px-3 py-1 rounded-lg font-black text-lg border bg-gradient-to-r ${getColorClass(
                      val
                    )} text-white`}
                  >
                    {val} <span className="text-xs font-normal opacity-80">/10</span>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={val}
                  onChange={(e) => onChangePain(ctx.key, parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                />

                {/* Number Ticks */}
                <div className="flex justify-between text-[10px] text-slate-500 px-1 mt-1 font-mono">
                  <span>0</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                  <span>10</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                {getPainDescriptor(val)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
