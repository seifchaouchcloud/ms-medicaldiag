import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { 
  X, 
  Send, 
  Copy, 
  Check, 
  Smartphone, 
  ExternalLink, 
  Globe, 
  Wifi, 
  Laptop, 
  Edit3,
  Link as LinkIcon
} from 'lucide-react';

export const SendQuestionnaireModal = ({ 
  isOpen, 
  onClose, 
  playerName, 
  setPlayerName,
  playerPhone,
  setPlayerPhone,
  onFillDirectly,
  lang 
}) => {
  if (!isOpen) return null;

  const t = translations[lang] || translations.fr;
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Detect current hostname and build URL choices
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4173';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  
  // Local network IP for mobile cross-device WhatsApp access (detected from machine)
  const localNetworkIp = '192.168.100.6';
  const port = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : ':4173';
  const networkOrigin = `http://${localNetworkIp}${port}`;

  // URL mode: 'auto' (network IP if on localhost), 'localhost', or 'custom'
  const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const defaultMode = isLocalHost ? 'network' : 'current';
  
  const [urlMode, setUrlMode] = useState(defaultMode);
  const [customBaseUrl, setCustomBaseUrl] = useState('');

  // Active clickable player URL
  let activeBase = currentOrigin;
  if (urlMode === 'network') {
    activeBase = networkOrigin;
  } else if (urlMode === 'localhost') {
    activeBase = `http://localhost${port}`;
  } else if (urlMode === 'custom' && customBaseUrl.trim()) {
    activeBase = customBaseUrl.trim().replace(/\/$/, '');
  }

  const playerUrl = `${activeBase}${currentPath.endsWith('/') ? currentPath : currentPath + '/'}?mode=joueur`.replace(/([^:]\/)\/+/g, '$1');

  // Format WhatsApp message with CLEAN ISOLATED LINK for 100% clickability on WhatsApp
  const getInviteMessage = () => {
    const targetName = playerName.trim() || (lang === 'tn' ? 'كابتن' : 'Joueur');

    if (lang === 'tn') {
      return `⚽ عسلامة يا ${targetName} !
معاك سيف الشاوش (الكيني) والدكتور مالك المصري - تطبيق MS MedicalDiag.
باش نعرفو بالضبط نوع الضربة ونربحو الوقت، ادخل ع الرابط هذا وعمّر الأسئلة في دقيقة ع التيلفون (بالتونسي) :

${playerUrl}

كي تكمل، انزل على "ابعث للكيني ع الواتساب" باش تجينا إجاباتك طول ونحضرو الفحص والتصوير الطبي اللازم حسب بروتوكول FIFA. إن شاء الله لباس ! 🇹🇳`;
    } else {
      return `⚽ Bonjour ${targetName} !
C'est le staff médical MS MedicalDiag : Seif Chaouch (Kiné) & Dr. Malek Masri (Médecin).
Afin d'évaluer précisément ta blessure et d'orienter le diagnostic FIFA sans perdre de temps, clique sur ce lien et réponds au questionnaire (en 1 à 2 minutes) :

${playerUrl}

Dès que tu as fini, clique sur "Envoyer au Kiné" pour nous transmettre tes réponses. Prends soin de toi !`;
    }
  };

  const inviteMessage = getInviteMessage();

  const handleCopyLinkOnly = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(playerUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(inviteMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  const handleSendWhatsApp = () => {
    let cleanPhone = (playerPhone || '').replace(/\D/g, '');
    if (cleanPhone.length === 8) {
      cleanPhone = `216${cleanPhone}`;
    }

    const encodedText = encodeURIComponent(inviteMessage);
    const waUrl = cleanPhone 
      ? `https://wa.me/${cleanPhone}?text=${encodedText}`
      : `https://wa.me/?text=${encodedText}`;

    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-7 space-y-5 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {t.sendQuestionnaireTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.sendQuestionnaireSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. HIGHLIGHTED DIRECT CLICKABLE LINK BOX */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-950 to-teal-950/80 p-4 rounded-2xl border-2 border-emerald-500 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
              <LinkIcon className="w-4 h-4" />
              <span>{lang === 'tn' ? 'رابط الاستبيان المباشر للملاعبي' : 'Lien Direct Joueur (Cliquable)'}</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              100% Cliquable
            </span>
          </div>

          {/* Actual big clickable <a> link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <a
              href={playerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-900/90 hover:bg-slate-800 text-emerald-300 hover:text-white font-mono text-xs sm:text-sm p-3 rounded-xl border border-emerald-500/40 break-all transition-all flex items-center justify-between group shadow-inner"
              title="Cliquer pour ouvrir le lien directement"
            >
              <span className="underline decoration-emerald-500/60 group-hover:decoration-white font-semibold">
                {playerUrl}
              </span>
              <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:text-white shrink-0 ml-2" />
            </a>

            <button
              type="button"
              onClick={handleCopyLinkOnly}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-md"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? (lang === 'tn' ? 'تم النسخ !' : 'Copié !') : (lang === 'tn' ? 'أنسخ الرابط' : 'Copier le lien')}</span>
            </button>
          </div>

          {/* URL Mode Switcher (Localhost vs Wi-Fi IP for phones) */}
          {isLocalHost && (
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] text-slate-400 font-medium">
                {lang === 'tn' ? 'وجهة الرابط :' : 'Format du lien :'}
              </span>

              <button
                type="button"
                onClick={() => setUrlMode('network')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  urlMode === 'network'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
                title="Pour que le joueur puisse ouvrir le lien sur son smartphone connecté au Wi-Fi"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Wi-Fi Smartphone ({localNetworkIp})</span>
              </button>

              <button
                type="button"
                onClick={() => setUrlMode('localhost')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  urlMode === 'localhost'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
                title="Pour tester sur le même ordinateur"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Même PC (localhost)</span>
              </button>

              <button
                type="button"
                onClick={() => setUrlMode('custom')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  urlMode === 'custom'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Domaine Web</span>
              </button>
            </div>
          )}

          {urlMode === 'custom' && (
            <input
              type="text"
              value={customBaseUrl}
              onChange={(e) => setCustomBaseUrl(e.target.value)}
              placeholder="Ex: https://fifa-kine-club.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono mt-2"
            />
          )}
        </div>

        {/* 2. RECIPIENT INFO (NAME & PHONE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.playerNameLabel}
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Ex: Youssef Msakni"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.playerPhoneLabel}
            </label>
            <input
              type="text"
              value={playerPhone}
              onChange={(e) => setPlayerPhone(e.target.value)}
              placeholder={t.playerPhonePlaceholder}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* 3. WHATSAPP MESSAGE PREVIEW */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1">
              <span>💬</span>
              <span>Aperçu du message WhatsApp prêt à être envoyé :</span>
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 text-xs text-slate-200 font-mono whitespace-pre-line leading-relaxed max-h-44 overflow-y-auto">
            {inviteMessage}
          </div>
        </div>

        {/* 4. MAIN ACTION BUTTONS */}
        <div className="space-y-2.5 pt-1">
          {/* Send on WhatsApp Button */}
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm sm:text-base transition-all shadow-xl shadow-emerald-500/25"
          >
            <Send className="w-5 h-5" />
            <span>{t.btnSendToPlayerWhatsApp}</span>
          </button>

          {/* Copy Full Invitation Message */}
          <button
            type="button"
            onClick={handleCopyMessage}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all border border-slate-700"
          >
            {copiedMessage ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{t.inviteCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.btnCopyInviteLink}</span>
              </>
            )}
          </button>
        </div>

        {/* Alternative: Fill directly on this device */}
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={() => {
              onClose();
              onFillDirectly();
            }}
            className="text-xs text-slate-400 hover:text-emerald-400 font-semibold underline transition-all flex items-center justify-center gap-1.5 mx-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t.orFillDirectly}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
