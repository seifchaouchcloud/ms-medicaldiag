import React, { useState, useEffect } from 'react';
import { BodyChart } from './BodyChart';
import { PainScale } from './PainScale';
import { translations } from '../data/translations';
import { REGIONS_DATA } from '../data/fifaData';
import { apiService } from '../services/apiService';
import { 
  Send, 
  Copy, 
  Check, 
  User, 
  Shield, 
  Calendar, 
  HelpCircle, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const PlayerModule = ({ 
  patientData, 
  setPatientData, 
  onSaveAndProceedToKine, 
  isPlayerOnlyMode = false,
  lang 
}) => {
  const t = translations[lang] || translations.fr;
  const isRtl = lang === 'tn';

  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: Info, 2: Body, 3: Pain & Anamnesis, 4: WhatsApp

  const updateField = (field, value) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePain = (key, value) => {
    setPatientData((prev) => ({
      ...prev,
      pain: {
        ...prev.pain,
        [key]: value,
      },
    }));
  };

  // Generate encoded diagnostic code and readable text for WhatsApp
  const generateWhatsAppMessage = () => {
    const regionObj = REGIONS_DATA[patientData.region] || {};
    const regionName = lang === 'tn' ? regionObj.nameAr : regionObj.nameFr;
    const subzoneObj = regionObj.subzones?.find((s) => s.id === patientData.subzone);
    const subzoneName = subzoneObj ? (lang === 'tn' ? subzoneObj.labelAr : subzoneObj.labelFr) : 'Générale';

    // JSON payload
    const payload = {
      name: patientData.name || 'Anonyme',
      club: patientData.club || 'Club Pro',
      position: patientData.position || 'all',
      timing: patientData.timing || 'match',
      region: patientData.region || 'genou',
      subzone: patientData.subzone || '',
      phone: patientData.phone || '',
      pain: patientData.pain || { atRest: 2, moving: 6, atAction: 8 },
      mechanism: patientData.mechanism || 'non_contact',
      pop: patientData.pop || 'no',
      instability: patientData.instability || 'no',
      block: patientData.block || 'no',
      swelling: patientData.swelling || 'immediate',
      playable: patientData.playable || 'no',
      nerve: patientData.nerve || 'no',
      date: new Date().toISOString(),
    };

    let encodedCode = '';
    try {
      encodedCode = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    } catch {
      encodedCode = btoa(JSON.stringify(payload));
    }

    const message = 
`⚽ *إجابات الملاعبي / FICHE JOUEUR - MS MedicalDiag*
🩺 *Staff Médical : Seif Chaouch (Kiné) • Dr. Malek Masri (Médecin)*
👤 *الملاعبي / Joueur :* ${patientData.name || 'Médiate'} (${patientData.club || 'Club'})
📍 *المفصل / Région :* ${regionName} (${subzoneName})
⚡ *قوة الوجعة / Douleur EVA :* في الراحة ${patientData.pain.atRest}/10 | في المشي ${patientData.pain.moving}/10 | في الشوط واللعب ${patientData.pain.atAction}/10
⏱️ *الوقت / Moment :* ${t.timings[patientData.timing] || patientData.timing}
💢 *كيفاش صارت / Mécanisme :* ${patientData.mechanism === 'contact' ? 'كونتاكت مع ملاعبي' : patientData.mechanism === 'non_contact' ? 'وحدي من غير كونتاكت (دورة/سبرينت)' : 'بشوية بشوية'}
💥 *طرطقة / POP audible :* ${patientData.pop === 'yes' ? 'إي، سمعت طرطقة قوية (OUI)' : 'لا (Non)'}
🌊 *تنفخت / Gonflement :* ${patientData.swelling === 'immediate' ? 'في ساعتها فيسع < ساعتين (Hémarthrose)' : patientData.swelling === 'delayed' ? 'من غدوة الصباح (24h)' : 'ما تنفختش'}
🔄 *تفلت / Instabilité :* ${patientData.instability === 'yes' ? 'إي، المفصل فلت وماهوش شادد روحو (OUI)' : 'لا'}
🛑 *تبلوكات / Blocage :* ${patientData.block === 'yes' ? 'إي، تبلوكات وما تسرحش (OUI)' : 'لا'}
🏃 *جمّعت تكمل اللعب :* ${patientData.playable === 'yes' ? 'إي كملت لعبت شوية' : 'لا، خرجت طول (Sortie directe)'}
⚡ *تنميل وضو / Signes nerveux :* ${patientData.nerve === 'yes' ? 'إي، فما تنميل وضو يضرب' : 'لا'}

[CODE_FIFA:${encodedCode}]
(Collez ce message dans l'application MS MedicalDiag pour charger instantanément les tests cliniques)`;

    return { message, encodedCode };
  };

  const { message: waMessage, encodedCode } = generateWhatsAppMessage();

  // Automatically save to the SQLite database when reaching step 4 (Envoi)
  useEffect(() => {
    if (activeStep === 4) {
      apiService.createSubmission({
        name: patientData.name || 'Anonyme',
        club: patientData.club || 'Club Pro',
        position: patientData.position || 'winger',
        timing: patientData.timing || 'match',
        region: patientData.region || 'genou',
        subzone: patientData.subzone || '',
        phone: patientData.phone || '',
        pain: patientData.pain || { atRest: 2, moving: 6, atAction: 8 },
        mechanism: patientData.mechanism || 'non_contact',
        pop: patientData.pop || 'no',
        instability: patientData.instability || 'no',
        block: patientData.block || 'no',
        swelling: patientData.swelling || 'immediate',
        playable: patientData.playable || 'no',
        nerve: patientData.nerve || 'no',
        source: 'player_web_link',
      });
    }
  }, [activeStep]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(waMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* MS MedicalDiag Staff Badge */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-emerald-400">MS MedicalDiag</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-300 font-semibold">
            {lang === 'tn' ? 'استبيان طبي رسمي تحت إشراف :' : 'Questionnaire officiel supervisé par :'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-lg border border-emerald-800/60">
            Seif Chaouch <span className="text-[10px] text-slate-400 font-normal">({lang === 'tn' ? 'كيني' : 'Kiné'})</span>
          </span>
          <span className="text-teal-300 bg-teal-950/70 px-2.5 py-0.5 rounded-lg border border-teal-800/60">
            Dr. Malek Masri <span className="text-[10px] text-slate-400 font-normal">({lang === 'tn' ? 'طبيب' : 'Médecin'})</span>
          </span>
        </div>
      </div>

      {/* Steps Progress Tabs */}
      <div className="grid grid-cols-4 gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
        {[
          { num: 1, labelFr: "1. Identité", labelAr: "1. الملاعبي" },
          { num: 2, labelFr: "2. Zone", labelAr: "2. البلاصة" },
          { num: 3, labelFr: "3. Symptômes", labelAr: "3. الوجعة" },
          { num: 4, labelFr: "4. Envoi", labelAr: "4. الإرسال" },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setActiveStep(s.num)}
            className={`py-2 px-1 text-center rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeStep === s.num
                ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {lang === 'tn' ? s.labelAr : s.labelFr}
          </button>
        ))}
      </div>

      {/* STEP 1: IDENTITY & CONTEXT */}
      {activeStep === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              {t.playerIdentityTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'tn' 
                ? 'عمر معلومات الملاعبي ووقت الضربة باش الطبيب يفهم السياق' 
                : 'Renseignez l\'identité du joueur et le contexte de survenue'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Player Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.playerNameLabel}
              </label>
              <input
                type="text"
                value={patientData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder={t.playerNamePlaceholder}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            {/* Club */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.clubLabel}
              </label>
              <input
                type="text"
                value={patientData.club}
                onChange={(e) => updateField('club', e.target.value)}
                placeholder={t.clubPlaceholder}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.positionLabel}
              </label>
              <select
                value={patientData.position}
                onChange={(e) => updateField('position', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                {Object.entries(t.positions).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Timing */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.timingLabel}
              </label>
              <select
                value={patientData.timing}
                onChange={(e) => updateField('timing', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                {Object.entries(t.timings).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg"
            >
              <span>{lang === 'tn' ? 'تعدى للمخطط الجسدي' : 'Étape suivante : Localisation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: BODY CHART */}
      {activeStep === 2 && (
        <div className="space-y-4">
          <BodyChart
            selectedRegion={patientData.region}
            selectedSubzone={patientData.subzone}
            onSelectRegion={(reg) => updateField('region', reg)}
            onSelectSubzone={(sub) => updateField('subzone', sub)}
            lang={lang}
          />

          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="text-slate-400 hover:text-white text-sm font-semibold"
            >
              ← {lang === 'tn' ? 'رجوع' : 'Retour'}
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2 rounded-xl flex items-center gap-2 transition-all"
            >
              <span>{lang === 'tn' ? 'تعدى لأسئلة الوجعة' : 'Étape suivante : Symptômes'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PAIN SCALE & ANAMNESIS */}
      {activeStep === 3 && (
        <div className="space-y-6">
          {/* EVA Pain Scale */}
          <PainScale
            painValues={patientData.pain}
            onChangePain={updatePain}
            lang={lang}
          />

          {/* Football Anamnesis Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                {t.anamnesisTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {lang === 'tn'
                  ? 'أسئلة حاسمة حسب بروتوكول الـ FIFA لتحديد خطورة الإصابة'
                  : 'Questions clés selon les critères officiels du FIFA Medical Diploma'}
              </p>
            </div>

            {/* Q1: Mechanism */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-white">
                1. {t.mechanismQuestion}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'contact', label: t.mechanismContact, icon: '💥' },
                  { id: 'non_contact', label: t.mechanismNonContact, icon: '🏃' },
                  { id: 'overuse', label: t.mechanismOveruse, icon: '⏳' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateField('mechanism', item.id)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all ${
                      patientData.mechanism === item.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-base mr-1.5">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Pop / Craquement */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="block text-sm font-bold text-white">
                2. {t.popQuestion}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('pop', 'yes')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.pop === 'yes'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-1 ring-rose-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  🔊 {t.popYes}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('pop', 'no')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.pop === 'no'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  🔇 {t.popNo}
                </button>
              </div>
            </div>

            {/* Q3: Instability / Teflet */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="block text-sm font-bold text-white">
                3. {t.instabilityQuestion}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('instability', 'yes')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.instability === 'yes'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold ring-1 ring-amber-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  ⚠️ {t.instabilityYes}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('instability', 'no')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.instability === 'no'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  🛡️ {t.instabilityNo}
                </button>
              </div>
            </div>

            {/* Q4: Swelling */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="block text-sm font-bold text-white">
                4. {t.swellingQuestion}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'immediate', label: t.swellingImmediate, alert: true },
                  { id: 'delayed', label: t.swellingDelayed, alert: false },
                  { id: 'none', label: t.swellingNone, alert: false },
                ].map((sw) => (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => updateField('swelling', sw.id)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all ${
                      patientData.swelling === sw.id
                        ? sw.alert
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-1 ring-rose-500'
                          : 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {sw.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q5: Playable / Sortie */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="block text-sm font-bold text-white">
                5. {t.playableQuestion}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('playable', 'no')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.playable === 'no'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-1 ring-rose-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  🚑 {t.playableNo}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('playable', 'yes')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.playable === 'yes'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  ⚽ {t.playableYes}
                </button>
              </div>
            </div>

            {/* Q6: Nerve / Tanmil */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="block text-sm font-bold text-white">
                6. {t.nerveQuestion}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('nerve', 'yes')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.nerve === 'yes'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold ring-1 ring-amber-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  ⚡ {t.nerveYes}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('nerve', 'no')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    patientData.nerve === 'no'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  🛡️ {t.nerveNo}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="text-slate-400 hover:text-white text-sm font-semibold"
            >
              ← {lang === 'tn' ? 'رجوع' : 'Retour'}
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(4)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>{t.generateSummary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: WHATSAPP GENERATOR & SEAMLESS TRANSITION */}
      {activeStep === 4 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
                {t.whatsappTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {lang === 'tn'
                  ? 'الميساج فيه الكود المشفر [CODE_FIFA] اللي الكيني باش ينسخو في تطبيقتو'
                  : 'Message prêt avec le code encodé [CODE_FIFA] pour chargement instantané'}
              </p>
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-line leading-relaxed overflow-x-auto max-h-72">
            {waMessage}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-emerald-500/30"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendToKineWhatsApp}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{t.copiedSuccess}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyMessage}</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Action Card */}
          {!isPlayerOnlyMode ? (
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-950/20 p-4 rounded-xl border border-emerald-800/40">
              <div>
                <div className="text-sm font-bold text-white">
                  {lang === 'tn' ? 'أنت الكيني اللي تفحص في الملاعبي مباشرة؟' : 'Vous êtes le kiné au bord du terrain ?'}
                </div>
                <div className="text-xs text-slate-400">
                  {lang === 'tn' 
                    ? 'انزل هوني باش تتعدى طول للفحص السريري من غير ما تنسخ شي' 
                    : 'Passez directement aux tests cliniques sans passer par WhatsApp'}
                </div>
              </div>

              <button
                type="button"
                onClick={onSaveAndProceedToKine}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{lang === 'tn' ? 'تعدى لفحص الكيني طول' : 'Passer à l\'examen Kiné'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 bg-emerald-950/30 p-4 rounded-2xl border border-emerald-500/40 text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-sm sm:text-base">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{lang === 'tn' ? '✅ تم تسجيل إجاباتك بنجاح في قاعدة بيانات MS MedicalDiag !' : '✅ Vos réponses ont été enregistrées avec succès !'}</span>
              </div>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                {lang === 'tn'
                  ? 'انزل ع الزر الأخضر الفوقاني "ابعث للكيني ع الواتساب" باش سيف الشاوش والدكتور مالك المصري يوصلهم الميساج ويبداو يحضرولك الفحص والتصاور.'
                  : 'Cliquez sur le bouton vert "Envoyer au Kiné sur WhatsApp" ci-dessus pour notifier Seif Chaouch et le Dr. Malek Masri.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
