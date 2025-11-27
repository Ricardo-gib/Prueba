import TabBar from '../components/TabBar.js';

export default function Maylee() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogada_192.png" alt="Dra. Maylee De La Cruz">
        </div>
        <h1 class="app-title">
          Mi abogada<br>
          <span>Dra. Maylee De La Cruz</span>
        </h1>
        <!-- Texto clickeable para ver el CV -->
        <p class="text-link" id="btn-ver-mas">Ver más sobre mí</p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-chat">
          Chat - S/ 20.00
        </button>
        <button class="pill-btn" type="button" id="btn-video">
          Videollamada - S/ 40.00
        </button>
        <button class="pill-btn" type="button" id="btn-presencial">
          Presencial - S/ 50.00
        </button>
      </div>
    </div>

    <!-- Modal CV -->
    <div class="modal-backdrop" id="cv-modal" style="display:none">
      <div class="modal-card">
        <h2>Marycris Maylee Zamalloa De La Cruz</h2>
        <p class="text-muted">Abogada especialista en Derecho Laboral.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Estudios de pregrado en Derecho – Universidad Privada San Juan Bautista (UPSJB), sede Chincha.</li>
          <li>Ingreso: 2019 &nbsp;|&nbsp; Egresada: 2024.</li>
          <li>Especialización en Derecho Laboral y Seguridad Social.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Asesora legal en estudios jurídicos de Cañete y Chincha en materia laboral y previsional.</li>
          <li>Experiencia en conciliaciones, liquidaciones de beneficios sociales y contratos de trabajo.</li>
          <li>Participación en programas de orientación legal comunitaria en la provincia de Cañete.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Trato empático y comunicación clara con sus clientes.</li>
          <li>Capacidad de análisis jurídico y redacción de documentos legales.</li>
          <li>Orientación a resultados y defensa de derechos laborales.</li>
        </ul>

        <p class="text-small">
          WhatsApp: <strong>930 855 713</strong><br>
          Correo: <strong>mayleezamalloa3@gmail.com</strong><br>
          Lugar de atención presencial: <strong>Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – Sede UPSJ.</strong>
        </p>

        <button type="button" class="pill-btn" id="cv-close">Cerrar</button>
      </div>
    </div>
  </div>

  ${TabBar('abogado')}
  `;

  function onMount() {
    // ===== Modal CV =====
    const modal = document.getElementById('cv-modal');
    const btnVerMas = document.getElementById('btn-ver-mas');
    const btnCerrar = document.getElementById('cv-close');

    if (btnVerMas && modal) {
      btnVerMas.style.cursor = 'pointer';
      btnVerMas.addEventListener('click', () => {
        modal.style.display = 'flex';
      });
    }

    if (btnCerrar && modal) {
      btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    // Cerrar modal haciendo clic fuera de la tarjeta
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    // ===== Botón CHAT (WhatsApp) =====
    const btnChat = document.getElementById('btn-chat');
    if (btnChat) {
      btnChat.addEventListener('click', () => {
        const phone = '51930855713'; // 51 + 930855713
        const message = encodeURIComponent(
          'Hola doctora Maylee, quisiera una consulta por chat desde la app LexDigital.'
        );
        const url = `https://wa.me/${phone}?text=${message}`;
        window.open(url, '_blank');
      });
    }

    // ===== Botón VIDEOLLAMADA (correo) =====
    const btnVideo = document.getElementById('btn-video');
    if (btnVideo) {
      btnVideo.addEventListener('click', () => {
        const to = 'mayleezamalloa3@gmail.com';
        const subject = encodeURIComponent('Solicitud de videollamada legal – LexDigital');
        const body = encodeURIComponent(
          `Estimada doctora Maylee,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una consulta por videollamada.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Tema de la consulta:\n` +
          `- Día y hora sugeridos:\n\n` +
          `Quedo atento(a) a su confirmación y al enlace de Google Meet.\n\n` +
          `Saludos cordiales.`
        );
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      });
    }

    // ===== Botón PRESENCIAL (correo) =====
    const btnPresencial = document.getElementById('btn-presencial');
    if (btnPresencial) {
      btnPresencial.addEventListener('click', () => {
        const to = 'mayleezamalloa3@gmail.com';
        const subject = encodeURIComponent('Solicitud de cita presencial – LexDigital');
        const body = encodeURIComponent(
          `Estimada doctora Maylee,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una cita presencial.\n\n` +
          `Lugar de atención sugerido:\n` +
          `Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – Sede UPSJ.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Tema de la consulta:\n` +
          `- Día y hora sugeridos:\n\n` +
          `Quedo atento(a) a su confirmación.\n\n` +
          `Saludos cordiales.`
        );
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      });
    }
  }

  return { html, onMount };
}
