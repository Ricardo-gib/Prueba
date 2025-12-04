import ChatBot, { initChatBot } from '../components/ChatBot.js';

export default function AbogadoLex() {
  const el = document.createElement('section');
  el.className = 'screen full-screen';

  el.innerHTML = `
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large" aria-hidden="true">
          <img src="assets/icon_1024.png?v=36" alt="Logo LexDigital" />
        </div>
        <h1 class="app-title">
          Abogado<br><span>LexDigital</span>
        </h1>
      </header>

      <nav class="menu-list large-menu">
        <a class="pill-btn" href="#/abogado">Mi Abogado Legal</a>
        <a class="pill-btn" href="#/contratos">Contratos y Planillas</a>
        <a class="pill-btn" href="#/cursos">Cursos Legales</a>
        <a class="pill-btn" href="#/guias">Guías y Documentos</a>
      </nav>

      <div style="margin-top:20px;text-align:center;">
        <button id="abrirBot" class="pill-btn">
          💬 Hablar con LexBot
        </button>
      </div>
    </div>
  `;

  // Igual que antes en Home
  setTimeout(() => {
    initChatBot();
  }, 0);

  // mostrar/ocultar la ventana del bot
  setTimeout(() => {
    const toggleBtn = document.getElementById('abrirBot');
    const botWindow = document.querySelector('.lexbot-window');

    if (toggleBtn && botWindow) {
      toggleBtn.addEventListener('click', () => {
        botWindow.classList.toggle('open');
      });
    }
  }, 200);

  return el;
}
