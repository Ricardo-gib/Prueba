import TabBar from '../components/TabBar.js';

export default function Cursos() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <h1 class="app-title">
          Cursos legales<br>
          <span>Aprende lo básico antes de tu consulta</span>
        </h1>
        <p class="text-muted">
          Módulos cortos pensados para ciudadanos sin formación en Derecho.
          Próximamente se podrán ver en video o PDF.
        </p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" data-curso="laboral">
          👷 Tus derechos laborales
        </button>
        <button class="pill-btn" type="button" data-curso="alquiler">
          🏡 Cómo leer un contrato de alquiler
        </button>
        <button class="pill-btn" type="button" data-curso="reclamos">
          📢 Reclamos y denuncias básicas
        </button>
      </div>
    </div>

    <!-- Modal curso -->
    <div class="modal-backdrop" id="modal-curso" style="display:none">
      <div class="modal-card">
        <h2 id="modal-curso-titulo"></h2>
        <p class="text-muted" id="modal-curso-sub"></p>
        <ul id="modal-curso-lista"></ul>
        <p class="text-small">
          Estos contenidos son introductorios. En una próxima versión podrás ver los
          videos y descargar material desde LexDigital.
        </p>
        <button type="button" class="pill-btn" id="modal-curso-cerrar">Cerrar</button>
      </div>
    </div>
  </div>

  ${TabBar('cursos')}
  `;

  function onMount() {
    const modal = document.getElementById('modal-curso');
    const titulo = document.getElementById('modal-curso-titulo');
    const sub = document.getElementById('modal-curso-sub');
    const lista = document.getElementById('modal-curso-lista');
    const btnCerrar = document.getElementById('modal-curso-cerrar');

    function abrirModal(curso) {
      if (!modal || !titulo || !sub || !lista) return;

      lista.innerHTML = '';

      if (curso === 'laboral') {
        titulo.textContent = 'Tus derechos laborales básicos';
        sub.textContent = 'Curso introductorio para trabajadores dependientes.';
        [
          '¿Qué es un contrato de trabajo y qué datos debe incluir?',
          'Jornada laboral, horas extras y descansos.',
          'Beneficios sociales: CTS, gratificaciones, vacaciones, seguro.',
          'Diferencia entre boleta de pago y recibo por honorarios.',
          '¿Qué hacer si no te pagan o te despiden sin justificación?'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
      } else if (curso === 'alquiler') {
        titulo.textContent = 'Cómo leer un contrato de alquiler';
        sub.textContent = 'Guía para inquilinos y propietarios.';
        [
          'Revisar quiénes firman: propietario, inquilino, apoderado.',
          'Identificar bien el inmueble: dirección, número de partida (si aplica).',
          'Plazo del contrato y renovación.',
          'Monto, fecha y forma de pago de la renta.',
          'Cláusulas de penalidad y causales de desalojo.',
          'Check list previo: inventario de muebles, estado del inmueble, fotos.'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
      } else if (curso === 'reclamos') {
        titulo.textContent = 'Reclamos y denuncias básicas';
        sub.textContent = '¿Qué puedo hacer si vulneran mis derechos?';
        [
          'Diferencia entre queja, reclamo y denuncia.',
          'Uso del Libro de Reclamaciones (establecimientos físicos y virtuales).',
          'Cuándo acudir a Indecopi, Sunafil, municipalidad u otra entidad.',
          'Elementos mínimos de una denuncia: quién, qué, cuándo, dónde.',
          'Importancia de guardar pruebas (boletas, fotos, mensajes, videos).'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
      }

      modal.style.display = 'flex';
    }

    const botones = document.querySelectorAll('[data-curso]');
    botones.forEach(btn => {
      btn.addEventListener('click', () => {
        const tipo = btn.getAttribute('data-curso');
        abrirModal(tipo);
      });
    });

    if (btnCerrar && modal) {
      btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }
  }

  return { html, onMount };
}
