import React, { useState } from 'react';
import { REGIONS_DATA } from '../data/fifaData';
import { translations } from '../data/translations';
import { apiService } from '../services/apiService';
import { 
  ClipboardPaste, 
  CheckCircle, 
  AlertTriangle, 
  Activity, 
  HelpCircle, 
  Stethoscope, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  UserCheck, 
  Smartphone, 
  Send, 
  Edit3, 
  Flame, 
  Clock, 
  Sparkles, 
  ExternalLink,
  Inbox
} from 'lucide-react';

export const KineModule = ({ 
  patientData, 
  setPatientData, 
  testResults, 
  setTestResults, 
  ottawaResults, 
  setOttawaResults, 
  onLaunchDiagnosis,
  onOpenSendModal,
  onDirectPlayerFill,
  onOpenInbox,
  recentSubmissions = [],
  onQuickLoadSubmission,
  lang 
}) => {
  const t = translations[lang] || translations.fr;
  const isRtl = lang === 'tn';

  const [pasteInput, setPasteInput] = useState('');
  const [decodeMessage, setDecodeMessage] = useState(null);

  // Decode WhatsApp Message / CODE_FIFA
  const handleDecodeInput = () => {
    try {
      let rawCode = '';
      if (pasteInput.includes('[CODE_FIFA:')) {
        const match = pasteInput.match(/\[CODE_FIFA:(.*?)\]/);
        if (match && match[1]) {
          rawCode = match[1].trim();
        }
      } else {
        rawCode = pasteInput.trim();
      }

      if (!rawCode) {
        setDecodeMessage({ type: 'error', text: t.errorDecoding });
        return;
      }

      let jsonStr = '';
      try {
        jsonStr = decodeURIComponent(escape(atob(rawCode)));
      } catch {
        jsonStr = atob(rawCode);
      }

      const parsed = JSON.parse(jsonStr);

      setPatientData((prev) => ({
        ...prev,
        name: parsed.name || prev.name,
        club: parsed.club || prev.club,
        position: parsed.position || prev.position,
        timing: parsed.timing || prev.timing,
        region: parsed.region || prev.region,
        subzone: parsed.subzone || prev.subzone,
        pain: parsed.pain || prev.pain,
        mechanism: parsed.mechanism || prev.mechanism,
        pop: parsed.pop || prev.pop,
        instability: parsed.instability || prev.instability,
        block: parsed.block || prev.block,
        swelling: parsed.swelling || prev.swelling,
        playable: parsed.playable || prev.playable,
        nerve: parsed.nerve || prev.nerve,
        phone: parsed.phone || prev.phone || '',
      }));

      // Automatically persist decoded WhatsApp import to the SQLite database
      apiService.createSubmission({
        name: parsed.name || 'Joueur',
        club: parsed.club || '',
        position: parsed.position || 'winger',
        timing: parsed.timing || 'match',
        region: parsed.region || 'genou',
        subzone: parsed.subzone || '',
        phone: parsed.phone || '',
        pain: parsed.pain || { atRest: 2, moving: 6, atAction: 8 },
        mechanism: parsed.mechanism || 'non_contact',
        pop: parsed.pop || 'no',
        instability: parsed.instability || 'no',
        block: parsed.block || 'no',
        swelling: parsed.swelling || 'immediate',
        playable: parsed.playable || 'no',
        nerve: parsed.nerve || 'no',
        source: 'whatsapp_import',
      });

      setDecodeMessage({ type: 'success', text: t.decodedSuccess });
      setTimeout(() => setDecodeMessage(null), 4000);
    } catch (err) {
      console.error(err);
      setDecodeMessage({ type: 'error', text: t.errorDecoding });
    }
  };

  const currentRegion = patientData.region || 'genou';
  const regionConfig = REGIONS_DATA[currentRegion] || REGIONS_DATA.genou;

  // Handle clinical test status update
  const setTestStatus = (testId, status) => {
    setTestResults((prev) => ({
      ...prev,
      [testId]: status,
    }));
  };

  // Handle Ottawa item toggle
  const toggleOttawaItem = (itemId) => {
    setOttawaResults((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* MS MedicalDiag Staff Header Bar */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-md">
            🩺
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">MS MedicalDiag</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                ESPACE CLINIQUE
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {lang === 'tn'
                ? 'عيادة الفحص السريري : سيف الشاوش (كيني) • د. مالك المصري (طبيب)'
                : 'Console d\'Examen Clinique : Seif Chaouch (Kiné) • Dr. Malek Masri (Médecin)'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
            FIFA Diploma Medical Assessment
          </span>
        </div>
      </div>

      {/* 1. TOP ACTION: ENVOYER LE QUESTIONNAIRE AU JOUEUR VIA WHATSAPP */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'tn' ? 'المرحلة 1 : استبيان الملاعبي' : 'Étape 1 : Questionnaire Joueur'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {lang === 'tn' ? 'ابعث الاستبيان للملاعبي ع الواتساب' : 'Envoyer le Questionnaire au Joueur sur WhatsApp'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'tn'
                ? 'الملاعبي يحل الرابط في تيلفونو، يجاوب في دقيقتين بالتونسي (Body Chart، الوجعة، الطرطقة...) ويبعثلك الإجابات حاضرة.'
                : 'Le joueur ouvre le lien sur son smartphone, remplit la zone exacte et les symptômes en Derja tunisienne en 2 min, puis vous renvoie ses réponses.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenSendModal}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-5 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/30"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'tn' ? 'ابعث ع الواتساب' : 'Envoyer sur WhatsApp'}</span>
            </button>

            <a
              href="?mode=joueur"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all border border-emerald-500/40 shadow-sm"
              title="Ouvrir directement le questionnaire joueur dans un nouvel onglet"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'tn' ? 'حل رابط الملاعبي ↗' : 'Tester le lien Joueur ↗'}</span>
            </a>

            <button
              type="button"
              onClick={onDirectPlayerFill}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-all border border-slate-700"
              title="Remplir directement ici si le joueur est présent au cabinet"
            >
              <Edit3 className="w-4 h-4 text-slate-400" />
              <span>{lang === 'tn' ? 'فحص مباشر' : 'Remplir ici'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. RÉCEPTION & DÉCODAGE DU RETOUR WHATSAPP */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <ClipboardPaste className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {lang === 'tn' ? 'المرحلة 2 : حط كود / ميساج الملاعبي' : 'Étape 2 : Coller le Retour WhatsApp du Joueur'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'tn'
                ? 'انسخ الميساج اللي بعثهولك الملاعبي عالواتساب وحطو هوني، التطبيقة تطلع كل شي أوتوماتيكيا'
                : 'Dès que le joueur vous renvoie son message, collez-le ici pour charger instantanément son anamnèse et pré-sélectionner l\'articulation.'}
            </p>
          </div>
        </div>

        {/* Quick Incoming Submissions Strip from SQLite Database */}
        {recentSubmissions && recentSubmissions.length > 0 && (
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Inbox className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'tn' ? 'آخر استبيانات واصلة في الوقت الفعلي :' : 'Bilans reçus en direct dans la base :'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {recentSubmissions.slice(0, 3).map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => onQuickLoadSubmission(sub)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-emerald-300 border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
                  title="Charger ce joueur instantanément"
                >
                  <span>{sub.player_name || 'Joueur'}</span>
                  <span className="text-[10px] text-slate-400">({sub.region})</span>
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </button>
              ))}

              <button
                type="button"
                onClick={onOpenInbox}
                className="text-xs text-slate-400 hover:text-white underline font-semibold ml-1 transition-all"
              >
                {lang === 'tn' ? `الكل (${recentSubmissions.length}) →` : `Voir tout (${recentSubmissions.length}) →`}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <textarea
            rows={2}
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            placeholder={t.pastePlaceholder}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleDecodeInput}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{t.decodeButton}</span>
            </button>

            {decodeMessage && (
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                  decodeMessage.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {decodeMessage.text}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. SYNTHÈSE ANAMNÈSE DU JOUEUR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                {t.playerSummaryCard} : <span className="text-emerald-400">{patientData.name || 'Joueur Pro'}</span>
              </h3>
              <span className="text-xs text-slate-400">
                {patientData.club || 'Club'} • {t.positions[patientData.position] || patientData.position}
                {patientData.phone && ` • 📱 ${patientData.phone}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">{t.suspectedRegion}</span>
            <select
              value={patientData.region}
              onChange={(e) => setPatientData((p) => ({ ...p, region: e.target.value, subzone: '' }))}
              className="bg-slate-950 border border-slate-700 text-emerald-400 font-bold text-xs sm:text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              {Object.values(REGIONS_DATA).map((r) => (
                <option key={r.id} value={r.id}>
                  {lang === 'tn' ? r.nameAr : r.nameFr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Anamnesis Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">Douleur EVA (Repos / Marche / Geste)</span>
            <span className="font-black text-amber-400 text-sm">
              {patientData.pain.atRest} / {patientData.pain.moving} / {patientData.pain.atAction} <span className="text-[10px] text-slate-500">/10</span>
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">Mécanisme</span>
            <span className={`font-bold block ${patientData.mechanism === 'contact' ? 'text-amber-400' : 'text-blue-400'}`}>
              {patientData.mechanism === 'contact' ? 'Contact direct' : 'Sans contact (torsion)'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">POP & Instabilité</span>
            <span className={`font-bold block ${patientData.pop === 'yes' ? 'text-rose-400' : 'text-slate-400'}`}>
              {patientData.pop === 'yes' ? 'POP audible 🔊' : 'Pas de POP'}
              {patientData.instability === 'yes' && ' • Déboîtement'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">Gonflement</span>
            <span className={`font-bold block ${patientData.swelling === 'immediate' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {patientData.swelling === 'immediate' ? 'Immédiat < 2h (Hémarthrose)' : 'Retardé / Aucun'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. OTTAWA RULES CHECKLIST (If Cheville) */}
      {currentRegion === 'cheville' && regionConfig.ottawaRules && (
        <div className="bg-amber-950/20 border border-amber-600/40 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
            <h4 className="text-sm sm:text-base font-bold text-amber-300">
              {t.ottawaChecklistTitle}
            </h4>
          </div>
          <p className="text-xs text-amber-200/80">
            {lang === 'tn'
              ? 'إذا فما نقطة واحدة إيجابية من هضوما = راديو إجباري حسب الفيفا لاستبعاد كسر عظم'
              : 'Recommandation formelle FIFA : 1 seul critère positif impose la réalisation d\'une radiographie standard pour exclure une fracture.'}
          </p>

          <div className="space-y-2 pt-1">
            {regionConfig.ottawaRules.map((rule) => {
              const isChecked = !!ottawaResults[rule.id];
              return (
                <button
                  key={rule.id}
                  type="button"
                  onClick={() => toggleOttawaItem(rule.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-start gap-2.5 border ${
                    isChecked
                      ? 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                    isChecked ? 'bg-rose-500 border-rose-400 text-white' : 'border-slate-600'
                  }`}>
                    {isChecked && '✓'}
                  </div>
                  <span className="leading-snug">
                    {lang === 'tn' ? rule.labelAr : rule.labelFr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. FIFA GUIDED CLINICAL TESTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'tn' ? 'المرحلة 3 : الفحص السريري الدقيق للـ FIFA' : 'Étape 3 : Tests Cliniques FIFA'} : </span>
              <span className="text-emerald-400">{lang === 'tn' ? regionConfig.nameAr : regionConfig.nameFr}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.fifaTestsSubtitle}
            </p>
          </div>

          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
            FIFA Diploma Standards
          </span>
        </div>

        {/* Tests List */}
        <div className="space-y-6">
          {regionConfig.tests.map((test, idx) => {
            const currentStatus = testResults[test.id] || null;

            return (
              <div
                key={test.id}
                className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 transition-all hover:border-slate-700"
              >
                {/* Test Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 mr-2 font-bold">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-white">
                      {lang === 'tn' ? test.nameAr : test.nameFr}
                    </span>
                    <span className="block text-xs text-slate-400 font-semibold mt-0.5">
                      Cible anatomique : <span className="text-slate-300">{test.target}</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
                    {test.stats}
                  </span>
                </div>

                {/* FIFA Realization Guide */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <div className="font-semibold text-slate-400 mb-1 flex items-center gap-1.5 text-[11px]">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    <span>Technique de réalisation (FIFA Medical Assessment) :</span>
                  </div>
                  {test.techniqueFr}
                </div>

                {/* Spoken Tunisian Derja prompt for the player */}
                <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40 text-xs text-emerald-200">
                  <div className="font-bold text-emerald-400 mb-1 text-[11px] flex items-center gap-1.5">
                    <span>🗣️</span>
                    <span>{t.sayToPlayerDerja}</span>
                  </div>
                  <p className="font-semibold text-emerald-100 text-sm">
                    "{test.instructionDerja}"
                  </p>
                </div>

                {/* 4 Large Tactile Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {/* Positif */}
                  <button
                    type="button"
                    onClick={() => setTestStatus(test.id, 'positive')}
                    className={`py-3 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center gap-1 border ${
                      currentStatus === 'positive'
                        ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-base font-bold">+</span>
                    <span>{t.testResults.positive}</span>
                  </button>

                  {/* Négatif */}
                  <button
                    type="button"
                    onClick={() => setTestStatus(test.id, 'negative')}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border ${
                      currentStatus === 'negative'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-base font-bold">-</span>
                    <span>{t.testResults.negative}</span>
                  </button>

                  {/* Douleur seule */}
                  <button
                    type="button"
                    onClick={() => setTestStatus(test.id, 'painOnly')}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border ${
                      currentStatus === 'painOnly'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30 scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-base font-bold">⚡</span>
                    <span>{t.testResults.painOnly}</span>
                  </button>

                  {/* Non réalisable */}
                  <button
                    type="button"
                    onClick={() => setTestStatus(test.id, 'notFeasible')}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border ${
                      currentStatus === 'notFeasible'
                        ? 'bg-slate-700 text-slate-200 border-slate-500 shadow-md scale-[1.02]'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-base font-bold">🚫</span>
                    <span>{t.testResults.notFeasible}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Launch Diagnosis & Imaging CTA */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onLaunchDiagnosis}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-8 py-4 rounded-2xl text-sm sm:text-base transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            <span>{t.launchDiagnosis}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
