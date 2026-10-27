import React from 'react';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  BookOpen, 
  User, 
  Stethoscope, 
  Activity, 
  Globe, 
  Send,
  Smartphone,
  ExternalLink,
  Inbox,
  Database,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  RefreshCw
} from 'lucide-react';

export const Header = ({ 
  currentModule, 
  onChangeModule, 
  unreadCount = 0,
  lang, 
  onToggleLang, 
  onOpenGuide,
  onOpenSendModal,
  onOpenInstallModal,
  isStaffAuthenticated = false,
  onOpenStaffLogin,
  onStaffLogout,
  isOnline = true,
  pendingSyncCount = 0
}) => {
  const t = translations[lang] || translations.fr;

  // 1. PUBLIC PLAYER VIEW (When user is a player, not authenticated as staff)
  if (!isStaffAuthenticated) {
    return (
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-emerald-500/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {/* Brand & Staff Identification */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30 shrink-0">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-white">
                  MS <span className="text-emerald-400">MedicalDiag</span>
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {lang === 'tn' ? 'استبيان ملاعبي' : 'Formulaire Joueur'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium">
                {lang === 'tn' 
                  ? 'سيف الشاوش (كيني) • د. مالك المصري (طبيب)' 
                  : 'Seif Chaouch (Kiné) • Dr. Malek Masri (Médecin)'}
              </p>
            </div>
          </div>

          {/* Right actions: Network Pill + Language Toggle + Staff PIN Login Button */}
          <div className="flex items-center gap-2">
            {/* Online / Offline Status Badge */}
            <div 
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                isOnline 
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80' 
                  : 'bg-amber-950/80 text-amber-300 border-amber-800/80 animate-pulse'
              }`}
              title={isOnline ? 'Connecté (4G / Wi-Fi)' : 'Hors-Ligne : les réponses seront sauvegardées et synchronisées dès reconnexion'}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">4G / Wi-Fi</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'tn' ? 'أوفلاين' : 'Hors-ligne'}</span>
                  {pendingSyncCount > 0 && (
                    <span className="bg-amber-500 text-slate-950 px-1 rounded-full text-[9px] font-black">
                      {pendingSyncCount}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Instant Language Toggle */}
            <button
              type="button"
              onClick={onToggleLang}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 border border-slate-700 text-white hover:border-emerald-500 transition-all flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.switchLang}</span>
            </button>

            {/* Discreet Staff Login Button (Only for Seif Chaouch & Dr. Malek Masri) */}
            <button
              type="button"
              onClick={onOpenStaffLogin}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-all flex items-center gap-1.5 shadow-sm"
              title="Accès réservé au staff médical (Kiné & Médecin)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{lang === 'tn' ? 'الإطار الطبي' : 'Staff Médical'}</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // 2. UNLOCKED MEDICAL STAFF CONSOLE (Kiné Seif Chaouch & Dr. Malek Masri)
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top bar with Branding, Staff names, Quick WhatsApp Send, Guide, Language & Lock */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 text-white font-black text-xl select-none shrink-0">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                  <span className="text-emerald-400 font-black">MS</span>
                  <span>MedicalDiag</span>
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 tracking-wider">
                  ESPACE MÉDICAL SÉCURISÉ
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold mt-0.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/60">
                  <span className="text-slate-400 font-normal">Kiné :</span> Seif Chaouch
                </span>
                <span className="inline-flex items-center gap-1 text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-800/60">
                  <span className="text-slate-400 font-normal">Médecin :</span> Dr. Malek Masri
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Online / Offline Status Badge */}
            <div 
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                isOnline 
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80' 
                  : 'bg-amber-950/80 text-amber-300 border-amber-800/80'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden lg:inline">Connecté</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Hors-Ligne</span>
                  {pendingSyncCount > 0 && (
                    <span className="bg-amber-500 text-slate-950 px-1 rounded-full text-[9px] font-black">
                      {pendingSyncCount}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Quick Send Questionnaire Button */}
            <button
              type="button"
              onClick={onOpenSendModal}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              title="Envoyer le questionnaire au joueur sur WhatsApp"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{lang === 'tn' ? 'ابعث استبيان' : 'Envoyer au Joueur'}</span>
            </button>

            {/* Mobile Install Guide Button */}
            <button
              type="button"
              onClick={onOpenInstallModal}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-all flex items-center gap-1.5"
              title="Installer sur Android ou iPhone"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">{lang === 'tn' ? 'تثبيت ع التيلفون' : 'Sur Mobile'}</span>
            </button>

            {/* Guide Button */}
            <button
              type="button"
              onClick={onOpenGuide}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
              title="Guide Médical FIFA"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Guide FIFA</span>
            </button>

            {/* Instant Language Toggle Button */}
            <button
              type="button"
              onClick={onToggleLang}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 text-white hover:border-emerald-500 transition-all shadow-md flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.switchLang}</span>
            </button>

            {/* Lock Session Button */}
            <button
              type="button"
              onClick={onStaffLogout}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-bold rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 transition-all flex items-center gap-1.5"
              title="Verrouiller l'espace staff médical"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{lang === 'tn' ? 'قفل' : 'Verrouiller'}</span>
            </button>
          </div>
        </div>

        {/* 4 Modules Navigation Tabs for Staff */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
          {/* Module 4: Inbox & Database (AUTO-SYNC) */}
          <button
            type="button"
            onClick={() => onChangeModule(4)}
            className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 border relative ${
              currentModule === 4
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'tn' ? 'صندوق الوارد' : 'Boîte Réception'}</span>
            {unreadCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-rose-500 text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Module 2: Kiné Tests (PRIMARY) */}
          <button
            type="button"
            onClick={() => onChangeModule(2)}
            className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 border ${
              currentModule === 2
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.moduleKine}</span>
          </button>

          {/* Module 3: Diagnostic */}
          <button
            type="button"
            onClick={() => onChangeModule(3)}
            className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 border ${
              currentModule === 3
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.moduleDiag}</span>
          </button>

          {/* Module 1: Player Direct Questionnaire */}
          <button
            type="button"
            onClick={() => onChangeModule(1)}
            className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 border ${
              currentModule === 1
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.modulePlayer}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
