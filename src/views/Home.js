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

      <!-- === CAMPOS NUEVOS === -->
      <label class="field">
        <span>ID</span>
        <input id="home-id" type="text" autocomplete="username">
      </label>

      <label class="field">
        <span>Contraseña</span>
        <div class="password-wrapper">
          <input id="home-password" type="password" autocomplete="current-password">
          <button type="button" class="password-toggle" id="togglePass">👁</button>
        </div>
      </label>

      <!-- BOTÓN ACCEDER -->
      <button class="btn primary" id="accessNow">Acceder</button>

      <!-- REGISTRARME -->
      <a class="btn" href="#/register">Registrarme</a>

      <!-- OLVIDASTE -->
      <a class="link-invite" href="#/forgot">¿Olvidaste tu contraseña?</a>

      <!-- INVITADO -->
      <a class="link-invite" href="#/abogadolex">Acceder como invitado</a>

      <p id="msg" class="muted" style="margin-top:8px"></p>
    </div>
  `;

  const idInput = el.querySelector('#home-id');
  const passInput = el.querySelector('#home-password');
  const toggle = el.querySelector('#togglePass');
  const btnAccess = el.querySelector('#accessNow');
  const msg = el.querySelector('#msg');

  // Mostrar/ocultar contraseña
  toggle.addEventListener('click', () => {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      toggle.textContent = '🙈';
    } else {
      passInput.type = 'password';
      toggle.textContent = '👁';
    }
  });

  // ACCEDER CON ID Y PASSWORD
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


