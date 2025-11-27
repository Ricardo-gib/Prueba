import TabBar from '../components/TabBar.js';

export default function Laura() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogada_192.png" alt="Dra. Laura Anadin">
        </div>
        <h1 class="app-title">Mi abogada<br><span>Dra. Laura Anadin</span></h1>
        <p class="text-link" id="btn-laura-cv">Ver más sobre mí</p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-chat-laura">Chat - S/ 20.00</button>
        <button class="pill-btn" type="button" id="btn-video-laura">Videollamada - S/ 40.00</button>
        <button class="pill-btn" type="button" id="btn-presencial-laura">Presencial - S/ 50.00</button>
      </div>
    </div>

    <!-- MODAL CV LAURA -->
    <div class="cv-modal" id="cv-laura">
      <div class="cv-card">
        <h2>Laura Anadin Romero</h2>
        <p class="text-muted">Abogada especialista en Derecho Civil y de Familia.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Estudios de Derecho — Universidad Privada San Juan Bautista, sede Chincha.</li>
          <li>Profundización en Derecho Civil Patrimonial y Derecho de Familia.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Asesora legal en temas civiles en la Municipalidad de Nuevo Imperial.</li>
          <li>Elaboración y revisión de contratos de compraventa, arrendamiento y préstamos.</li>
          <li>Procesos de alimentos, tenencia, divorcios y acuerdos de mutuo consentimiento.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Escucha activa y orientación conciliadora.</li>
          <li>Redacción clara de contratos y actas de acuerdos.</li>
          <li>Compromiso con la protección de las familias y el patrimonio.</li>
        </ul>

        <p><strong>WhatsApp:</strong> 958 002 612</p>
        <p><strong>Correo:</strong> anadinromerolaura@gmail.com</p>
        <p><strong>Lugar de atención presencial:</strong> Calle Albilla N° 108, Urb. Las Viñas (Ex Toche), Chincha – UPSJ.</p>

        <p class="text-small text-muted">
        </p>
      </div>
    </div>

    ${TabBar('abogado')}
  </div>
  `;

  function onMount() {
    const btnCV = document.getElementById('btn-laura-cv');
    const modal = document.getElementById('cv-laura');

    if (btnCV && modal) {
      btnCV.addEventListener('click', () => modal.classList.add('open'));
      modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    }

    // Chat
    document.getElementById('btn-chat-laura')?.addEventListener('click', () => {
      window.open('https://wa.me/51958002612?text=Hola%20Doctora%20Laura,%20quisiera%20una%20consulta%20por%20chat.', '_blank');
    });

    // Videollamada
    document.getElementById('btn-video-laura')?.addEventListener('click', () => {
      const asunto = encodeURIComponent('Solicitud de videollamada legal');
      const cuerpo = encodeURIComponent(
        'Hola Doctora Laura,\n\nDeseo agendar una videollamada legal.\n\n' +
        '- Nombre completo:\n- Tema a tratar:\n- Horarios disponibles:\n'
      );
      window.location.href = `mailto:anadinromerolaura@gmail.com?subject=${asunto}&body=${cuerpo}`;
    });

    // Presencial
    document.getElementById('btn-presencial-laura')?.addEventListener('click', () => {
      const asunto = encodeURIComponent('Solicitud de cita presencial');
      const cuerpo = encodeURIComponent(
        'Hola Doctora Laura,\n\nQuisiera solicitar una cita presencial.\n\n' +
        '- Nombre completo:\n- Tema a tratar:\n- Disponibilidad:\n'
      );
      window.location.href = `mailto:anadinromerolaura@gmail.com?subject=${asunto}&body=${cuerpo}`;
    });
  }

  return { html, onMount };
}

