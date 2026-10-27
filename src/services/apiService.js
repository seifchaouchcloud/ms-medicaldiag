// Service API & Client Database pour MS MedicalDiag (Seif Chaouch & Dr. Malek Masri)
// Support 100% Hors-Ligne, 4G et Wi-Fi avec synchronisation automatique lors du retour de la connexion

const API_BASE = typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:4173/api';
const LOCAL_STORAGE_KEY = 'ms_medicaldiag_records_db';
const OUTBOX_STORAGE_KEY = 'ms_medicaldiag_offline_outbox';

// BroadcastChannel pour synchro multi-onglets
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window 
  ? new BroadcastChannel('ms_medicaldiag_sync') 
  : null;

// Initial fallback sample data if local storage is empty
const getInitialLocalData = () => {
  return [
    {
      id: 'sub_sample_1',
      created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      status: 'nouveau',
      player_name: 'Youssef Msakni',
      player_phone: '+21698123456',
      club: 'Espérance Sportive de Tunis',
      position: 'winger',
      timing: 'match',
      region: 'genou',
      subzone: 'genou_lca',
      pain: { atRest: 3, moving: 7, atAction: 9 },
      mechanism: 'non_contact',
      pop: 'yes',
      instability: 'yes',
      block: 'no',
      swelling: 'immediate',
      playable: 'no',
      nerve: 'no',
      testResults: {},
      ottawaResults: {},
      diagnosis: null,
      source: 'player_web_link'
    },
    {
      id: 'sub_sample_2',
      created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      status: 'nouveau',
      player_name: 'Hamza Jelassi',
      player_phone: '+21698654321',
      club: 'Étoile Sportive du Sahel',
      position: 'centerBack',
      timing: 'match',
      region: 'cheville',
      subzone: 'cheville_malleole_ext',
      pain: { atRest: 2, moving: 6, atAction: 8 },
      mechanism: 'contact',
      pop: 'no',
      instability: 'no',
      block: 'no',
      swelling: 'delayed',
      playable: 'no',
      nerve: 'no',
      testResults: {},
      ottawaResults: {},
      diagnosis: null,
      source: 'player_web_link'
    }
  ];
};

// Helper: Read local storage cache
const getLocalRecords = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialLocalData();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialLocalData();
  }
};

// Helper: Save local storage cache
const saveLocalRecords = (records) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    if (syncChannel) {
      syncChannel.postMessage({ type: 'sync', timestamp: Date.now() });
    }
  } catch (e) {
    console.error('Error caching to localStorage:', e);
  }
};

// Helper: Read offline outbox queue
const getOfflineOutbox = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(OUTBOX_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Helper: Save offline outbox queue
const saveOfflineOutbox = (queue) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OUTBOX_STORAGE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.error('Error saving outbox:', e);
  }
};

// Network status listeners
let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
const networkListeners = new Set();

const notifyNetworkListeners = (status) => {
  isOnline = status;
  networkListeners.forEach((fn) => {
    try { fn(status); } catch (e) { console.error(e); }
  });
};

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('[MS MedicalDiag] Connexion rétablie (4G/Wi-Fi). Début synchronisation...');
    notifyNetworkListeners(true);
    apiService.syncOfflineOutbox();
  });

  window.addEventListener('offline', () => {
    console.log('[MS MedicalDiag] Mode Hors-Ligne activé.');
    notifyNetworkListeners(false);
  });
}

export const apiService = {
  // Network status helpers
  isNetworkOnline() {
    return isOnline;
  },

  getPendingSyncCount() {
    return getOfflineOutbox().length;
  },

  subscribeToNetworkStatus(callback) {
    networkListeners.add(callback);
    callback(isOnline, this.getPendingSyncCount());
    return () => networkListeners.delete(callback);
  },

  // Auto-sync offline outbox when connection is restored
  async syncOfflineOutbox() {
    const outbox = getOfflineOutbox();
    if (outbox.length === 0) return { synced: 0 };

    console.log(`[MS MedicalDiag Sync] Synchronisation de ${outbox.length} dossier(s) en attente...`);
    const remaining = [];
    let syncedCount = 0;

    for (const item of outbox) {
      try {
        const res = await fetch(`${API_BASE}/submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        if (res.ok) {
          syncedCount++;
          console.log(`[MS MedicalDiag Sync] Dossier ${item.id} (${item.player_name}) synchronisé avec succès !`);
        } else {
          remaining.push(item);
        }
      } catch (err) {
        remaining.push(item);
      }
    }

    saveOfflineOutbox(remaining);
    notifyNetworkListeners(isOnline);
    if (syncChannel) syncChannel.postMessage({ type: 'sync', timestamp: Date.now() });

    return { synced: syncedCount, remaining: remaining.length };
  },

  // 1. Fetch all submissions (Inbox list)
  async fetchSubmissions(status = 'all') {
    if (isOnline) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(`${API_BASE}/submissions${status !== 'all' ? `?status=${status}` : ''}`, {
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            saveLocalRecords(json.data);
            return {
              source: 'sqlite',
              data: json.data,
              unreadCount: json.unreadCount,
              count: json.count,
              offlinePending: getOfflineOutbox().length
            };
          }
        }
      } catch (e) {
        console.warn('[MS MedicalDiag] Serveur distant injoignable, bascule vers base locale persistante.');
      }
    }

    // Fallback to local storage (100% offline support)
    const local = getLocalRecords();
    const filtered = status !== 'all' ? local.filter((r) => r.status === status) : local;
    return {
      source: 'local_cache',
      data: filtered,
      unreadCount: local.filter((r) => r.status === 'nouveau').length,
      count: filtered.length,
      offlinePending: getOfflineOutbox().length
    };
  },

  // 2. Create new submission (when player submits on phone or web)
  async createSubmission(submissionData) {
    const id = submissionData.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const formatted = {
      ...submissionData,
      id,
      created_at: now,
      updated_at: now,
      status: submissionData.status || 'nouveau',
      player_name: submissionData.name || submissionData.player_name || 'Anonyme',
      player_phone: submissionData.phone || submissionData.player_phone || '',
    };

    // 1. Enregistre TOUJOURS immédiatement dans la base locale (sécurité absolue)
    const local = getLocalRecords();
    const updated = [formatted, ...local.filter((r) => r.id !== id)];
    saveLocalRecords(updated);

    // 2. Si connecté : tente l'envoi immédiat au serveur
    if (isOnline) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(`${API_BASE}/submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formatted),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          return { success: true, id, online: true, source: 'sqlite' };
        }
      } catch (e) {
        console.warn('[MS MedicalDiag] Échec envoi direct, mise en file d\'attente hors-ligne.', e);
      }
    }

    // 3. Si hors-ligne ou si le serveur ne répond pas : ajoute à la file d'attente Outbox
    const outbox = getOfflineOutbox();
    outbox.push(formatted);
    saveOfflineOutbox(outbox);
    notifyNetworkListeners(false);

    return {
      success: true,
      id,
      offline: true,
      source: 'offline_queue',
      message: 'Enregistré hors-ligne ! Vos données seront automatiquement transmises dès le retour du réseau (4G ou Wi-Fi).'
    };
  },

  // 3. Update existing submission (Kiné updates status, tests, or diagnosis)
  async updateSubmission(id, patchData) {
    const now = new Date().toISOString();

    // Update local
    const local = getLocalRecords();
    const idx = local.findIndex((r) => r.id === id);
    if (idx !== -1) {
      local[idx] = {
        ...local[idx],
        ...patchData,
        updated_at: now,
      };
      saveLocalRecords(local);
    }

    // Update SQLite backend if online
    if (isOnline) {
      try {
        await fetch(`${API_BASE}/submissions/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patchData),
        });
      } catch (e) {
        console.warn('[MS MedicalDiag] Mise à jour distante échouée, mise à jour locale conservée.', e);
      }
    }

    return { success: true };
  },

  // 4. Delete submission
  async deleteSubmission(id) {
    const local = getLocalRecords();
    const filtered = local.filter((r) => r.id !== id);
    saveLocalRecords(filtered);

    if (isOnline) {
      try {
        await fetch(`${API_BASE}/submissions/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.warn('[MS MedicalDiag] Erreur suppression serveur', e);
      }
    }

    return { success: true };
  },

  // 5. Export database file (.json)
  exportDatabase() {
    try {
      window.open(`${API_BASE}/export-db`, '_blank');
    } catch {
      const local = getLocalRecords();
      const blob = new Blob([JSON.stringify(local, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ms_medicaldiag_database_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
  },

  // 6. Cross-tab sync listener
  subscribeToSync(callback) {
    if (syncChannel) {
      const handler = () => callback();
      syncChannel.addEventListener('message', handler);
      return () => syncChannel.removeEventListener('message', handler);
    }
    return () => {};
  }
};
