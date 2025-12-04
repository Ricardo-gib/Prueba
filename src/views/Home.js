// src/views/Home.js
import { loginUser } from '../auth.js';

export default function Home() {
  const el = document.createElement('section');
  el.className = 'welcome-hero';

  el.innerHTML = `
    <header class="hero-top">
      <div class="hero-logo"
           style="background-image:url('assets/icon_512.png?v=23')"
           role="img" aria-label="LexDigital"></div>

      <h1 class="brand">
        <span class="lex">Lex</span><span class="accent">Digital</span>
      </h1>

      <p class="tagline">
        Asesoría legal al instante, confiable y a tu alcance.
      </p>
    </header>

    <div class="hero-card">
      <label class="field">
        <span>ID</span>
        <input class="login-input" type="text" id="home-id" autocomplete="username" />
      </label>

      <label class="field">
        <span>Contraseña</span>
        <div class="password-wrapper">
          <input class="login-input" type="password" id="home-password" autocomplete="current-password" />
          <button type="button" class="password-toggle" id="home-toggle">👁</button>
        </div>
      </label>

      <button class="home-btn primary" id="home-access">Acceder</button>
      <button class="home-btn secondary" id="home-register">Registrarme</button>

      <a class="link-invite" href="#/forgot">¿Olvidaste tu contraseña?</a>
      <a class="link-invite" href="#/abogadolex">Acceder como invitado</a>

      <p id="home-msg" class="text-small" style="margin-top:6px;color:#c0392b;display:none;"></p>
    </div>

    ${ChatBot()}
  `;

  const idInput     = el.querySelector('#home-id');
  const passInput   = el.querySelector('#home-password');
  const togglePass  = el.querySelector('#home-toggle');
  const btnAccess   = el.querySelector('#home-access');
  const btnRegister = el.querySelector('#home-register');
  const msgBox      = el.querySelector('#home-msg');

  // Mostrar / ocultar contraseña
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

  // Acceder
  if (btnAccess) {
    btnAccess.addEventListener('click', () => {
      if (msgBox) {
        msgBox.style.display = 'none';
        msgBox.textContent = '';
      }

      const id  = idInput?.value.trim();
      const pwd = passInput?.value.trim();

      if (!id || !pwd) {
        if (msgBox) {
          msgBox.textContent = 'Ingresa tu ID y contraseña.';
          msgBox.style.display = 'block';
        }
        return;
      }

      try {
        loginUser(id, pwd);
        // Después de loguear → va al menú principal de abogado
        location.hash = '#/abogadolex';
      } catch (err) {
        if (msgBox) {
          msgBox.textContent = err?.message || 'ID o contraseña incorrectos.';
          msgBox.style.display = 'block';
        }
      }
    });
  }

  // Ir a registro
  if (btnRegister) {
    btnRegister.addEventListener('click', () => {
      location.hash = '#/register';
    });
  }

  // Inicializar el chatbot después de pintar el HTML
  setTimeout(() => {
    initChatBot();
  }, 0);

  return el;
}
