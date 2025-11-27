// src/views/Home.js
import { loginUser } from '../auth.js';

export default function Home() {
  const html = `
  <section class="screen full-screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large" aria-hidden="true">
          <img src="assets/icon_1024.png?v=36" alt="Logo LexDigital" />
        </div>
        <h1 class="app-title">
          <span>Lex</span>Digital
        </h1>
        <p class="text-muted">
          Asesoría legal al instante, confiable y a tu alcance.
        </p>
      </header>

      <div class="auth-card">
        <h2 style="margin-bottom:8px">Identificación</h2>
        <p class="text-small" style="margin-bottom:16px">
          Ingresa con tu ID y contraseña para acceder a LexDigital.
        </p>

        <form id="home-login-form" class="form-vertical">
          <label class="field">
            <span>ID</span>
            <input type="text" id="home-login-id" autocomplete="username" required />
          </label>

          <label class="field field-password">
            <span>Contraseña</span>
            <div class="password-wrapper">
              <input type="password" id="home-login-password"
                     autocomplete="current-password" required />
              <button type="button" id="home-toggle-password"
                      class="password-toggle" aria-label="Mostrar u ocultar contraseña">
                👁
              </button>
            </div>
          </label>

          <label class="field checkbox-field">
            <input type="checkbox" id="home-remember" />
            <span>Recordar mis datos</span>
          </label>

          <button type="submit" class="primary-btn" style="margin-top:12px">
            Acceder
          </button>

          <button type="button" class="ghost-btn" id="home-go-register"
                  style="margin-top:8px">
            Registrarme
          </button>

          <p id="home-login-error"
             class="text-small"
             style="color:#c0392b;margin-top:8px;display:none"></p>
        </form>
      </div>
    </div>
  </section>
  `;

  function onMount() {
    const form       = document.getElementById('home-login-form');
    const idInput    = document.getElementById('home-login-id');
    const pwdInput   = document.getElementById('home-login-password');
    const rememberCb = document.getElementById('home-remember');
    const errorBox   = document.getElementById('home-login-error');
    const toggleBtn  = document.getElementById('home-toggle-password');
    const goRegister = document.getElementById('home-go-register');

    // Toggle de contraseña
    if (toggleBtn && pwdInput) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = pwdInput.type === 'password';
        pwdInput.type = isHidden ? 'text' : 'password';
        toggleBtn.textContent = isHidden ? '🙈' : '👁';
      });
    }

    // Enviar login
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorBox.style.display = 'none';

        const id  = idInput.value.trim();
        const pwd = pwdInput.value;
        const remember = !!rememberCb.checked;

        if (!id || !pwd) {
          errorBox.textContent = 'Ingresa tu ID y contraseña.';
          errorBox.style.display = 'block';
          return;
        }

        try {
          loginUser(id, pwd, remember);  // la lógica está en auth.js
          location.hash = '#/abogadolex';
        } catch (err) {
          errorBox.textContent = err.message || 'ID o contraseña incorrectos.';
          errorBox.style.display = 'block';
        }
      });
    }

    // Ir a registro
    if (goRegister) {
      goRegister.addEventListener('click', () => {
        location.hash = '#/register';
      });
    }
  }

  return { html, onMount };
}

