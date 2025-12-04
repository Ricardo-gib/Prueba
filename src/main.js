// src/main.js
import router from './router.js';
import ChatBot, { initChatBot } from './components/ChatBot.js';
import { auth } from './lib/firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

function mountChatBotOnce() {
  // Si ya existe, no lo volvemos a montar
  if (document.querySelector('.lexbot')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = ChatBot();        // ← HTML del botón flotante + ventana
  const botEl = wrapper.firstElementChild;
  if (botEl) document.body.appendChild(botEl);

  initChatBot();                        // ← engancha los eventos (abrir/cerrar, enviar mensaje, etc.)
}

// Router normal
window.addEventListener('hashchange', () => router());

// Cuando cargue la página:
window.addEventListener('DOMContentLoaded', () => {
  router('/');          // pinta la ruta inicial
  mountChatBotOnce();   // monta el bot flotante una única vez
});

// Observa cambios de sesión (igual que antes)
onAuthStateChanged(auth, (user) => {
  const path = (location.hash || '').replace(/^#/, '');
  if (user) {
    if (!user.emailVerified && path !== '/register' && path !== 'register') {
      console.log('Usuario no verificado:', user.email);
    }
  }
});
