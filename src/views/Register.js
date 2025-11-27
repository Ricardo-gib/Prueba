// src/views/Register.js
import { registerUser } from '../auth.js';

export default function Register() {
  const html = `
  <div class="screen">
    <div class="app-card auth-card">
      <h1>Crear cuenta</h1>
      <p class="text-muted">
        Regístrate con un ID, como en un videojuego, y úsalo para entrar.
      </p>

      <form id="register-form" class="form-vertical">
        <label class="field">
          <span>Nombre completo</span>
          <input type="text" id="reg-fullname" required />
        </label>

        <label class="field">
          <span>ID (usuario)</span>
          <input type="text" id="reg-id" required />
        </label>

        <label class="field">
          <span>Contraseña</span>
          <input type="password" id="reg-password" required />
        </label>

        <label class="field">
          <span>Número de celular</span>
          <input type="tel" id="reg-phone" />
        </label>

        <label class="field">
          <span>Correo electrónico</span>
          <input type="email" id="reg-email" />
        </label>

        <button type="submit" class="primary-btn" style="margin-top:16px">
          Crear cuenta
        </button>

        <p id="reg-error"
           class="text-small"
           style="color:#c0392b;margin-top:8px;display:none"></p>
      </form>

      <button type="button" class="ghost-btn" id="reg-go-login">
        Ya tengo cuenta: Ingresar
      </button>

      <button type="button" class="link-btn" id="reg-go-home">
        Volver al inicio
      </button>
    </div>
  </div>
  `;

  function onMount() {
    const form = document.getElementById('register-form');
    const errorBox = document.getElementById('reg-error');

    const fnInput = document.getElementById('reg-fullname');
    const idInput = document.getElementById('reg-id');
    const passInput = document.getElementById('reg-password');
    const phoneInput = document.getElementById('reg-phone');
    const emailInput = document.getElementById('reg-email');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorBox.style.display = 'none';

        const data = {
          fullname: fnInput.value.trim(),
          id: idInput.value.trim(),
          password: passInput.value,
          phone: phoneInput.value.trim(),
          email: emailInput.value.trim()
        };

        if (!data.fullname || !data.id || !data.password) {
          errorBox.textContent = 'Completa al menos nombre, ID y contraseña.';
          errorBox.style.display = 'block';
          return;
        }

        try {
          // guarda usuario en localStorage y deja la sesión iniciada
          registerUser(data);
          // después de crear la cuenta, volver al Home
          location.hash = '#/home';
        } catch (err) {
          errorBox.textContent = err.message || 'No se pudo registrar.';
          errorBox.style.display = 'block';
        }
      });
    }

    const goLogin = document.getElementById('reg-go-login');
    if (goLogin) {
      goLogin.addEventListener('click', () => {
        location.hash = '#/login';
      });
    }

    const goHome = document.getElementById('reg-go-home');
    if (goHome) {
      goHome.addEventListener('click', () => {
        location.hash = '#/home';
      });
    }
  }

  return { html, onMount };
}
