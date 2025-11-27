import TabBar from '../components/TabBar.js';

export default function Maricielo() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogada_192.png" alt="Dra. Maricielo García">
        </div>
        <h1 class="app-title">
          Mi abogada<br>
          <span>Dra. Maricielo García</span>
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
        <h2>Maricielo Mía Quispe García</h2>
        <p class="text-muted">Abogada especialista en Derecho Empresarial y Tributario.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Estudios de Derecho – Universidad Privada San Juan Bautista (UPSJB), sede Chincha.</li>
          <li>Ingreso: 2018 &nbsp;|&nbsp; Egresada: 2023.</li>
          <li>Cursos de especialización en Derecho Corporativo y Regímenes Tributarios para MYPE.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Asesoría a pequeñas y medianas empresas en Cañete y Chincha.</li>
          <li>Elaboración de contratos comerciales, constitución de empresas y actualización de libros societarios.</li>
          <li>Acompañamiento en fiscalizaciones municipales y SUNAT.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Enfoque práctico para emprendedores y negocios familiares.</li>
          <li>Capacidad para simplificar la normativa tributaria y laboral para MYPE.</li>
          <li>Orientación a la prevención de riesgos legales en los negocios.</li>
        </ul>

        <p class="text-small">
          WhatsApp: <strong>917 477 663</strong><br>
          Correo: <strong>miajk046@gmail.com</strong><br>
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
        const phone = '51917477663';
        const message = encodeURIComponent(
          'Hola doctora Maricielo, quisiera una consulta por chat desde la app LexDigital.'
        );
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
      });
    }

    // VIDEOLLAMADA – correo
    const btnVideo = document.getElementById('btn-video');
    if (btnVideo) {
      btnVideo.addEventListener('click', () => {
        const to = 'miajk046@gmail.com';
        const subject = encodeURIComponent('Solicitud de videollamada legal – LexDigital');
        const body = encodeURIComponent(
          `Estimada doctora Maricielo,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una consulta por videollamada en temas empresariales.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Tipo de negocio:\n` +
          `- Tema principal (constitución, contratos, tributos, etc.):\n` +
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
        const to = 'miajk046@gmail.com';
        const subject = encodeURIComponent('Solicitud de cita presencial – LexDigital');
        const body = encodeURIComponent(
          `Estimada doctora Maricielo,\n\n` +
          `Le escribo desde la aplicación LexDigital para solicitar una cita presencial.\n\n` +
          `Lugar sugerido:\n` +
          `Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – Sede UPSJ.\n\n` +
          `Datos de referencia:\n` +
          `- Nombre completo:\n` +
          `- DNI:\n` +
          `- Tipo de negocio y tema principal:\n` +
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
