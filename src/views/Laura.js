import TabBar from '../components/TabBar.js';

export default function Laura() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogada_192.png" alt="Dra. Laura Romero">
        </div>
        <h1 class="app-title">
          Mi abogada<br>
          <span>Dra. Laura Romero</span>
        </h1>
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
        <h2>Laura Anadin Romero</h2>
        <p class="text-muted">Abogada especialista en Derecho Civil y de Familia.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Estudios de pregrado en Derecho – Universidad Privada San Juan Bautista (UPSJB), sede Chincha.</li>
          <li>Ingreso: 2018 &nbsp;|&nbsp; Egresada: 2023.</li>
          <li>Profundización en Derecho Civil Patrimonial y Derecho de Familia.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Asesora legal en la Municipalidad Distrital de Nuevo Imperial en temas civiles.</li>
          <li>Elaboración y revisión de contratos de compraventa, arrendamiento y préstamos.</li>
          <li>Acompañamiento en procesos de alimentos, tenencia y divorcio de mutuo acuerdo.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Escucha activa y orientación a soluciones conciliadoras.</li>
          <li>Redacción clara de contratos y actas de acuerdos.</li>
          <li>Compromiso con la protección de la familia y el patrimonio de sus clientes.</li>
        </ul>

        <p class="text-small">
          WhatsApp: <strong>958 002 612</strong><br>
          Correo: <strong>anadinromerolaura@gmail.com</strong><br>
          Lugar de atención presencial: <strong>Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – Sede UPSJ.</strong>
        </p>

        <button type="button" class="pill-btn" id="cv-close">Cerrar</button>
      </div>
    </div>
  </div>

  ${TabBar('abogado')}
  `;

  function onMount() {
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

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    // CHAT – WhatsApp
    const btnChat = document.getElementById('btn-chat');
    if (btnChat) {
      btnChat.addEventListener('click', () => {
        const phone = '51958002612';
        const message = encodeURIComponent(
          'Hola doctora Laura, quisiera una consulta por chat desde la app LexDigital.'
        );
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
      });
    }

    // VIDEOLLAMADA – correo
    const btnVideo = document.getElementById('btn-video');
    if (btnVideo) {
      btnVideo.addEventListener('click', () => {
        const to = 'anadinromerolaura@gmail.com';
        const subject = encodeURIComponent('Solicitud de videollamada legal – LexDigital');
        const body = encodeURIComponent(
          `Estimada doctora Laura,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una consulta por videollamada.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Tema de la consulta civil/familiar:\n` +
          `- Día y hora sugeridos:\n\n` +
          `Quedo atento(a) a su confirmación y al enlace de Google Meet.\n\n` +
          `Saludos cordiales.`
        );
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      });
    }

    // PRESENCIAL – correo
    const btnPresencial = document.getElementById('btn-presencial');
    if (btnPresencial) {
      btnPresencial.addEventListener('click', () => {
        const to = 'anadinromerolaura@gmail.com';
        const subject = encodeURIComponent('Solicitud de cita presencial – LexDigital');
        const body = encodeURIComponent(
          `Estimada doctora Laura,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una cita presencial.\n\n` +
          `Lugar sugerido:\n` +
          `Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – Sede UPSJ.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Tema de la consulta civil/familiar:\n` +
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
