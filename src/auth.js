// src/auth.js

const STORAGE_USERS = 'lexdigital_users';
const STORAGE_SESSION = 'lexdigital_session';

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error leyendo usuarios', e);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

export function registerUser({ id, password, fullname, phone, email }) {
  const users = loadUsers();
  const normalized = id.trim().toLowerCase();

  if (!normalized) {
    throw new Error('El ID es obligatorio.');
  }
  if (!password || password.length < 4) {
    throw new Error('La contraseña debe tener al menos 4 caracteres.');
  }
  if (users.some(u => u.id.toLowerCase() === normalized)) {
    throw new Error('Ese ID ya está registrado. Elige otro.');
  }

  const user = { id, password, fullname, phone, email };
  users.push(user);
  saveUsers(users);

  // guardar sesión
  localStorage.setItem(STORAGE_SESSION, JSON.stringify({ id: user.id }));

  return user;
}

export function loginUser(id, password) {
  const users = loadUsers();
  const normalized = id.trim().toLowerCase();

  const user = users.find(u => u.id.toLowerCase() === normalized);
  if (!user || user.password !== password) {
    throw new Error('ID o contraseña incorrectos.');
  }

  localStorage.setItem(STORAGE_SESSION, JSON.stringify({ id: user.id }));
  return user;
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    if (!raw) return null;
    const { id } = JSON.parse(raw);
    const users = loadUsers();
    return users.find(u => u.id === id) || null;
  } catch (e) {
    console.error('Error leyendo sesión', e);
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_SESSION);
}
