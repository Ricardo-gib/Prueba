// src/components/ChatBot.js

// Componente visual: botón flotante + ventana del chat
export default function ChatBot() {
  return `
    <div class="lexbot">
      <button class="lexbot-toggle" id="lexbot-toggle" type="button" aria-label="Abrir chat legal">
        🤖
      </button>

      <div class="lexbot-window" id="lexbot-window">
        <div class="lexbot-card">
          <header class="lexbot-header">
            <div>
              <strong>LexDigital Bot</strong>
              <p class="lexbot-subtitle">Asistente legal básico</p>
            </div>
            <button type="button" class="lexbot-close" id="lexbot-close">✕</button>
          </header>

          <div class="lexbot-body" id="lexbot-body">
            <div class="lexbot-message bot">
              <p>
                Hola 👋 Soy el asistente de <strong>LexDigital</strong>.
                Puedo orientarte sobre <em>contratos básicos</em>, <em>cursos legales</em>,
                <em>checklists</em> y sobre nuestros abogados.
                ¿Qué te gustaría saber?
              </p>
            </div>
          </div>

          <form class="lexbot-form" id="lexbot-form">
            <input
              type="text"
              id="lexbot-input"
              placeholder="Escribe tu consulta legal básica..."
              autocomplete="off"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

// Inicializa los eventos del chatbot
export function initChatBot() {
  const toggle   = document.getElementById('lexbot-toggle');
  const windowEl = document.getElementById('lexbot-window');
  const closeBtn = document.getElementById('lexbot-close');
  const form     = document.getElementById('lexbot-form');
  const input    = document.getElementById('lexbot-input');
  const body     = document.getElementById('lexbot-body');

  if (!toggle || !windowEl || !form || !input || !body) return;

  const openChat  = () => windowEl.classList.add('open');
  const closeChat = () => windowEl.classList.remove('open');

  toggle.addEventListener('click', () => {
    windowEl.classList.contains('open') ? closeChat() : openChat();
  });

  closeBtn?.addEventListener('click', closeChat);

  // Cerrar tocando fuera de la tarjeta
  windowEl.addEventListener('click', (e) => {
    if (e.target === windowEl) closeChat();
  });

  const addMessage = (from, text) => {
    const div = document.createElement('div');
    div.className = `lexbot-message ${from}`;
    div.innerHTML = `<p>${text}</p>`;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const getReply = (rawText) => {
    const text = rawText.toLowerCase();

    // CONTRATOS
    if (text.includes('arrendamiento') || text.includes('alquiler')) {
      return `
Para un contrato de <strong>arrendamiento</strong> normalmente se incluyen:
• Datos de arrendador y arrendatario  
• Descripción del inmueble  
• Monto de la renta y forma de pago  
• Plazo del contrato y penalidades  

En LexDigital tenemos un modelo base de arrendamiento, pero siempre es mejor que un abogado lo revise antes de firmar.`;
    }

    if (text.includes('compraventa')) {
      return `
En un contrato de <strong>compraventa</strong> de bien mueble se suele indicar:
• Datos de comprador y vendedor  
• Descripción del bien (marca, modelo, serie)  
• Precio, forma de pago y fecha de entrega  
• Responsabilidades por fallas o vicios ocultos  

Nuestro módulo de <em>Contratos</em> te muestra un modelo simple para empezar.`;
    }

    if (text.includes('servicios') || text.includes('honorarios')) {
      return `
El contrato de <strong>servicios</strong> u honorarios profesionales suele contener:
• Identificación del profesional y del cliente  
• Descripción clara del servicio  
• Honorarios, forma y fecha de pago  
• Duración del servicio y condiciones de término  

El contrato base de LexDigital te ayuda a no olvidar estas cláusulas.`;
    }

    // CURSOS
    if (text.includes('curso') || text.includes('taller')) {
      return `
En <strong>Cursos legales</strong> encontrarás talleres cortos sobre:
• Derechos laborales básicos  
• Derecho de familia y pensión de alimentos  
• Derechos del consumidor  

La idea es que entiendas tus derechos antes de hablar con tu abogado.`;
    }

    if (text.includes('laboral') && text.includes('derecho')) {
      return `
El curso de <strong>derechos laborales básicos</strong> aborda temas como:
• Jornada y horas extras  
• Vacaciones, CTS y gratificaciones  
• Despido arbitrario y despido justificado  

Sirve como guía antes de una consulta profesional.`;
    }

    // GUÍAS / CHECKLIST
    if (text.includes('checklist') || text.includes('guía') || text.includes('guia')) {
      return `
Las <strong>guías y documentos</strong> de LexDigital incluyen:
✅ Checklist para primera consulta legal  
📄 Checklist para denuncia o reclamo  
🧑‍💼 Checklist para problemas laborales  

No reemplazan una asesoría profesional, pero te ayudan a llegar preparado a la cita.`;
    }

    if (text.includes('denuncia') || text.includes('reclamo')) {
      return `
Para una <strong>denuncia o reclamo</strong>, el checklist te sugiere:
• Identificar claramente a la persona o empresa  
• Anotar fechas, lugares y lo ocurrido  
• Reunir pruebas (fotos, mensajes, contratos, boletas)  
• Ver qué entidad es competente (Indecopi, Sunafil, Municipalidad, etc.)`;
    }

    // ABOGADOS
    if (text.includes('maylee')) {
      return `
La <strong>Dra. Maylee De La Cruz</strong> está especializada en <em>Derecho Laboral</em>.
Asesora sobre conflictos de trabajo, conciliaciones y revisión de contratos laborales.`;
    }

    if (text.includes('laura')) {
      return `
La <strong>Dra. Laura Anadin Romero</strong> está especializada en
<em>Derecho Civil y de Familia</em>, incluyendo alimentos, tenencia y divorcio de mutuo acuerdo.`;
    }

    if (text.includes('franklin')) {
      return `
El <strong>Dr. Franklin</strong> se enfoca en temas civiles y contractuales,
apoyando en elaboración y revisión de contratos y otros documentos legales.`;
    }

    // LOGIN / USO DE LA APP
    if (text.includes('id') && text.includes('olvide')) {
      return `
Por ahora, para recuperar tu <strong>ID</strong> o contraseña debes contactar directamente
con el administrador de la app. El bot no puede modificar cuentas de usuario.`;
    }

    // RESPUESTA GENERAL
    if (text.includes('ayuda') || text.includes('explica') || text.includes('como funciona')) {
      return `
Puedo darte una <strong>orientación básica</strong> sobre:
• Qué debe llevar un contrato simple  
• Qué temas cubren nuestros cursos  
• Qué revisa cada checklist  
• Qué tipo de casos ve cada abogado  

Si tu caso es complejo, siempre es recomendable agendar una consulta con un abogado.`;
    }

    // Fallback
    return `
Lo que me preguntas parece ser un tema más específico 😊.
Puedo darte ideas generales, pero <strong>no reemplazo a un abogado</strong>.
Te recomendaría agendar una consulta con alguno de nuestros especialistas en la app.`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    // Mensaje del usuario
    addMessage('user', text);
    input.value = '';

    // Respuesta del bot
    const reply = getReply(text);
    addMessage('bot', reply);
  });
}

