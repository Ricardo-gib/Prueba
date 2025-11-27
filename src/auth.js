// src/auth.js

const STORAGE_KEY = 'lexdigital_users_v1';
const SESSION_KEY = 'lexdigital_session_v1';

// Helpers internos
function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('[auth] Error loading users', e);
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('[auth] Error saving users', e);
  }
}

function safeTrim(v) {
  return typeof v === 'string' ? v.trim() : '';
}

// ========= REGISTRO =========
export function registerUser(fullName, userId, password, phone, email) {
  const name  = safeTrim(fullName);
  const id    = safeTrim(userId);
  const pass  = safeTrim(password);
  const cell  = safeTrim(phone);
  const mail  = safeTrim(email);

  if (!name || !id || !pass || !cell || !mail) {
    throw new Error('Completa todos los campos.');
  }

  const users = loadUsers();

  // Evitar IDs repetidos (ignorando mayúsculas/minúsculas)
  const exists = users.some(
    (u) => safeTrim(u.id).toLowerCase() === id.toLowerCase()
  );
  if (exists) {
    throw new Error('Ese ID de usuario ya existe. Elige otro.');
  }

  users.push({
    name,
    id,
    password: pass,
    phone: cell,
    email: mail,
    createdAt: new Date().toISOString(),
  });

  saveUsers(users);

  // Guarda sesión automática si quieres (opcional)
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ id, name, email: mail })
    );
  } catch (e) {
    console.error('[auth] Error saving session after register', e);
  }
}

// ========= LOGIN =========
export function loginUser(userId, password) {
  const id   = safeTrim(userId);
  const pass = safeTrim(password);

  if (!id || !pass) {
    throw new Error('Ingresa tu ID y contraseña.');
  }

  const users = loadUsers();

  const user = users.find(
    (u) => safeTrim(u.id).toLowerCase() === id.toLowerCase()
  );

  if (!user || safeTrim(user.password) !== pass) {
    throw new Error('ID o contraseña incorrectos.');
  }

  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ id: user.id, name: user.name, email: user.email })
    );
  } catch (e) {
    console.error('[auth] Error saving session on login', e);
  }
}

// ========= SESIÓN (por si lo necesitas en otras vistas) =========
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('[auth] Error reading session', e);
    return null;
  }
}

export function logoutUser() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('[auth] Error clearing session', e);
  }
}
