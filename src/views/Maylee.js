import TabBar from '../components/TabBar.js';

export default function Maylee() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogada_192.png" alt="Dra. Maylee De La Cruz">
        </div>
        <h1 class="app-title">Mi abogada<br><span>Dra. Maylee De La Cruz</span></h1>
        <p class="text-link" id="btn-maylee-cv">Ver más sobre mí</p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-chat-maylee">Chat - S/ 20.00</button>
        <button class="pill-btn" type="button" id="btn-video-maylee">Videollamada - S/ 40.00</button>
        <button class="pill-btn" type="button" id="btn-presencial-maylee">Presencial - S/ 50.00</button>
      </div>
    </div>

    <!-- MODAL CV MAYLEE -->
    <div class="cv-modal" id="cv-maylee">
      <div class="cv-card">
        <h2>Maylee De La Cruz</h2>
        <p class="text-muted">Abogada especialista en Derecho Laboral.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Estudios de pregrado en Derecho – Universidad Peruana de Ciencias Aplicadas (UPC).</li>
          <li>Especialización en Derecho Laboral y Gestión de Recursos Humanos.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Asesora legal de trabajadores y pequeñas empresas en conflictos laborales.</li>
          <li>Experiencia en elaboración y revisión de contratos de trabajo y convenios.</li>
          <li>Acompañamiento en procesos de conciliación y demandas laborales.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Comunicación clara y empática con los clientes.</li>
          <li>Orientación a soluciones rápidas y realistas.</li>
          <li>Enfoque preventivo para evitar futuros conflictos legales.</li>
        </ul>

        <p><strong>WhatsApp:</strong> 930 855 713</p>
        <p><strong>Correo:</strong> mayleezamalloa3@gmail.com</p>
        <p><strong>Lugar de atención presencial:</strong> Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – Sede UPSJ.</p>
        <p class="text-small text-muted">
        </p>
      </div>
    </div>

    ${TabBar('abogado')}
  </div>
  `;

  function onMount() {
    // abrir modal
    const btnCV = document.getElementById('btn-maylee-cv');
    const modal = document.getElementById('cv-maylee');

    if (btnCV && modal) {
      btnCV.addEventListener('click', () => {
        modal.classList.add('open');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }

    const btnChat = document.getElementById('btn-chat-maylee');
    if (btnChat) {
      btnChat.addEventListener('click', () => {
        window.open('https://wa.me/51930855713?text=Hola%20Doctora%20Maylee,%20quisiera%20una%20consulta%20por%20chat.', '_blank');
      });
    }

    const btnVideo = document.getElementById('btn-video-maylee');
    if (btnVideo) {
      btnVideo.addEventListener('click', () => {
        const asunto = encodeURIComponent('Solicitud de videollamada legal');
        const cuerpo = encodeURIComponent(
          'Hola Doctora Maylee,\n\nQuisiera agendar una videollamada legal. Estos son mis datos:\n\n' +
          '- Nombre completo:\n- Tema a tratar:\n- Fechas y horarios disponibles:\n\nGracias.'
        );
        window.location.href = `mailto:mayleezamalloa3@gmail.com?subject=${asunto}&body=${cuerpo}`;
      });
    }

    // BOTÓN PRESENCIAL → correo de “cita presencial”
    const btnPres = document.getElementById('btn-presencial-maylee');
    if (btnPres) {
      btnPres.addEventListener('click', () => {
        const asunto = encodeURIComponent('Solicitud de cita presencial');
        const cuerpo = encodeURIComponent(
          'Hola Doctora Maylee,\n\nQuisiera agendar una cita presencial en su oficina. Estos son mis datos:\n\n' +
          '- Nombre completo:\n- Tema a tratar:\n- Fechas y horarios disponibles:\n\nGracias.'
        );
        window.location.href = `mailto:mayleezamalloa3@gmail.com?subject=${asunto}&body=${cuerpo}`;
      });
    }
  }

  return { html, onMount };
}
