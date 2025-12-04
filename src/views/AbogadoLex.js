// src/views/AbogadoLex.js
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

      <!-- botón para abrir el chatbot -->
      <div style="margin-top:24px; text-align:center">
        <button id="btn-open-chat" class="pill-btn">
          💬 Hablar con LexBot
        </button>
      </div>

      <!-- contenedor donde se va a montar el chatbot -->
      <div id="chatbot-container" class="chatbot-container chatbot-hidden"></div>
    </div>
  `;

  // estilos de pantalla completa (como ya tenías)
  Object.assign(el.style, { height: '100svh', minHeight: '100svh', width: '100vw' });
  document.documentElement.style.height = '100%';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.height = '100svh';
  document.body.style.width = '100vw';

  // 🔹 montar el chatbot dentro del contenedor
  const chatContainer = el.querySelector('#chatbot-container');
  const chatEl = ChatBot();       // igual que antes en Home
  chatContainer.appendChild(chatEl);
  initChatBot(chatEl);            // o initChatBot(el) si así lo usabas antes

  // 🔹 botón que muestra / oculta la ventana del bot
  const btnOpen = el.querySelector('#btn-open-chat');
  btnOpen.addEventListener('click', () => {
    chatContainer.classList.toggle('chatbot-hidden');
  });
  
// Inicializar chatbot igual que en Home
setTimeout(() => {
  initChatBot();
}, 0);

  return el;
}
