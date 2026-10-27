import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PlayerModule } from './components/PlayerModule';
import { KineModule } from './components/KineModule';
import { DiagnosticModule } from './components/DiagnosticModule';
import { InboxModule } from './components/InboxModule';
import { FifaGuideModal } from './components/FifaGuideModal';
import { SendQuestionnaireModal } from './components/SendQuestionnaireModal';
import { InstallAppModal } from './components/InstallAppModal';
import { StaffAuthModal } from './components/StaffAuthModal';
import { apiService } from './services/apiService';
import { WifiOff, Check, RefreshCw } from 'lucide-react';

export default function App() {
  // Staff Medical Authentication (Seif Chaouch & Dr. Malek Masri)
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ms_staff_authenticated') === 'true';
    }
    return false;
  });
  const [isStaffAuthModalOpen, setIsStaffAuthModalOpen] = useState(false);

  // Network & Offline Status
  const [isOnline, setIsOnline] = useState(apiService.isNetworkOnline());
  const [pendingSyncCount, setPendingSyncCount] = useState(apiService.getPendingSyncCount());
  const [syncToast, setSyncToast] = useState(false);

  useEffect(() => {
    const unsub = apiService.subscribeToNetworkStatus((online, count) => {
      setIsOnline(online);
      setPendingSyncCount(count);
      if (online && count === 0) {
        setSyncToast(true);
        setTimeout(() => setSyncToast(false), 4000);
      }
    });
    return unsub;
  }, []);

  // Language state
  const [lang, setLang] = useState('fr'); // 'fr' or 'tn'

  // Current active module:
  // If NOT authenticated as staff: ALWAYS 1 (Player Form Only)
  // If authenticated as staff: 2 (Kiné), 4 (Inbox), 3 (Diagnostic), or 1 (Player)
  const [currentModule, setCurrentModule] = useState(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('ms_staff_authenticated') === 'true';
      return isAuth ? 2 : 1;
    }
    return 1;
  });

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState('sub_sample_1');

  // Real-time inbox tracking
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  // Auto-poll inbox status if authenticated as staff
  useEffect(() => {
    if (!isStaffAuthenticated) return;

    const fetchStatus = async () => {
      try {
        const res = await apiService.fetchSubmissions('all');
        if (res && res.data) {
          setRecentSubmissions(res.data);
          setUnreadCount(res.unreadCount || 0);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 4000);
    const unsub = apiService.subscribeToSync(fetchStatus);
    return () => {
      clearInterval(interval);
      unsub();
    };
  }, [isStaffAuthenticated]);

  // Player & Clinical Data
  const initialPatientData = {
    name: '',
    club: '',
    position: 'winger',
    timing: 'match',
    region: 'genou',
    subzone: 'genou_lca',
    phone: '',
    pain: {
      atRest: 2,
      moving: 5,
      atAction: 8,
    },
    mechanism: 'non_contact',
    pop: 'no',
    instability: 'no',
    block: 'no',
    swelling: 'immediate',
    playable: 'no',
    nerve: 'no',
  };

  const [patientData, setPatientData] = useState(initialPatientData);
  const [testResults, setTestResults] = useState({});
  const [ottawaResults, setOttawaResults] = useState({});

  // Synchronize document direction with language
  useEffect(() => {
    if (lang === 'tn') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'fr');
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'fr' ? 'tn' : 'fr'));
  };

  // Staff Login Handler
  const handleAuthenticated = () => {
    setIsStaffAuthenticated(true);
    setCurrentModule(2); // Go to Kiné Console
  };

  // Staff Logout Handler
  const handleStaffLogout = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('ms_staff_authenticated');
    }
    setIsStaffAuthenticated(false);
    setCurrentModule(1); // Return to Player Form
  };

  // Load a submission from Inbox into Kiné Console
  const handleLoadSubmission = async (sub) => {
    setCurrentSubmissionId(sub.id);
    setPatientData({
      name: sub.player_name || sub.name || '',
      club: sub.club || '',
      position: sub.position || 'winger',
      timing: sub.timing || 'match',
      region: sub.region || 'genou',
      subzone: sub.subzone || '',
      phone: sub.player_phone || sub.phone || '',
      pain: sub.pain || { atRest: 2, moving: 5, atAction: 8 },
      mechanism: sub.mechanism || 'non_contact',
      pop: sub.pop || 'no',
      instability: sub.instability || 'no',
      block: sub.block || 'no',
      swelling: sub.swelling || 'immediate',
      playable: sub.playable || 'no',
      nerve: sub.nerve || 'no',
    });

    setTestResults(sub.testResults || {});
    setOttawaResults(sub.ottawaResults || {});

    // Update status to 'en_cours' in SQLite if it was 'nouveau'
    if (sub.status === 'nouveau') {
      await apiService.updateSubmission(sub.id, { status: 'en_cours' });
    }

    // Switch to Kiné Module
    setCurrentModule(2);
  };

  const handleResetExam = () => {
    setPatientData(initialPatientData);
    setTestResults({});
    setOttawaResults({});
    setCurrentSubmissionId(null);
    setCurrentModule(2);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/50 px-4 py-2.5 text-center text-xs text-amber-200 flex items-center justify-center gap-2 shadow-md">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {lang === 'tn'
              ? 'أنت توا تخدم أوفلاين (من غير إنترنت / 4G). عمّر الاستبيان عادي، كل شيء باش يتسجل في تيلفونك ويتبعث أوتوماتيكيا أول ما ترجعلك الكونيکسيون !'
              : 'Mode Hors-Ligne (Pas de 4G/Wi-Fi) actif. Le formulaire fonctionne 100% hors-ligne et sera envoyé automatiquement dès le retour de la connexion.'}
          </span>
          {pendingSyncCount > 0 && (
            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black text-[10px]">
              {pendingSyncCount} en attente
            </span>
          )}
        </div>
      )}

      {/* Online Sync Success Toast */}
      {syncToast && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/50 px-4 py-2 text-center text-xs text-emerald-200 flex items-center justify-center gap-2 animate-fade-in shadow-md">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>
            {lang === 'tn' 
              ? '✅ تمت مزامنة جميع المعطيات بنجاح مع قاعدة البيانات !' 
              : '✅ Connexion rétablie : Toutes les réponses hors-ligne ont été synchronisées !'}
          </span>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentModule={currentModule}
        onChangeModule={(mod) => {
          if (isStaffAuthenticated) {
            setCurrentModule(mod);
          }
        }}
        unreadCount={unreadCount}
        lang={lang}
        onToggleLang={toggleLang}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSendModal={() => setIsSendModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        isStaffAuthenticated={isStaffAuthenticated}
        onOpenStaffLogin={() => setIsStaffAuthModalOpen(true)}
        onStaffLogout={handleStaffLogout}
        isOnline={isOnline}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-6">
        {/* IF NOT AUTHENTICATED: STRICTLY SHOW THE PLAYER FORM ONLY */}
        {!isStaffAuthenticated ? (
          <div className="space-y-4">
            <PlayerModule
              patientData={patientData}
              setPatientData={setPatientData}
              isPlayerOnlyMode={true}
              onSaveAndProceedToKine={() => {
                // Cannot proceed to kine unless PIN is entered
                setIsStaffAuthModalOpen(true);
              }}
              lang={lang}
            />
          </div>
        ) : (
          /* IF AUTHENTICATED AS STAFF: FULL ACCESS TO ALL MODULES */
          <>
            {/* Module 4: Auto-Updating Inbox & SQLite Database */}
            {currentModule === 4 && (
              <InboxModule
                onLoadSubmission={handleLoadSubmission}
                lang={lang}
              />
            )}

            {/* Module 2: Kiné Cabinet & FIFA Tests (DEFAULT FOR STAFF) */}
            {currentModule === 2 && (
              <KineModule
                patientData={patientData}
                setPatientData={setPatientData}
                testResults={testResults}
                setTestResults={setTestResults}
                ottawaResults={ottawaResults}
                setOttawaResults={setOttawaResults}
                onLaunchDiagnosis={() => {
                  if (currentSubmissionId) {
                    apiService.updateSubmission(currentSubmissionId, {
                      testResults,
                      ottawaResults,
                      status: 'termine',
                    });
                  }
                  setCurrentModule(3);
                }}
                onOpenSendModal={() => setIsSendModalOpen(true)}
                onDirectPlayerFill={() => setCurrentModule(1)}
                onOpenInbox={() => setCurrentModule(4)}
                recentSubmissions={recentSubmissions}
                onQuickLoadSubmission={handleLoadSubmission}
                lang={lang}
              />
            )}

            {/* Module 3: Diagnostic & Orientation Imagerie */}
            {currentModule === 3 && (
              <DiagnosticModule
                patientData={patientData}
                testResults={testResults}
                ottawaResults={ottawaResults}
                onResetExam={handleResetExam}
                lang={lang}
              />
            )}

            {/* Module 1: Player Questionnaire in Staff Mode */}
            {currentModule === 1 && (
              <PlayerModule
                patientData={patientData}
                setPatientData={setPatientData}
                isPlayerOnlyMode={false}
                onSaveAndProceedToKine={() => setCurrentModule(2)}
                lang={lang}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            ⚽ MS MedicalDiag • Seif Chaouch (Kiné) & Dr. Malek Masri (Médecin) • FIFA Diploma in Football Medicine
          </span>
          <div className="flex items-center gap-3">
            {!isStaffAuthenticated ? (
              <button
                type="button"
                onClick={() => setIsStaffAuthModalOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1"
              >
                🔒 Accès Staff Médical (Kiné / Médecin)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStaffLogout}
                className="text-rose-400 hover:text-rose-300 font-bold text-xs"
              >
                🔓 Verrouiller l'Espace Médical
              </button>
            )}
            <span className="text-slate-400 font-mono">
              {lang === 'tn' ? 'تونس 🇹🇳 - النسخة الطبية الرياضية' : 'Tunisie 🇹🇳 - Sports Medicine Edition'}
            </span>
          </div>
        </div>
      </footer>

      {/* Staff Authentication PIN Modal */}
      <StaffAuthModal
        isOpen={isStaffAuthModalOpen}
        onClose={() => setIsStaffAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
        lang={lang}
      />

      {/* FIFA Protocol Guide Modal */}
      <FifaGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        lang={lang}
      />

      {/* Send Questionnaire to Player via WhatsApp Modal */}
      <SendQuestionnaireModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        playerName={patientData.name}
        setPlayerName={(name) => setPatientData((p) => ({ ...p, name }))}
        playerPhone={patientData.phone}
        setPlayerPhone={(phone) => setPatientData((p) => ({ ...p, phone }))}
        onFillDirectly={() => {
          setIsSendModalOpen(false);
          setCurrentModule(1);
        }}
        lang={lang}
      />

      {/* Mobile Install Guide Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
