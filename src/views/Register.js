// src/views/Register.js
import { registerUser } from '../auth.js';

export default function Register() {
  const el = document.createElement('section');
  el.className = 'screen';

  el.innerHTML = `
    <div class="app-card" style="padding-top: 28px;">

      <h1 class="app-title">Crear cuenta</h1>
      <p class="text-muted" style="margin-bottom:18px;">
        Completa correctamente todos los campos para poder registrarte.
      </p>

      <form id="register-form" class="form-vertical">

        <!-- Nombre completo -->
        <label class="field">
          <span>Nombre completo</span>
          <input class="login-input" type="text" id="reg-name" placeholder="Ej: Maylee Zamalloa">
        </label>

        <!-- ID -->
        <label class="field">
          <span>ID de usuario</span>
          <input class="login-input" type="text" id="reg-id" placeholder="Ej: maylee123">
        </label>

        <!-- Contraseña -->
        <label class="field">
          <span>Contraseña</span>
          <div class="password-wrapper">
            <input class="login-input" type="password" id="reg-password" />
            <button type="button" class="password-toggle" id="toggle-reg-pass">👁</button>
          </div>
        </label>

        <!-- Celular -->
        <label class="field">
          <span>Número de celular</span>
          <input class="login-input" type="text" id="reg-phone" placeholder="9xxxxxxxx">
        </label>

        <!-- Email -->
        <label class="field">
          <span>Correo electrónico</span>
          <input class="login-input" type="email" id="reg-email" placeholder="tucorreo@gmail.com">
        </label>

        <!-- CREAR CUENTA -->
        <button type="submit" class="home-btn primary" style="margin-top:26px;">
          Crear cuenta
        </button>

        <!-- YA TENGO CUENTA -->
        <a href="#/login" class="home-btn secondary" style="margin-top:12px;">
          Ya tengo cuenta: Ingresar
        </a>

        <!-- VOLVER -->
        <button type="button" id="go-home" class="home-btn secondary" style="margin-top:12px;">
          Volver al inicio
        </button>

        <p id="reg-error" class="text-small" 
           style="color:#c0392b;display:none;margin-top:18px;text-align:center;">
        </p>

      </form>
    </div>
  `;

  // -------- ELEMENTOS --------
  const form   = el.querySelector('#register-form');
  const error  = el.querySelector('#reg-error');

  const nameInput  = el.querySelector('#reg-name');
  const idInput    = el.querySelector('#reg-id');
  const passInput  = el.querySelector('#reg-password');
  const phoneInput = el.querySelector('#reg-phone');
  const emailInput = el.querySelector('#reg-email');

  const togglePass = el.querySelector('#toggle-reg-pass');

  // -------- OJO PARA CONTRASEÑA --------
  togglePass.addEventListener('click', () => {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      togglePass.textContent = '🙈';
    } else {
      passInput.type = 'password';
      togglePass.textContent = '👁';
    }
  });

  // -------- REGISTRAR --------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    error.style.display = 'none';

    const name  = nameInput.value.trim();
    const id    = idInput.value.trim();
    const pwd   = passInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !id || !pwd || !phone || !email) {
      error.textContent = "Por favor completa todos los campos.";
      error.style.display = 'block';
      return;
    }

    try {
      registerUser(name, id, pwd, phone, email);
      location.hash = '#/login';
    } catch (err) {
      error.textContent = err.message || "Error al registrar.";
      error.style.display = 'block';
    }
  });

  // -------- VOLVER --------
  el.querySelector('#go-home').addEventListener('click', () => {
    location.hash = '#/home';
  });

  return el;
}
