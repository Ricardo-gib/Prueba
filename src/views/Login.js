// src/views/Login.js
import { loginUser } from '../auth.js';

export default function Login() {
  const html = `
  <div class="screen">
    <div class="app-card auth-card">
      <h1>Identificación</h1>
      <p class="text-muted">
        Ingresa con tu <strong>ID</strong> y contraseña, como en un videojuego.
      </p>

      <form id="login-form" class="form-vertical">
        <label class="field">
          <span>ID (usuario)</span>
          <input
            type="text"
            id="login-id"
            autocomplete="username"
            placeholder="Ejemplo: ricard0"
            required
          />
        </label>

        <label class="field">
          <span>Contraseña</span>
          <input
            type="password"
            id="login-password"
            autocomplete="current-password"
            required
          />
        </label>

        <button type="submit" class="primary-btn" style="margin-top:16px">
          Ingresar
        </button>

        <p id="login-error"
           class="text-small"
           style="color:#c0392b;margin-top:8px;display:none"></p>
      </form>

      <button type="button" class="ghost-btn" id="go-register">
        Registrarme
      </button>

      <button type="button" class="ghost-btn" id="go-guest">
        Acceder como invitado
      </button>

      <button type="button" class="link-btn" id="forgot-pass">
        ¿Olvidaste tu contraseña?
      </button>

      <button type="button" class="link-btn" id="go-home">
        Volver al inicio
      </button>
    </div>
  </div>
  `;

  function onMount() {
    const form = document.getElementById('login-form');
    const errorBox = document.getElementById('login-error');
    const idInput = document.getElementById('login-id');
    const passInput = document.getElementById('login-password');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorBox.style.display = 'none';

        const id = idInput.value.trim();
        const pwd = passInput.value;

        if (!id || !pwd) {
          errorBox.textContent = 'Ingresa tu ID y contraseña.';
          errorBox.style.display = 'block';
          return;
        }

        try {
          // Si es correcto, loginUser lanza OK y guarda sesión
          loginUser(id, pwd);
          // Después de iniciar sesión, lo mandamos al menú principal de la app
          location.hash = '#/abogadolex';
        } catch (err) {
          errorBox.textContent = err.message || 'ID o contraseña incorrectos.';
          errorBox.style.display = 'block';
        }
      });
    }

    const goReg = document.getElementById('go-register');
    if (goReg) {
      goReg.addEventListener('click', () => {
        location.hash = '#/register';
      });
    }

    const goGuest = document.getElementById('go-guest');
    if (goGuest) {
      goGuest.addEventListener('click', () => {
        // invitado entra directo al menú principal
        location.hash = '#/abogadolex';
      });
    }

    const forgot = document.getElementById('forgot-pass');
    if (forgot) {
      forgot.addEventListener('click', () => {
        alert('Recuperación de contraseña: próximamente en LexDigital 😉');
      });
    }

    const goHome = document.getElementById('go-home');
    if (goHome) {
      goHome.addEventListener('click', () => {
        location.hash = '#/home';
      });
    }
  }

  return { html, onMount };
}
