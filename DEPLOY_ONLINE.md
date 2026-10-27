# 🌍 Guide de Mise en Ligne 100% Cloud (Android & iPhone)

Ce guide vous explique comment rendre votre application **FIFA Kiné Foot TN**, le **Questionnaire Joueur** et la **Base de Données** accessibles **100% en ligne 24h/24**, sans aucun ordinateur requis, directement sur votre téléphone Android et sur les iPhones/Androids des joueurs.

---

## 📱 1. Comment l'installer sur votre Smartphone Android (Kiné)

L'application a été configurée comme une **PWA (Progressive Web Application)** : elle s'installe comme une application native sans passer par le Play Store :

1. Ouvrez l'adresse de votre application dans **Google Chrome** sur votre téléphone Android.
2. Appuyez sur les **3 petits points verticaux (⋮)** en haut à droite du navigateur.
3. Appuyez sur **« Installer l'application »** (ou *« Ajouter à l'écran d'accueil »*).
4. L'icône de football ⚽ apparaît sur l'écran de votre téléphone.
5. Lorsque vous l'ouvrez, elle se lance **en plein écran**, ultra-fluide, sans la barre d'adresse du navigateur, exactement comme une application téléchargée sur le Play Store !

---

## 🍏 2. Comment les Joueurs ouvrent le lien sur iPhone & Android

Lorsque vous envoyez le lien sur WhatsApp :
- **Sur iPhone (Apple iOS / Safari) :**
  - Le joueur clique directement sur le lien WhatsApp.
  - Le questionnaire s'ouvre dans Safari avec adaptation parfaite à l'écran de l'iPhone (support du notch / île dynamique et de la barre du bas).
  - Le joueur répond en 1 minute en Arabe Tunisien (Derja).
  - S'il le souhaite, il peut aussi appuyer sur le bouton Partager `⎋` puis **« Sur l'écran d'accueil »** pour garder l'icône sur son iPhone.
- **Sur Android (Samsung, Xiaomi, etc.) :**
  - Le joueur clique sur le lien WhatsApp et répond instantanément.

---

## ☁️ 3. Mise en Ligne Gratuite et Permanente sur Render.com (3 Minutes)

Pour que l'application et la base de données restent en ligne **24h/24** même quand votre ordinateur est éteint :

### Étape A : Créer un compte gratuit
1. Allez sur **[https://render.com](https://render.com)** et créez un compte gratuit (avec votre adresse email ou GitHub).

### Étape B : Déployer le projet
Le fichier de configuration officiel [`render.yaml`](file:///C:/Users/seif3/.gemini/antigravity/scratch/fifa-kine-foot-tn/render.yaml) est déjà prêt dans votre projet !
1. Sur Render, cliquez sur le bouton **« New + »** en haut à droite, puis sélectionnez **« Web Service »**.
2. Connectez votre dépôt Git (GitHub ou GitLab) contenant ce projet `fifa-kine-foot-tn`.
3. Render détecte automatiquement la configuration :
   - **Runtime :** Node
   - **Build Command :** `npm install && npm run build`
   - **Start Command :** `npm start`
4. Cliquez sur **« Deploy Web Service »** (Plan Free gratuit).

### Étape C : Votre URL Publique Permanente est Prête !
En 2 minutes, Render vous attribue votre adresse HTTPS mondiale sécurisée, par exemple :
👉 **`https://fifa-kine-foot-tn.onrender.com`**

Sur cette adresse unique :
- Votre console Kiné est en ligne : `https://fifa-kine-foot-tn.onrender.com/`
- Le questionnaire joueur est en ligne : `https://fifa-kine-foot-tn.onrender.com/?mode=joueur`
- La base de données SQLite est hébergée dans le cloud et conserve tous les fichiers.

---

## 🧪 4. Pour Tester Immédiatement sur votre Téléphone (Dès Maintenant)

Si votre smartphone et votre PC sont connectés au **même réseau Wi-Fi** :
- **Console Kiné sur votre téléphone Android :**  
  👉 **`http://192.168.100.6:4173/`**
- **Questionnaire Joueur sur smartphone :**  
  👉 **`http://192.168.100.6:4173/?mode=joueur`**
