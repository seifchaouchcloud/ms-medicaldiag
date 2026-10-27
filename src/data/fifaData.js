// Base de données médicale officielle - FIFA Diploma in Football Medicine & Guides F-MARC
// Contient les 8 régions anatomiques, tests cliniques, sous-zones, critères d'Ottawa / Red Flags et orientation imagerie.

export const REGIONS_DATA = {
  genou: {
    id: "genou",
    nameFr: "Genou",
    nameAr: "الركبة (Rokba)",
    phonetic: "Rokba",
    icon: "Activity",
    view: "both",
    subzones: [
      { id: "genou_lca", labelFr: "Pivot central / Profond (LCA / LCP)", labelAr: "في القلب لداخل (الرباط الصليبي)" },
      { id: "genou_medial", labelFr: "Interligne interne & LLI (Ménisque médial)", labelAr: "من الشيرة الدخلانية (المينيسك الداخلي والرباط LLI)" },
      { id: "genou_lateral", labelFr: "Interligne externe & LLE (Ménisque latéral)", labelAr: "من الشيرة البرانية (المينيسك الخارجي والرباط LLE)" },
      { id: "genou_patellaire", labelFr: "Appareil extenseur / Rotule / Tendon rotulien", labelAr: "عظمة الركبة (الصابونة) وعرق الركبة" },
      { id: "genou_poplite", labelFr: "Creux poplité (Arrière du genou)", labelAr: "خلف الركبة من التالي" },
    ],
    tests: [
      {
        id: "lachman",
        nameFr: "Lachman Test (30° flexion)",
        nameAr: "اختبار لاخمان (Lachman)",
        target: "Ligament Croisé Antérieur (LCA)",
        techniqueFr: "Patient décubitus dorsal, genou à 20-30° de flexion, stabiliser le fémur distal d'une main et appliquer une traction antérieure ferme sur le tibia proximal. Évaluer l'arrêt (ferme ou mou/absent) et la translation tibiale en millimètres.",
        instructionDerja: "أرقد مرتاح ع الظهر، رخّف فخذك وساقك جملة ما تكبسش، باش نجبد قصبة ساقك لقدام.",
        positiveMeaningFr: "Arrêt mou ou translation antérieure augmentée (> 3-5 mm par rapport au côté sain) = Rupture du LCA.",
        positiveMeaningAr: "رخاوة واضحة في قصبة الساق = تقطع في الرباط الصليبي لقدامي (LCA).",
        stats: "Sensibilité : 85-95%, Spécificité : 94-98% (Gold Standard FIFA).",
        weight: 35,
        targetPathology: "rupture_lca"
      },
      {
        id: "pivot_shift",
        nameFr: "Pivot Shift Test (Ressaut rotatoire)",
        nameAr: "اختبار البيفو شيفت (Pivot Shift)",
        target: "Instabilité rotatoire antéro-latérale (LCA)",
        techniqueFr: "Patient en décubitus dorsal relâché. Membre inférieur en extension et rotation interne, appliquer une contrainte en valgus tout en fléchissant le genou. Rechercher une subluxation antérieure du tibia à 20-30° puis un ressaut réducteur brutal.",
        instructionDerja: "رخف روحك ع الآخر، باش ندورلك ساقك ونتنيها، كان حسيت الركبة تفلت ما تخافش.",
        positiveMeaningFr: "Ressaut audible ou palpable de réduction tibiale = Rupture complète du LCA avec instabilité rotatoire.",
        positiveMeaningAr: "تحس الركبة خرجت ورجعت برقصة = تقطع كامل في الرباط الصليبي مع عدم استقرار المفصل.",
        stats: "Sensibilité : 24-70%, Spécificité : 98-99% (Hautement pathognomonique).",
        weight: 30,
        targetPathology: "rupture_lca"
      },
      {
        id: "tiroir_anterieur",
        nameFr: "Tiroir Antérieur à 90°",
        nameAr: "الدرج الأمامي (Tiroir Antérieur)",
        target: "Ligament Croisé Antérieur (LCA)",
        techniqueFr: "Genou fléchi à 90°, pied calé par la cuisse de l'examinateur, traction antérieure bilatérale sur le haut du tibia.",
        instructionDerja: "اثني ركبتك 90 درجة ورخف العضلات، باش نجبد الساق لقدام.",
        positiveMeaningFr: "Translation antérieure tibiale augmentée.",
        positiveMeaningAr: "قصبة الساق تخرج لقدام أكثر من اللازم.",
        stats: "Moins sensible en aigu que Lachman en raison du spasme des ischio-jambiers.",
        weight: 15,
        targetPathology: "rupture_lca"
      },
      {
        id: "valgus_stress_30",
        nameFr: "Stress en Valgus à 30° et 0°",
        nameAr: "ضغط الفالغوس (Valgus Stress)",
        target: "Ligament Collatéral Médial (LLI / LCM)",
        techniqueFr: "À 30° de flexion pour isoler le LLI, puis à 0° d'extension pour évaluer la capsule postérieure. Appliquer une force en valgus (abduction de jambe) tout en fixant le fémur.",
        instructionDerja: "ساقك مسرحة ومبعد متنية شوية، باش ندز ركبتك للداخل ونميل الكاحل لبرا.",
        positiveMeaningFr: "Bâillement interne ou douleur vive reproduite à l'insertion fémorale/tibiale du LLI.",
        positiveMeaningAr: "وجعة حادة ولا فجوة في شيرة الركبة الدخلانية = تمطط أو تقطع في رباط LLI.",
        stats: "Sensibilité : 86-90% pour entorse du LLI.",
        weight: 25,
        targetPathology: "entorse_lli"
      },
      {
        id: "mcmurray",
        nameFr: "Test de McMurray (Ménisques)",
        nameAr: "اختبار ماكموراي (McMurray)",
        target: "Lésions méniscales interne et externe",
        techniqueFr: "Genou fléchi au maximum. Pour le ménisque médial : rotation externe du tibia et valgus tout en étendant le genou. Pour le ménisque latéral : rotation interne et varus tout en étendant.",
        instructionDerja: "باش نتني ركبتك للآخر وندور كعبك ونسرح بشوية، قلي كان حسيت بقرصة ولا طرطقة توجع.",
        positiveMeaningFr: "Claquement audible/palpable douloureux à l'interligne articulaire.",
        positiveMeaningAr: "طرطقة مع وجعة في خط المفصل = تمزق في المينيسك (Gris / Ménisque).",
        stats: "Spécificité : 90-95%, Sensibilité : 50-70%.",
        weight: 25,
        targetPathology: "lesion_meniscale"
      },
      {
        id: "thessaly",
        nameFr: "Test de Thessaly à 20° de flexion",
        nameAr: "اختبار ثيسالي الديناميكي (Thessaly)",
        target: "Lésions méniscales en charge dynamique",
        techniqueFr: "Patient debout en appui unipodal sur le genou blessé fléchi à 20°, se tenant aux mains du kiné. Réaliser 3 rotations internes et externes du tronc/fémur.",
        instructionDerja: "اقف على ساقك الموجوعة متنية شوية 20 درجة، ودور بدنك لليمين ولليسار 3 مرات.",
        positiveMeaningFr: "Douleur ou sensation de blocage/accrochage sur l'interligne.",
        positiveMeaningAr: "وجعة في خط الركبة ولا حصرة تمنع الحركة.",
        stats: "Sensibilité : 89-92%, Spécificité : 97% (Recommandé par la FIFA).",
        weight: 25,
        targetPathology: "lesion_meniscale"
      },
      {
        id: "choc_rotulien",
        nameFr: "Choc Rotulien / Signe du Glaçon",
        nameAr: "علامة الرشف والماء في الركبة (Choc Rotulien)",
        target: "Épanchement intra-articulaire aigu (Hémarthrose)",
        techniqueFr: "Refouler le cul-de-sac sous-quadricipital d'une main, appuyer verticalement sur la rotule avec l'autre index. Rechercher un contact osseux avec rebond élastique.",
        instructionDerja: "نعصر الفخذ ونهبط الصابونة، نثبتو فما ماء ولا دم في المفصل.",
        positiveMeaningFr: "Sensation de rotule flottante qui heurte la trochlée fémorale = Épanchement abondant (> 30-50 ml).",
        positiveMeaningAr: "عظمة الصابونة تعوم = المفصل معبي بالماء ولا الدم (Hémarthrose).",
        stats: "Indique 70% de probabilité de rupture du LCA si post-traumatique < 2h.",
        weight: 20,
        targetPathology: "rupture_lca"
      },
    ],
    redFlags: [
      { id: "rf_locked_knee", labelFr: "Genou bloqué en flexion (Anse de panier luxée)", labelAr: "ركبة مبلوكية ما تسرحش جملة (Blocage en flexion)" },
      { id: "rf_extensor_rupture", labelFr: "Perte de l'extension active (Rupture tendon rotulien ou quadricipital)", labelAr: "ما ينجمش يهز ساقو مسرحة في الهواء (تقطع عرق الصابونة)" },
      { id: "rf_neuro_vasc", labelFr: "Pouls poplité/pédieux aboli ou engourdissement pied (Lésion artère poplitée / nerf SPE)", labelAr: "الساق باردة ولا النبض مفقود ولا صوابع القدم طايحين" },
    ],
    pathologies: {
      rupture_lca: {
        id: "rupture_lca",
        nameFr: "Rupture du Ligament Croisé Antérieur (LCA) +/- Lésion Méniscale",
        nameAr: "تقطع في الرباط الصليبي لقدامي (LCA) مع احتمال ضرر في المينيسك",
        explanationDerja: "الضربة هذي معروفة برشا عند الملاعبية: وقت اللي دارت بيك ركبتك سمعت صوت طرطقة (Pop) والمفصل فلت في ساعتها وتنفخت الركبة بالدم في أقل من ساعتين. التيستوات متاع الفيفا (Lachman) أكدت وجود رخاوة في الركبة. لازم تصويرة IRM في أقرب وقت باش نثبتو في حالة الصليبي والمينيسك، وبداية بروتوكول الراحة والثلج وتقوية العضلات.",
        technicalRationaleFr: "Mécanisme typique sans contact en valgus-flexion-rotation externe ou hyperextension, sensation de craquement audible ('POP') avec hémarthrose immédiate (<2h). Lachman et/ou Pivot Shift positifs. Selon les recommandations FIFA, une IRM du genou est formellement indiquée.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 24h",
            viewsFr: "Genou face en charge + Profil strict à 30° + Défilé fémoro-patellaire",
            viewsAr: "راديو الركبة من القدام والجنب",
            rationaleFr: "Éliminer une fracture ostéochondrale ou avulsion de l'épine tibiale / fracture de Segond (pathognomonique du LCA).",
            rationaleAr: "للتأكد ما فماش كسر ولا قشرة عظم مقلوعة مع الرباط."
          },
          ultrasound: {
            required: false,
            delayFr: "Non indiquée en première intention pour le LCA",
            delayAr: "الإيكو ما تورّيش الرباط الصليبي في عمق المفصل",
            rationaleFr: "Ne visualise pas le pivot central intra-articulaire. Utile uniquement si suspicion d'atteinte périphérique associée (LLI / tendon rotulien).",
            rationaleAr: "الإيكو تفيد كان في الأربطة السطحية من برا."
          },
          mri: {
            required: true,
            urgency: "Recommandée sous 48-72h (Gold Standard FIFA)",
            protocolFr: "IRM du genou : Coupes sagittales obliques orientées sur le trajet du LCA, coronales et axiales T2 Fat-Sat / DP.",
            protocolAr: "تصويرة الرنين المغناطيسي (IRM) للركبة لتقييم تقطع الصليبي وحالة المينيسك والغضروف.",
            rationaleFr: "Confirmer la rupture (partielle vs complète), cartographier les lésions méniscales associées et dépister les impactions osseuses (bone bruise des condyles fémoraux et plateaux tibiaux).",
            rationaleAr: "تأكيد التقطع بالتدقيق ومعرفة هل المينيسك متضرر ولا لا."
          }
        }
      },
      entorse_lli: {
        id: "entorse_lli",
        nameFr: "Entorse du Ligament Collatéral Médial (LLI / LCM) - Grade I / II / III",
        nameAr: "تمطط أو تقطع في الرباط الداخلي للركبة (LLI)",
        explanationDerja: "الضربة جاتك من الشيرة البرانية ودزت الركبة للداخل (Valgus)، الوجعة مركزة في خط الركبة الداخلي. تيست الفالغوس إيجابي مع وجعة عند الضغط. الأغلبية الساحقة تطيب بالترويض الوظيفي والأربطة الرياضية من غير جراحة إذا كان الصليبي سليم.",
        technicalRationaleFr: "Traumatisme en valgus forcé (contact direct face latérale ou pied fixé au sol). Douleur vive à la palpation de l'insertion fémorale ou tibiale du LLI, douleur ou bâillement au valgus stress à 30° de flexion.",
        imaging: {
          radiography: {
            required: false,
            urgency: "Optionnelle sauf si douleur osseuse exquise",
            viewsFr: "Face + Profil",
            viewsAr: "راديو عادي",
            rationaleFr: "Éliminer un arrachement cortical (avulsion de Pellegrini-Stieda si ancien).",
            rationaleAr: "استبعاد قلع عظمي."
          },
          ultrasound: {
            required: true,
            delayFr: "Idéale à 48-72h",
            delayAr: "بعد 48 لـ 72 ساعة",
            rationaleFr: "Excellente visualisation dynamique du LLI (épaississement, rupture fibrillaire ou discontinuité complète, hématome sous-ligamentaire).",
            rationaleAr: "الإيكو ممتازة وتوري بالضبط درجة التمزق في الرباط السطحي."
          },
          mri: {
            required: false,
            urgency: "Indiquée seulement si Grade III (laxité franche à 0°) ou doute sur le LCA/Ménisque associé",
            protocolFr: "IRM standard genou en séquences coronales T2 FS",
            protocolAr: "IRM إذا فما شك في تضرر الرباط الصليبي زادة",
            rationaleFr: "Évaluer une atteinte combinée du pivot central ou du complexe méniscal médial.",
            rationaleAr: "التأكد من سلامة بقية المفصل."
          }
        }
      },
      lesion_meniscale: {
        id: "lesion_meniscale",
        nameFr: "Lésion Méniscale Traumatique (Interne ou Externe)",
        nameAr: "تمزق أو انقسام في غضروف المينيسك (Ménisque)",
        explanationDerja: "صارتلك دورة في الركبة مع ثقل البدن، وحسيت بقرصة داخلية في خط المفصل، مع صعوبة في ثني الركبة للآخر. تيست ماكموراي وثيسالي إيجابيين. يلزمنا تصويرة IRM باش نشوفو حجم التمزق وهل هو في البلاصة اللي تنجم تلحم بالترويض ولا يستحق تدخل بالمنظار.",
        technicalRationaleFr: "Mécanisme de torsion en charge ou hyperflexion brutale. Douleur localisée à l'interligne fémoro-tibial, tests de provocation méniscale positifs (McMurray, Thessaly). Épanchement retardé (24-48h).",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 48h",
            viewsFr: "Cliché de Schuss (Face à 45° en charge) + Profil",
            viewsAr: "راديو الركبة في وضعية Schuss",
            rationaleFr: "Évaluer le pincement articulaire et éliminer un corps étranger ostéochondral.",
            rationaleAr: "التأكد من المسافة بين العظام."
          },
          ultrasound: {
            required: false,
            delayFr: "Non contributive",
            delayAr: "غير مجدية للمينيسك العميق",
            rationaleFr: "L'échographie ne permet pas d'explorer l'ensemble de la corne postérieure méniscale.",
            rationaleAr: "الإيكو ما توريش داخل المفصل."
          },
          mri: {
            required: true,
            urgency: "Recommandée sous 1 semaine (ou urgence si genou bloqué)",
            protocolFr: "IRM genou : coupes coronales et sagittales T2 / DP Fat-Sat fines (< 3mm)",
            protocolAr: "IRM بدقة عالية لكشف نوع التمزق (Fissure / Anse de panier)",
            rationaleFr: "Préciser le type de lésion (anse de panier, clapet, horizontale, radiaire) et la zone de vascularisation (zone rouge-rouge suturable vs blanche).",
            rationaleAr: "معرفة إمكانية خياطة المينيسك للحفاظ عليه للمستقبل الرياضي."
          }
        }
      }
    }
  },

  cheville: {
    id: "cheville",
    nameFr: "Cheville",
    nameAr: "الكعبورة / الكاحل (Kaaboura)",
    phonetic: "Kaaboura",
    icon: "ShieldAlert",
    view: "both",
    subzones: [
      { id: "cheville_malleole_ext", labelFr: "Malléole externe & Faisceau antérieur (LTFA / LCF)", labelAr: "العظمة البرانية للكعبورة وأربطة LTFA" },
      { id: "cheville_syndesmose", labelFr: "Syndesmose tibio-fibulaire (Haut de cheville)", labelAr: "الرباط العالي بين عظمتي الساق (Syndesmose)" },
      { id: "cheville_malleole_int", labelFr: "Malléole interne & Ligament deltoïde", labelAr: "العظمة الدخلانية ورباط الدلتويد" },
      { id: "cheville_achille", labelFr: "Tendon d'Achille & Région calcanéenne", labelAr: "عرق الصاباط لتالي (Tendon d'Achille)" },
      { id: "cheville_m5", labelFr: "Base du 5ème métatarsien (Bord externe du pied)", labelAr: "عظمة مشط القدم البرانية (Base 5e Méta)" },
    ],
    ottawaRules: [
      { id: "ottawa_lat_malleolus", labelFr: "Douleur exquise à la palpation du bord postérieur ou de la pointe des 6 derniers cm de la malléole latérale", labelAr: "وجعة حادة كي تنزل على الـ 6 سم اللخرانين من العظمة البرانية للكعبورة" },
      { id: "ottawa_med_malleolus", labelFr: "Douleur exquise à la palpation du bord postérieur ou de la pointe des 6 derniers cm de la malléole médiale", labelAr: "وجعة حادة في الـ 6 سم اللخرانين من العظمة الدخلانية للكعبورة" },
      { id: "ottawa_base_m5", labelFr: "Douleur exquise à la palpation de la base du 5ème métatarsien (bord latéral du pied)", labelAr: "وجعة حادة في العظمة البرانية متع مشط الساق (عظم الصبع الصغير)" },
      { id: "ottawa_naviculaire", labelFr: "Douleur à la palpation de l'os naviculaire (médio-pied médial)", labelAr: "وجعة حادة في العظم الدخلاني لمشط القدم (Naviculaire)" },
      { id: "ottawa_weight_bearing", labelFr: "Impossibilité totale de faire 4 pas en charge complète immédiatement après le traumatisme ET lors de l'examen", labelAr: "ما ينجمش يحط ساقو ويمشي 4 خطوات كاملين فيسع بعد الضربة وتوا في الفحص" },
    ],
    tests: [
      {
        id: "tiroir_ant_cheville",
        nameFr: "Tiroir Antérieur de Cheville",
        nameAr: "الدرج الأمامي للكاحل (Tiroir Antérieur)",
        target: "Ligament Talo-Fibulaire Antérieur (LTFA)",
        techniqueFr: "Patient assis genou fléchi à 90°, stabiliser le bas du tibia d'une main et empaumer le calcanéum de l'autre en imprimant une traction antérieure du talon à 10-15° de flexion plantaire. Évaluer le bâillement et le ressaut.",
        instructionDerja: "أرقد ورخف رجلك وقدمك جملة، باش نثبت قصبة ساقك ونجبد كعبك لقدام.",
        positiveMeaningFr: "Translation antérieure supérieure à 5 mm ou supérieure au côté controlatéral = Rupture complète du LTFA.",
        positiveMeaningAr: "الكعب يخرج لقدام برشة = تقطع في الرباط الأمامي للكعبورة (LTFA).",
        stats: "Sensibilité maximale à 4-5 jours post-traumatisme (92%).",
        weight: 30,
        targetPathology: "entorse_laterale"
      },
      {
        id: "talar_tilt",
        nameFr: "Talar Tilt Test (Bâillement en inversion)",
        nameAr: "اختبار تمايل الكعب (Talar Tilt)",
        target: "Ligament Calcanéo-Fibulaire (LCF)",
        techniqueFr: "Cheville en position neutre (0°), imprimer une bascule du calcanéum en adduction/inversion en bloquant le tibia. Comparer la laxité angulaire.",
        instructionDerja: "باش نميل كعبك للداخل بشوية، شوف فماش رخاوة في الأربطة.",
        positiveMeaningFr: "Bâillement en varus excessif (> 10-15° de différence) = Rupture associée du faisceau moyen (LCF).",
        positiveMeaningAr: "الكاحل يميل برشة لداخل = ضرر في الرباط الثاني LCF (إلتواء درجة ثانية أو ثالثة).",
        stats: "Spécificité : 88%.",
        weight: 25,
        targetPathology: "entorse_laterale"
      },
      {
        id: "squeeze_test_cheville",
        nameFr: "Squeeze Test de la Jambe",
        nameAr: "اختبار عصر الساق (Squeeze Test)",
        target: "Syndesmose tibio-fibulaire (Entorse haute / High Ankle Sprain)",
        techniqueFr: "Comprimer manuellement la fibula contre le tibia à mi-mollet (à distance de la cheville). Observer si la douleur est reproduite au niveau de la syndesmose distale.",
        instructionDerja: "باش نعصر قصبة ساقك في الوسط بيداي، قلي كان حسيت بوجعة تهبط للكعبورة لوطا.",
        positiveMeaningFr: "Douleur distale projetée à la syndesmose = Atteinte du ligament tibio-fibulaire antérieur/postérieur ou membrane interosseuse.",
        positiveMeaningAr: "وجعة تهبط للكعبورة وقت عصر الساق = ضرر في رباط الـ Syndesmose العالي (Entorse haute).",
        stats: "Spécificité : 94% (FIFA: temps d'indisponibilité doublé par rapport à une entorse latérale).",
        weight: 35,
        targetPathology: "entorse_syndesmose"
      },
      {
        id: "kleiger",
        nameFr: "Test de Kleiger (Rotation externe forcée)",
        nameAr: "اختبار كلايغر (Kleiger Test)",
        target: "Syndesmose distale & Ligament deltoïde",
        techniqueFr: "Genou à 90°, cheville à 90°, imprimer une rotation externe forcée du pied tout en stabilisant la jambe.",
        instructionDerja: "باش ندورلك قدمك لبرا بالقوة مع تثبيت الساق.",
        positiveMeaningFr: "Douleur antéro-latérale = Syndesmose ; Douleur médiale = Ligament deltoïde.",
        positiveMeaningAr: "وجعة في الرباط العالي أو الداخلي.",
        stats: "Test clé pour dépister une entorse de syndesmose chez le footballeur.",
        weight: 25,
        targetPathology: "entorse_syndesmose"
      },
      {
        id: "thompson",
        nameFr: "Test de Thompson (Signe du Lacet)",
        nameAr: "اختبار تومبسون لعرق الصاباط (Thompson)",
        target: "Tendon d'Achille (Rupture complète)",
        techniqueFr: "Patient en procubitus (sur le ventre), pieds dépassant de la table de soin. Comprimer énergiquement le mollet transversalement à deux mains et observer la flexion plantaire passive de la cheville.",
        instructionDerja: "أرقد على كرشك ورخف ساقك، باش نعصر عضلة الساق لتالي ونشوف القدم تتحرك ولا لا.",
        positiveMeaningFr: "Absence totale de flexion plantaire à la compression du mollet = RUPTURE COMPLÈTE DU TENDON D'ACHILLE (Urgence chirurgicale).",
        positiveMeaningAr: "القدم ما تتحركش جملة وقت عصر العضلة = تقطع كامل في عرق الصاباط (Tendon d'Achille).",
        stats: "Sensibilité : 96-98%, Spécificité : 98% (Gold standard FIFA).",
        weight: 40,
        targetPathology: "rupture_achille"
      },
    ],
    redFlags: [
      { id: "rf_ottawa_positive", labelFr: "Critères d'Ottawa positifs (Suspicion de fracture malléolaire, bimalléolaire ou 5e métatarsien)", labelAr: "معايير أوتاوا إيجابية: شك كبير في كسر عظم الكعبورة أو مشط الساق" },
      { id: "rf_achilles_rupture", labelFr: "Thompson positif + Dépression palpable du tendon d'Achille (Coup de hache)", labelAr: "علامة تومبسون إيجابية مع فجوة واضحة في عرق الصاباط (تقطع كامل)" },
      { id: "rf_maisonneuve", labelFr: "Douleur au col de la fibula sous le genou associée (Fracture de Maisonneuve)", labelAr: "وجعة في أعلى عظم الساق تحت الركبة مع الكعبورة (Fracture de Maisonneuve)" },
    ],
    pathologies: {
      entorse_laterale: {
        id: "entorse_laterale",
        nameFr: "Entorse du Ligament Collatéral Latéral (LCL) de cheville (Grade I, II ou III)",
        nameAr: "إلتواء في أربطة الكاحل الخارجية (Entorse de cheville)",
        explanationDerja: "الساق تلوات عليك للداخل وقت الركوز (Inversion). الأربطة الخارجية للكعبورة (LTFA وLCF) تمططو ولا تمزقو جزئياً. معايير أوتاوا متاع الفيفا سلبية يعني ما فماش كسر عظم وما تستحقش تصويرة راديو. يلزم بروتوكول PEACE & LOVE، بانداماج وكمادات باردة وبداية الترويض في أقرب وقت للحفاظ على التوازن.",
        technicalRationaleFr: "Mécanisme classique d'inversion/flexion plantaire. Critères d'Ottawa négatifs (aucune radio nécessaire). Douleur à la palpation du LTFA et/ou LCF. Tiroir antérieur modéré sans signe de rupture de syndesmose ni de fracture.",
        imaging: {
          radiography: {
            required: false,
            urgency: "NON INDIQUÉE (Critères d'Ottawa négatifs - Recommandation Formelle FIFA)",
            viewsFr: "Aucun cliché nécessaire si les critères d'Ottawa sont rigoureusement respectés.",
            viewsAr: "ما تستحق حتى راديو حسب معايير الفيفا",
            rationaleFr: "Éviter l'irradiation inutile et le retard de prise en charge fonctionnelle. Ottawa a une sensibilité de 98.5% pour exclure une fracture.",
            rationaleAr: "معايير الفيفا تستبعد وجود كسر بنسبة تفوق 98%."
          },
          ultrasound: {
            required: true,
            delayFr: "Conseillée à 48-72h si persistance d'un œdème important",
            delayAr: "بعد 48 لـ 72 ساعة",
            rationaleFr: "Préciser le grade lésionnel du LTFA (continuité fibrillaire vs rupture complète) et éliminer une ténosynovite des fibulaires.",
            rationaleAr: "لتأكيد درجة تمزق الرباط وسلامة أوتار الفيبولار."
          },
          mri: {
            required: false,
            urgency: "Non indiquée en phase aiguë sauf pour sportif pro de haut niveau ou suspicion de lésion du dôme du talus",
            protocolFr: "IRM cheville protocole instabilité",
            protocolAr: "IRM فقط إذا فما شك في كسر غضروفي بالداخل",
            rationaleFr: "Réservée aux douleurs résiduelles à 6 semaines (conflit antéro-latéral ou lésion ostéochondrale du talus LODT).",
            rationaleAr: "تطلب فقط إذا بقت الوجعة بعد شهر ونصف."
          }
        }
      },
      entorse_syndesmose: {
        id: "entorse_syndesmose",
        nameFr: "Entorse de la Syndesmose Tibio-Fibulaire ('High Ankle Sprain')",
        nameAr: "إلتواء الرباط العالي للكاحل (Syndesmose / High Ankle Sprain)",
        explanationDerja: "الضربة هذي أخطر من الفلقة العادية وتصير وقت القدم تدور لبرا بالقوة (Rotation externe). الرباط اللي شادد عظمتي الساق في بعضهم تمطط. التيستوات متاع الفيفا (Squeeze test و Kleiger) إيجابيين. الراحة فيها تطول الضعف مقارنة بالفلقة العادية، ويلزمنا راديو بوضعية Mortaise وتصويرة IRM باش نثبتو فماش فجوة (Diastasis) بين العظام.",
        technicalRationaleFr: "Traumatisme en dorsiflexion et rotation externe forcée. Douleur située au-dessus de l'interligne talo-crural. Squeeze test et Kleiger test positifs. Risque majeur d'instabilité de la pince bimalléolaire et de diastasis tibio-fibulaire.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 24h",
            viewsFr: "Cheville face en charge + Profil + Incidence de la Mortaise (rotation interne 15-20°)",
            viewsAr: "راديو الكاحل بوضعية Mortaise للبحث عن تباعد العظام",
            rationaleFr: "Mesurer l'espace clair tibio-fibulaire (doit être < 5-6 mm) et le chevauchement tibio-fibulaire (> 1 mm sur la mortaise). Éliminer une fracture de Maisonneuve.",
            rationaleAr: "قياس المسافة بين العظمتين واستبعاد انفصال المفصل."
          },
          ultrasound: {
            required: true,
            delayFr: "À 48h en manœuvre dynamique",
            delayAr: "إيكو ديناميكية",
            rationaleFr: "Recherche d'un écartement anormal sous contrainte en rotation externe et rupture du ligament tibio-fibulaire antéro-inférieur (TFAI).",
            rationaleAr: "كشف تمزق الرباط الأمامي الفاصل بين العظام."
          },
          mri: {
            required: true,
            urgency: "Recommandée sous 48-72h (Gold Standard FIFA)",
            protocolFr: "IRM cheville : coupes axiales fines en densité de protons Fat-Sat au niveau de la syndesmose",
            protocolAr: "IRM دقيقة لتحديد مدى امتداد التمزق في غشاء الساق",
            rationaleFr: "Indispensable chez le footballeur pour évaluer l'étendue proximale de la rupture de la membrane interosseuse et orienter vers chirurgie vs rééducation.",
            rationaleAr: "لتحديد هل الحالة تستوجب تثبيت جراحي أم ترويض مطول."
          }
        }
      },
      rupture_achille: {
        id: "rupture_achille",
        nameFr: "Rupture Aiguë Complète du Tendon d'Achille",
        nameAr: "تقطع كامل وحاد في عرق الصاباط (Tendon d'Achille)",
        explanationDerja: "حسيت وكأنو ملاعبي ضربك بشلاكة ولا حجرة من التالي في عرق الصاباط مع صوت طرطقة حاد، ومباشرة ما عادش تنجم تقف على صوابعك. تيست تومبسون إيجابي (القدم ما تتحركش وقت عصر الساق). هذي حالة استعجالية تستوجب إيكو ولا IRM عاجلة وتدخل جراحي أو تثبيت طبي فوري.",
        technicalRationaleFr: "Rupture en pleine course ou démarrage brusque, sensation de coup de pied par derrière. Test de Thompson positif, dépression visible et palpable au tiers moyen du tendon. Urgence médico-chirurgicale.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 24h",
            viewsFr: "Cheville profil centré sur le calcanéum",
            viewsAr: "راديو من الجنب",
            rationaleFr: "Éliminer une avulsion de la tubérosité calcanéenne postérieure (arrachement osseux).",
            rationaleAr: "استبعاد قلع عظمي من كعب القدم."
          },
          ultrasound: {
            required: true,
            delayFr: "Immédiate / En urgence",
            delayAr: "إيكو مستعجلة في أقرب وقت",
            rationaleFr: "Mesurer l'écart inter-fragmentaire (diastasis) en flexion plantaire à 20° et localiser la rupture par rapport à l'enthèse calcanéenne.",
            rationaleAr: "قياس المسافة بين طرفي العرق المقطوع."
          },
          mri: {
            required: false,
            urgency: "Si doute clinique ou lésion myotendineuse haute atypique",
            protocolFr: "IRM sagittale T2",
            protocolAr: "IRM إذا كانت الإيكو غير واضحة",
            rationaleFr: "Confirmer la rétraction et l'état trophique du corps musculaire du triceps sural.",
            rationaleAr: "تأكيد مكان التقطع وانكماش العضلة."
          }
        }
      }
    }
  },

  hanche_aine: {
    id: "hanche_aine",
    nameFr: "Hanche / Aine (Sfak)",
    nameAr: "الحوض / الصفاق (Sfak)",
    phonetic: "Sfak",
    icon: "Crosshair",
    view: "front",
    subzones: [
      { id: "sfak_adducteurs", labelFr: "Région des Adducteurs (Insertion pubienne)", labelAr: "عرق الصفاق والضمامة (Adducteurs)" },
      { id: "sfak_ilio_psoas", labelFr: "Région de l'Ilio-Psoas (Pli de l'aine)", labelAr: "ثنية الحوض من القدام (Ilio-Psoas)" },
      { id: "sfak_inguinale", labelFr: "Canal Inguinal (Orifice superficiel / Paroi)", labelAr: "الفتق الرياضي ومجرى الصفاق (Canal Inguinal)" },
      { id: "sfak_symphyse", labelFr: "Symphyse Pubienne (Os central)", labelAr: "العظم الوسطاني للعانة (Symphyse Pubienne)" },
      { id: "sfak_articulaire", labelFr: "Hanche intrinsèque / Labrum (Conflit FAI)", labelAr: "مفصل الحوض العميق والغضروف (Labrum / FAI)" },
    ],
    tests: [
      {
        id: "squeeze_test_doha",
        nameFr: "Squeeze Test (0°, 45°, 90° de flexion de hanche)",
        nameAr: "اختبار عصر الركبتين حسب إتفاق الدوحة (Squeeze Test)",
        target: "Adductor-related groin pain (Consensus de Doha / FIFA)",
        techniqueFr: "Patient en décubitus dorsal. Placer l'avant-bras ou un sphygmomanomètre entre les genoux/chevilles du joueur. Demander une contraction isométrique maximale d'adduction à 0° (jambes étendues), 45° et 90° de flexion. Noter la douleur (EVA) et la perte de force.",
        instructionDerja: "أرقد على ظهرك، حط يدي بين ركبتيك واعصرها بقوة ماكسيموم كأنك تفرعس كرة.",
        positiveMeaningFr: "Reproduction de la douleur habituelle à l'insertion des adducteurs sur le pubis.",
        positiveMeaningAr: "رجوع نفس الوجعة الحادة في عرق الصفاق والضمامة (Adducteurs).",
        stats: "Test le plus sensible et reproductible selon le consensus de Doha (FIFA).",
        weight: 35,
        targetPathology: "pubalgie_adducteurs"
      },
      {
        id: "palpation_adducteurs",
        nameFr: "Palpation de l'insertion du Long Adducteur",
        nameAr: "جس وتدليك وتر الضمامة عند عظم العانة",
        target: "Tendinopathie d'insertion du long adducteur",
        techniqueFr: "Palper le tendon du long adducteur jusqu'à son enthèse sur la branche pubienne inférieure avec une pression ferme.",
        instructionDerja: "كي ننزل هوني على رأس عظم العانة وأوتار الصفاق، توجعك؟",
        positiveMeaningFr: "Douleur exquise localisée au pubis = Critère de Doha pour l'atteinte adductrice.",
        positiveMeaningAr: "وجعة حادة في أصل العظم = التهاب أوتار الصفاق.",
        stats: "Critère obligatoire de classification selon Doha.",
        weight: 25,
        targetPathology: "pubalgie_adducteurs"
      },
      {
        id: "thomas_test",
        nameFr: "Test de Thomas & Flexion contre résistance",
        nameAr: "اختبار توماس لعضلة البسواس (Thomas Test)",
        target: "Iliopsoas-related groin pain (Consensus de Doha)",
        techniqueFr: "Patient au bout de la table, ramène un genou sur la poitrine. Observer si la cuisse opposée décolle de la table (rétraction psoas) et tester la flexion contrariée de hanche.",
        instructionDerja: "علق ساقك في الهواء وطبق لخرة على صدرك، وتوا قاومني كي ندز فخذك اللوطا.",
        positiveMeaningFr: "Douleur au pli de l'aine lors de la flexion contrariée ou palpation du psoas.",
        positiveMeaningAr: "وجعة في ثنية الحوض مع حركة رفع الفخذ = التهاب في عضلة البسواس (Psoas).",
        stats: "Doha: Iliopsoas-related groin pain.",
        weight: 25,
        targetPathology: "pubalgie_psoas"
      },
      {
        id: "faddir_test",
        nameFr: "Test FADDIR (Flexion, Adduction, Internal Rotation)",
        nameAr: "اختبار فادير لمفصل الحوض (FADDIR)",
        target: "Conflit fémoro-acétabulaire (FAI / CAM) & Lésion du labrum",
        techniqueFr: "Fléchir la hanche passivement à 90°, puis appliquer une adduction combinée à une rotation interne maximale pour impacter le col fémoral contre le rebord acétabulaire antérieur.",
        instructionDerja: "باش نطبق ركبتك لصدرك وندورها للداخل، شوف فماش حصرة ولا وجعة عميقة في الحوض.",
        positiveMeaningFr: "Reproduction de la douleur profonde inguinale ou sensation d'accrochage/clic.",
        positiveMeaningAr: "وجعة عميقة في الحوض تمنع الحركة = احتكاك بين عظم الفخذ والحوض (FAI / Conflit).",
        stats: "Sensibilité : 94-99% pour dépister un conflit ou labrum.",
        weight: 30,
        targetPathology: "conflit_fai"
      },
      {
        id: "palpation_inguinale",
        nameFr: "Palpation du canal inguinal & Manœuvre de Valsalva",
        nameAr: "فحص مجرى الصفاق مع الكحة (Canal Inguinal)",
        target: "Inguinal-related groin pain (Sports Hernia / Hernie du sportif)",
        techniqueFr: "Palper l'orifice inguinal superficiel avec l'index invaginant le scrotum ou au pli de l'aine, demander au joueur de tousser vigoureusement (Valsalva).",
        instructionDerja: "قح بالقوي مع حبس النفس، وشوف فماش وجعة ولا دفعة في عرق الصفاق الفوقاني.",
        positiveMeaningFr: "Douleur au niveau du canal inguinal à la toux ou à l'effort contrarié de la paroi abdominale.",
        positiveMeaningAr: "وجعة مع الكحة = فتق رياضي وضعف في جدار البطن (Hernie du sportif).",
        stats: "Doha: Inguinal-related groin pain.",
        weight: 25,
        targetPathology: "pubalgie_inguinale"
      },
    ],
    redFlags: [
      { id: "rf_apophyseal_avulsion", labelFr: "Arrachement apophysaire (EIAS ou EIAI ou Ischion) chez le footballeur de moins de 21 ans après une frappe violente", labelAr: "قلع عظمي في الحوض بعد شوتة قوية عند الملاعبية الشبان (أقل من 21 سنة)" },
      { id: "rf_femoral_neck_stress", labelFr: "Fracture de fatigue du col fémoral (Douleur à l'appui unipodal et percussion du grand trochanter)", labelAr: "كسر إجهاد في عنق عظم الفخذ (وجعة حادة عند الوقوف ع الساق)" },
      { id: "rf_septic_arthritis", labelFr: "Fièvre, impotence totale de hanche, chaleur locale (Suspicion arthrite septique ou ostéite pubienne aiguë)", labelAr: "سخانة في البدن مع عجز تام عن تحريك الساق (تعفن جرثومي)" },
    ],
    pathologies: {
      pubalgie_adducteurs: {
        id: "pubalgie_adducteurs",
        nameFr: "Pubalgie du Footballeur - Forme Adductrice (Consensus de Doha)",
        nameAr: "وجعة الصفاق والضمامة (Adductor-Related Groin Pain - Doha)",
        explanationDerja: "حسب تصنيف الـ FIFA الرسمي لمشاكل الصفاق (إتفاق الدوحة)، الإصابة متاعك مركزة في أوتار عضلة الضمامة (Adducteurs). الوجعة تطلع برشا وقت تعصر ركبتيك (Squeeze Test) ووقت تشوط الكورة بالداخل. التصوير بالراديو والـ IRM يبين درجة التهاب عظم العانة وتكلس الأوتار، ويلزمك برنامج تقوية عضلية حركية مخصصة (بروتوكول Hölmich) مع تفادي الحقن العشوائي للكورتيزون.",
        technicalRationaleFr: "Pathologie reine du footballeur. Douleur à la palpation du long adducteur et douleur au Squeeze test. Répond aux critères du consensus international de Doha (FIFA).",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 48h",
            viewsFr: "Bassin de face en charge (Flamingo view / Appui monopodal alterné) + Faux profil de Lequesne",
            viewsAr: "راديو الحوض في وضعية الوقوف Flamingo view",
            rationaleFr: "Évaluer l'instabilité de la symphyse pubienne (> 2 mm de décalage), sclérose des berges et éliminer une avulsion apophysaire.",
            rationaleAr: "تقييم عدم ثبات عظم العانة وتآكل المفاصل."
          },
          ultrasound: {
            required: true,
            delayFr: "Indiquée à tout moment",
            delayAr: "إيكو متوفرة في أي وقت",
            rationaleFr: "Évaluer l'insertion du long adducteur (enthésopathie, fissure focale, désinsertion partielle) et exclure une hernie inguinale vraie.",
            rationaleAr: "فحص حالة أوتار الضمامة والبحث عن تمزق جزئي."
          },
          mri: {
            required: true,
            urgency: "Recommandée sous 1 à 2 semaines (Protocole Pubalgie FIFA)",
            protocolFr: "IRM pelvienne : Coupes coronales obliques et axiales T2 Fat-Sat / STIR centrées sur la symphyse pubienne",
            protocolAr: "IRM متخصصة في الحوض لكشف تورم العظم (Bone Marrow Edema)",
            rationaleFr: "Mettre en évidence l'œdème médullaire osseux pubien (Bone marrow edema), la présence d'une fissure de la plaque aponévrotique commune (adducteur-droit de l'abdomen) et lésion du fibrocartilage.",
            rationaleAr: "لتحديد عمق الالتهاب العظمي ووضع الخطة العلاجية الدقيقة."
          }
        }
      },
      conflit_fai: {
        id: "conflit_fai",
        nameFr: "Conflit Fémoro-Acétabulaire (FAI Cam/Pincer) & Lésion du Labrum",
        nameAr: "احتكاك مفصل الحوض وعظم الفخذ مع ضرر الغضروف (FAI / Conflit)",
        explanationDerja: "الوجعة هذي جاية من عمق مفصل الحوض، تظهر خاصة كي تقعد برشا في الكرهبة، ولا وقت تبدا تسخن وتدور في رجلك. تيست FADDIR إيجابي، العظم متاع الفخذ فيه تضخم زايد (Cam) يحك في حاشية الحوض ويجرح غضروف الـ Labrum. لازم راديو دقيق و تصويرة Arthro-IRM باش نحددو العلاج المناسب.",
        technicalRationaleFr: "Impingement mécanique répété lors de la flexion et rotation interne du football. FADDIR test positif avec limitation de la rotation interne. Risque d'usure précoce du labrum acétabulaire.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 48h",
            viewsFr: "Bassin face stricte + Profil de Dunn à 45° ou 90°",
            viewsAr: "راديو الحوض بوضعية Dunn لقياس زاوية العظم",
            rationaleFr: "Mesurer l'angle alpha (cam deformity si > 55-60°), signe du croisement (pincer) et angle de couverture acétabulaire.",
            rationaleAr: "كشف البروز العظمي المسبب للاحتكاك."
          },
          ultrasound: {
            required: false,
            delayFr: "Non contributive",
            delayAr: "غير نافعة للمفصل العميق",
            rationaleFr: "L'échographie ne permet pas d'évaluer le labrum acétabulaire osseux profond.",
            rationaleAr: "لا تعطي تفاصيل كافية."
          },
          mri: {
            required: true,
            urgency: "Arthro-IRM recommandée (Gold standard FIFA)",
            protocolFr: "Arthro-IRM de hanche avec injection de produit de contraste intra-articulaire",
            protocolAr: "Arthro-IRM بالحقن المجهري داخل المفصل",
            rationaleFr: "Visualiser avec précision la désinsertion du labrum et l'état du cartilage fémoro-acétabulaire.",
            rationaleAr: "لكشف تمزق الغضروف الهلالي للورك (Labrum)."
          }
        }
      }
    }
  },

  epaule: {
    id: "epaule",
    nameFr: "Épaule",
    nameAr: "الكتف (Ktef)",
    phonetic: "Ktef",
    icon: "ShieldAlert",
    view: "both",
    subzones: [
      { id: "epaule_ac", labelFr: "Articulation Acromio-Claviculaire (AC joint)", labelAr: "عظمة الكتف الفوقانية (Acromio-Claviculaire)" },
      { id: "epaule_anterieure", labelFr: "Face antérieure & Bourrelet glénoïdien (Bankart)", labelAr: "الكتف من القدام (Labrum / Instabilité)" },
      { id: "epaule_coiffe", labelFr: "Moignon & Coiffe des rotateurs (Supra-épineux)", labelAr: "عضلات الكواف والكتف من الفوق (Coiffe)" },
      { id: "epaule_biceps", labelFr: "Gouttière bicipitale (Long biceps)", labelAr: "مجرى عرق البايسيبس من القدام" },
    ],
    tests: [
      {
        id: "apprehension_test",
        nameFr: "Test d'Appréhension & Relocalisation (Jobe)",
        nameAr: "اختبار الخوف من خلع الكتف (Apprehension & Relocation)",
        target: "Instabilité antérieure / Lésion de Bankart du labrum",
        techniqueFr: "Patient en décubitus dorsal, épaule à 90° d'abduction et 90° de rotation externe. Amener prudemment le bras en rotation externe maximale (appréhension). Appliquer une pression postérieure sur la tête humérale (soulagement = relocalisation).",
        instructionDerja: "أرقد ع الظهر، باش ندورلك ذراعك لفوق ولتالي، كان حسيت الكتف باش تفلت قلي.",
        positiveMeaningFr: "Sensation que l'épaule va se luxer, soulagée immédiatement par la pression postérieure.",
        positiveMeaningAr: "تحس بالكتف باش تخرج من بلاصتها مع خوف وخفقان = عدم استقرار وخلع في الكتف.",
        stats: "Spécificité : 99% (Gold Standard FIFA pour instabilité post-traumatique).",
        weight: 35,
        targetPathology: "instabilite_epaule"
      },
      {
        id: "jobe_test",
        nameFr: "Test de Jobe (Empty Can Test)",
        nameAr: "اختبار جوب لعضلة الكواف (Jobe Test)",
        target: "Tendon du supra-épineux (Coiffe des rotateurs)",
        techniqueFr: "Bras à 90° d'abduction dans le plan de la scapula (30° vers l'avant), rotation interne maximale (pouces orientés vers le bas). Le praticien applique une force descendante contre résistance.",
        instructionDerja: "هز يديك كيما النسر، دور صوابعك الكبار لوطا، وقاومني بالقوي كي ننزل عليك.",
        positiveMeaningFr: "Douleur ou chute du bras par faiblesse motrice = Lésion ou rupture du supra-épineux.",
        positiveMeaningAr: "وجعة ولا الذراع تطيح وما تنجمش تقاوم = تقطع أو التهاب في عرق الكواف.",
        stats: "Sensibilité : 88%, Spécificité : 89%.",
        weight: 30,
        targetPathology: "lesion_coiffe"
      },
      {
        id: "cross_body",
        nameFr: "Test d'Adduction Horizontale (Cross-Body Adduction)",
        nameAr: "اختبار تقريب الذراع للمفصل الترقوي (Cross-Body)",
        target: "Articulation Acromio-Claviculaire (Disjonction AC)",
        techniqueFr: "Amener le bras du patient en adduction horizontale forcée maximale vers l'épaule opposée.",
        instructionDerja: "جيب كوعك للكتف لاخر وقدمو للصدر.",
        positiveMeaningFr: "Douleur aiguë focalisée sur l'interligne acromio-claviculaire (chute sur le moignon).",
        positiveMeaningAr: "وجعة حادة في العظم الفوقاني بين الترقوة والكتف = انفصال المفصل الترقوي.",
        stats: "Très sensible après une chute brutale en football.",
        weight: 25,
        targetPathology: "disjonction_ac"
      },
      {
        id: "obrien_test",
        nameFr: "Test d'O'Brien (Active Compression Test)",
        nameAr: "اختبار أوبريان للغضروف العلوي (O'Brien SLAP)",
        target: "Lésion SLAP (Labrum supérieur) / Articulation AC",
        techniqueFr: "Bras à 90° de flexion, 10-15° d'adduction, pouce vers le bas puis pouce vers le haut contre résistance descendante.",
        instructionDerja: "مد ذراعك لقدام، دور كفك لوطا وقاوم، ومبعد دور كفك للفوق وقاوم.",
        positiveMeaningFr: "Douleur avec pouce vers le bas qui disparaît avec pouce vers le haut = SLAP Lésion.",
        positiveMeaningAr: "وجعة تنقص كي تدور كفك للفوق = ضرر في غضروف الـ Labrum العلوي.",
        stats: "Test de référence FIFA pour le gardien de but.",
        weight: 25,
        targetPathology: "instabilite_epaule"
      },
    ],
    redFlags: [
      { id: "rf_ac_grade3", labelFr: "Déformation en 'touche de piano' ou marche d'escalier majeure (Disjonction AC Grade III à V de Rockwood)", labelAr: "عظمة الترقوة طالعة لفوق كيما مفتاح البيانو (انفصال حاد للكتف)" },
      { id: "rf_shoulder_dislocation", labelFr: "Épaule bloquée en abduction/rotation externe avec coup de hache externe (Luxation antérieure non réduite)", labelAr: "الكتف مخلوعة ومحبوسة ما تتحركش جملة مع فجوة خارجية" },
      { id: "rf_axillary_nerve", labelFr: "Anesthésie cutanée du moignon de l'épaule (Paralysie du nerf axillaire)", labelAr: "تنميل وفقدان الإحساس في جلدة الكتف من البرة" },
    ],
    pathologies: {
      disjonction_ac: {
        id: "disjonction_ac",
        nameFr: "Disjonction Acromio-Claviculaire (Grade I, II ou III de Rockwood)",
        nameAr: "انفصال المفصل الترقوي للكتف (Disjonction Acromio-Claviculaire)",
        explanationDerja: "طحت طيحة مباشرة على موصل الكتف في طرح كورة. الأربطة اللي شادة الترقوة في الكتف تمططت ولا تقطعت. التيستوات وضحت وجعة حادة وقت تقديم الذراع (Cross-body). راديو الكتف بوضعية Zanca ضروري لتحديد درجة الانفصال (Stade Rockwood) ومعرفة هل تستحق تثبيت بعلاقة وإلا جراحة.",
        technicalRationaleFr: "Choc direct sur le moignon de l'épaule (contact ou chute). Douleur exquise à la palpation de l'articulation AC, cross-body adduction test positif, signe de la touche de piano selon le grade.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 24h",
            viewsFr: "Cliché bilatéral comparatif de Zanca (angulation 10-15° céphalique) + Profil axillaire",
            viewsAr: "راديو مقارن للكتفين بوضعية Zanca",
            rationaleFr: "Classifier le grade de Rockwood (I à V) en mesurant la distance coraco-claviculaire.",
            rationaleAr: "لتحديد درجة خروج الترقوة من بلاصتها."
          },
          ultrasound: {
            required: true,
            delayFr: "À 48h",
            delayAr: "بعد 48 ساعة",
            rationaleFr: "Visualiser l'épanchement AC et la rupture du ligament acromio-claviculaire supérieur.",
            rationaleAr: "لتأكيد تمزق الأربطة السطحية."
          },
          mri: {
            required: false,
            urgency: "Uniquement si suspicion de lésion associée de la coiffe ou du labrum",
            protocolFr: "IRM standard épaule",
            protocolAr: "IRM إذا فما شك في عضلات الكواف",
            rationaleFr: "Réservée aux traumatismes à haute énergie avec suspicion de lésions intra-articulaires.",
            rationaleAr: "فقط في الحالات المعقدة."
          }
        }
      },
      instabilite_epaule: {
        id: "instabilite_epaule",
        nameFr: "Instabilité Antérieure Post-Traumatique / Lésion de Bankart",
        nameAr: "عدم استقرار الكتف بعد خلع أو صدمة (Lésion de Bankart)",
        explanationDerja: "الكتف خرجت من بلاصتها ورجعت، وكي دورنا الذراع لبرة حسيت بنفس الخوف والرعب اللي باش تعاود تفلت. هذا دليل على تمزق في الحاشية الغضروفية (Bankart Labrum). الراديو والـ IRM ضروريين برشا باش نقيسو حجم الضرر العظمي في رأس العظم (Hill-Sachs) ونحضروا خطة تقوية عضلية قوية تحمي الكتف في الماتشوات الجاية.",
        technicalRationaleFr: "Épisode de subluxation ou luxation après chute ou blocage de bras en armé. Test d'appréhension et de relocalisation hautement positifs. Lésion de Bankart très fréquente chez le footballeur (gardiens et duels aériens).",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 24h",
            viewsFr: "Épaule face en trois rotations + Profil de Lamy + Cliché de Garth ou Stryker Notch",
            viewsAr: "راديو الكتف بوضعيات خاصة للكشف عن فجوة Hill-Sachs",
            rationaleFr: "Rechercher l'encoche de Hill-Sachs sur la tête humérale et une fracture du rebord antéro-inférieur de la glène (Bankart osseux).",
            rationaleAr: "للتأكد ما فماش كسر في حافة العظم."
          },
          ultrasound: {
            required: false,
            delayFr: "Non contributive pour le labrum",
            delayAr: "غير مجدية لغضروف الكتف العميق",
            rationaleFr: "Ne permet pas d'analyser le labrum antérieur et la perte de substance osseuse.",
            rationaleAr: "لا تظهر التفاصيل العميقة."
          },
          mri: {
            required: true,
            urgency: "Arthro-IRM recommandée sous 1 à 2 semaines (Gold Standard FIFA)",
            protocolFr: "Arthro-IRM ou IRM de l'épaule en coupes axiales et coronales T1 Fat-Sat avec contraste",
            protocolAr: "Arthro-IRM للكتف لتصوير غضروف Bankart بالتدقيق",
            rationaleFr: "Cartographier avec précision le décollement capsulo-labral de Bankart et quantifier le déficit glénoïdien.",
            rationaleAr: "لتحديد هل تحتاج عملية تثبيت بالمنظار أم ترويض طبي مكثف."
          }
        }
      }
    }
  },

  coude: {
    id: "coude",
    nameFr: "Coude",
    nameAr: "المرفق (Marfek)",
    phonetic: "Marfek",
    icon: "ShieldAlert",
    view: "both",
    subzones: [
      { id: "coude_medial", labelFr: "Face médiale / Épitrochlée & UCL (Ligament collatéral médial)", labelAr: "المرفق من الداخل ورباط UCL" },
      { id: "coude_lateral", labelFr: "Face latérale / Épicondyle (Épicondylalgie)", labelAr: "المرفق من البرة (Épicondyle)" },
      { id: "coude_posterieur", labelFr: "Face postérieure / Olécrane & Bourse", labelAr: "كوع اليد من التالي (Olécrane)" },
    ],
    tests: [
      {
        id: "valgus_stress_coude",
        nameFr: "Valgus Stress Test du coude (20-30° flexion)",
        nameAr: "اختبار ضغط الفالغوس للمرفق (UCL)",
        target: "Ligament Collatéral Ulnaire (UCL / Médial)",
        techniqueFr: "Coude fléchi à 20-30° pour libérer l'olécrane. Stabiliser le bras et appliquer une force en valgus sur l'avant-bras.",
        instructionDerja: "رخف ذراعك شوية، باش نثبت كوعك وندز ساعدك للبرة.",
        positiveMeaningFr: "Bâillement médial ou douleur vive à l'insertion de l'UCL (gardiens, chutes).",
        positiveMeaningAr: "وجعة في الرباط الداخلي للكوع = تمطط أو تقطع في رباط UCL.",
        stats: "Sensibilité : 85%.",
        weight: 35,
        targetPathology: "entorse_ucl_coude"
      },
      {
        id: "cozen_test",
        nameFr: "Test de Cozen (Extension contrariée du poignet)",
        nameAr: "اختبار كوزن للوجعة الخارجية للمرفق (Cozen)",
        target: "Épicondylalgie latérale (Tendons extenseurs)",
        techniqueFr: "Patient poignet fermé en pronation, demander une extension contrariée du poignet et déviation radiale pendant que le praticien palpe l'épicondyle latéral.",
        instructionDerja: "سكر كفك، هز معصمك للفوق وقاومني بالقوي كي نهبطلك يدك لوطا.",
        positiveMeaningFr: "Douleur exquise reproduite sur l'épicondyle latéral.",
        positiveMeaningAr: "وجعة حادة في العظمة البرانية للكوع = التهاب أوتار اليد.",
        stats: "Sensibilité : 91%.",
        weight: 25,
        targetPathology: "epicondylite"
      },
      {
        id: "tinel_cubital",
        nameFr: "Signe de Tinel au tunnel ulnaire",
        nameAr: "اختبار تينيل لعصب اليد (Tinel Ulnaire)",
        target: "Nerf ulnaire dans la gouttière épitrochléo-olécranienne",
        techniqueFr: "Percussion douce au doigt ou au marteau réflexe sur la gouttière du nerf ulnaire derrière l'épitrochlée.",
        instructionDerja: "كي نطبطب هوني وراء كوعك، فماش ضربة ضو ولا تنميل يهبط لصوابعك الصغار؟",
        positiveMeaningFr: "Décharge électrique ou paresthésies irradiant dans l'annulaire et l'auriculaire.",
        positiveMeaningAr: "تنميل وضو يضرب في الصبع الصغير = حصرة في العصب (Nerf Ulnaire).",
        stats: "Sensibilité : 70%, Spécificité : 98%.",
        weight: 25,
        targetPathology: "neuropathie_ulnaire"
      },
    ],
    redFlags: [
      { id: "rf_elbow_dislocation", labelFr: "Déformation majeure du triangle de Nelaton (Luxation postérieure du coude)", labelAr: "الكوع خارج من بلاصتو ومشوه ما يتحركش جملة" },
      { id: "rf_radial_pulse", labelFr: "Pouls radial absent ou pâleur de la main (Lésion de l'artère brachiale)", labelAr: "النبض مفقود في المعصم واليد باردة" },
    ],
    pathologies: {
      entorse_ucl_coude: {
        id: "entorse_ucl_coude",
        nameFr: "Entorse / Rupture du Ligament Collatéral Ulnaire (UCL) du Coude",
        nameAr: "إلتواء أو تقطع في الرباط الداخلي للمرفق (UCL)",
        explanationDerja: "الضربة هذي تصير برشا عند حراس المرمى وقت تطيح على يدك مسرحة ولا تتلوى اليد مع تصدي قوي. الرباط الداخلي للمرفق (UCL) تضرر. الفحص أظهر وجعة مع حركة الفالغوس. راديو عادي للتأكد من عدم وجود كسر، وإيكو لتقييم الأربطة.",
        technicalRationaleFr: "Traumatisme en valgus forcé fréquent chez le gardien de but. Douleur et instabilité à l'examen clinique.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 24h",
            viewsFr: "Coude face et profil strict",
            viewsAr: "راديو الكوع من القدام والجنب",
            rationaleFr: "Éliminer une avulsion de l'épitrochlée ou présence d'un 'fat pad sign' (signe du coussinet graisseux signant une fracture occulte de la tête radiale).",
            rationaleAr: "للتأكد ما فماش كسر في رأس عظم الساعد."
          },
          ultrasound: {
            required: true,
            delayFr: "À 48h dynamique",
            delayAr: "إيكو بعد 48 ساعة",
            rationaleFr: "Évaluer l'épaisseur de l'UCL et le bâillement sous stress valgus dynamique.",
            rationaleAr: "لتأكيد درجة تمزق الرباط."
          },
          mri: {
            required: false,
            urgency: "Indiquée si instabilité ou sportif de haut niveau",
            protocolFr: "IRM coude T2 Fat-Sat coronale",
            protocolAr: "IRM إذا كانت الإصابة قوية",
            rationaleFr: "Cartographier la rupture du faisceau antérieur de l'UCL.",
            rationaleAr: "لتحديد هل تستحق جراحة أم ترويض."
          }
        }
      }
    }
  },

  poignet: {
    id: "poignet",
    nameFr: "Poignet",
    nameAr: "المعصم (Maasam)",
    phonetic: "Maasam",
    icon: "ShieldAlert",
    view: "both",
    subzones: [
      { id: "poignet_scaphoide", labelFr: "Tabatière anatomique (Scaphoïde carpien)", labelAr: "الحفرة بين صبعك لكبير والمعصم (عظم Scaphoïde)" },
      { id: "poignet_tfcc", labelFr: "Bord ulnaire / TFCC (Complexe fibrocartilagineux)", labelAr: "حاشية المعصم من شيرة الصبع الصغير (TFCC)" },
      { id: "poignet_dequervain", labelFr: "Bord radial / Premier compartiment (De Quervain)", labelAr: "أوتار المعصم الفوقانية (De Quervain)" },
    ],
    tests: [
      {
        id: "snuffbox_palpation",
        nameFr: "Palpation de la Tabatière Anatomique & Pression Axiale du Pouce",
        nameAr: "الضغط في الحفرة التشريحية للمعصم (عظم السكافويد)",
        target: "Fracture du Scaphoïde carpien (Urgence de diagnostic chez le footballeur)",
        techniqueFr: "Pouce en abduction, palper le fond de la tabatière anatomique et appliquer une compression axiale le long de la colonne du 1er métacarpien.",
        instructionDerja: "كي ننزل في الحفرة هاذي في معصمك وندز صبعك لكبير لداخل، فماش وجعة حادة؟",
        positiveMeaningFr: "Douleur exquise = SUSPICION MAJEURE DE FRACTURE DU SCAPHOÏDE (À immobiliser même si radio initiale normale).",
        positiveMeaningAr: "وجعة حادة لا تطاق = شك كبير في كسر عظم السكافويد (Scaphoïde).",
        stats: "Sensibilité : 95-100% (Critère FIFA formel : toute douleur de tabatière après chute = scaphoïde jusqu'à preuve du contraire).",
        weight: 40,
        targetPathology: "fracture_scaphoide"
      },
      {
        id: "watson_test",
        nameFr: "Test de Watson (Scaphoid Shift Test)",
        nameAr: "اختبار واتسون لحركة عظم السكافويد (Watson)",
        target: "Instabilité scapho-lunaire (Rupture ligament scapho-lunaire)",
        techniqueFr: "Pression du pouce de l'examinateur sur le pôle distal du scaphoïde tout en mobilisant le poignet d'inclinaison ulnaire vers inclinaison radiale.",
        instructionDerja: "باش نحركلك معصمك مع ضغطة، قلي فماش نقرة ولا طرطقة توجع.",
        positiveMeaningFr: "Ressaut douloureux lors du passage du scaphoïde sous le rebord radial.",
        positiveMeaningAr: "طرطقة ووجعة مع حركة المعصم = عدم استقرار في عظام اليد.",
        stats: "Sensibilité : 80%, Spécificité : 85%.",
        weight: 25,
        targetPathology: "instabilite_scapholunaire"
      },
      {
        id: "tfcc_load",
        nameFr: "TFCC Load Test & Fovea Sign",
        nameAr: "اختبار الضغط على غضروف TFCC (شيرة الصبع الصغير)",
        target: "Complexe Fibrocartilagineux Triangulaire (TFCC)",
        techniqueFr: "Poignet en déviation ulnaire maximale avec charge axiale et pronosupination passive.",
        instructionDerja: "باش نميل معصمك لشيرة صبعك الصغير وندور اليد مع ضغطة.",
        positiveMeaningFr: "Douleur et crépitation sur le versant ulnaire du carpe.",
        positiveMeaningAr: "وجعة في حافة المعصم الخارجية = تمزق في غضروف TFCC.",
        stats: "Sensibilité : 85%.",
        weight: 25,
        targetPathology: "lesion_tfcc"
      },
    ],
    redFlags: [
      { id: "rf_scaphoid_fracture", labelFr: "Douleur de tabatière anatomique après chute sur la main (Fracture du scaphoïde jusqu'à preuve du contraire)", labelAr: "وجعة في حفرة السكافويد بعد طيحة على اليد (خطر كسر السكافويد وعدم التئامه)" },
      { id: "rf_dinner_fork", labelFr: "Déformation en dos de fourchette (Fracture de l'extrémité inférieure du radius / Pouteau-Colles)", labelAr: "المعصم مشوه على شكل فرشيطة (كسر في عظم الساعد)" },
    ],
    pathologies: {
      fracture_scaphoide: {
        id: "fracture_scaphoide",
        nameFr: "Suspicion Majeure de Fracture du Scaphoïde Carpien",
        nameAr: "شك كبير في كسر عظم السكافويد في المعصم (Scaphoïde)",
        explanationDerja: "طحت على يدك محلولة في التيران، والوجعة مركزة في الحفرة اللي تحت صبعك الكبير (Tabatière anatomique). حسب بروتوكول الـ FIFA، أي وجعة في البلاصة هذي بعد طيحة تعتبر كسر في عظم السكافويد حتى يثبت العكس بالتصوير! العظم هذا دمو ضعيف وإذا ما يتجبّرش فيسع ينجم يموت وما يلحمش (Ostéonécrose). لازم راديو بـ 4 وضعيات وجبيرة فورا، وإذا الراديو طلع سليم والوجعة باقية نعملو Scanner أو IRM.",
        technicalRationaleFr: "Chute sur la main en extension. Douleur exquise à la tabatière anatomique et à la compression axiale du pouce. Risque majeur de pseudarthrose et de nécrose aseptique du pôle proximal.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Immédiate (<2h)",
            viewsFr: "Poignet face + Profil strict + 4 clichés spécifiques du scaphoïde (inclinaison ulnaire à 30° et 45°)",
            viewsAr: "راديو المعصم بـ 4 وضعيات مخصصة لعظم السكافويد",
            rationaleFr: "Visualiser un trait de refend cortical souvent invisible sur les clichés standards.",
            rationaleAr: "لكشف خط الكسر الدقيق الذي قد لا يظهر في الراديو العادي."
          },
          ultrasound: {
            required: false,
            delayFr: "Non indiquée",
            delayAr: "غير مجدية",
            rationaleFr: "Ne permet pas d'explorer l'os spongieux intra-carpien.",
            rationaleAr: "لا تظهر داخل العظم."
          },
          mri: {
            required: true,
            urgency: "Scanner ou IRM précoce à 48-72h si radio initiale normale",
            protocolFr: "TDM hélicoïdale axiale haute résolution ou IRM carpe T1/T2",
            protocolAr: "سكانار أو IRM سريعة لتأكيد الكسر",
            rationaleFr: "Le Gold Standard FIFA pour affirmer ou infirmer le diagnostic en cas de doute et éviter une immobilisation inutile ou un retard de prise en charge.",
            rationaleAr: "لحسم التشخيص وحماية اليد من العجز الرياضي."
          }
        }
      }
    }
  },

  rachis_cervical: {
    id: "rachis_cervical",
    nameFr: "Rachis Cervical",
    nameAr: "الرقبة (Ragba)",
    phonetic: "Ragba",
    icon: "ShieldAlert",
    view: "back",
    subzones: [
      { id: "cervical_axial", labelFr: "Ligne médiane / Épineuses cervicales", labelAr: "وسط الرقبة وعظام السلسلة (Épineuses)" },
      { id: "cervical_trapeze", labelFr: "Masses latérales / Trapèzes", labelAr: "عضلات الرقبة والكتف (Trapèze)" },
      { id: "cervical_radiculaire", labelFr: "Irradiation vers le membre supérieur (C6-C7)", labelAr: "وجعة هابطة للذراع مع ضربات ضو" },
    ],
    tests: [
      {
        id: "canadian_cspine",
        nameFr: "Règles Canadiennes du Rachis Cervical (FIFA)",
        nameAr: "القواعد الكندية لسلامة الرقبة (Canadian C-Spine Rule)",
        target: "Instabilité ou fracture cervicale aiguë après choc tête/corps",
        techniqueFr: "Évaluer : 1) Facteurs de haut risque (mécanisme dangereux, paresthésies aux membres). 2) Facteurs de bas risque permettant d'évaluer la mobilité (position assise, marche). 3) Capacité à tourner la tête activement à 45° à gauche et à droite.",
        instructionDerja: "ما تحركش رقبتك، دور راسك بشوية لليمين ولليسار، تنجم تفوت 45 درجة من غير ما تحبس؟",
        positiveMeaningFr: "Impossibilité de rotation à 45° ou critères de haut risque = Radio / Scanner immédiat avec collier cervical.",
        positiveMeaningAr: "ما ينجمش يدور راسو 45 درجة = خطر كسر ويمنع تحريك الرقبة دون تثبيت طبي.",
        stats: "Sensibilité : 99-100% pour exclure une lésion instable.",
        weight: 40,
        targetPathology: "trauma_cervical"
      },
      {
        id: "spurling_test",
        nameFr: "Test de Spurling (Compression foraminale)",
        nameAr: "اختبار سبورلينغ لحصرة عصب الرقبة (Spurling)",
        target: "Radiculopathie cervicale (Névralgie cervico-brachiale)",
        techniqueFr: "Patient assis. Tête inclinée vers le côté douloureux avec légère extension. Appliquer une compression axiale douce vers le bas sur le sommet du crâne.",
        instructionDerja: "ميّل راسك شوية لشيرة الوجعة، وباش ننزل بشوية ع الرأس، فماش ضو يهبط ليدك؟",
        positiveMeaningFr: "Reproduction de la douleur radiculaire vive projetée dans le bras.",
        positiveMeaningAr: "ضربة ضو وتنميل تهبط في الذراع واليد = عرق محصور في فقرات الرقبة.",
        stats: "Spécificité : 92-100%.",
        weight: 30,
        targetPathology: "radiculopathie_cervicale"
      },
      {
        id: "distraction_cervicale",
        nameFr: "Test de Distraction Cervicale",
        nameAr: "اختبار سحب الرقبة للأعلى (Distraction)",
        target: "Soulagement d'un conflit radiculaire",
        techniqueFr: "Praticien applique une traction axiale douce vers le haut sous le menton et l'occiput.",
        instructionDerja: "كي نجبد راسك للفوق بشوية، تنقص الوجعة والضو في ذراعك؟",
        positiveMeaningFr: "Disparition ou diminution nette des symptômes radiculaires dans le membre supérieur.",
        positiveMeaningAr: "نقصان الوجعة في الذراع عند سحب الرأس = تأكيد حصرة العصب.",
        stats: "Spécificité : 90%.",
        weight: 20,
        targetPathology: "radiculopathie_cervicale"
      },
    ],
    redFlags: [
      { id: "rf_cervical_neuro", labelFr: "Déficit moteur franc aux membres supérieurs ou signe de Lhermitte (Lésion médullaire suspectée)", labelAr: "ضعف في حركة اليدين أو صعوبة في التنفس أو تنميل في البدن الكل" },
      { id: "rf_concussion_redflag", labelFr: "Perte de connaissance, vomissements répétés ou amnésie post-traumatique (Commotion cérébrale FIFA SCAT6)", labelAr: "فقدان وعي وتقيؤ ودوخة قوية بعد اصطدام الرأس (Commotion cérébrale)" },
    ],
    pathologies: {
      trauma_cervical: {
        id: "trauma_cervical",
        nameFr: "Entorse Cervicale Bénigne du Footballeur (Whiplash)",
        nameAr: "تمطط أربطة وعضلات الرقبة بعد اصطدام (Entorse cervicale)",
        explanationDerja: "صارتلك خضة في الرقبة بعد التحام بالرأس أو طيحة. القواعد الكندية متاع الـ FIFA تأكد عدم وجود علامات خطر كبرى، وتنجم تدور راسك أكثر من 45 درجة. هذي فلقة وتشنج عضلي في الرقبة. يلزم ترويض حركي خفيف وكمادات دافية وتفادي لبس الكوليي (Collier) برشا باش ما تيبسش الرقبة.",
        technicalRationaleFr: "Traumatisme en coup du lapin (Whiplash) lors d'un duel aérien. Règles canadiennes du rachis cervical négatives. Mobilité conservée avec contracture des trapèzes.",
        imaging: {
          radiography: {
            required: false,
            urgency: "Non indiquée si critères canadiens de bas risque respectés",
            viewsFr: "Cervicale face + Profil strict visualisant C7-T1",
            viewsAr: "راديو الرقبة",
            rationaleFr: "Éliminer une fracture épineuse ou subluxation facettaire si doute.",
            rationaleAr: "فقط إذا تعذر تحريك الرقبة."
          },
          ultrasound: {
            required: false,
            delayFr: "Non indiquée",
            delayAr: "غير مجدية",
            rationaleFr: "Aucun rôle pour le rachis cervical.",
            rationaleAr: "لا دور لها."
          },
          mri: {
            required: false,
            urgency: "Uniquement si symptômes radiculaires ou déficit neurologique",
            protocolFr: "IRM rachis cervical T2 sagittale et axiale",
            protocolAr: "IRM فقط إذا وجد تنميل في الذراع",
            rationaleFr: "Éliminer une hernie discale post-traumatique compressive.",
            rationaleAr: "لتأكيد عدم وجود فتق غضروفي ضاغط."
          }
        }
      }
    }
  },

  rachis_lombaire: {
    id: "rachis_lombaire",
    nameFr: "Rachis Lombaire",
    nameAr: "الظهر / الحزام (Dhar)",
    phonetic: "Dhar",
    icon: "ShieldAlert",
    view: "back",
    subzones: [
      { id: "lombaire_bas", labelFr: "Charnière Lombo-Sacrée (L5-S1)", labelAr: "أسفل الظهر ومفصل الحزام (L5-S1)" },
      { id: "lombaire_isthme", labelFr: "Région isthmique (Spondylolyse)", labelAr: "عظمة القوس الفقري (Spondylolyse)" },
      { id: "lombaire_sciatique", labelFr: "Irradiation fessière et sciatique (L5 ou S1)", labelAr: "عرق النسا هابط للفخذ والساق (Sciatique)" },
    ],
    tests: [
      {
        id: "stork_test",
        nameFr: "Test du Héron / Stork Test (Hyperextension unipodale)",
        nameAr: "اختبار اللقلق في تمديد الظهر (Stork Test)",
        target: "Spondylolyse isthmique de fatigue (Très fréquente chez le jeune footballeur)",
        techniqueFr: "Patient debout sur une jambe, genou opposé fléchi. Réaliser une hyperextension active du rachis lombaire combinée à une rotation du côté de la jambe porteuse. Répéter de l'autre côté.",
        instructionDerja: "اقف على ساق وحدة، رجع ظهرك لتالي وميّل للشيرة الموجوعة، فماش وجعة حادة في أسفل الظهر؟",
        positiveMeaningFr: "Douleur lombaire vive unilatérale reproduite lors de l'hyperextension = FORTE SUSPICION DE SPONDYLOLYSE ISTHMIQUE (Fracture de contrainte de la pars interarticularis).",
        positiveMeaningAr: "وجعة حادة في أسفل الظهر = شك كبير في شعر أو كسر إجهاد في فقرات الظهر (Spondylolyse).",
        stats: "Test pathognomonique recommandé par le FIFA Medical Diploma chez les jeunes joueurs frappeurs.",
        weight: 35,
        targetPathology: "spondylolyse"
      },
      {
        id: "lasegue_test",
        nameFr: "Test de Lasègue (Straight Leg Raise - SLR 30-70°)",
        nameAr: "اختبار لازيغ لعرق النسا (Lasègue)",
        target: "Conflit disco-radiculaire L4-L5 ou L5-S1 (Hernie discale lombaire)",
        techniqueFr: "Patient en décubitus dorsal relâché. Élever passivement le membre inférieur tendu en rectitude. Noter l'angle d'apparition de la douleur radiculaire typique (entre 30° et 70°).",
        instructionDerja: "أرقد على ظهرك ورخف ساقك جملة، باش نهزها مسرحة، وقلي وين تبدى ضربة الضو والعرق يتجبد.",
        positiveMeaningFr: "Douleur irradiant sous le genou reproduisant la sciatalgie entre 30° et 70° (aggravée par la dorsiflexion du pied - Bragard).",
        positiveMeaningAr: "ضو وتنميل قوي يهبط تحت الركبة = فتق ديسك ضاغط على عرق النسا (Hernie discale).",
        stats: "Sensibilité : 91%, Spécificité modérée.",
        weight: 30,
        targetPathology: "hernie_discale"
      },
      {
        id: "slump_test",
        nameFr: "Slump Test (Mise en tension neurale assise)",
        nameAr: "اختبار سلومب للشد العصبي (Slump Test)",
        target: "Tension méningée et radiculaire lombaire",
        techniqueFr: "Patient assis au bord de la table, cyphose dorsale, tête fléchie au menton, extension active du genou et dorsiflexion de la cheville.",
        instructionDerja: "اقعد مقوس، هبط راسك لصدرك، وسرح ساقك وهز صوابع رجلك لفوق.",
        positiveMeaningFr: "Reproduction de la douleur sciatique habituelle soulagée par le redressement de la tête.",
        positiveMeaningAr: "وجعة عرق النسا تزيد كي تهبط راسك وتنقص كي ترفعو.",
        stats: "Sensibilité : 84%, Spécificité : 83%.",
        weight: 25,
        targetPathology: "hernie_discale"
      },
    ],
    redFlags: [
      { id: "rf_cauda_equina", labelFr: "Syndrome de la queue de cheval (Anesthésie en selle, rétention/incontinence urinaire ou anale)", labelAr: "فقدان الإحساس بين الفخذين وفقدان السيطرة على البول (حالة استعجالية قصوى)" },
      { id: "rf_motor_deficit", labelFr: "Sciatique paralysante (Déficit moteur < 3/5 : pied tombant L5 ou impossibilité de monter sur la pointe S1)", labelAr: "عجز في رفع القدم (Pied tombant) أو شلل في صوابع القدم" },
    ],
    pathologies: {
      spondylolyse: {
        id: "spondylolyse",
        nameFr: "Spondylolyse Isthmique Aiguë de Fatigue (L5-S1)",
        nameAr: "كسر إجهاد في قوس الفقرات القطنية (Spondylolyse chez le jeune joueur)",
        explanationDerja: "الإصابة هذي كلاسيكية برشا عند الملاعبية الشبان (أقل من 20 سنة) خاصة اللي يشوطو برشا بالقوة مع دوران الظهر. التيست متاع الفيفا (Stork Test) إيجابي على ساق وحدة. هذا شعر في العظمة الرابطة بين الفقرات (L5-S1). التصوير بالراديو والـ IRM ضروريين برشا للكشف عن مرحلة ما قبل الكسر (Œdème de contrainte) باش يرتاح الملاعبي ويلحم العظم فيسع قبل ما يتفارق.",
        technicalRationaleFr: "Pathologie de surcharge très fréquente chez les jeunes footballeurs soumise à des hyperextensions répétées avec frappe de balle. Stork test positif. Nécessite une décharge sportive précoce pour permettre la consolidation osseuse.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 48h",
            viewsFr: "Rachis lombaire face + Profil strict debout + Clichés de 3/4 droit et gauche (recherche rupture du cou du chien de Lachapelle)",
            viewsAr: "راديو الظهر بوضعيات 3/4 للكشف عن انفصال العظم (Chien de Lachapelle)",
            rationaleFr: "Visualiser la lyse isthmique et un éventuel glissement vertébral associé (spondylolisthésis).",
            rationaleAr: "للتأكد من عدم انزلاق الفقرة على الفقرة الموالية."
          },
          ultrasound: {
            required: false,
            delayFr: "Non indiquée",
            delayAr: "غير مجدية للعمود الفقري",
            rationaleFr: "Inopérante pour le rachis osseux.",
            rationaleAr: "لا تظهر العظام العميقة."
          },
          mri: {
            required: true,
            urgency: "Recommandée sous 1 semaine (Gold Standard FIFA)",
            protocolFr: "IRM rachis lombaire : coupes sagittales T1, T2 et séquences STIR fines centrées sur les isthmes de L4 et L5",
            protocolAr: "IRM متخصصة لكشف تورم العظم قبل اكتمال الكسر",
            rationaleFr: "Dépister le stade précoce d'œdème médullaire osseux (Stress reaction) avant que la fracture ne devienne irréversible et complète.",
            rationaleAr: "لتفادي كسر دائم في ظهر الملاعبي."
          }
        }
      },
      hernie_discale: {
        id: "hernie_discale",
        nameFr: "Lombosciatique Aiguë par Conflit Disco-Radiculaire (Hernie Discale L4-L5 ou L5-S1)",
        nameAr: "فتق الديسك وعرق النسا الحاد (Hernie discale lombaire)",
        explanationDerja: "الوجعة في ظهرك هابطة في الفخذ وساقك كي ضربة الضو (عرق النسا). تيست لازيغ وسلومب إيجابيين يعني الديسك ضاغط على العصب. ما فماش علامات خطر مشلّة والحمد لله. يلزم راحة نشطة وعلاج مضاد للالتهاب وترويض طبي مدروس، وتصويرة IRM لمعرفة حجم الديسك.",
        technicalRationaleFr: "Conflit mécanique entre une saillie discale et la racine nerveuse L5 ou S1. Lasègue et Slump tests positifs. Pas de déficit moteur déficitaire immédiat.",
        imaging: {
          radiography: {
            required: true,
            urgency: "Sous 48h",
            viewsFr: "Rachis lombaire face + Profil",
            viewsAr: "راديو عادي لفقرات الظهر",
            rationaleFr: "Évaluer l'équilibre sagittal et le pincement discal global.",
            rationaleAr: "تقييم تباعد الفقرات."
          },
          ultrasound: {
            required: false,
            delayFr: "Non indiquée",
            delayAr: "غير مجدية",
            rationaleFr: "Aucun rôle.",
            rationaleAr: "لا دور لها."
          },
          mri: {
            required: true,
            urgency: "Recommandée sous 7 à 10 jours (ou en urgence si déficit moteur)",
            protocolFr: "IRM rachis lombaire : coupes sagittales T1/T2 et axiales centrées sur les disques L4-L5 et L5-S1",
            protocolAr: "IRM للظهر لتحديد حجم الفتق الغضروفي",
            rationaleFr: "Confirmer la volumétrie et la localisation de la hernie discale (médiane, postéro-latérale, foraminale, exclue) et le degré de compression radiculaire.",
            rationaleAr: "لتحديد مسار العلاج الطبي أو التدخل الجراحي."
          }
        }
      }
    }
  }
};
