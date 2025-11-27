const STORAGE_KEY = 'lexdigital_users';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export default function Register() {
  const html = `
  <div class="screen" style="display:flex;justify-content:center;align-items:flex-start;padding:32px 16px;">
    <div style="
      width:100%;
      max-width:520px;
      background:#ffffff;
      border-radius:24px;
      padding:24px 22px 28px;
      box-shadow:0 18px 45px rgba(15,23,42,0.15);
      font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    ">
      <h1 style="font-size:1.8rem;margin:0 0 8px;color:#0f172a;">Crear cuenta</h1>
      <p style="margin:0 0 20px;color:#4b5563;font-size:0.96rem;">
        Regístrate con un <strong>ID</strong>, como en un videojuego, y úsalo para entrar a LexDigital.
      </p>

      <form id="register-form" autocomplete="off" style="display:flex;flex-direction:column;gap:12px;margin-top:4px;">

        <label style="font-size:0.9rem;color:#111827;">
          Nombre completo
          <input
            id="reg-name"
            type="text"
            required
            placeholder="Tu nombre completo"
            style="margin-top:4px;width:100%;padding:10px 14px;border-radius:999px;border:1px solid #d1d5db;outline:none;font-size:0.94rem;"
          />
        </label>

        <div style="display:flex;flex-wrap:wrap;gap:12px;">
          <label style="flex:1 1 160px;font-size:0.9rem;color:#111827;">
            ID (usuario)
            <input
              id="reg-id"
              type="text"
              required
              placeholder="Ej: ricard0"
              style="margin-top:4px;width:100%;padding:10px 14px;border-radius:999px;border:1px solid #d1d5db;outline:none;font-size:0.94rem;"
            />
          </label>

          <label style="flex:1 1 160px;font-size:0.9rem;color:#111827;">
            Contraseña
            <input
              id="reg-pass"
              type="password"
              required
              minlength="6"
              placeholder="Mínimo 6 caracteres"
              style="margin-top:4px;width:100%;padding:10px 14px;border-radius:999px;border:1px solid #d1d5db;outline:none;font-size:0.94rem;"
            />
          </label>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;">
          <label style="flex:1 1 160px;font-size:0.9rem;color:#111827;">
            Número de celular
            <input
              id="reg-phone"
              type="tel"
              required
              placeholder="9xx xxx xxx"
              style="margin-top:4px;width:100%;padding:10px 14px;border-radius:999px;border:1px solid #d1d5db;outline:none;font-size:0.94rem;"
            />
          </label>

          <label style="flex:1 1 160px;font-size:0.9rem;color:#111827;">
            Correo electrónico
            <input
              id="reg-email"
              type="email"
              required
              placeholder="tucorreo@gmail.com"
              style="margin-top:4px;width:100%;padding:10px 14px;border-radius:999px;border:1px solid #d1d5db;outline:none;font-size:0.94rem;"
            />
          </label>
        </div>

        <button
          type="submit"
          style="
            margin-top:10px;
            width:100%;
            border:none;
            border-radius:999px;
            padding:12px 16px;
            font-size:1rem;
            font-weight:600;
            color:#ffffff;
            background:#022c4b;
            cursor:pointer;
          "
        >
          Crear cuenta
        </button>

        <button
          type="button"
          id="btn-go-login"
          style="
            margin-top:4px;
            width:100%;
            border:1px solid #022c4b;
            border-radius:999px;
            padding:10px 16px;
            font-size:0.96rem;
            font-weight:500;
            color:#022c4b;
            background:#ffffff;
            cursor:pointer;
          "
        >
          Ya tengo cuenta: Ingresar
        </button>

        <button
          type="button"
          id="btn-go-home"
          style="
            margin-top:2px;
            border:none;
            background:none;
            color:#2563eb;
            font-size:0.9rem;
            text-decoration:underline;
            cursor:pointer;
            align-self:flex-start;
          "
        >
          Volver al inicio
        </button>

        <p style="margin-top:6px;font-size:0.78rem;color:#6b7280;">
          Tus datos se guardan solo en este dispositivo (localStorage) para las pruebas del curso.
        </p>
      </form>
    </div>
  </div>
  `;

  function onMount() {
    const form = document.getElementById('register-form');
    const nameInput = document.getElementById('reg-name');
    const idInput = document.getElementById('reg-id');
    const passInput = document.getElementById('reg-pass');
    const phoneInput = document.getElementById('reg-phone');
    const emailInput = document.getElementById('reg-email');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const userId = idInput.value.trim();
      const password = passInput.value;
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();

      if (!name || !userId || !password || !phone || !email) {
        alert('Completa todos los campos.');
        return;
      }

      const users = loadUsers();
      const exists = users.some(u => u.id.toLowerCase() === userId.toLowerCase());

      if (exists) {
        alert('Ese ID ya existe. Prueba con otro (como en un videojuego 😄).');
        idInput.focus();
        return;
      }

      users.push({
        id: userId,
        name,
        password,
        phone,
        email,
        createdAt: new Date().toISOString()
      });
      saveUsers(users);

      localStorage.setItem('lexdigital_session', userId);

      alert('Cuenta creada correctamente. Ya puedes usar tu ID para entrar.');
      location.hash = '#/abogado';
    });

    const btnLogin = document.getElementById('btn-go-login');
    const btnHome = document.getElementById('btn-go-home');

    if (btnLogin) {
      btnLogin.addEventListener('click', () => {
        location.hash = '#/login';
      });
    }

    if (btnHome) {
      btnHome.addEventListener('click', () => {
        location.hash = '#/home';
      });
    }
  }

  return { html, onMount };
}
