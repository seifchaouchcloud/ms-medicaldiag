import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Check, X, AlertCircle, Clock, ShieldAlert } from 'lucide-react';

export const StaffAuthModal = ({ isOpen, onClose, onAuthenticated, lang }) => {
  if (!isOpen) return null;

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Anti-Brute-Force Lockout State
  const LOCKOUT_THRESHOLD = 3; // 3 wrong attempts = lockout
  const LOCKOUT_DURATION_SEC = 300; // 5 minutes lockout

  const [failedAttempts, setFailedAttempts] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('ms_pin_fails');
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  });

  const [lockoutUntil, setLockoutUntil] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('ms_lockout_until');
      if (stored) {
        const time = parseInt(stored, 10);
        if (time > Date.now()) return time;
      }
    }
    return null;
  });

  const [countdown, setCountdown] = useState(0);

  // Live countdown for lockout
  useEffect(() => {
    if (!lockoutUntil) {
      setCountdown(0);
      return;
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
      setCountdown(remaining);
      if (remaining === 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('ms_lockout_until');
          localStorage.removeItem('ms_pin_fails');
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Valid Medical PINs (Can also be customized via localStorage)
  const getValidPins = () => {
    const customPin = typeof localStorage !== 'undefined' ? localStorage.getItem('ms_custom_pin') : null;
    return customPin ? [customPin, '1920', '2026'] : ['1920', '2026'];
  };

  const isLockedOut = countdown > 0;

  const handleKeyPress = (num) => {
    if (isLockedOut) return;

    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(false);
      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    if (isLockedOut) return;
    setPin(pin.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    if (isLockedOut) return;
    setPin('');
    setError(false);
  };

  const verifyPin = (candidatePin) => {
    const validPins = getValidPins();

    if (validPins.includes(candidatePin)) {
      // SUCCESSFUL LOGIN
      setFailedAttempts(0);
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('ms_pin_fails');
        localStorage.removeItem('ms_lockout_until');
        if (rememberMe) {
          localStorage.setItem('ms_staff_authenticated', 'true');
        }
      }
      onAuthenticated();
      onClose();
    } else {
      // FAILED ATTEMPT
      setError(true);
      const newFails = failedAttempts + 1;
      setFailedAttempts(newFails);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('ms_pin_fails', newFails.toString());
      }

      if (newFails >= LOCKOUT_THRESHOLD) {
        // TRIGGER 5-MINUTE LOCKOUT
        const lockUntil = Date.now() + LOCKOUT_DURATION_SEC * 1000;
        setLockoutUntil(lockUntil);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('ms_lockout_until', lockUntil.toString());
        }
      }

      setTimeout(() => {
        setPin('');
      }, 700);
    }
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-sm shadow-2xl p-6 space-y-5 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {lang === 'tn' ? 'فضاء الإطار الطبي' : 'Accès Staff Médical'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Seif Chaouch & Dr. Malek Masri
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

        {/* Security Warning or Lockout Banner */}
        {isLockedOut ? (
          <div className="bg-rose-950/80 border-2 border-rose-500/80 p-4 rounded-2xl text-center space-y-2 animate-pulse">
            <div className="flex items-center justify-center gap-2 text-rose-400 font-black text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>{lang === 'tn' ? 'تم حظر الدخول مؤقتا' : 'Accès Médical Verrouillé'}</span>
            </div>
            <p className="text-xs text-rose-200 leading-relaxed">
              {lang === 'tn'
                ? `محاولات خاطئة متتالية. للحماية الطبية، يرجى الانتظار : ${formatCountdown(countdown)}`
                : `3 tentatives erronées consécutives. Par mesure de sécurité médicale, le clavier est bloqué pendant : ${formatCountdown(countdown)}.`}
            </p>
          </div>
        ) : (
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 text-center">
            <p>
              {lang === 'tn'
                ? 'فضاء مشفر ومحمي. يرجى إدخال رمز الأمان السري المخصص للكيني والطبيب.'
                : 'Accès sécurisé réservé à Seif Chaouch (Kiné) et au Dr. Malek Masri (Médecin).'}
            </p>
            {failedAttempts > 0 && (
              <p className="text-rose-400 font-bold mt-1 text-[11px]">
                {lang === 'tn'
                  ? `بقاتلك ${LOCKOUT_THRESHOLD - failedAttempts} محاولة قبل الحظر الأوتوماتيكي !`
                  : `Attention : plus que ${LOCKOUT_THRESHOLD - failedAttempts} tentative(s) avant verrouillage automatique !`}
              </p>
            )}
          </div>
        )}

        {/* PIN Indicators */}
        <div className="flex justify-center items-center gap-3 py-1">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                pin.length > idx
                  ? error
                    ? 'bg-rose-500 ring-4 ring-rose-500/30'
                    : 'bg-emerald-400 ring-4 ring-emerald-400/30'
                  : 'bg-slate-800 border border-slate-700'
              }`}
            />
          ))}
        </div>

        {error && !isLockedOut && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>{lang === 'tn' ? 'رمز الأمان غير صحيح' : 'Code PIN incorrect'}</span>
          </div>
        )}

        {/* Tactile Keypad (Disabled during lockout) */}
        <div className={`grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto transition-opacity ${isLockedOut ? 'opacity-30 pointer-events-none' : ''}`}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              disabled={isLockedOut}
              onClick={() => handleKeyPress(digit)}
              className="h-13 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-black text-lg transition-all border border-slate-700 shadow-sm disabled:cursor-not-allowed"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            disabled={isLockedOut}
            onClick={handleClear}
            className="h-13 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 active:scale-95 text-slate-400 font-bold text-xs transition-all border border-slate-800"
          >
            {lang === 'tn' ? 'مسح' : 'Effacer'}
          </button>
          <button
            type="button"
            disabled={isLockedOut}
            onClick={() => handleKeyPress('0')}
            className="h-13 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-black text-lg transition-all border border-slate-700 shadow-sm"
          >
            0
          </button>
          <button
            type="button"
            disabled={isLockedOut}
            onClick={handleDelete}
            className="h-13 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 active:scale-95 text-slate-400 font-bold text-xs transition-all border border-slate-800"
          >
            ⌫
          </button>
        </div>

        {/* Remember on this device checkbox */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-400">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
          />
          <label htmlFor="rememberMe" className="cursor-pointer">
            {lang === 'tn' ? 'احفظ الدخول على هذا الهاتف' : 'Mémoriser sur cet appareil'}
          </label>
        </div>
      </div>
    </div>
  );
};
