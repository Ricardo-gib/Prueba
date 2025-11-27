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

      <p class="tagline">Asesoría legal al instante, confiable y a tu alcance.</p>
    </header>

    <div class="hero-card">

      <label>ID</label>
      <input class="login-input" type="text" id="login-id">

      <label>Contraseña</label>
      <div class="password-wrapper">
        <input class="login-input" type="password" id="login-password">
        <button type="button" class="password-toggle" id="toggle-pass">👁</button>
      </div>

      <!-- BOTÓN ACCEDER -->
      <button class="home-btn primary" id="accessNow">Acceder</button>

      <!-- REGISTRARME -->
      <a class="home-btn secondary" href="#/register">Registrarme</a>

      <!-- OLVIDASTE -->
      <a class="link-invite" href="#/forgot">¿Olvidaste tu contraseña?</a>

      <!-- INVITADO -->
      <a class="link-invite" href="#/abogadolex">Acceder como invitado</a>

      <p id="msg" class="muted" style="margin-top:8px"></p>
    </div>
  `;

  // --- REFERENCIAS ---
  const idInput = el.querySelector('#login-id');
  const passInput = el.querySelector('#login-password');
  const toggle = el.querySelector('#toggle-pass');
  const btnAccess = el.querySelector('#accessNow');
  const msg = el.querySelector('#msg');

  // --- MOSTRAR / OCULTAR CONTRASEÑA ---
  toggle.addEventListener('click', () => {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      toggle.textContent = '🙈';
    } else {
      passInput.type = 'password';
      toggle.textContent = '👁';
    }
  });

  // --- ACCEDER ---
  btnAccess.addEventListener('click', () => {
    const id = idInput.value.trim();
    const pwd = passInput.value.trim();

    if (!id || !pwd) {
      msg.textContent = "Completa ambos campos.";
      return;
    }

    try {
      loginUser(id, pwd);
      location.hash = '#/abogadolex';
    } catch (e) {
      msg.textContent = "ID o contraseña incorrectos.";
    }
  });

  return el;
}


