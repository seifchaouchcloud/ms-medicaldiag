import React, { useState } from 'react';
import { REGIONS_DATA } from '../data/fifaData';
import { translations } from '../data/translations';
import { 
  AlertOctagon, 
  CheckCircle2, 
  HelpCircle, 
  Camera, 
  Waves, 
  Disc, 
  FileText, 
  Share2, 
  Printer, 
  RotateCcw, 
  Send, 
  Copy, 
  Check, 
  Stethoscope, 
  TrendingUp, 
  Award,
  Smartphone,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const DiagnosticModule = ({ 
  patientData, 
  testResults, 
  ottawaResults, 
  onResetExam, 
  lang 
}) => {
  const t = translations[lang] || translations.fr;
  const isRtl = lang === 'tn';

  const [copiedStaff, setCopiedStaff] = useState(false);
  const [copiedPlayer, setCopiedPlayer] = useState(false);
  const [playerPhone, setPlayerPhone] = useState(patientData.phone || '');

  const regionId = patientData.region || 'genou';
  const regionConfig = REGIONS_DATA[regionId] || REGIONS_DATA.genou;

  // 1. EVALUATE RED FLAGS
  const triggeredRedFlags = [];

  // Cheville Ottawa
  if (regionId === 'cheville') {
    const ottawaCount = Object.values(ottawaResults || {}).filter(Boolean).length;
    if (ottawaCount > 0) {
      triggeredRedFlags.push({
        titleFr: "Critères d'Ottawa Positifs (Suspicion de Fracture)",
        titleAr: "معايير أوتاوا إيجابية: شك كبير في كسر عظم الكعبورة أو مشط القدم",
        detailFr: `${ottawaCount} critère(s) d'Ottawa positif(s). Radiographie de cheville/pied obligatoire avant toute mise en charge selon les directives FIFA.`,
        detailAr: "راديو الكاحل إجباري وفوري لاستبعاد كسر العظام.",
      });
    }
    if (testResults['thompson'] === 'positive') {
      triggeredRedFlags.push({
        titleFr: "Rupture Aiguë Complète du Tendon d'Achille",
        titleAr: "تقطع كامل وحاد في عرق الصاباط (Tendon d'Achille)",
        detailFr: "Signe de Thompson positif : Absence de flexion plantaire à la compression du mollet. Urgence médico-chirurgicale.",
        detailAr: "حالة استعجالية تستوجب استشارة جراح عظام فورا.",
      });
    }
  }

  // Genou
  if (regionId === 'genou') {
    if (patientData.block === 'yes') {
      triggeredRedFlags.push({
        titleFr: "Genou Aigu Bloqué en Flexion",
        titleAr: "ركبة مبلوكية ما تسرحش جملة (Blocage méniscal)",
        detailFr: "Impossibilité physique de verrouiller l'extension (Suspicion de languette méniscale ou anse de panier luxée). Pas de manipulation forcée.",
        detailAr: "تمزق هلالي كبير حابس المفصل، يمنع إجبار الركبة بالقوة.",
      });
    }
  }

  // Poignet
  if (regionId === 'poignet') {
    if (testResults['snuffbox_palpation'] === 'positive') {
      triggeredRedFlags.push({
        titleFr: "Suspicion Majeure de Fracture du Scaphoïde Carpien",
        titleAr: "شك كبير في كسر عظم السكافويد (Scaphoïde)",
        detailFr: "Toute douleur exquise de la tabatière anatomique après chute est un scaphoïde jusqu'à preuve du contraire selon la FIFA (Immobilisation stricte immédiate).",
        detailAr: "أي وجعة في حفرة السكافويد تستوجب جبيرة وراديو فورا لتفادي موت العظم.",
      });
    }
  }

  // Rachis Cervical
  if (regionId === 'rachis_cervical') {
    if (patientData.nerve === 'yes' || testResults['canadian_cspine'] === 'positive') {
      triggeredRedFlags.push({
        titleFr: "Alerte Rachis Cervical & Risque Médullaire",
        titleAr: "خطر في فقرات الرقبة والنخاع الشوكي (Alerte Rachis Cervical)",
        detailFr: "Règles canadiennes positives ou signes neurologiques. Immobilisation par collier cervical rigide et imagerie urgente.",
        detailAr: "تثبيت الرقبة فورا وتفادي تحريك الرأس.",
      });
    }
  }

  // Rachis Lombaire
  if (regionId === 'rachis_lombaire') {
    if (patientData.nerve === 'yes') {
      triggeredRedFlags.push({
        titleFr: "Sciatique compressive avec signes neurologiques",
        titleAr: "حصرة في عرق النسا مع ضربات ضو وتنميل",
        detailFr: "Surveiller attentivement le testing moteur des releveurs (L5) et triceps (S1) pour éliminer un déficit paralysant.",
        detailAr: "مراقبة قوة عضلات الساق لمنع الشلل.",
      });
    }
  }

  // 2. COMPUTE PRINCIPAL DIAGNOSIS & CONFIDENCE SCORE
  const computeDiagnosis = () => {
    let mainKey = null;
    let confidence = 50;
    const diffs = [];

    if (regionId === 'genou') {
      const lachman = testResults['lachman'];
      const pivot = testResults['pivot_shift'];
      const valgus = testResults['valgus_stress_30'];
      const mcmurray = testResults['mcmurray'];
      const thessaly = testResults['thessaly'];

      if (lachman === 'positive' || pivot === 'positive') {
        mainKey = 'rupture_lca';
        confidence = 85;
        if (patientData.pop === 'yes') confidence += 8;
        if (patientData.swelling === 'immediate') confidence += 5;
        if (pivot === 'positive') confidence += 5;
        diffs.push("Lésion méniscale interne associée (Fréquence > 50%)");
        diffs.push("Entorse associée du ligament collatéral médial (LLI)");
      } else if (valgus === 'positive' || valgus === 'painOnly') {
        mainKey = 'entorse_lli';
        confidence = 80;
        diffs.push("Lésion du ménisque interne (corne postérieure)");
        diffs.push("Entorse bénigne du LCA");
      } else if (mcmurray === 'positive' || thessaly === 'positive') {
        mainKey = 'lesion_meniscale';
        confidence = 78;
        if (patientData.block === 'yes') confidence += 12;
        diffs.push("Lésion ostéochondrale fémorale");
        diffs.push("Plica synoviale médiopatellaire inflammatoire");
      } else {
        mainKey = 'entorse_lli';
        confidence = 65;
        diffs.push("Contusion osseuse simple du genou");
        diffs.push("Syndrome fémoro-patellaire aigu");
      }
    } else if (regionId === 'cheville') {
      const thompson = testResults['thompson'];
      const squeeze = testResults['squeeze_test_cheville'];
      const kleiger = testResults['kleiger'];
      const tiroir = testResults['tiroir_ant_cheville'];

      if (thompson === 'positive') {
        mainKey = 'rupture_achille';
        confidence = 96;
        diffs.push("Déchirure myo-tendineuse du jumeau médial (Tennis Leg)");
        diffs.push("Tendinopathie calcanéenne aiguë");
      } else if (squeeze === 'positive' || kleiger === 'positive') {
        mainKey = 'entorse_syndesmose';
        confidence = 88;
        diffs.push("Fracture haute de Maisonneuve");
        diffs.push("Entorse grave du ligament deltoïde");
      } else {
        mainKey = 'entorse_laterale';
        confidence = 82;
        if (tiroir === 'positive') confidence += 10;
        diffs.push("Lésion de la syndesmose tibio-fibulaire");
        diffs.push("Fracture parcellaire de la base du 5e métatarsien (Ottawa)");
      }
    } else if (regionId === 'hanche_aine') {
      const squeezeDoha = testResults['squeeze_test_doha'];
      const faddir = testResults['faddir_test'];
      const thomas = testResults['thomas_test'];

      if (squeezeDoha === 'positive' || squeezeDoha === 'painOnly') {
        mainKey = 'pubalgie_adducteurs';
        confidence = 90;
        diffs.push("Atteinte symphysaire pubienne associée (Pubic-related)");
        diffs.push("Conflit fémoro-acétabulaire (FAI)");
      } else if (faddir === 'positive') {
        mainKey = 'conflit_fai';
        confidence = 86;
        diffs.push("Désinsertion du labrum acétabulaire");
        diffs.push("Tendinopathie du psoas");
      } else {
        mainKey = 'pubalgie_adducteurs';
        confidence = 75;
        diffs.push("Hernie du sportif (Inguinal-related)");
        diffs.push("Bursite trochantérienne");
      }
    } else if (regionId === 'epaule') {
      const app = testResults['apprehension_test'];
      const cross = testResults['cross_body'];
      const jobe = testResults['jobe_test'];

      if (app === 'positive') {
        mainKey = 'instabilite_epaule';
        confidence = 92;
        diffs.push("Lésion SLAP du labrum supérieur");
        diffs.push("Rupture traumatique de la coiffe");
      } else if (cross === 'positive') {
        mainKey = 'disjonction_ac';
        confidence = 88;
        diffs.push("Fracture de la clavicule distale");
        diffs.push("Contusion de la bourse sous-acromiale");
      } else {
        mainKey = 'disjonction_ac';
        confidence = 72;
        diffs.push("Tendinopathie du supra-épineux");
      }
    } else if (regionId === 'coude') {
      mainKey = 'entorse_ucl_coude';
      confidence = 82;
      diffs.push("Fracture de la tête radiale occulte");
      diffs.push("Épicondylite d'insertion");
    } else if (regionId === 'poignet') {
      mainKey = 'fracture_scaphoide';
      confidence = 85;
      diffs.push("Entorse du ligament scapho-lunaire");
      diffs.push("Lésion du TFCC");
    } else if (regionId === 'rachis_cervical') {
      mainKey = 'trauma_cervical';
      confidence = 84;
      diffs.push("Hernie discale cervicale post-traumatique");
      diffs.push("Commotion cérébrale associée");
    } else if (regionId === 'rachis_lombaire') {
      const stork = testResults['stork_test'];
      const lasegue = testResults['lasegue_test'];

      if (stork === 'positive') {
        mainKey = 'spondylolyse';
        confidence = 90;
        diffs.push("Lombago musculaire aigu");
        diffs.push("Dysfonction sacro-iliaque");
      } else if (lasegue === 'positive') {
        mainKey = 'hernie_discale';
        confidence = 88;
        diffs.push("Syndrome du piriforme");
        diffs.push("Entorse thoraco-lombaire");
      } else {
        mainKey = 'spondylolyse';
        confidence = 74;
        diffs.push("Lombalgie commune d'effort");
      }
    }

    confidence = Math.min(confidence, 98);
    const pathologyObj = regionConfig.pathologies[mainKey] || Object.values(regionConfig.pathologies)[0];

    return { pathologyObj, confidence, diffs };
  };

  const { pathologyObj, confidence, diffs } = computeDiagnosis();
  const imaging = pathologyObj.imaging;

  // Generate Player Explanation in Tunisian Derja
  const generatePlayerReport = () => {
    const targetPlayerName = patientData.name?.trim() || 'كابتن';

    return `⚽ *تشخيص الإصابة - MS MedicalDiag*
🩺 *الإطار الطبي : سيف الشاوش (كيني) • د. مالك المصري (طبيب)*
عسلامة يا ${targetPlayerName}، هاو تقرير الفحص والتشخيص الطبي لحالتك حسب بروتوكول الفيفا (FIFA Diploma) :

📍 المفصل المصاب : ${regionConfig.nameAr}
🔍 التشخيص الرئيسي للـ FIFA :
★ ${pathologyObj.nameAr}
📊 نسبة التأكد الطبي والسريري : ${confidence}%

💡 شنوة صارلك بالتفصيل وكيفاش تتعامل مع الضربة :
${pathologyObj.explanationDerja}

📸 التصاور اللي لازم تعملهم (Imagerie) :
- الراديو العادي : ${imaging.radiography.required ? 'لازم تعمل راديو (' + imaging.radiography.viewsAr + ')' : 'ما تستحقش راديو توا حسب بروتوكول الفيفا (ما فماش كسر)'}
- الإيكو (Échographie) : ${imaging.ultrasound.required ? 'مفيدة (' + imaging.ultrasound.delayAr + ')' : 'ما فماش داعي للإيكو في حالتك'}
- الرنين المغناطيسي (IRM) : ${imaging.mri.required ? 'ضرورية برشا في أقرب وقت (' + imaging.mri.protocolAr + ')' : 'ما تستحقش IRM توا'}

🧊 نصيحة الكيني الحينية (PEACE & LOVE) :
حط الثلج على البلاصة 15 دقيقة، ارفع ساقك/يدك، البس الباندا وماتضغطش ع الوجعة حتى نعملو التصاور ونبداو الترويض مع بعضنا خطوة بخطوة.
إن شاء الله لباس وترجع أقوى للتيران ! 🇹🇳💪
— الطاقم الطبي MS MedicalDiag (سيف الشاوش & د. مالك المصري)`;
  };

  // Generate Medical Report for Staff (Français)
  const generateStaffReport = () => {
    return `📋 RAPPORT MÉDICAL OFFICIEL - MS MedicalDiag
🏥 STAFF MÉDICAL : Seif Chaouch (Kinésithérapeute) • Dr. Malek Masri (Médecin)
⚽ Protocole officiel FIFA Diploma in Football Medicine & F-MARC
Club : ${patientData.club || 'Club'} | Joueur : ${patientData.name || 'Joueur'}
Poste : ${t.positions[patientData.position] || patientData.position} | Date : ${new Date().toLocaleDateString('fr-FR')}

1. ANAMNÈSE & MÉCANISME (FIFA) :
- Région : ${regionConfig.nameFr} (${patientData.subzone || 'Générale'})
- Contexte : ${t.timings[patientData.timing] || patientData.timing}
- Mécanisme : ${patientData.mechanism === 'contact' ? 'Contact direct' : 'Sans contact (torsion / sprint)'}
- Douleur EVA : Repos ${patientData.pain.atRest}/10 | Course ${patientData.pain.moving}/10 | Geste technique ${patientData.pain.atAction}/10
- Signes d'alerte : Craquement audible POP : ${patientData.pop === 'yes' ? 'OUI' : 'Non'} | Gonflement : ${patientData.swelling} | Instabilité : ${patientData.instability === 'yes' ? 'OUI' : 'Non'}

2. EXAMEN CLINIQUE GUIDÉ FIFA :
${regionConfig.tests.map(test => `- ${test.nameFr} : ${testResults[test.id] || 'Non testé'}`).join('\n')}

3. DIAGNOSTIC PRINCIPAL RETENU :
★ ${pathologyObj.nameFr} (Indice de confiance FIFA : ${confidence}%)
Rationale : ${pathologyObj.technicalRationaleFr}
Diagnostics différentiels : ${diffs.join(', ')}

4. RECOMMANDATIONS IMAGERIE MÉDICALE :
- RADIOGRAPHIE : ${imaging.radiography.required ? 'OUI (' + imaging.radiography.urgency + ')' : 'NON INDIQUÉE'}
  Incidences : ${imaging.radiography.viewsFr}
- ÉCHOGRAPHIE : ${imaging.ultrasound.required ? 'OUI (' + imaging.ultrasound.delayFr + ')' : 'NON INDIQUÉE'}
  Objectif : ${imaging.ultrasound.rationaleFr}
- IRM : ${imaging.mri.required ? 'OUI (' + imaging.mri.urgency + ')' : 'NON'}
  Protocole : ${imaging.mri.protocolFr}

Protocole initial : R.I.C.E. / P.E.A.C.E. & L.O.V.E. Décharge adaptée.
Validation Staff : Seif Chaouch (Kiné) & Dr. Malek Masri (Médecin)`;
  };

  const playerReportText = generatePlayerReport();
  const staffReportText = generateStaffReport();

  const handleCopyPlayer = () => {
    navigator.clipboard.writeText(playerReportText);
    setCopiedPlayer(true);
    setTimeout(() => setCopiedPlayer(false), 3000);
  };

  const handleCopyStaff = () => {
    navigator.clipboard.writeText(staffReportText);
    setCopiedStaff(true);
    setTimeout(() => setCopiedStaff(false), 3000);
  };

  const handleSendWhatsAppPlayer = () => {
    let cleanPhone = (playerPhone || '').replace(/\D/g, '');
    if (cleanPhone.length === 8) {
      cleanPhone = `216${cleanPhone}`;
    }

    const encoded = encodeURIComponent(playerReportText);
    const waUrl = cleanPhone 
      ? `https://wa.me/${cleanPhone}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;

    window.open(waUrl, '_blank');
  };

  const handleShareWhatsAppStaff = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(staffReportText)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto print:p-0">
      {/* MS MedicalDiag Validation Staff Banner */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-md">
            🩺
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">MS MedicalDiag</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                FIFA MEDICAL
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {lang === 'tn'
                ? 'الإطار الطبي المشرف : سيف الشاوش (أخصائي علاج طبيعي) • د. مالك المصري (طبيب الطب الرياضي)'
                : 'Staff Médical Référent : Seif Chaouch (Kinésithérapeute) • Dr. Malek Masri (Médecin)'}
            </p>
          </div>
        </div>
      </div>

      {/* 1. TOP HIGHLIGHTED ACTION: ENVOYER LE DIAGNOSTIC VULGARISÉ AU JOUEUR EN ARABE TUNISIEN */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-500/30">
              💬
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black tracking-wide mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'tn' ? 'المرحلة 4 : الإرسال للملاعبي' : 'Étape 4 : Envoi au Joueur'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {t.sendDiagToPlayerTitle}
              </h2>
            </div>
          </div>
        </div>

        {/* Player Phone Input & Send WhatsApp Button */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/30">
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              {t.playerPhoneLabel}
            </label>
            <input
              type="text"
              value={playerPhone}
              onChange={(e) => setPlayerPhone(e.target.value)}
              placeholder="Ex: 98123456 (optionnel)"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="sm:col-span-7 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleSendWhatsAppPlayer}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/30"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendDiagToPlayerBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyPlayer}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all border border-slate-700"
            >
              {copiedPlayer ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{t.copiedDiagPlayer}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'tn' ? 'أنسخ بالتونسي' : 'Copier'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tunisian Derja Message Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
            <span>Aperçu du message WhatsApp en Derja que recevra le joueur :</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line max-h-56 overflow-y-auto">
            {playerReportText}
          </div>
        </div>
      </div>

      {/* 2. RED FLAGS BANNER (IF ANY) */}
      {triggeredRedFlags.length > 0 ? (
        <div className="bg-rose-950/40 border-2 border-rose-500 rounded-3xl p-5 shadow-2xl space-y-3 animate-pulse">
          <div className="flex items-center gap-2.5 text-rose-400">
            <AlertOctagon className="w-6 h-6 text-rose-500" />
            <h3 className="text-base sm:text-lg font-black tracking-wide uppercase">
              {t.redFlagsTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-rose-200 font-semibold">
            {t.redFlagsWarning}
          </p>

          <div className="space-y-2 pt-1">
            {triggeredRedFlags.map((rf, idx) => (
              <div key={idx} className="bg-rose-900/40 border border-rose-500/50 p-3.5 rounded-2xl text-xs sm:text-sm">
                <div className="font-bold text-white mb-0.5">
                  ⚠️ {lang === 'tn' ? rf.titleAr : rf.titleFr}
                </div>
                <div className="text-rose-200">
                  {lang === 'tn' ? rf.detailAr : rf.detailFr}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm text-emerald-300 font-semibold">
            {t.noRedFlags}
          </span>
        </div>
      )}

      {/* 3. MAIN DIAGNOSIS CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
              FIFA Medical Diploma Classification
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {pathologyObj.nameFr}
            </h2>
            <h3 className="text-sm sm:text-base font-semibold text-slate-300 mt-1">
              {pathologyObj.nameAr}
            </h3>
          </div>

          {/* Confidence Score Pill */}
          <div className="bg-slate-950 border border-slate-700/80 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                {t.confidenceScore}
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                {confidence}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Medical Staff Rationale */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs sm:text-sm">
          <div className="font-bold text-slate-300 flex items-center gap-1.5 text-xs text-slate-400">
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <span>Argumentaire clinique FIFA (Mécanisme + Concordance Tests) :</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {pathologyObj.technicalRationaleFr}
          </p>
        </div>

        {/* Differential Diagnoses */}
        {diffs.length > 0 && (
          <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {t.differentials}
            </span>
            <ul className="text-xs text-slate-300 space-y-1">
              {diffs.map((d, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 4. MEDICAL IMAGING DECISION TREE (RADIO, ECHO, IRM) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              {t.imagingTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'tn'
                ? 'وقتاش وشنوة تطلب بالضبط حسب بروتوكول الفيفا'
                : 'Indications, délais optimaux et incidences spécifiques selon les guides officiels FIFA'}
            </p>
          </div>
          <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono font-bold">
            F-MARC Consensus
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* RADIOGRAPHY CARD */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
            imaging.radiography.required
              ? 'bg-slate-950 border-amber-500/40 shadow-lg'
              : 'bg-slate-950/40 border-slate-800 opacity-80'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-400" />
                  {t.radiography}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                  imaging.radiography.required
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {imaging.radiography.required ? 'INDIQUÉE' : 'NON REQUISE'}
                </span>
              </div>

              <div className="text-xs font-bold text-white mb-1">
                {imaging.radiography.urgency}
              </div>

              <div className="text-xs text-slate-300 font-semibold mb-2">
                Incidences : <span className="text-amber-200">{imaging.radiography.viewsFr}</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {imaging.radiography.rationaleFr}
              </p>
            </div>
          </div>

          {/* ULTRASOUND CARD */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
            imaging.ultrasound.required
              ? 'bg-slate-950 border-blue-500/40 shadow-lg'
              : 'bg-slate-950/40 border-slate-800 opacity-80'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-blue-400" />
                  {t.ultrasound}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                  imaging.ultrasound.required
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {imaging.ultrasound.required ? 'INDIQUÉE' : 'NON CONTRIBUTIVE'}
                </span>
              </div>

              <div className="text-xs font-bold text-white mb-1">
                {imaging.ultrasound.delayFr}
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {imaging.ultrasound.rationaleFr}
              </p>
            </div>
          </div>

          {/* MRI CARD */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
            imaging.mri.required
              ? 'bg-slate-950 border-emerald-500/40 shadow-lg ring-1 ring-emerald-500/20'
              : 'bg-slate-950/40 border-slate-800 opacity-80'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Disc className="w-4 h-4 text-emerald-400" />
                  {t.mri}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                  imaging.mri.required
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {imaging.mri.required ? 'GOLD STANDARD' : 'OPTIONNELLE'}
                </span>
              </div>

              <div className="text-xs font-bold text-emerald-300 mb-1">
                {imaging.mri.urgency}
              </div>

              <div className="text-xs text-slate-300 font-semibold mb-2">
                Protocole : <span className="text-emerald-200">{imaging.mri.protocolFr}</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {imaging.mri.rationaleFr}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. STAFF MEDICAL REPORT IN FRENCH */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>{t.staffReportBox}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsAppStaff}
              className="text-xs bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp Staff</span>
            </button>
            <button
              type="button"
              onClick={handleCopyStaff}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all border border-slate-700"
            >
              {copiedStaff ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedStaff ? 'Copié !' : 'Copier'}</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line border border-slate-800 max-h-60 overflow-y-auto">
          {staffReportText}
        </div>
      </div>

      {/* 6. ACTION BUTTONS: PRINT & RESET */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        <button
          type="button"
          onClick={handlePrint}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all shadow-md"
        >
          <Printer className="w-4 h-4 text-slate-300" />
          <span>{t.printReport}</span>
        </button>

        <button
          type="button"
          onClick={onResetExam}
          className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 border border-rose-500/40 transition-all shadow-md"
        >
          <RotateCcw className="w-4 h-4 text-rose-400" />
          <span>{t.resetExam}</span>
        </button>
      </div>
    </div>
  );
};
