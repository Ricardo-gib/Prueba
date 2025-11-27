import TabBar from '../components/TabBar.js';

export default function GuiasDocumentos() {
  const html = `
  <div class="screen">
    <div class="app-card">
      <header class="app-hero" style="padding-bottom:8px;">
        <h1 class="app-title" style="margin-bottom:4px;">
          Guías y documentos<br><span>Checklist para llegar preparado</span>
        </h1>
        <p class="text-muted">
          Usa estas guías como apoyo antes de hablar con tu abogado LexDigital.
          No reemplazan una asesoría profesional, pero te ayudan a ordenar tu caso.
        </p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-checklist-consulta">
          ✅ Checklist: primera consulta legal
        </button>
        <button class="pill-btn" type="button" id="btn-checklist-denuncia">
          📄 Checklist: denuncia / reclamo
        </button>
        <button class="pill-btn" type="button" id="btn-checklist-laboral">
          🧑‍💼 Checklist: problemas laborales
        </button>
      </div>
    </div>

    <!-- MODAL PRIMERA CONSULTA -->
    <div class="cv-modal" id="modal-checklist-consulta">
      <div class="cv-card">
        <h2>Checklist para tu primera consulta legal</h2>
        <p class="text-muted">
          Lo que conviene llevar cuando hablas por primera vez con tu abogada o abogado.
        </p>
        <ul>
          <li>Documento de identidad (DNI / carné de extranjería).</li>
          <li>Contratos, cartas, correos o mensajes relacionados con el problema.</li>
          <li>Boletas, facturas, vouchers o comprobantes de pago.</li>
          <li>Lista breve de fechas importantes (cuándo empezó el problema, qué ha pasado).</li>
          <li>Datos de las personas o empresas involucradas.</li>
          <li>Tus objetivos: qué te gustaría lograr (indemnización, acuerdo, despido, etc.).</li>
        </ul>
        <p class="text-small text-muted">
          Mientras más ordenados lleves tus documentos, más clara y rápida será la asesoría.
        </p>
      </div>
    </div>

    <!-- MODAL DENUNCIA / RECLAMO -->
    <div class="cv-modal" id="modal-checklist-denuncia">
      <div class="cv-card">
        <h2>Checklist para una denuncia o reclamo</h2>
        <p class="text-muted">
          Para cuando necesitas denunciar a una persona, empresa o institución.
        </p>
        <ul>
          <li>Identifica claramente a la persona o empresa que quieres denunciar.</li>
          <li>Anota fechas, lugares y lo que ocurrió en cada momento.</li>
          <li>Reúne pruebas: fotos, videos, audios, mensajes, contratos, boletas.</li>
          <li>Guarda todo en una carpeta física o digital (puede ser Google Drive).</li>
          <li>Define si primero buscarás una solución amigable o irás directo a la vía legal.</li>
          <li>Infórmate qué entidad es competente: Indecopi, Sunafil, municipalidad, policía, etc.</li>
        </ul>
        <p class="text-small text-muted">
          Tu abogado puede ayudarte a redactar la denuncia y decidir la mejor estrategia.
        </p>
      </div>
    </div>

    <!-- MODAL PROBLEMAS LABORALES -->
    <div class="cv-modal" id="modal-checklist-laboral">
      <div class="cv-card">
        <h2>Checklist para problemas laborales</h2>
        <p class="text-muted">
          Útil si crees que vulneran tus derechos en el trabajo.
        </p>
        <ul>
          <li>Ten a la mano tus contratos y boletas de pago.</li>
          <li>Anota tu horario real de trabajo y si haces horas extras.</li>
          <li>Guarda mensajes o correos con órdenes, sanciones o amenazas.</li>
          <li>Registra incidentes importantes: despidos verbales, cambios bruscos de puesto, etc.</li>
          <li>Revisa si has recibido CTS, gratificaciones y vacaciones correctamente.</li>
        </ul>
        <p class="text-small text-muted">
          Con este checklist tu abogada laboral puede evaluar mejor si te corresponde una demanda o conciliación.
        </p>
      </div>
    </div>

    ${TabBar('guias')}
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

    bindModal('btn-checklist-consulta', 'modal-checklist-consulta');
    bindModal('btn-checklist-denuncia', 'modal-checklist-denuncia');
    bindModal('btn-checklist-laboral', 'modal-checklist-laboral');
  }

  return { html, onMount };
}

