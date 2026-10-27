# ⚽ FIFA Kiné Foot TN (Édition Complète avec Base de Données SQLite & Boîte de Réception Temps Réel)

**Application Web Médicale & Décisionnelle pour Kinésithérapeutes & Staffs Médicaux de Football en Tunisie**  
Conçue selon les protocoles officiels exclusifs du **FIFA Diploma in Football Medicine** et les guides **F-MARC**.

---

## 📥 1. Boîte de Réception Actualisée Automatiquement (Temps Réel)
- **Synchronisation automatique :** L'inbox interroge la base de données toutes les 4 secondes de manière silencieuse (`autoSync = 4s`).
- **Badge dynamique en temps réel :** Affiche le nombre de nouveaux dossiers non traités (ex. `[ 📥 Boîte de Réception (3) ]`).
- **Alertes instantanées :** Met en évidence les cas d'urgence avec badges colorés :
  - 💥 *Craquement audible POP (طرطقة)*
  - 🌊 *Gonflement immédiat (< 2h - Hémarthrose aiguë)*
  - 🛑 *Blocage articulaire*
  - 🔄 *Instabilité / Déboîtement (تفلت)*
- **1-Click Loading :** Un clic sur `[ ⚡ Charger le Dossier dans la Console Kiné ]` pré-remplit instantanément l'examen clinique et pré-sélectionne l'articulation concernée.
- **Filtres & Recherche :** Filtrage par statut (*Tous*, *Nouveaux*, *En cours*, *Terminés*) et recherche instantanée par nom de joueur, club ou articulation.

---

## 🗄️ 2. Base de Données Persistante SQLite (`data/fifa_kine.sqlite`)
- **Stockage permanent & local :** Utilise le moteur natif SQLite de Node.js (`node:sqlite DatabaseSync`), garantissant 0 dépendance native externe et une robustesse absolue.
- **Fichier de base de données :** [`data/fifa_kine.sqlite`](file:///C:/Users/seif3/.gemini/antigravity/scratch/fifa-kine-foot-tn/data/fifa_kine.sqlite)
- **Ce qui est sauvegardé pour chaque dossier :**
  - Identité complète (Nom, club, poste, n° WhatsApp, date/heure).
  - Anamnèse football (Zone exacte, EVA repos/marche/geste, mécanisme contact/sans contact, POP, gonflement, poursuite du jeu, signes nerveux).
  - Résultats détaillés des tests cliniques FIFA (Lachman, Pivot Shift, Ottawa, Squeeze Doha...).
  - Diagnostic retenu, score de confiance (%), alertes drapeaux rouges et arbre d'imagerie médicale (Radio, Écho, IRM).
  - Statut d'avancement (`nouveau` ➔ `en_cours` ➔ `termine`).
- **Export & Sauvegarde :** Bouton `[ 💾 Exporter la Base de Données (.json) ]` pour télécharger un dump complet de tous les dossiers en 1 clic.

---

## 🔄 3. Le Workflow Complet Terrain

```
 [📲 Téléphone du Joueur]                        [💻 / 📱 Console du Kiné]
           │                                                 │
           │  1. Kiné clique sur "Envoyer au Joueur"        │
           │<────────────────────────────────────────────────┤ (Lien ?mode=joueur via WhatsApp)
           │                                                 │
           │  2. Remplit le Body Chart & symptômes (2 min)   │
           │     -> Envoi automatique vers SQLite            │
           ├────────────────────────────────────────────────>│ (Apparaît DIRECTEMENT dans
           │                                                 │  l'Inbox auto-actualisée !)
           │                                                 │
           │  3. Reçoit aussi le message avec [CODE_FIFA]    │
           ├────────────────────────────────────────────────>│ (Optionnel : Copier/Coller manuel)
           │                                                 │
           │                                                 │  4. Kiné clique "Charger Dossier"
           │                                                 │     -> Réalise tests FIFA (Lachman...)
           │                                                 │     -> Diagnostic & Imagerie
           │                                                 │
           │  5. Reçoit le Diagnostic en Arabe Tunisien      │
           │<────────────────────────────────────────────────┤ (Bouton "Envoyer en Derja")
           ▼                                                 ▼
```

---

## 🚀 4. Démarrage Rapide

### Option A : Serveur Complet avec Base de Données (Recommandé)
Lance à la fois le serveur API, la base de données SQLite et l'interface web :
```powershell
cd C:\Users\seif3\.gemini\antigravity\scratch\fifa-kine-foot-tn
npm start
```
- **Console Kiné :** 👉 **`http://localhost:4173/`**
- **Accès Joueur Smartphone (même Wi-Fi) :** 👉 **`http://192.168.100.6:4173/?mode=joueur`**

---

## 📡 5. Endpoints de l'API REST
- `GET /api/submissions` : Liste des dossiers de la boîte de réception (avec compteur de non-lus).
- `POST /api/submissions` : Enregistrement d'un nouveau questionnaire joueur.
- `GET /api/submissions/:id` : Récupération d'un dossier complet.
- `PUT /api/submissions/:id` : Mise à jour du statut, des tests cliniques ou du diagnostic.
- `DELETE /api/submissions/:id` : Suppression d'un dossier.
- `GET /api/stats` : Statistiques médicales du club (total, nouveaux, drapeaux rouges, répartition par région).
- `GET /api/export-db` : Téléchargement du fichier de sauvegarde JSON.
