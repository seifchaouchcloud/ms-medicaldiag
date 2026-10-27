import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { REGIONS_DATA } from '../data/fifaData';
import { translations } from '../data/translations';
import { 
  Inbox, 
  RefreshCw, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  User, 
  Filter, 
  Activity, 
  Database,
  Wifi,
  Sparkles,
  Flame,
  Volume2
} from 'lucide-react';

export const InboxModule = ({ onLoadSubmission, lang }) => {
  const t = translations[lang] || translations.fr;
  const isRtl = lang === 'tn';

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'nouveau', 'en_cours', 'termine'
  const [searchQuery, setSearchQuery] = useState('');
  const [autoSync, setAutoSync] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch submissions from API / SQLite
  const loadData = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await apiService.fetchSubmissions(filterStatus);
      if (res && res.data) {
        setSubmissions(res.data);
        setUnreadCount(res.unreadCount || 0);
        setLastSyncTime(new Date());
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, [filterStatus]);

  // Real-time automatic polling every 4 seconds
  useEffect(() => {
    if (!autoSync) return;

    const interval = setInterval(() => {
      loadData(true); // silent refresh
    }, 4000);

    // Cross-tab sync
    const unsubscribe = apiService.subscribeToSync(() => {
      loadData(true);
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [autoSync, filterStatus]);

  // Format time ago
  const formatTimeAgo = (isoDate) => {
    if (!isoDate) return '';
    const now = new Date();
    const date = new Date(isoDate);
    const diffSec = Math.floor((now - date) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return t.justNow;
    if (diffMin < 60) return t.timeAgoMinutes.replace('{m}', diffMin);
    if (diffHours < 24) return t.timeAgoHours.replace('{h}', diffHours);
    return t.timeAgoDays.replace('{d}', diffDays);
  };

  // Delete submission
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm(t.confirmDelete)) {
      await apiService.deleteSubmission(id);
      loadData(false);
    }
  };

  // Filtered by search query
  const filteredSubmissions = submissions.filter((sub) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = (sub.player_name || '').toLowerCase();
    const club = (sub.club || '').toLowerCase();
    const region = (sub.region || '').toLowerCase();
    return name.includes(q) || club.includes(q) || region.includes(q);
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. HEADER & AUTO-SYNC BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-500/25">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {t.inboxTitle}
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse">
                    {unreadCount} {lang === 'tn' ? 'جديد' : 'nouveau(x)'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {t.inboxSubtitle}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300 mt-1">
                <span className="text-emerald-400">Kiné : Seif Chaouch</span>
                <span className="text-slate-600">•</span>
                <span className="text-teal-400">Médecin : Dr. Malek Masri</span>
              </div>
            </div>
          </div>

          {/* Sync status & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Auto Sync Toggle */}
            <button
              type="button"
              onClick={() => setAutoSync(!autoSync)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                autoSync
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoSync ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
              <span>{autoSync ? t.autoSyncOn : t.autoSyncOff}</span>
            </button>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={() => loadData(false)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5"
              title={t.refreshNow}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">{t.refreshNow}</span>
            </button>

            {/* Database Export Button */}
            <button
              type="button"
              onClick={() => apiService.exportDatabase()}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700 transition-all flex items-center gap-1.5"
              title="Télécharger une copie de sauvegarde SQLite/JSON"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{t.databaseBackup}</span>
            </button>
          </div>
        </div>

        {/* 2. STATS OVERVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">Total Dossiers</span>
            <span className="text-lg font-black text-white">{submissions.length}</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">Non Traités</span>
            <span className="text-lg font-black text-rose-400">{unreadCount}</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">Drapeaux Rouges (POP/&lt;2h)</span>
            <span className="text-lg font-black text-amber-400">
              {submissions.filter((s) => s.pop === 'yes' || s.swelling === 'immediate').length}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] mb-0.5">Base SQLite Locale</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Connectée (fifa_kine.sqlite)</span>
            </span>
          </div>
        </div>

        {/* 3. FILTERS & SEARCH */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Status filter tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 overflow-x-auto text-xs">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'nouveau', label: t.filterNew },
              { id: 'en_cours', label: t.filterInProgress },
              { id: 'termine', label: t.filterDone },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  filterStatus === f.id
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* 4. SUBMISSIONS LIST */}
      <div className="space-y-3">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-400">
              {t.emptyInbox}
            </p>
          </div>
        ) : (
          filteredSubmissions.map((sub) => {
            const regConfig = REGIONS_DATA[sub.region] || REGIONS_DATA.genou;
            const subzoneObj = regConfig.subzones?.find((s) => s.id === sub.subzone);
            const subzoneLabel = subzoneObj ? (lang === 'tn' ? subzoneObj.labelAr : subzoneObj.labelFr) : '';
            const isUnread = sub.status === 'nouveau';
            const hasRedFlag = sub.pop === 'yes' || sub.swelling === 'immediate';

            return (
              <div
                key={sub.id}
                onClick={() => onLoadSubmission(sub)}
                className={`bg-slate-900 border rounded-3xl p-4 sm:p-5 transition-all cursor-pointer hover:border-emerald-500/80 hover:shadow-xl hover:shadow-emerald-500/10 space-y-3 ${
                  isUnread
                    ? 'border-emerald-500/50 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 ring-1 ring-emerald-500/30'
                    : 'border-slate-800'
                }`}
              >
                {/* Top Row: Player Identity, Region & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base ${
                      isUnread
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      ⚽
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-base text-white">
                          {sub.player_name || 'Joueur'}
                        </span>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">
                        {sub.club || 'Club'} • {t.positions[sub.position] || sub.position}
                        {sub.player_phone && ` • 📱 ${sub.player_phone}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Timestamp */}
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {formatTimeAgo(sub.created_at)}
                    </span>

                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      sub.status === 'nouveau'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : sub.status === 'en_cours'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {sub.status === 'nouveau'
                        ? t.statusNew
                        : sub.status === 'en_cours'
                        ? t.statusInProgress
                        : t.statusDone}
                    </span>
                  </div>
                </div>

                {/* Middle Row: Joint, Pain, Acute Alerts */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800/80 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Target Joint */}
                    <span className="font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800/60">
                      📍 {lang === 'tn' ? regConfig.nameAr : regConfig.nameFr} {subzoneLabel && `(${subzoneLabel})`}
                    </span>

                    {/* EVA Pain */}
                    <span className="font-semibold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>EVA : </span>
                      <span className="text-amber-400 font-bold">
                        {sub.pain?.atRest ?? sub.pain_at_rest} / {sub.pain?.moving ?? sub.pain_moving} / {sub.pain?.atAction ?? sub.pain_at_action}
                      </span>
                    </span>
                  </div>

                  {/* Red flags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {sub.pop === 'yes' && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                        <Volume2 className="w-3 h-3" />
                        <span>POP (طرطقة)</span>
                      </span>
                    )}

                    {sub.swelling === 'immediate' && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        🌊 Hémarthrose (&lt;2h)
                      </span>
                    )}

                    {sub.instability === 'yes' && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        🔄 Instabilité (تفلت)
                      </span>
                    )}

                    {sub.block === 'yes' && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        🛑 Blocage
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 font-mono">
                    ID : {sub.id} • Source : {sub.source === 'player_web_link' ? 'Lien Web Mobile' : 'Import WhatsApp'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleDelete(sub.id, e)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-all"
                      title={t.deleteRecord}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onLoadSubmission(sub)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                    >
                      <span>{t.loadInConsole}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
