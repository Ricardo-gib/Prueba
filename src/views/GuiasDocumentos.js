import TabBar from '../components/TabBar.js';

export default function GuiasDocumentos() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <h1 class="app-title">
          Guías y documentos legales<br>
          <span>Checklist para llegar preparado</span>
        </h1>
        <p class="text-muted">
          Usa estas guías como apoyo antes de hablar con tu abogado LexDigital.
          No reemplazan una asesoría profesional, pero te ayudan a ordenar tu caso.
        </p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" data-guia="primera">
          ✅ Checklist: primera consulta legal
        </button>
        <button class="pill-btn" type="button" data-guia="denuncia">
          📄 Checklist: denuncia / reclamo
        </button>
        <button class="pill-btn" type="button" data-guia="laboral">
          👷 Checklist: problemas laborales
        </button>
      </div>
    </div>

    <!-- Modal guía -->
    <div class="modal-backdrop" id="modal-guia" style="display:none">
      <div class="modal-card">
        <h2 id="modal-guia-titulo"></h2>
        <ul id="modal-guia-lista"></ul>
        <p class="text-small" id="modal-guia-extra"></p>
        <button type="button" class="pill-btn" id="modal-guia-cerrar">Cerrar</button>
      </div>
    </div>
  </div>

  ${TabBar('guias')}
  `;

  function onMount() {
    const modal = document.getElementById('modal-guia');
    const titulo = document.getElementById('modal-guia-titulo');
    const lista = document.getElementById('modal-guia-lista');
    const extra = document.getElementById('modal-guia-extra');
    const btnCerrar = document.getElementById('modal-guia-cerrar');

    function abrirGuia(tipo) {
      if (!modal || !titulo || !lista || !extra) return;

      lista.innerHTML = '';
      extra.textContent = '';

      if (tipo === 'primera') {
        titulo.textContent = 'Checklist para tu primera consulta legal';
        [
          'Lleva tu DNI y un número de celular activo.',
          'Escribe en una hoja los hechos principales, por orden cronológico.',
          'Lleva contratos, boletas, vouchers, capturas de pantalla y cualquier prueba.',
          'Anota nombres de personas involucradas y posibles testigos.',
          'Haz una lista de preguntas que quieres hacerle al abogado.',
          'Define qué esperas lograr: acuerdo, demanda, negociación, etc.'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
        extra.textContent =
          'Mientras más ordenada sea la información, más rápido tu abogado podrá ayudarte.';
      } else if (tipo === 'denuncia') {
        titulo.textContent = 'Checklist para una denuncia o reclamo';
        [
          'Identifica claramente a la persona o empresa que quieres denunciar.',
          'Anota fechas, lugares y lo que ocurrió en cada momento.',
          'Reúne pruebas: fotos, videos, audios, mensajes, contratos, boletas.',
          'Guarda todo en una carpeta física o digital (puede ser Google Drive).',
          'Define si primero buscarás una solución amigable o irás directo a la vía legal.',
          'Infórmate qué entidad es competente: Indecopi, Sunafil, municipalidad, policía, etc.'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
        extra.textContent =
          'Tu abogado puede ayudarte a redactar la denuncia y decidir la mejor estrategia.';
      } else if (tipo === 'laboral') {
        titulo.textContent = 'Checklist para problemas laborales';
        [
          'Guarda tus boletas de pago, contratos y cartas de la empresa.',
          'Anota fechas de ingreso, horario de trabajo y cambios de turno.',
          'Registra si has tenido horas extras y si te las han pagado.',
          'Lleva evidencia de mensajes o correos sobre despido, sanciones o acoso.',
          'Haz una lista de montos que crees que te deben (sueldos, gratificaciones, CTS, vacaciones).',
          'Piensa si buscas recuperar beneficios, volver al trabajo o solo cerrar el vínculo.'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
        extra.textContent =
          'Con esta información, tu abogada o abogado laboral podrá calcular mejor tus derechos.';
      }

      modal.style.display = 'flex';
    }

    const botones = document.querySelectorAll('[data-guia]');
    botones.forEach(btn => {
      btn.addEventListener('click', () => {
        const tipo = btn.getAttribute('data-guia');
        abrirGuia(tipo);
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
