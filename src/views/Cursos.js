import TabBar from '../components/TabBar.js';

export default function Cursos() {
  const html = `
  <div class="screen">
    <div class="app-card">
      <header class="app-hero" style="padding-bottom:8px;">
        <h1 class="app-title">Cursos legales</h1>
        <p class="text-muted">
          Talleres cortos para entender tus derechos antes de hablar con tu abogado.
        </p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-curso-laboral">
          Derechos laborales básicos
        </button>
        <button class="pill-btn" type="button" id="btn-curso-fam">
          Derecho de familia y pensión de alimentos
        </button>
        <button class="pill-btn" type="button" id="btn-curso-consumidor">
          Derechos del consumidor
        </button>
      </div>
    </div>

    <!-- MODAL CURSO LABORAL -->
    <div class="cv-modal" id="modal-curso-laboral">
      <div class="cv-card">
        <h2>Curso: derechos laborales básicos</h2>
        <p class="text-muted">
          Ideal si tienes dudas sobre tus boletas, horarios, despidos o beneficios.
        </p>
        <h3>Verás temas como</h3>
        <ul>
          <li>Diferencia entre contrato a plazo fijo e indeterminado.</li>
          <li>Jornada laboral, horas extras y descansos obligatorios.</li>
          <li>CTS, gratificaciones, vacaciones y otros beneficios.</li>
          <li>¿Qué hacer ante un despido injustificado?</li>
          <li>Pasos para iniciar una conciliación o demanda laboral.</li>
        </ul>
        <p class="text-small text-muted">
          Al terminar tendrás un mapa claro de tus derechos para aprovechar mejor la asesoría de tu abogada laboral.
        </p>
      </div>
    </div>

    <!-- MODAL CURSO FAMILIA -->
    <div class="cv-modal" id="modal-curso-fam">
      <div class="cv-card">
        <h2>Curso: derecho de familia</h2>
        <p class="text-muted">
          Pensado para padres, madres y cuidadores que necesitan ordenar temas familiares.
        </p>
        <h3>Incluye</h3>
        <ul>
          <li>Conceptos básicos de patria potestad y tenencia.</li>
          <li>Cómo se calcula la pensión de alimentos.</li>
          <li>Régimen de visitas y acuerdos entre padres.</li>
          <li>Pasos para una conciliación familiar.</li>
          <li>Cuándo es necesario acudir al Poder Judicial.</li>
        </ul>
        <p class="text-small text-muted">
          Esta guía te prepara para conversar con tu abogada de familia con tus dudas bien ordenadas.
        </p>
      </div>
    </div>

    <!-- MODAL CURSO CONSUMIDOR -->
    <div class="cv-modal" id="modal-curso-consumidor">
      <div class="cv-card">
        <h2>Curso: derechos del consumidor</h2>
        <p class="text-muted">
          Útil si sueles tener problemas con empresas, servicios o compras online.
        </p>
        <h3>Revisarás</h3>
        <ul>
          <li>Qué es un reclamo y qué es un libro de reclamaciones.</li>
          <li>Plazos para reclamar productos defectuosos o servicios incumplidos.</li>
          <li>Caso práctico de reclamo ante Indecopi.</li>
          <li>Cómo guardar evidencias (boletas, correos, capturas de pantalla).</li>
        </ul>
        <p class="text-small text-muted">
          Tu abogado LexDigital puede ayudarte a llevar tu caso con esta información ya organizada.
        </p>
      </div>
    </div>

    ${TabBar('cursos')}
  </div>
  `;

  function onMount() {
    const bindModal = (btnId, modalId) => {
      const btn = document.getElementById(btnId);
      const modal = document.getElementById(modalId);
      if (!btn || !modal) return;
      btn.addEventListener('click', () => modal.classList.add('open'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    };

    bindModal('btn-curso-laboral', 'modal-curso-laboral');
    bindModal('btn-curso-fam', 'modal-curso-fam');
    bindModal('btn-curso-consumidor', 'modal-curso-consumidor');
  }

  return { html, onMount };
}
