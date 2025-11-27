import { loginUser } from '../auth.js';

export default function Login() {
  const html = `
  <section class="screen">
    <div class="app-card auth-card">
      <h1>Identificación</h1>
      <p class="text-small" style="margin-bottom:16px">
        Ingresa con tu ID y contraseña para acceder a LexDigital.
      </p>

      <form id="login-form" class="form-vertical">
        <label class="field">
          <span>ID</span>
          <input type="text" id="login-id" autocomplete="username" required />
        </label>

        <label class="field field-password">
          <span>Contraseña</span>
          <div class="password-wrapper">
            <input type="password" id="login-password"
                   autocomplete="current-password" required />
            <button type="button" id="login-toggle-password"
                    class="password-toggle" aria-label="Mostrar u ocultar contraseña">
              👁
            </button>
          </div>
        </label>

        <label class="field checkbox-field">
          <input type="checkbox" id="login-remember" />
          <span>Recordar mis datos</span>
        </label>

        <button type="submit" class="primary-btn" style="margin-top:12px">
          Acceder
        </button>

        <button type="button" class="ghost-btn" id="login-go-register"
                style="margin-top:8px">
          Registrarme
        </button>

        <p id="login-error"
           class="text-small"
           style="color:#c0392b;margin-top:8px;display:none"></p>
      </form>
    </div>
  </section>
  `;

  function onMount() {
    const form       = document.getElementById('login-form');
    const idInput    = document.getElementById('login-id');
    const pwdInput   = document.getElementById('login-password');
    const rememberCb = document.getElementById('login-remember');
    const errorBox   = document.getElementById('login-error');
    const toggleBtn  = document.getElementById('login-toggle-password');
    const goRegister = document.getElementById('login-go-register');

    if (toggleBtn && pwdInput) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = pwdInput.type === 'password';
        pwdInput.type = isHidden ? 'text' : 'password';
        toggleBtn.textContent = isHidden ? '🙈' : '👁';
      });
    }

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
          loginUser(id, pwd, remember);
          location.hash = '#/abogadolex';
        } catch (err) {
          errorBox.textContent = err.message || 'ID o contraseña incorrectos.';
          errorBox.style.display = 'block';
        }
      });
    }

    if (goRegister) {
      goRegister.addEventListener('click', () => {
        location.hash = '#/register';
      });
    }
  }

  return { html, onMount };
}
