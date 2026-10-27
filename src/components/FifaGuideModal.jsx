import React from 'react';
import { X, Award, ShieldCheck, CheckCircle2, BookOpen } from 'lucide-react';

export const FifaGuideModal = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 p-6 text-slate-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'tn' ? 'الدبلوم الطبي الرسمي للفيفا (FIFA Diploma)' : 'FIFA Diploma in Football Medicine & F-MARC'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'tn' ? 'المعايير والبروتوكولات الطبية المعتمدة' : 'Protocoles et Arbres Décisionnels Validés pour le Football'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {lang === 'tn' ? 'الركن الأساسي والقاعدة الذهبية' : 'La Règle d\'Or Médicale FIFA'}
            </h4>
            <p>
              {lang === 'tn'
                ? 'التطبيق هذا مبني حصريا على المراجع الرسمية لمركز التقييم والبحوث الطبية للفيفا (F-MARC) والدبلوم الطبي للفيفا. جميع التيستوات السريرية وقرارات التصوير الطبي (راديو / إيكو / IRM) متطابقة 100% مع معايير كرة القدم الدولية.'
                : 'L\'intégralité des arbres décisionnels, tests cliniques et scores de cette application est issue strictement du FIFA Diploma in Football Medicine et des consensus internationaux ratifiés par la FIFA (Consensus de Doha pour l\'aine, Règles d\'Ottawa pour la cheville, Règles canadiennes pour le rachis cervical).'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">
                1. Consensus de Doha sur la douleur de l'aine (Hanche / Sfak)
              </span>
              <p className="text-slate-400 text-xs">
                Classification en 4 entités définies par la palpation et les tests de résistance : Adductor-related (Squeeze test), Iliopsoas-related (Thomas), Inguinal-related (toux/Valsalva) et Pubic-related.
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">
                2. Critères d'Ottawa pour la Cheville & Médio-Pied
              </span>
              <p className="text-slate-400 text-xs">
                Excluent la fracture avec une sensibilité supérieure à 98%. Si les critères sont négatifs (absence de douleur aux bords postérieurs malléolaires, au 5e métatarsien, à l'os naviculaire et capacité de faire 4 pas), aucune radiographie n'est requise.
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">
                3. Protocole Genou Aigu FIFA (LCA & Ménisques)
              </span>
              <p className="text-slate-400 text-xs">
                Craquement 'POP' + Gonflement immédiat (&lt;2h) = Hémarthrose aiguë à 70% liée à une rupture du LCA. Le Lachman test et le Pivot Shift sont les gold standards. IRM sous 48-72h.
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">
                4. Protocole PEACE & LOVE (Remplacement de RICE)
              </span>
              <p className="text-slate-400 text-xs">
                Protection, Elevation, Avoid Anti-inflammatory (pour favoriser la cicatrisation tissulaire précoce), Compression, Education & Load, Optimism, Vascularisation, Exercise.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs sm:text-sm transition-all"
          >
            {lang === 'tn' ? 'واضح، فهمت' : 'Fermer le guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
