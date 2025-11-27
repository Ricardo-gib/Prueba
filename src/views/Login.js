// src/views/Login.js
import { loginUser } from '../auth.js';

export default function Login() {
  const html = `
  <div class="screen">
    <div class="app-card auth-card">
      <h1>Ingresar</h1>
      <p class="text-muted">Accede con tu ID y contraseña.</p>

      <form id="login-form" class="form-vertical">
        <label class="field">
          <span>ID</span>
          <input type="text" id="login-id" autocomplete="username" required />
        </label>

        <label class="field">
          <span>Contraseña</span>
          <input type="password" id="login-password" autocomplete="current-password" required />
        </label>

        <button type="submit" class="primary-btn" style="margin-top:16px">
          Ingresar
        </button>

        <p id="login-error"
           class="text-small"
           style="color:#c0392b;margin-top:8px;display:none"></p>
      </form>

      <button type="button" class="ghost-btn" id="go-register">
        Crear una nueva cuenta
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
          // si es correcto, guarda la sesión (dentro de loginUser) y redirige
          loginUser(id, pwd);
          // aquí eliges a dónde ir cuando se loguea (puedes cambiar la ruta)
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

    const goHome = document.getElementById('go-home');
    if (goHome) {
      goHome.addEventListener('click', () => {
        location.hash = '#/home';
      });
    }
  }

  return { html, onMount };
}
