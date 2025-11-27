// src/views/Register.js
import { registerUser } from '../auth.js';

export default function Register() {
  const el = document.createElement('section');
  el.className = 'screen';

  el.innerHTML = `
    <div class="app-card">
      <h1>Crear cuenta</h1>
      <p class="text-muted">Completa correctamente todos los campos para poder registrarte.</p>

      <form id="register-form" class="form-vertical">

        <!-- Nombre -->
        <label class="field">
          <span>Nombre completo</span>
          <input type="text" id="reg-name" placeholder="Ej: Maylee Zamalloa">
        </label>

        <!-- ID -->
        <label class="field">
          <span>ID (usuario)</span>
          <input type="text" id="reg-id" placeholder="Ej: maylee123">
        </label>

        <!-- Contraseña -->
        <label class="field">
          <span>Contraseña</span>
          <div class="password-wrapper">
            <input type="password" id="reg-password" />
            <button type="button" class="password-toggle" id="toggle-reg-pass">👁</button>
          </div>
        </label>

        <!-- Celular -->
        <label class="field">
          <span>Número de celular</span>
          <input type="text" id="reg-phone" placeholder="9xxxxxxxx">
        </label>

        <!-- Email -->
        <label class="field">
          <span>Correo electrónico</span>
          <input type="email" id="reg-email" placeholder="tucorreo@gmail.com">
        </label>

        <!-- Botón crear -->
        <button type="submit" class="home-btn primary" style="margin-top:10px">
          Crear cuenta
        </button>

        <!-- Ir a login -->
        <a href="#/login" class="home-btn secondary" style="text-align:center">
          Ya tengo cuenta: Ingresar
        </a>

        <!-- Volver -->
        <button type="button" id="go-home" class="btn" style="margin-top:10px">
          Volver al inicio
        </button>

        <p id="reg-error" class="text-small" style="color:#c0392b;display:none;margin-top:12px"></p>

      </form>
    </div>
  `;

  // ------- REFERENCIAS ---------
  const form = el.querySelector('#register-form');
  const errorBox = el.querySelector('#reg-error');

  const nameInput = el.querySelector('#reg-name');
  const idInput   = el.querySelector('#reg-id');
  const passInput = el.querySelector('#reg-password');
  const phoneInput = el.querySelector('#reg-phone');
  const emailInput = el.querySelector('#reg-email');

  const togglePass = el.querySelector('#toggle-reg-pass');

  // ------- MOSTRAR / OCULTAR CONTRASEÑA -------
  togglePass.addEventListener('click', () => {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      togglePass.textContent = '🙈';
    } else {
      passInput.type = 'password';
      togglePass.textContent = '👁';
    }
  });

  // ------- EVENTO REGISTRO -------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorBox.style.display = 'none';

    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    const pwd = passInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !id || !pwd || !phone || !email) {
      errorBox.textContent = "Por favor completa todos los campos.";
      errorBox.style.display = 'block';
      return;
    }

    try {
      registerUser(name, id, pwd, phone, email);
      location.hash = '#/login';
    } catch (err) {
      errorBox.textContent = err.message || "Error al registrar.";
      errorBox.style.display = 'block';
    }
  });

  // ------- VOLVER AL HOME -------
  el.querySelector('#go-home').addEventListener('click', () => {
    location.hash = '#/home';
  });

  return el;
}
