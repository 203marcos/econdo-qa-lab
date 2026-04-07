const path = require('node:path');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = Number(process.env.PORT) || 3000;
const jwtSecret = process.env.JWT_SECRET || 'econdo-dev-secret';
const publicDir = path.join(__dirname, '..', 'public');
const tokenCookieName = 'session_token';

const users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@econdo.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
  },
  {
    id: 2,
    name: 'User',
    email: 'user@econdo.com',
    passwordHash: bcrypt.hashSync('user123', 10),
  },
];

app.use(express.json());
app.use(express.static(publicDir));

function parseCookies(cookieHeader = '') {
  return cookieHeader
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce((accumulator, item) => {
      const separatorIndex = item.indexOf('=');

      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = item.slice(0, separatorIndex).trim();
      const value = item.slice(separatorIndex + 1).trim();
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});
}

function setAuthCookie(response, token) {
  response.cookie(tokenCookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 60 * 60 * 1000,
    path: '/',
  });
}

function clearAuthCookie(response) {
  response.clearCookie(tokenCookieName, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: '2h' }
  );
}

function authenticateToken(request, response, next) {
  const authorization = request.headers.authorization || '';
  const [, bearerToken] = authorization.split(' ');
  const cookies = parseCookies(request.headers.cookie || '');
  const cookieToken = cookies[tokenCookieName];
  const token = bearerToken || cookieToken;

  if (!token) {
    return response.status(401).json({ message: 'token missing' });
  }

  try {
    request.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'token invalid or expired' });
  }
}

app.get('/', (request, response) => {
  response.redirect('/login');
});

app.get('/login', (request, response) => {
  response.sendFile(path.join(publicDir, 'pages', 'login.html'));
});

app.get('/cadastro', (request, response) => {
  response.sendFile(path.join(publicDir, 'pages', 'cadastro.html'));
});

app.get('/dashboard', (request, response) => {
  response.sendFile(path.join(publicDir, 'pages', 'dashboard.html'));
});

app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users', (request, response) => {
  response.json(users.map(sanitizeUser));
});

app.post('/api/register', (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({ message: 'name, email and password are required' });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return response.status(409).json({ message: 'email already registered' });
  }

  const newUser = {
    id: users.length + 1,
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash: bcrypt.hashSync(String(password), 10),
  };

  users.push(newUser);

  const user = sanitizeUser(newUser);
  const token = createToken(user);
  setAuthCookie(response, token);

  return response.status(201).json({
    message: 'registration successful',
    user,
  });
});

app.post('/api/login', (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'email and password are required' });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const user = users.find((item) => item.email === normalizedEmail);

  if (!user) {
    return response.status(401).json({ message: 'invalid credentials' });
  }

  const validPassword = bcrypt.compareSync(String(password), user.passwordHash);

  if (!validPassword) {
    return response.status(401).json({ message: 'invalid credentials' });
  }

  const safeUser = sanitizeUser(user);

  setAuthCookie(response, createToken(safeUser));

  return response.json({
    message: 'login successful',
    user: safeUser,
  });
});

app.post('/api/logout', (request, response) => {
  clearAuthCookie(response);
  return response.json({ message: 'logout successful' });
});

app.get('/api/me', authenticateToken, (request, response) => {
  const user = users.find((item) => item.id === request.user.sub);

  if (!user) {
    return response.status(404).json({ message: 'user not found' });
  }

  return response.json({ user: sanitizeUser(user) });
});

app.use((request, response) => {
  response.status(404).json({ message: 'route not found' });
});

app.listen(port, () => {
  console.log(`eCondo QA Lab running on http://localhost:${port}`);
});
