import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const SECRET = 'bbrothersrome-dev-secret';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const users = [
  { id: 1, email: 'owner@bbrothersrome.com', password: 'demo', role: 'proprietario' },
  { id: 2, email: 'guest@bbrothersrome.com', password: 'demo', role: 'ospite' }
];

const services = [
  { id: 1, name: 'Transfer Aeroporto', description: 'Driver dedicato con tracciamento volo incluso.', price: '€60', category: 'mobilità' },
  { id: 2, name: 'Check-in assistito', description: 'Welcome manager in appartamento con verifica documenti.', price: '€35', category: 'check-in' },
  { id: 3, name: 'Pulizia extra', description: 'Housekeeping certificato con cambio biancheria.', price: '€50', category: 'pulizia' }
];

const properties = [
  { id: 'RM-21', name: 'Pantheon Boutique', occupancy: 0.92, adr: 155 },
  { id: 'RM-34', name: 'Trastevere Loft', occupancy: 0.88, adr: 132 },
  { id: 'RM-41', name: 'Colosseo Attico', occupancy: 0.95, adr: 210 }
];

const stays = [
  { id: 'ST-101', guest: 'Elisa M.', property: 'Pantheon Boutique', checkIn: '2024-10-12', nights: 3 },
  { id: 'ST-102', guest: 'William S.', property: 'Trastevere Loft', checkIn: '2024-10-15', nights: 2 },
  { id: 'ST-103', guest: 'Marco P.', property: 'Colosseo Attico', checkIn: '2024-10-16', nights: 4 }
];

function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role, email: user.email }, SECRET, { expiresIn: '2h' });
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token mancante' });
  const token = authHeader.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token non valido' });
  }
}

app.post('/api/auth/register', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'Dati mancanti' });
  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(409).json({ message: 'Utente già presente' });
  const newUser = { id: users.length + 1, email, password, role };
  users.push(newUser);
  const token = createToken(newUser);
  res.json({ token, user: { email, role } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Credenziali non valide' });
  const token = createToken(user);
  res.json({ token, user: { email: user.email, role: user.role } });
});

app.get('/api/services', (req, res) => {
  res.json(services);
});

app.get('/api/proprietari/dashboard', authenticate, (req, res) => {
  if (req.user.role !== 'proprietario') return res.status(403).json({ message: 'Accesso riservato' });
  const revenue = properties.reduce((acc, property) => acc + property.adr * 30 * property.occupancy, 0);
  res.json({
    kpi: {
      occupancy: 0.9,
      adr: 165,
      revpar: 148,
      monthlyRevenue: Math.round(revenue)
    },
    properties
  });
});

app.get('/api/ospiti/dashboard', authenticate, (req, res) => {
  if (req.user.role !== 'ospite') return res.status(403).json({ message: 'Accesso riservato' });
  res.json({ stays, profile: { email: req.user.email } });
});

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
