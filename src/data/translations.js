// Dictionnaire bilingue Français & Arabe Tunisien parlé (Derja)
export const translations = {
  fr: {
    appTitle: "MS MedicalDiag",
    appSubtitle: "Staff Médical : Seif Chaouch (Kiné) • Dr. Malek Masri (Médecin) — Protocoles FIFA",
    kineName: "Seif Chaouch",
    kineRole: "Kinésithérapeute du Sport",
    doctorName: "Dr. Malek Masri",
    doctorRole: "Médecin du Sport",
    medicalStaff: "Staff Médical MS MedicalDiag",
    langName: "Français",
    switchLang: "🇹🇳 التونسي (Derja)",
    
    // Navigation / Modules
    moduleKine: "Cabinet Kiné (Tests FIFA)",
    moduleDiag: "Diagnostic & Imagerie FIFA",
    moduleInbox: "Boîte de Réception & Base de Données",
    modulePlayer: "Questionnaire Joueur (Direct)",
    
    activePatient: "Joueur actif",
    noPatientLoaded: "Aucun joueur chargé",
    newPatient: "Nouveau Joueur",
    
    // Inbox & Database
    inboxTitle: "Boîte de Réception & Base de Données des Joueurs",
    inboxSubtitle: "Mise à jour automatique en temps réel depuis la base de données SQLite.",
    autoSyncOn: "Synchronisation auto : Active (4s)",
    autoSyncOff: "Synchronisation auto : En pause",
    refreshNow: "Actualiser maintenant",
    filterAll: "Tous les dossiers",
    filterNew: "Nouveaux non traités",
    filterInProgress: "En examen clinique",
    filterDone: "Terminés (Diagnostic posé)",
    searchPlaceholder: "Rechercher par nom de joueur, club ou articulation...",
    loadInConsole: "Charger dans la Console Kiné",
    deleteRecord: "Supprimer",
    confirmDelete: "Voulez-vous vraiment supprimer ce dossier de la base de données ?",
    databaseBackup: "Exporter la Base de Données (.json)",
    emptyInbox: "Aucun dossier trouvé dans la base de données pour ce filtre.",
    statusNew: "Nouveau",
    statusInProgress: "En examen",
    statusDone: "Diagnostic posé",
    timeAgoMinutes: "Il y a {m} min",
    timeAgoHours: "Il y a {h} h",
    timeAgoDays: "Il y a {d} j",
    justNow: "À l'instant",

    // Kiné Workflow Steps
    workflowTitle: "Protocole de Prise en Charge Médicale FIFA",
    step1Title: "1. Envoyer le Questionnaire au Joueur",
    step1Desc: "Envoyez le lien au joueur sur WhatsApp pour qu'il réponde en 2 min sur son smartphone.",
    step2Title: "2. Importer le Retour WhatsApp",
    step2Desc: "Collez le message renvoyé par le joueur pour charger automatiquement son bilan.",
    step3Title: "3. Examen Clinique Guidé FIFA",
    step3Desc: "Réalisez les tests orthopédiques selon les recommandations officielles FIFA.",
    step4Title: "4. Diagnostic & Envoi au Joueur",
    step4Desc: "Transmettez le diagnostic vulgarisé en Arabe Tunisien (Derja) et le rapport staff.",

    // Send Questionnaire Modal & Card
    sendQuestionnaireTitle: "Envoyer le Questionnaire au Joueur via WhatsApp",
    sendQuestionnaireSubtitle: "Le joueur clique sur le lien, remplit le Body Chart et les symptômes en Derja tunisienne en moins de 2 minutes, puis vous renvoie ses réponses.",
    playerPhoneLabel: "Numéro WhatsApp du joueur (optionnel)",
    playerPhonePlaceholder: "Ex: 21698123456 ou 98123456 (laisser vide pour choisir dans WhatsApp)",
    btnSendToPlayerWhatsApp: "Envoyer le lien au Joueur via WhatsApp",
    btnCopyInviteLink: "Copier le message d'invitation avec lien",
    inviteCopied: "Message et lien d'invitation copiés !",
    orFillDirectly: "Ou remplir ici en direct avec le joueur présent",

    // Player Form
    playerIdentityTitle: "Identité & Contexte du Joueur",
    playerNameLabel: "Nom & Prénom du Joueur",
    playerNamePlaceholder: "Ex: Youssef Msakni",
    clubLabel: "Club / Équipe",
    clubPlaceholder: "Ex: Espérance ST, Club Africain, Étoile SS, CSS...",
    positionLabel: "Poste sur le terrain",
    positions: {
      goalkeeper: "Gardien de but",
      centerBack: "Défenseur central",
      fullBack: "Latéral (Arrière gauche/droit)",
      defMidfielder: "Milieu défensif (Pivôt)",
      attMidfielder: "Milieu offensif (Meneur / Relayeur)",
      winger: "Ailier",
      striker: "Attaquant de pointe",
    },
    timingLabel: "Moment d'apparition de la douleur",
    timings: {
      match: "En plein Match officiel",
      training: "À l'Entraînement",
      gradual: "Douleur progressive / Insidieuse",
    },
    
    // Body Chart & Pain
    bodyChartTitle: "Localisation de la blessure",
    bodyChartSubtitle: "Clique sur la zone exacte où se situe ta douleur",
    frontView: "Vue de Face",
    backView: "Vue de Dos",
    selectSubzone: "Précise la sous-zone :",
    painScaleTitle: "Intensité de la douleur (Échelle EVA)",
    painAtRest: "Au repos",
    painMoving: "En marchant / En courant",
    painAtAction: "Au geste technique football (frappe, duel, tacle, appui)",
    
    // Anamnesis
    anamnesisTitle: "Mécanisme & Sensations Immédiates (FIFA)",
    mechanismQuestion: "Comment la blessure s'est-elle produite ?",
    mechanismContact: "Contact direct avec un adversaire (tacle, choc, coup)",
    mechanismNonContact: "Sans contact (changement de direction brusque, pivot, sprint, saut)",
    mechanismOveruse: "Progressif sans traumatisme aigu",
    
    popQuestion: "As-tu entendu ou ressenti un craquement audible ('POP') ?",
    popYes: "Oui, un craquement net ('Pop')",
    popNo: "Non, aucun craquement",
    
    instabilityQuestion: "As-tu ressenti une sensation de déboîtement ou d'instabilité immédiate ?",
    instabilityYes: "Oui, l'articulation a semblé 'partir' ou flotter",
    instabilityNo: "Non, pas de sensation d'instabilité",
    
    blockQuestion: "Y a-t-il eu un blocage vrai (impossibilité physique d'étendre ou plier) ?",
    blockYes: "Oui, blocage articulaire complet",
    blockNo: "Non, pas de blocage",
    
    swellingQuestion: "Quand le gonflement (tuméfaction) est-il apparu ?",
    swellingImmediate: "Immédiat (< 2 heures) = Suspicion hémarthrose",
    swellingDelayed: "Retardé (le lendemain / après 12-24h)",
    swellingNone: "Pas de gonflement visible",
    
    playableQuestion: "As-tu pu continuer à jouer après la blessure ?",
    playableYes: "Oui, j'ai pu terminer ou continuer un peu",
    playableNo: "Non, sortie immédiate sur civière / boiterie totale",
    
    nerveQuestion: "Ressens-tu des fourmillements, engourdissements ou décharges électriques ?",
    nerveYes: "Oui, décharges ou perte de sensibilité",
    nerveNo: "Non, aucune sensation électrique",
    
    // WhatsApp Output
    generateSummary: "Générer le Bilan & Envoyer au Kiné",
    whatsappTitle: "Message WhatsApp Prêt pour le Kiné",
    sendToKineWhatsApp: "Envoyer au Kiné sur WhatsApp",
    copyMessage: "Copier le message complet",
    copiedSuccess: "Message copié dans le presse-papiers !",
    
    // Kiné Module
    kineImportTitle: "Importation & Décodage du Retour Joueur",
    kineImportSubtitle: "Collez ici le message WhatsApp renvoyé par le joueur pour charger son bilan instantanément.",
    pastePlaceholder: "Collez ici le message WhatsApp du joueur contenant le [CODE_FIFA: ...]...",
    decodeButton: "Décoder la fiche joueur",
    directExamButton: "Ou faire un Examen Clinique Direct",
    decodedSuccess: "Fiche joueur décodée avec succès !",
    errorDecoding: "Code invalide ou introuvable dans le texte.",
    
    playerSummaryCard: "Fiche Anamnèse du Joueur",
    suspectedRegion: "Articulation ciblée :",
    fifaPriorityTests: "Tests Cliniques Spécifiques FIFA",
    fifaTestsSubtitle: "Réalisez les tests selon le protocole officiel du FIFA Diploma in Football Medicine",
    sayToPlayerDerja: "Consigne à dire au joueur (en Derja) :",
    
    testResults: {
      positive: "Positif (+)",
      negative: "Négatif (-)",
      painOnly: "Douleur seule",
      notFeasible: "Non réalisable",
    },
    
    ottawaChecklistTitle: "Vérification des Critères d'Ottawa (FIFA)",
    launchDiagnosis: "Calculer le Diagnostic & l'Imagerie FIFA",
    
    // Diagnostic Module
    redFlagsTitle: "ALERTES DRAPEAUX ROUGES (RED FLAGS FIFA)",
    redFlagsWarning: "Attention : Signes d'alarme détectés nécessitant une prise en charge médicale urgente !",
    noRedFlags: "Aucun drapeau rouge d'urgence chirurgicale immédiate détecté.",
    
    mainDiagnosis: "Diagnostic Clinique Principal Retenu",
    confidenceScore: "Indice de Confiance Clinique :",
    differentials: "Diagnostics Différentiels à Considérer :",
    
    imagingTitle: "Arbre Décisionnel d'Imagerie Médicale (FIFA)",
    radiography: "Radiographie Standard",
    ultrasound: "Échographie Musculo-Squelettique",
    mri: "Imagerie par Résonance Magnétique (IRM)",
    noImagingNeeded: "Aucune imagerie nécessaire selon les critères d'exclusion FIFA",
    
    sendDiagToPlayerTitle: "Envoyer le Diagnostic au Joueur sur WhatsApp (en Arabe Tunisien Derja)",
    sendDiagToPlayerBtn: "Envoyer l'Explication au Joueur sur WhatsApp (Derja)",
    playerExplanationBox: "Explication vulgarisée pour le Joueur (en Derja)",
    staffReportBox: "Rapport Médical Technique (Staff & Médecin du Club)",
    copiedDiagPlayer: "Explication en Tunisien copiée !",
    
    printReport: "Imprimer / Exporter PDF",
    shareStaffWhatsApp: "Partager Staff (WhatsApp FR)",
    sharePlayerWhatsApp: "Partager Joueur (WhatsApp Derja)",
    
    resetExam: "Réinitialiser / Nouveau Cas",
  },
  
  tn: {
    appTitle: "MS MedicalDiag",
    appSubtitle: "الإطار الطبي : سيف الشاوش (أخصائي علاج طبيعي) • د. مالك المصري (طبيب) — بروتوكول FIFA الطبي",
    kineName: "سيف الشاوش",
    kineRole: "أخصائي العلاج الطبيعي الرياضي (كيني)",
    doctorName: "د. مالك المصري",
    doctorRole: "طبيب الطب الرياضي",
    medicalStaff: "الإطار الطبي MS MedicalDiag",
    langName: "التونسي (Derja)",
    switchLang: "🇫🇷 Français",
    
    // Navigation / Modules
    moduleKine: "عيادة الكيني (فحوصات FIFA)",
    moduleDiag: "التشخيص والتصوير الطبي",
    moduleInbox: "صندوق الوارد وقاعدة البيانات",
    modulePlayer: "استبيان الملاعبي (مباشر)",
    
    activePatient: "الملاعبي الحالي",
    noPatientLoaded: "ما فماش ملاعبي مسجل",
    newPatient: "ملاعبي جديد",
    
    // Inbox & Database
    inboxTitle: "صندوق الوارد وقاعدة بيانات الملاعبية",
    inboxSubtitle: "تحيين تلقائي ومباشر من قاعدة بيانات SQLite في الوقت الفعلي.",
    autoSyncOn: "تحيين تلقائي : شغال (كل 4 ثواني)",
    autoSyncOff: "التحيين واقف",
    refreshNow: "حيّن توا",
    filterAll: "الملفات الكل",
    filterNew: "ملفات جديدة",
    filterInProgress: "بصدد الفحص",
    filterDone: "التشخيص حاضر",
    searchPlaceholder: "لوج باسم الملاعبي، الجمعية ولا المفصل...",
    loadInConsole: "حل الدوسي في عيادة الكيني",
    deleteRecord: "تفسيخ",
    confirmDelete: "متأكد تحب تفسخ هذا الملف من قاعدة البيانات نهائيا؟",
    databaseBackup: "تحميل نسخة من قاعدة البيانات (.json)",
    emptyInbox: "ما فما حتى ملف في قاعدة البيانات حسب هذا الفلتر.",
    statusNew: "جديد",
    statusInProgress: "بصدد الفحص",
    statusDone: "التشخيص حاضر",
    timeAgoMinutes: "منذ {m} دقيقة",
    timeAgoHours: "منذ {h} ساعة",
    timeAgoDays: "منذ {d} يوم",
    justNow: "توا توا",

    // Kiné Workflow Steps
    workflowTitle: "بروتوكول التكفل الطبي حسب الـ FIFA",
    step1Title: "1. ابعث الاستبيان للملاعبي ع الواتساب",
    step1Desc: "ابعث الرابط للملاعبي باش يجاوب في دقيقتين على تيلفونو بالتونسي.",
    step2Title: "2. حط إجابات الملاعبي في التطبيقة",
    step2Desc: "كولي الميساج اللي رجعهولك الملاعبي باش تطلع الفيشة متاعو طول.",
    step3Title: "3. الفحص السريري الدقيق للـ FIFA",
    step3Desc: "اعمل التيستوات حسب الدبلوم الطبي الرسمي للفيفا.",
    step4Title: "4. التشخيص وبعثان التقرير بالتونسي",
    step4Desc: "ابعث التشخيص المبسط بالدارجة التونسية للملاعبي ع الواتساب.",

    // Send Questionnaire Modal & Card
    sendQuestionnaireTitle: "ابعث الاستبيان للملاعبي ع الواتساب (WhatsApp)",
    sendQuestionnaireSubtitle: "الملاعبي يحل الرابط في تيلفونو، يحدد البلاصة وقوة الوجعة بالتونسي في دقيقة، ويبعثلك الإجابات حاضرة.",
    playerPhoneLabel: "نمرة الواتساب متاع الملاعبي (اختياري)",
    playerPhonePlaceholder: "مثال: 98123456 أو 21698123456 (تنجم تخليها فارغة وتختار من الواتساب)",
    btnSendToPlayerWhatsApp: "ابعث رابط الاستبيان للملاعبي ع الواتساب",
    btnCopyInviteLink: "أنسخ ميساج الاستدعاء والرابط",
    inviteCopied: "تم نسخ الميساج ورابط الاستبيان بنجاح !",
    orFillDirectly: "ولا عمر الاستبيان مباشرة مع الملاعبي إذا كان بحذاك",

    // Player Form
    playerIdentityTitle: "معلومات الملاعبي والضربة",
    playerNameLabel: "اسم ولقب الملاعبي",
    playerNamePlaceholder: "مثال: يوسف المساكني",
    clubLabel: "الجمعية / الفريق",
    clubPlaceholder: "مثال: الترجي، الإفريقي، النجم، السي آس آس...",
    positionLabel: "البوست في التيران",
    positions: {
      goalkeeper: "ڨول (حارس مرمى)",
      centerBack: "ستوبار / أكسيال (مدافع محوري)",
      fullBack: "أريار (ظهير أيمن / أيسر)",
      defMidfielder: "بيفو (فكاك / وسط دفاعي)",
      attMidfielder: "ريلايور / صانع ألعاب (وسط هجومي)",
      winger: "جناح (Ailier)",
      striker: "قلب هجوم (Attaquant de pointe)",
    },
    timingLabel: "وقتاش حسيت بالوجعة أول مرة؟",
    timings: {
      match: "في قلب طرح رسمي (Match)",
      training: "في التمارين (Entraînement)",
      gradual: "بشوية بشوية كل نهار تزيد",
    },
    
    // Body Chart & Pain
    bodyChartTitle: "وين توجع فيك بالضبط؟",
    bodyChartSubtitle: "انزل ع البلاصة اللي توجع فيك في التصويرة",
    frontView: "من القدام (Face)",
    backView: "من التالي / الظهر (Dos)",
    selectSubzone: "حدد البلاصة بالضبط وين :",
    painScaleTitle: "قداش قوة الوجعة من 0 لـ 10 (EVA) ؟",
    painAtRest: "كي تبدا مرتاح راقد",
    painMoving: "كي تمشي ولا تجري",
    painAtAction: "كي تشوط كورة، تنقز، ولا تلتحم مع ملاعبي",
    
    // Anamnesis
    anamnesisTitle: "كيفاش صارت الضربة والأحاسيس الأولى (FIFA)",
    mechanismQuestion: "كيفاش صارتلك الضربة بالتفصيل؟",
    mechanismContact: "ضربة كونتاكت مع ملاعبي (تاكل، دزة، صدمة)",
    mechanismNonContact: "وحدي من غير كونتاكت (دورة سريعة، كروشيه، سبرينت، تنقيزة)",
    mechanismOveruse: "وجعة قديمة كل مرة تزيد مع الشوط والمجهود",
    
    popQuestion: "سمعت صوت طرطقة ('طرطق / POP') وقت الضربة؟",
    popYes: "إي، سمعت وحسيت طرطقة واضحة (Pop)",
    popNo: "لا، ما سمعت حتى صوت",
    
    instabilityQuestion: "حسيت المفصل باش 'يفلت' من بلاصتو ولا ماهوش شاد روحو؟",
    instabilityYes: "إي، حسيت الركبة / المفصل فلت ومشى وجاء",
    instabilityNo: "لا، المفصل شاد بلاصتو",
    
    blockQuestion: "تبلوكات البلاصة وماتنجمش تحلها ولا تسكرها جملة؟",
    blockYes: "إي، تبلوكات وما نجمتش نسرحها (Blocage)",
    blockNo: "لا، تتحرك عادي مع شوية وجعة",
    
    swellingQuestion: "وقتاش تنفخت البلاصة؟",
    swellingImmediate: "في ساعتها فيسع (أقل من ساعتين) = شك كبير في نزيف/دم",
    swellingDelayed: "من غدوة الصباح (بعد 12 لـ 24 ساعة)",
    swellingNone: "ما تنفختش جملة",
    
    playableQuestion: "جمّعت تكمل اللعب ولا خرجت طول؟",
    playableYes: "إي، كملت لعبت شوية بالسيف",
    playableNo: "لا، خرجت طول وما نجمتش حتى نحط ساقي ع القاعة",
    
    nerveQuestion: "فماش تنميل، ضو يضرب، ولا تحس صوابعك ميتين؟",
    nerveYes: "إي، فما ضو يضرب ولا تنميل (Fourmillement)",
    nerveNo: "لا، وجعة عادية ما فماش تنميل",
    
    // WhatsApp Output
    generateSummary: "طلع التقرير وابعث للكيني ع الواتساب",
    whatsappTitle: "ميساج الواتساب حاضر للكيني",
    sendToKineWhatsApp: "ابعث للكيني ع الواتساب (WhatsApp)",
    copyMessage: "أنسخ الميساج الكل",
    copiedSuccess: "تم نسخ الميساج بنجاح !",
    
    // Kiné Module
    kineImportTitle: "تعدية وفتح كود الملاعبي",
    kineImportSubtitle: "حط الميساج ولا الكود اللي بعثهولك الملاعبي عالواتساب باش تطلعلو الفيشة متاعو طول",
    pastePlaceholder: "كولي الميساج ولا الكود [CODE_FIFA: ...] هوني...",
    decodeButton: "فك الكود وطلع الدوسي",
    directExamButton: "ولا ابدا فحص مباشر من غير كود",
    decodedSuccess: "تم فك كود الملاعبي بنجاح !",
    errorDecoding: "الكود غالط ولا ماهوش موجود في النص.",
    
    playerSummaryCard: "فيشة أنامنيز الملاعبي (Anamnèse)",
    suspectedRegion: "المفصل المصاب :",
    fifaPriorityTests: "التيستوات الكلينيكية الخاصة بالـ FIFA",
    fifaTestsSubtitle: "قم بالفحوصات حسب بروتوكول الدبلوم الطبي للفيفا (FIFA Diploma)",
    sayToPlayerDerja: "شنوة تقول للملاعبي بالتونسية باش يرخف ويعاونك :",
    
    testResults: {
      positive: "إيجابي (+) Positif",
      negative: "سلبي (-) Négatif",
      painOnly: "وجعة برك (Douleur)",
      notFeasible: "ما ينجمش يتعمل (Non réalisable)",
    },
    
    ottawaChecklistTitle: "تثبت من معايير أوتاوا (Critères d'Ottawa)",
    launchDiagnosis: "احسب التشخيص والتصوير الطبي (FIFA)",
    
    // Diagnostic Module
    redFlagsTitle: "علامات الخطر القصوى (RED FLAGS FIFA)",
    redFlagsWarning: "رد بالك : فما علامات خطر تستوجب تدخل طبي أو جراحي عاجل !",
    noRedFlags: "ما فما حتى علامة خطر استعجالية.",
    
    mainDiagnosis: "التشخيص الكلينيكي الرئيسي للـ FIFA",
    confidenceScore: "نسبة التأكد الطبي (Indice de Confiance) :",
    differentials: "احتمالات أخرى لازم تفكر فيها (Diagnostics Différentiels) :",
    
    imagingTitle: "شجرة قرار التصوير الطبي حسب الفيفا (Imagerie FIFA)",
    radiography: "تصويرة الراديو العادية (Radiographie)",
    ultrasound: "الإيكوغرافية (Échographie)",
    mri: "الرنين المغناطيسي (IRM)",
    noImagingNeeded: "ما فما حتى داعي للتصوير حسب معايير الإقصاء للفيفا",
    
    sendDiagToPlayerTitle: "ابعث التشخيص المبسط للملاعبي ع الواتساب (بالتونسي Derja)",
    sendDiagToPlayerBtn: "ابعث التشخيص للملاعبي ع الواتساب (بالتونسي)",
    playerExplanationBox: "تفسير مبسط وواضح للملاعبي بالتونسي",
    staffReportBox: "التقرير الطبي التقني لطبيب وستاف الفريق (بالفرنسية)",
    copiedDiagPlayer: "تم نسخ التفسير بالتونسي بنجاح !",
    
    printReport: "اطبع / خبي PDF",
    shareStaffWhatsApp: "بارتاجي مع الستاف (WhatsApp FR)",
    sharePlayerWhatsApp: "بارتاجي مع الملاعبي (WhatsApp تونسي)",
    
    resetExam: "عاود من الأول / حالة جديدة",
  }
};
