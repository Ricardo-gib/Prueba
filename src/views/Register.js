// src/views/Register.js
import { registerUser } from '../auth.js';

export default function Register() {
  const html = `
  <div class="screen">
    <div class="app-card">
      <h1 class="app-title" style="margin-bottom:4px;">Crear cuenta</h1>
      <p class="text-muted">
        Completa correctamente todos los campos para poder registrarte.
      </p>

      <div class="menu-list" style="gap:10px; padding-top:4px;">

        <label class="field">
          <span>Nombre completo</span>
          <input class="login-input" id="reg-name" type="text" placeholder="Ej: Maylee Zamalloa" />
        </label>

        <label class="field">
          <span>ID de usuario</span>
          <input class="login-input" id="reg-id" type="text" placeholder="Ej: maylee123" />
        </label>

        <label class="field">
          <span>Contraseña</span>
          <div class="password-wrapper">
            <input class="login-input" id="reg-pass" type="password" placeholder="••••••••" />
            <button type="button" class="password-toggle" id="reg-toggle-pass">👁</button>
          </div>
        </label>

        <label class="field">
          <span>Número de celular</span>
          <input class="login-input" id="reg-phone" type="tel" placeholder="9xxxxxxxx" />
        </label>

        <label class="field">
          <span>Correo electrónico</span>
          <input class="login-input" id="reg-email" type="email" placeholder="tucorreo@gmail.com" />
        </label>

        <button type="button" class="home-btn primary" id="btn-register">
          Crear cuenta
        </button>

        <button type="button" class="home-btn secondary" id="btn-go-login">
          Ya tengo cuenta: Ingresar
        </button>

        <button type="button" class="home-btn secondary" id="btn-go-home">
          Volver al inicio
        </button>

        <p id="reg-error"
           class="text-small"
           style="color:#c0392b;margin-top:4px;text-align:center;display:none;"></p>
      </div>
    </div>
  </div>
  `;

  function onMount() {
    const nameInput  = document.getElementById('reg-name');
    const idInput    = document.getElementById('reg-id');
    const passInput  = document.getElementById('reg-pass');
    const phoneInput = document.getElementById('reg-phone');
    const emailInput = document.getElementById('reg-email');

    const togglePass = document.getElementById('reg-toggle-pass');
    const btnRegister = document.getElementById('btn-register');
    const btnGoLogin  = document.getElementById('btn-go-login');
    const btnGoHome   = document.getElementById('btn-go-home');
    const errorBox    = document.getElementById('reg-error');

    // helper para evitar el error de trim
    const safeTrim = (el) => (el && el.value ? el.value.trim() : '');

    // ojo contraseña
    if (togglePass && passInput) {
      togglePass.addEventListener('click', () => {
        if (passInput.type === 'password') {
          passInput.type = 'text';
          togglePass.textContent = '🙈';
        } else {
          passInput.type = 'password';
          togglePass.textContent = '👁';
        }
      });
    }

    // crear cuenta
    if (btnRegister) {
      btnRegister.addEventListener('click', () => {
        if (errorBox) {
          errorBox.style.display = 'none';
          errorBox.textContent = '';
        }

        const fullName = safeTrim(nameInput);
        const userId   = safeTrim(idInput);
        const pwd      = safeTrim(passInput);
        const phone    = safeTrim(phoneInput);
        const email    = safeTrim(emailInput);

        // validaciones simples
        if (!fullName || !userId || !pwd || !phone || !email) {
          if (errorBox) {
            errorBox.textContent = 'Completa todos los campos antes de continuar.';
            errorBox.style.display = 'block';
          }
          return;
        }

        try {
          // misma firma que usabas antes
          registerUser(fullName, userId, pwd, phone, email);
          location.hash = '#/login';
        } catch (err) {
          if (errorBox) {
            errorBox.textContent = err?.message || 'No se pudo crear la cuenta.';
            errorBox.style.display = 'block';
          }
        }
      });
    }

    if (btnGoLogin) {
      btnGoLogin.addEventListener('click', () => {
        location.hash = '#/login';
      });
    }

    if (btnGoHome) {
      btnGoHome.addEventListener('click', () => {
        location.hash = '#/home';
      });
    }
  }

  return { html, onMount };
}
