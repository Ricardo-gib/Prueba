import { registerUser } from '../auth.js';

export default function Register() {
  const html = `
  <div class="screen">
    <div class="app-card auth-card">
      <h1>Crear cuenta</h1>
      <p class="text-muted">
        Completa correctamente todos los campos para poder registrarte.
      </p>

      <form id="register-form" class="form-vertical">
        <label class="field">
          <span>Nombre completo</span>
          <input type="text" id="reg-name" required />
        </label>

        <label class="field">
          <span>ID (usuario)</span>
          <input
            type="text"
            id="reg-id"
            minlength="3"
            maxlength="20"
            placeholder="Ej: maylee123"
            required
          />
        </label>

        <label class="field">
          <span>Contraseña</span>
          <div class="password-wrapper">
            <input
              type="password"
              id="reg-password"
              minlength="6"
              autocomplete="new-password"
              required
            />
            <button
              type="button"
              class="password-toggle"
              id="reg-password-toggle"
              aria-label="Mostrar u ocultar contraseña"
            >👁</button>
          </div>
        </label>

        <label class="field">
          <span>Número de celular</span>
          <input
            type="tel"
            id="reg-phone"
            placeholder="9xxxxxxxx"
            required
          />
        </label>

        <label class="field">
          <span>Correo electrónico</span>
          <input
            type="email"
            id="reg-email"
            placeholder="tucorreo@gmail.com"
            required
          />
        </label>

        <button type="submit" class="primary-btn" style="margin-top:16px;">
          Crear cuenta
        </button>

        <button type="button" class="ghost-btn" id="reg-go-login">
          Ya tengo cuenta: Ingresar
        </button>

        <button type="button" class="link-btn" id="reg-go-home">
          Volver al inicio
        </button>

        <p id="reg-error"
           class="text-small"
           style="color:#c0392b;margin-top:8px;display:none;"></p>
      </form>
    </div>
  </div>
  `;

  function onMount() {
    const form = document.getElementById('register-form');
    const errorBox = document.getElementById('reg-error');
    const nameInput = document.getElementById('reg-name');
    const idInput = document.getElementById('reg-id');
    const pwdInput = document.getElementById('reg-password');
    const phoneInput = document.getElementById('reg-phone');
    const emailInput = document.getElementById('reg-email');
    const toggleBtn = document.getElementById('reg-password-toggle');

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

        const fullName = nameInput.value.trim();
        const userId = idInput.value.trim();
        const pwd = pwdInput.value;
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        if (!fullName || !userId || !pwd || !phone || !email) {
          errorBox.textContent = 'Completa todos los campos.';
          errorBox.style.display = 'block';
          return;
        }

        if (pwd.length < 6) {
          errorBox.textContent = 'La contraseña debe tener al menos 6 caracteres.';
          errorBox.style.display = 'block';
          return;
        }

        try {
          registerUser({
            id: userId,
            password: pwd,
            name: fullName,
            phone,
            email,
          });

          alert('Cuenta creada correctamente. Ahora puedes ingresar con tu ID.');
          location.hash = '#/home';
        } catch (err) {
          errorBox.textContent = err.message || 'No se pudo crear la cuenta.';
          errorBox.style.display = 'block';
        }
      });
    }

    const goLogin = document.getElementById('reg-go-login');
    if (goLogin) {
      goLogin.addEventListener('click', () => {
        location.hash = '#/home'; // tu login ahora está en Home
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
