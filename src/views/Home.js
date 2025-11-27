import { loginUser } from '../auth.js';

export default function Home() {
  const html = `
  <div class="screen">
    <div class="app-card auth-card">
      <header class="app-hero" style="margin-bottom:24px;">
        <div class="avatar large" aria-hidden="true">
          <img src="assets/icon_1024.png?v=36" alt="Logo LexDigital" />
        </div>
        <h1 class="app-title">
          Lex<span>Digital</span>
        </h1>
        <p class="text-muted">
          Asesoría legal al instante, confiable y a tu alcance.
        </p>
      </header>

      <section>
        <h2 style="margin-bottom:8px;">Identificación</h2>
        <p class="text-muted" style="margin-bottom:16px;">
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
              <input
                type="password"
                id="home-login-password"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="password-toggle"
                id="home-password-toggle"
                aria-label="Mostrar u ocultar contraseña"
              >👁</button>
            </div>
          </label>

          <label class="field" style="flex-direction:row;align-items:center;gap:8px;">
            <input type="checkbox" id="home-remember" />
            <span>Recordar mis datos</span>
          </label>

          <button type="submit" class="primary-btn" style="margin-top:8px;">
            Acceder
          </button>

          <button type="button" class="ghost-btn" id="home-go-register">
            Registrarme
          </button>

          <button type="button" class="link-btn" id="home-go-guest">
            Acceder como invitado
          </button>

          <button type="button" class="link-btn" id="home-forgot-password">
            ¿Olvidaste tu contraseña?
          </button>

          <p id="home-login-error"
             class="text-small"
             style="color:#c0392b;margin-top:8px;display:none;"></p>
        </form>
      </section>
    </div>
  </div>
  `;

  function onMount() {
    const form = document.getElementById('home-login-form');
    const errorBox = document.getElementById('home-login-error');
    const idInput = document.getElementById('home-login-id');
    const passInput = document.getElementById('home-login-password');
    const toggleBtn = document.getElementById('home-password-toggle');
    const rememberChk = document.getElementById('home-remember');

    // Cargar ID recordado (si existe)
    const savedId = localStorage.getItem('lexd_last_id');
    if (savedId) {
      idInput.value = savedId;
      if (rememberChk) rememberChk.checked = true;
    }

    // Ojo de contraseña
    if (toggleBtn && passInput) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = passInput.type === 'password';
        passInput.type = isHidden ? 'text' : 'password';
        toggleBtn.textContent = isHidden ? '🙈' : '👁';
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
          loginUser(id, pwd);

          // Guardar / borrar ID según el check
          if (rememberChk && rememberChk.checked) {
            localStorage.setItem('lexd_last_id', id);
          } else {
            localStorage.removeItem('lexd_last_id');
          }

          // Al loguear: ir al menú principal del abogado
          location.hash = '#/abogadolex';
        } catch (err) {
          errorBox.textContent = err.message || 'ID o contraseña incorrectos.';
          errorBox.style.display = 'block';
        }
      });
    }

    const goReg = document.getElementById('home-go-register');
    if (goReg) {
      goReg.addEventListener('click', () => {
        location.hash = '#/register';
      });
    }

    const goGuest = document.getElementById('home-go-guest');
    if (goGuest) {
      goGuest.addEventListener('click', () => {
        // Invitado: entra directo al menú de LexDigital
        location.hash = '#/abogadolex';
      });
    }

    const forgotBtn = document.getElementById('home-forgot-password');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', () => {
        alert('En la versión final se enviará un enlace de recuperación al correo registrado.');
      });
    }
  }

  return { html, onMount };
}
