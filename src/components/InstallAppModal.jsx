import React from 'react';
import { X, Smartphone, Apple, CheckCircle2, Download, Share2 } from 'lucide-react';

export const InstallAppModal = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-5 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {lang === 'tn' ? 'تثبيت التطبيقة على تيلفونو (Android & iPhone)' : 'Installer l\'Application sur Mobile (Android & iPhone)'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'tn' ? 'استعمل التطبيقة في التيران والفيستيار كيما أي أبليكاسيون من غير Play Store' : 'Accès instantané plein écran sur le terrain, sans passer par le store'}
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

        {/* 1. Android Installation Guide */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Smartphone className="w-5 h-5" />
            <span>{lang === 'tn' ? '1. على تيلفونات أندرويد (Android - Samsung, Xiaomi, etc.) :' : '1. Sur votre Smartphone Android (Google Chrome) :'}</span>
          </div>

          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              {lang === 'tn' 
                ? 'حل الرابط في نافيغاتور Chrome ع التيلفون.' 
                : 'Ouvrez le lien de l\'application dans Google Chrome sur votre téléphone.'}
            </li>
            <li>
              {lang === 'tn'
                ? 'انزل على الثلاثة نقاط الفوقانيين ع اليمين (⋮).'
                : 'Appuyez sur le menu (les 3 points verticaux ⋮ en haut à droite).'}
            </li>
            <li>
              <span className="font-bold text-white">
                {lang === 'tn' ? 'اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية" (Installer l\'application).' : 'Appuyez sur "Installer l\'application" ou "Ajouter à l\'écran d\'accueil".'}
              </span>
            </li>
            <li>
              {lang === 'tn'
                ? 'التطبيقة تهبط في شاشة تيلفونو بأيقونة كورة ⚽ وتتحل Plein Écran كيما أي أبليكاسيون أصلية !'
                : 'L\'icône ⚽ s\'installe sur votre écran d\'accueil et s\'ouvre en plein écran comme une application native.'}
            </li>
          </ol>
        </div>

        {/* 2. iPhone / iOS Guide for Players */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <Apple className="w-5 h-5" />
            <span>{lang === 'tn' ? '2. على أيفون للملاعبية والستاف (iPhone - Apple iOS) :' : '2. Sur iPhone pour les Joueurs et le Staff (Safari) :'}</span>
          </div>

          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              {lang === 'tn'
                ? 'الملاعبي يحل الرابط اللي جاه في الواتساب في Safari.'
                : 'Le joueur ouvre le lien WhatsApp dans Safari sur son iPhone.'}
            </li>
            <li>
              {lang === 'tn'
                ? 'ينزل على زر المشاركة لوطا (المربع وفيه سهم طالع لفوق ⎋).'
                : 'Appuyez sur le bouton Partager en bas (le carré avec une flèche vers le haut ⎋).'}
            </li>
            <li>
              <span className="font-bold text-white">
                {lang === 'tn' ? 'يهبط شوية وينزل على "Sur l\'écran d\'accueil" (إضافة إلى الشاشة الرئيسية).' : 'Faites défiler et appuyez sur "Sur l\'écran d\'accueil" (Add to Home Screen).'}
              </span>
            </li>
            <li>
              {lang === 'tn'
                ? 'تولي عندو أبليكاسيون خفيفة وسريعة 100% متوافقة مع الأيفون !'
                : 'L\'application se lance avec fluidité maximale adaptée au format iPhone.'}
            </li>
          </ol>
        </div>

        {/* Cloud Hosting Summary */}
        <div className="bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-800/40 text-xs text-emerald-200 flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {lang === 'tn'
              ? 'كي تبدا التطبيقة وقاعدة البيانات في السيرفر أونلاين (Render/Cloud)، تنجم تخدم بيها في أي وقت وفي أي تيران من غير ما تستحق تفتح البيسي متاعك !'
              : 'Une fois déployée sur un serveur cloud gratuit (Render / Railway), l\'application, le questionnaire et la base de données fonctionnent 24h/24 en ligne sans ordinateur requis.'}
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
          >
            {lang === 'tn' ? 'واضح' : 'Compris'}
          </button>
        </div>
      </div>
    </div>
  );
};
