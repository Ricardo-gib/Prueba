import TabBar from '../components/TabBar.js';

export default function Maricielo() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogada_192.png" alt="Dra. Maricielo Gonzales">
        </div>
        <h1 class="app-title">Mi abogada<br><span>Dra. Maricielo Gonzales</span></h1>
        <p class="text-link" id="btn-maricielo-cv">Ver más sobre mí</p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-chat-maricielo">Chat - S/ 20.00</button>
        <button class="pill-btn" type="button" id="btn-video-maricielo">Videollamada - S/ 40.00</button>
        <button class="pill-btn" type="button" id="btn-presencial-maricielo">Presencial - S/ 50.00</button>
      </div>
    </div>

    <!-- MODAL CV MARICIELO -->
    <div class="cv-modal" id="cv-maricielo">
      <div class="cv-card">
        <h2>Maricielo Gonzales</h2>
        <p class="text-muted">Abogada especialista en Derecho Corporativo y Contratos.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Abogada por la Universidad Nacional José Faustino Sánchez Carrión.</li>
          <li>Diplomado en Gestión Empresarial y Compliance.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Asesoría legal a empresas y emprendedores en formalización y creación de negocios.</li>
          <li>Elaboración de contratos civiles, mercantiles y laborales.</li>
          <li>Representación en SUNAFIL, INDECOPI y procedimientos administrativos.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Comunicación clara y enfoque organizacional.</li>
          <li>Soluciones prácticas para empresas y negocios.</li>
          <li>Prevención de riesgos legales y cumplimiento normativo (Compliance).</li>
        </ul>

        <p><strong>WhatsApp:</strong> 987 552 104</p>
        <p><strong>Correo:</strong> maricielogonzales.legal@gmail.com</p>
        <p><strong>Lugar de atención presencial:</strong> Av. 28 de Julio 180, San Vicente – Cañete.</p>

        <p class="text-small text-muted">
        </p>
      </div>
    </div>

    ${TabBar('abogado')}
  </div>
  `;

  function onMount() {
    // abrir modal
    const btnCV = document.getElementById('btn-maricielo-cv');
    const modal = document.getElementById('cv-maricielo');

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

    // CHAT
    const btnChat = document.getElementById('btn-chat-maricielo');
    if (btnChat) {
      btnChat.addEventListener('click', () => {
        window.open('https://wa.me/51987552104?text=Hola%20Doctora%20Maricielo,%20quisiera%20una%20consulta%20por%20chat.', '_blank');
      });
    }

    // VIDEOLLAMADA
    const btnVideo = document.getElementById('btn-video-maricielo');
    if (btnVideo) {
      btnVideo.addEventListener('click', () => {
        const asunto = encodeURIComponent('Solicitud de videollamada legal');
        const cuerpo = encodeURIComponent(
          'Hola Doctora Maricielo,\n\nQuisiera agendar una videollamada legal. Estos son mis datos:\n\n' +
          '- Nombre completo:\n- Tema a tratar:\n- Fechas y horarios disponibles:\n\nGracias.'
        );
        window.location.href = `mailto:maricielogonzales.legal@gmail.com?subject=${asunto}&body=${cuerpo}`;
      });
    }

    // PRESENCIAL
    const btnPres = document.getElementById('btn-presencial-maricielo');
    if (btnPres) {
      btnPres.addEventListener('click', () => {
        const asunto = encodeURIComponent('Solicitud de cita presencial');
        const cuerpo = encodeURIComponent(
          'Hola Doctora Maricielo,\n\nQuisiera agendar una cita presencial en su oficina. Estos son mis datos:\n\n' +
          '- Nombre completo:\n- Tema a tratar:\n- Fechas y horarios disponibles:\n\nGracias.'
        );
        window.location.href = `mailto:maricielogonzales.legal@gmail.com?subject=${asunto}&body=${cuerpo}`;
      });
    }
  }

  return { html, onMount };
}
