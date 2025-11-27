import TabBar from '../components/TabBar.js';

export default function Franklin() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogado_192.png" alt="Dr. Franklin Mendoza">
        </div>
        <h1 class="app-title">Mi abogado<br><span>Dr. Franklin Mendoza</span></h1>
        <p class="text-link" id="btn-franklin-cv">Ver más sobre mí</p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-chat-franklin">Chat - S/ 20.00</button>
        <button class="pill-btn" type="button" id="btn-video-franklin">Videollamada - S/ 40.00</button>
        <button class="pill-btn" type="button" id="btn-presencial-franklin">Presencial - S/ 50.00</button>
      </div>
    </div>

    <!-- MODAL CV FRANKLIN -->
    <div class="cv-modal" id="cv-franklin">
      <div class="cv-card">
        <h2>Franklin Mendoza</h2>
        <p class="text-muted">Abogado especialista en Derecho Penal y Civil.</p>

        <h3>Formación académica</h3>
        <ul>
          <li>Abogado por la Universidad Nacional Mayor de San Marcos.</li>
          <li>Especialización en Litigación Oral y Derecho Procesal Penal.</li>
        </ul>

        <h3>Experiencia profesional</h3>
        <ul>
          <li>Asesoría legal en casos de denuncias, acusaciones y procesos penales.</li>
          <li>Defensa en procesos civiles: deudas, desalojos, alimentos y más.</li>
          <li>Representación ante fiscalía, juzgados y audiencias.</li>
        </ul>

        <h3>Aptitudes</h3>
        <ul>
          <li>Experiencia en litigación oral y estrategias de defensa.</li>
          <li>Análisis rápido y eficiente de casos complejos.</li>
          <li>Comunicación clara y orientación a resultados.</li>
        </ul>

        <p><strong>WhatsApp:</strong> 999 641 773</p>
        <p><strong>Correo:</strong> franklinabogadopenal@gmail.com</p>
        <p><strong>Lugar de atención presencial:</strong> Jr. Lima 240, Imperial – Cañete.</p>

        <p class="text-small text-muted">
        </p>
      </div>
    </div>

    ${TabBar('abogado')}
  </div>
  `;

  function onMount() {
    const btnCV = document.getElementById('btn-franklin-cv');
    const modal = document.getElementById('cv-franklin');

    // abrir/cerrar modal
    if (btnCV && modal) {
      btnCV.addEventListener('click', () => modal.classList.add('open'));
      modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    }

    // Chat
    document.getElementById('btn-chat-franklin')?.addEventListener('click', () => {
      window.open('https://wa.me/51999641773?text=Hola%20Doctor%20Franklin,%20quisiera%20una%20consulta%20por%20chat.', '_blank');
    });

    // Videollamada
    document.getElementById('btn-video-franklin')?.addEventListener('click', () => {
      const asunto = encodeURIComponent('Solicitud de videollamada legal');
      const cuerpo = encodeURIComponent(
        'Hola Doctor Franklin,\n\nQuisiera agendar una videollamada legal.\n\n' +
        '- Nombre completo:\n- Tema a tratar:\n- Horarios disponibles:\n'
      );
      window.location.href = `mailto:franklinabogadopenal@gmail.com?subject=${asunto}&body=${cuerpo}`;
    });

    // Presencial
    document.getElementById('btn-presencial-franklin')?.addEventListener('click', () => {
      const asunto = encodeURIComponent('Solicitud de cita presencial');
      const cuerpo = encodeURIComponent(
        'Hola Doctor Franklin,\n\nQuiero agendar una cita presencial.\n\n' +
        '- Nombre completo:\n- Tema a tratar:\n- Disponibilidad:\n'
      );
      window.location.href = `mailto:franklinabogadopenal@gmail.com?subject=${asunto}&body=${cuerpo}`;
    });
  }

  return { html, onMount };
}
