// src/views/Home.js
import { loginUser } from '../auth.js';

export default function Home() {
  const html = `
  <div class="screen">
    <!-- HERO AZUL -->
    <section class="welcome-hero">
      <div class="hero-top">
        <div class="hero-logo">
          <img src="assets/icon_1024.png?v=36" alt="Logo LexDigital">
        </div>
        <div class="hero-text">
          <h1 class="brand">
            <span class="brand_lex">Lex</span><span class="brand_accent">Digital</span>
          </h1>
          <p class="tagline">
            Asesoría legal al instante, confiable y a tu alcance.
          </p>
        </div>
      </div>
    </section>

    <!-- TARJETA BLANCA DE IDENTIFICACIÓN -->
    <section class="app-card auth-card" style="margin-top:16px">
      <h2>Identificación</h2>
      <p class="text-muted">
        Ingresa con tu ID y contraseña para acceder a LexDigital.
      </p>

      <form id="home-login-form" class="form-vertical">
        <label class="field">
          <span>ID</span>
          <input type="text" id="home-login-id" autocomplete="username" required />
        </label>

        <label class="field">
          <span>Contraseña</span>
          <div class="password-wrapper">
            <input type="password" id="home-login-password" autocomplete="current-password" required />
            <button type="button" class="password-toggle" id="home-toggle-password" aria-label="Mostrar u ocultar contraseña">👁</button>
          </div>
        </label>

        <label class="field checkbox-field" style="margin-top:4px">
          <input type="checkbox" id="home-remember" />
          <span>Recordar mis datos</span>
        </label>

        <div class="btn-row" style="margin-top:12px; display:flex; gap:8px;">
          <button type="submit" class="primary-btn" style="flex:1;">Acceder</button>
          <button type="button" class="ghost-btn" id="home-go-register" style="flex:1;">Registrarme</button>
        </div>

        <p id="home-login-error"
           class="text-small"
           style="color:#c0392b;margin-top:8px;display:none"></p>
      </form>

      <div class="aux-links" style="margin-top:12px; display:flex; flex-direction:column; gap:4px; text-align:center;">
        <span class="text-small" style="opacity:.8;">¿Olvidaste tu contraseña?</span>
        <button type="button" class="link-btn" id="home-guest">
          Acceder como invitado
        </button>
      </div>
    </section>
  </div>
  `;

  function onMount() {
    const form = document.getElementById('home-login-form');
    const idInput = document.getElementById('home-login-id');
    const passInput = document.getElementById('home-login-password');
    const remember = document.getElementById('home-remember');
    const errorBox = document.getElementById('home-login-error');
    const toggleBtn = document.getElementById('home-toggle-password');

    // Cargar ID guardado (si existe)
    const savedId = localStorage.getItem('lex_last_id');
    if (savedId) {
      idInput.value = savedId;
      remember.checked = true;
    }

    // Ver / ocultar contraseña
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isPwd = passInput.type === 'password';
        passInput.type = isPwd ? 'text' : 'password';
      });
    }

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
          // recuerda ID si el check está activo
          if (remember.checked) {
            localStorage.setItem('lex_last_id', id);
          } else {
            localStorage.removeItem('lex_last_id');
          }

          loginUser(id, pwd);
          // después de loguear, ir al menú principal del abogado
          location.hash = '#/abogadolex';
        } catch (err) {
          errorBox.textContent = err.message || 'ID o contraseña incorrectos.';
          errorBox.style.display = 'block';
        }
      });
    }

    // Botón "Registrarme"
    const goReg = document.getElementById('home-go-register');
    if (goReg) {
      goReg.addEventListener('click', () => {
        location.hash = '#/register';
      });
    }

    // Botón "Acceder como invitado"
    const guestBtn = document.getElementById('home-guest');
    if (guestBtn) {
      guestBtn.addEventListener('click', () => {
        // entra directo al módulo sin login
        location.hash = '#/abogadolex';
      });
    }
  }

  return { html, onMount };
}

