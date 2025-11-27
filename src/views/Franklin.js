import TabBar from '../components/TabBar.js';

export default function Franklin() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogado_192.png" alt="Dr. Franklin Vicente">
        </div>
        <h1 class="app-title">
          Mi abogado<br>
          <span>Dr. Franklin Vicente</span>
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
        <h2>Franklin Anthony Laura Vicente</h2>
        <p class="text-muted">Abogado especialista en Derecho Penal.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Estudios de Derecho – Universidad Privada San Juan Bautista (UPSJB), sede Chincha.</li>
          <li>Ingreso: 2017 &nbsp;|&nbsp; Egresado: 2022.</li>
          <li>Diplomados en litigación oral penal y delitos contra la administración pública.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Prácticas pre-profesionales en el Ministerio Público – Fiscalía Provincial Penal de Cañete.</li>
          <li>Defensa técnica en investigaciones por lesiones, hurto, violencia familiar y otros delitos comunes.</li>
          <li>Asesoría a jóvenes y familias sobre procesos penales y medidas de protección.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Enfoque estratégico en la defensa de sus clientes.</li>
          <li>Manejo de audiencias de prisión preventiva y juicios orales.</li>
          <li>Capacidad para explicar el proceso penal con lenguaje sencillo.</li>
        </ul>

        <p class="text-small">
          WhatsApp: <strong>940 879 210</strong><br>
          Correo: <strong>franklinlaura094@gmail.com</strong><br>
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
        const phone = '51940879210';
        const message = encodeURIComponent(
          'Hola doctor Franklin, quisiera una consulta por chat desde la app LexDigital.'
        );
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
      });
    }

    // VIDEOLLAMADA – correo
    const btnVideo = document.getElementById('btn-video');
    if (btnVideo) {
      btnVideo.addEventListener('click', () => {
        const to = 'franklinlaura094@gmail.com';
        const subject = encodeURIComponent('Solicitud de videollamada legal – LexDigital');
        const body = encodeURIComponent(
          `Estimado doctor Franklin,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una consulta por videollamada en materia penal.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Hechos principales del caso:\n` +
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
        const to = 'franklinlaura094@gmail.com';
        const subject = encodeURIComponent('Solicitud de cita presencial – LexDigital');
        const body = encodeURIComponent(
          `Estimado doctor Franklin,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una cita presencial en materia penal.\n\n` +
          `Lugar sugerido:\n` +
          `Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – Sede UPSJ.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Hechos principales del caso:\n` +
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
