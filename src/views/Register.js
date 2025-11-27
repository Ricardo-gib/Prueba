// src/views/Register.js
import { registerUser } from '../auth.js';

export default function Register() {
  const html = `
  <section class="screen">
    <div class="app-card auth-card">
      <h1>Crear cuenta</h1>
      <p class="text-small" style="margin-bottom:16px">
        Completa correctamente todos los campos para poder registrarte.
      </p>

      <form id="register-form" class="form-vertical">
        <label class="field">
          <span>Nombre completo</span>
          <input type="text" id="reg-name" required />
        </label>

        <label class="field">
          <span>ID (usuario)</span>
          <input type="text" id="reg-id" autocomplete="username" required />
        </label>

        <label class="field field-password">
          <span>Contraseña</span>
          <div class="password-wrapper">
            <input type="password" id="reg-password"
                   autocomplete="new-password" required />
            <button type="button" id="reg-toggle-password"
                    class="password-toggle" aria-label="Mostrar u ocultar contraseña">
              👁
            </button>
          </div>
        </label>

        <label class="field">
          <span>Número de celular</span>
          <input type="tel" id="reg-phone" required />
        </label>

        <label class="field">
          <span>Correo electrónico</span>
          <input type="email" id="reg-email" autocomplete="email" required />
        </label>

        <button type="submit" class="primary-btn" style="margin-top:12px">
          Crear cuenta
        </button>

        <button type="button" class="ghost-btn" id="reg-go-login"
                style="margin-top:8px">
          Ya tengo cuenta: Ingresar
        </button>

        <button type="button" class="link-btn" id="reg-go-home">
          Volver al inicio
        </button>

        <p id="reg-error"
           class="text-small"
           style="color:#c0392b;margin-top:8px;display:none"></p>
      </form>
    </div>
  </section>
  `;

  function onMount() {
    const form     = document.getElementById('register-form');
    const nameIn   = document.getElementById('reg-name');
    const idIn     = document.getElementById('reg-id');
    const pwdIn    = document.getElementById('reg-password');
    const phoneIn  = document.getElementById('reg-phone');
    const emailIn  = document.getElementById('reg-email');
    const errorBox = document.getElementById('reg-error');
    const toggleBtn = document.getElementById('reg-toggle-password');

    if (toggleBtn && pwdIn) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = pwdIn.type === 'password';
        pwdIn.type = isHidden ? 'text' : 'password';
        toggleBtn.textContent = isHidden ? '🙈' : '👁';
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorBox.style.display = 'none';

        const data = {
          name:   nameIn.value.trim(),
          id:     idIn.value.trim(),
          pwd:    pwdIn.value,
          phone:  phoneIn.value.trim(),
          email:  emailIn.value.trim(),
        };

        if (!data.name || !data.id || !data.pwd || !data.phone || !data.email) {
          errorBox.textContent = 'Completa todos los campos.';
          errorBox.style.display = 'block';
          return;
        }

        try {
          registerUser(data);
          // después de registrarse vuelve al inicio para entrar con su ID
          location.hash = '#/home';
        } catch (err) {
          errorBox.textContent = err.message || 'No se pudo registrar el usuario.';
          errorBox.style.display = 'block';
        }
      });
    }

    const goLogin = document.getElementById('reg-go-login');
    if (goLogin) {
      goLogin.addEventListener('click', () => {
        location.hash = '#/login';
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
