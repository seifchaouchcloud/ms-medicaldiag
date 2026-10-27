import express from 'express';
import cors from 'cors';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists for SQLite database
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize SQLite database using Node's native DatabaseSync
const dbPath = path.join(dataDir, 'fifa_kine.sqlite');
const db = new DatabaseSync(dbPath);

console.log(`[FIFA DB] Base de données SQLite connectée : ${dbPath}`);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'nouveau',
    player_name TEXT NOT NULL,
    player_phone TEXT,
    club TEXT,
    position TEXT,
    timing TEXT,
    region TEXT NOT NULL,
    subzone TEXT,
    pain_at_rest INTEGER DEFAULT 0,
    pain_moving INTEGER DEFAULT 0,
    pain_at_action INTEGER DEFAULT 0,
    mechanism TEXT,
    pop TEXT,
    instability TEXT,
    block TEXT,
    swelling TEXT,
    playable TEXT,
    nerve TEXT,
    test_results_json TEXT DEFAULT '{}',
    ottawa_results_json TEXT DEFAULT '{}',
    diagnosis_json TEXT,
    source TEXT DEFAULT 'player_web_link'
  );

  CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
`);

// Seed initial sample submissions if table is empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM submissions');
const rowCount = countStmt.get().count;

if (rowCount === 0) {
  console.log('[FIFA DB] Initialisation des dossiers exemples...');
  const insertStmt = db.prepare(`
    INSERT INTO submissions (
      id, created_at, updated_at, status, player_name, player_phone, club, position,
      timing, region, subzone, pain_at_rest, pain_moving, pain_at_action, mechanism,
      pop, instability, block, swelling, playable, nerve, source
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?
    )
  `);

  const now = new Date();
  const sample1 = [
    'sub_sample_1',
    new Date(now.getTime() - 1000 * 60 * 12).toISOString(), // 12 mins ago
    new Date(now.getTime() - 1000 * 60 * 12).toISOString(),
    'nouveau',
    'Youssef Msakni',
    '+21698123456',
    'Espérance Sportive de Tunis',
    'winger',
    'match',
    'genou',
    'genou_lca',
    3, 7, 9,
    'non_contact',
    'yes', 'yes', 'no', 'immediate', 'no', 'no',
    'player_web_link'
  ];

  const sample2 = [
    'sub_sample_2',
    new Date(now.getTime() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
    'nouveau',
    'Hamza Jelassi',
    '+21698654321',
    'Étoile Sportive du Sahel',
    'centerBack',
    'match',
    'cheville',
    'cheville_malleole_ext',
    2, 6, 8,
    'contact',
    'no', 'no', 'no', 'delayed', 'no', 'no',
    'player_web_link'
  ];

  const sample3 = [
    'sub_sample_3',
    new Date(now.getTime() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    new Date(now.getTime() - 1000 * 60 * 120).toISOString(),
    'termine',
    'Ali Maâloul',
    '+21698777888',
    'Club Sportif Sfaxien',
    'fullBack',
    'training',
    'hanche_aine',
    'sfak_adducteurs',
    1, 4, 7,
    'overuse',
    'no', 'no', 'no', 'none', 'yes', 'no',
    'whatsapp_import'
  ];

  insertStmt.run(...sample1);
  insertStmt.run(...sample2);
  insertStmt.run(...sample3);
  console.log('[FIFA DB] 3 dossiers exemples enregistrés avec succès.');
}

// ======================== API ROUTES ========================

// 1. GET /api/submissions (List all inbox items with auto-update)
app.get('/api/submissions', (req, res) => {
  try {
    const statusFilter = req.query.status;
    let query = 'SELECT * FROM submissions';
    const params = [];

    if (statusFilter && statusFilter !== 'all') {
      query += ' WHERE status = ?';
      params.push(statusFilter);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    const rows = stmt.all(...params);

    // Parse JSON fields
    const formatted = rows.map((r) => ({
      ...r,
      pain: {
        atRest: r.pain_at_rest,
        moving: r.pain_moving,
        atAction: r.pain_at_action,
      },
      testResults: JSON.parse(r.test_results_json || '{}'),
      ottawaResults: JSON.parse(r.ottawa_results_json || '{}'),
      diagnosis: r.diagnosis_json ? JSON.parse(r.diagnosis_json) : null,
    }));

    res.json({
      success: true,
      count: formatted.length,
      unreadCount: formatted.filter((f) => f.status === 'nouveau').length,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. POST /api/submissions (Player submits questionnaire from phone/web)
app.post('/api/submissions', (req, res) => {
  try {
    const p = req.body;
    const id = p.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const insertStmt = db.prepare(`
      INSERT INTO submissions (
        id, created_at, updated_at, status, player_name, player_phone, club, position,
        timing, region, subzone, pain_at_rest, pain_moving, pain_at_action, mechanism,
        pop, instability, block, swelling, playable, nerve, test_results_json,
        ottawa_results_json, diagnosis_json, source
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?
      )
    `);

    insertStmt.run(
      id,
      now,
      now,
      p.status || 'nouveau',
      p.name || p.player_name || 'Anonyme',
      p.phone || p.player_phone || '',
      p.club || '',
      p.position || 'winger',
      p.timing || 'match',
      p.region || 'genou',
      p.subzone || '',
      p.pain?.atRest ?? p.pain_at_rest ?? 0,
      p.pain?.moving ?? p.pain_moving ?? 0,
      p.pain?.atAction ?? p.pain_at_action ?? 0,
      p.mechanism || 'non_contact',
      p.pop || 'no',
      p.instability || 'no',
      p.block || 'no',
      p.swelling || 'immediate',
      p.playable || 'no',
      p.nerve || 'no',
      JSON.stringify(p.testResults || {}),
      JSON.stringify(p.ottawaResults || {}),
      p.diagnosis ? JSON.stringify(p.diagnosis) : null,
      p.source || 'player_web_link'
    );

    console.log(`[FIFA DB] Nouveau questionnaire enregistré : ${p.name || 'Joueur'} (${p.region})`);

    res.status(201).json({
      success: true,
      id,
      message: 'Questionnaire enregistré dans la base de données FIFA',
    });
  } catch (error) {
    console.error('Error inserting submission:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. GET /api/submissions/:id (Single submission)
app.get('/api/submissions/:id', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM submissions WHERE id = ?');
    const r = stmt.get(req.params.id);

    if (!r) {
      return res.status(404).json({ success: false, message: 'Dossier introuvable' });
    }

    const formatted = {
      ...r,
      pain: {
        atRest: r.pain_at_rest,
        moving: r.pain_moving,
        atAction: r.pain_at_action,
      },
      testResults: JSON.parse(r.test_results_json || '{}'),
      ottawaResults: JSON.parse(r.ottawa_results_json || '{}'),
      diagnosis: r.diagnosis_json ? JSON.parse(r.diagnosis_json) : null,
    };

    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. PUT /api/submissions/:id (Update status, clinical tests, or diagnosis)
app.put('/api/submissions/:id', (req, res) => {
  try {
    const id = req.params.id;
    const p = req.body;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE submissions SET
        updated_at = ?,
        status = COALESCE(?, status),
        test_results_json = COALESCE(?, test_results_json),
        ottawa_results_json = COALESCE(?, ottawa_results_json),
        diagnosis_json = COALESCE(?, diagnosis_json)
      WHERE id = ?
    `);

    stmt.run(
      now,
      p.status || null,
      p.testResults ? JSON.stringify(p.testResults) : null,
      p.ottawaResults ? JSON.stringify(p.ottawaResults) : null,
      p.diagnosis ? JSON.stringify(p.diagnosis) : null,
      id
    );

    res.json({ success: true, message: 'Dossier mis à jour' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. DELETE /api/submissions/:id (Delete/archive record)
app.delete('/api/submissions/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM submissions WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true, message: 'Dossier supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. GET /api/stats (Overview statistics for the club medical staff)
app.get('/api/stats', (req, res) => {
  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as total FROM submissions');
    const newStmt = db.prepare("SELECT COUNT(*) as total FROM submissions WHERE status = 'nouveau'");
    const redFlagStmt = db.prepare("SELECT COUNT(*) as total FROM submissions WHERE swelling = 'immediate' OR pop = 'yes'");
    const byRegionStmt = db.prepare('SELECT region, COUNT(*) as count FROM submissions GROUP BY region');

    res.json({
      success: true,
      total: totalStmt.get().total,
      nouveaux: newStmt.get().total,
      drapeauxRouges: redFlagStmt.get().total,
      parRegion: byRegionStmt.all(),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. GET /api/export-db (Download full database as JSON)
app.get('/api/export-db', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC');
    const rows = stmt.all();
    res.setHeader('Content-Disposition', 'attachment; filename=fifa_kine_database.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows, null, 2));
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Global process error handlers to ensure high resilience
process.on('uncaughtException', (err) => {
  console.error('[MS MEDICAL SERVER UNCAUGHT]', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[MS MEDICAL SERVER UNHANDLED]', reason);
});

// Serve frontend static files if built
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { maxAge: '1h' }));
  
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      // Avoid sending index.html for missing static files (js, css, maps, icons)
      if (req.path.includes('.') && !req.path.endsWith('.html')) {
        return res.status(404).send('Not Found');
      }
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath, (err) => {
          if (err && !res.headersSent) {
            res.status(500).send('Erreur chargement MS MedicalDiag');
          }
        });
      }
    }
    next();
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`⚽ MS MedicalDiag - Seif Chaouch (Kiné) & Dr. Malek Masri (Médecin)`);
  console.log(`👉 Local :   http://localhost:${PORT}`);
  console.log(`👉 Réseau :  http://192.168.100.6:${PORT}`);
  console.log(`📁 Database: ${dbPath}`);
  console.log(`======================================================\n`);
});
