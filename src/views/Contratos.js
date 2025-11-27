import TabBar from '../components/TabBar.js';

export default function Contratos() {
  const html = `
  <div class="screen">
    <div class="app-card">
      <header class="app-hero" style="padding-bottom:8px;">
        <h1 class="app-title">Contratos</h1>
        <p class="text-muted">
          Modelos básicos para entender qué debe llevar cada tipo de contrato.
          No reemplazan una revisión legal profesional.
        </p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" id="btn-contrato-arr">
          Arrendamiento – alquiler de inmueble
        </button>
        <button class="pill-btn" type="button" id="btn-contrato-compra">
          Compraventa – bien mueble
        </button>
        <button class="pill-btn" type="button" id="btn-contrato-serv">
          Servicios – honorarios profesionales
        </button>
      </div>
    </div>

    <!-- MODAL ARRENDAMIENTO -->
    <div class="cv-modal" id="modal-contrato-arr">
      <div class="cv-card">
        <h2>Contrato de arrendamiento</h2>
        <p class="text-muted">
          Checklist rápido de puntos que no deberían faltar en un alquiler de inmueble.
        </p>
        <h3>Elementos clave</h3>
        <ul>
          <li>Datos completos del arrendador y arrendatario (DNI, domicilio, teléfono).</li>
          <li>Descripción del inmueble: dirección, número de partida y uso (vivienda, local, etc.).</li>
          <li>Monto de la renta, forma de pago y fecha de vencimiento mensual.</li>
          <li>Plazo del contrato y condiciones de renovación o término anticipado.</li>
          <li>Cláusula sobre mantenimiento, servicios (agua, luz, arbitrios) y quién los asume.</li>
          <li>Garantía: monto, forma de devolución y supuestos en que se pierde.</li>
          <li>Firma de ambas partes y, de ser posible, firma de testigos.</li>
        </ul>
        <p class="text-small text-muted">
          Esta guía es solo referencial. Tu abogada o abogado puede adaptar el contrato a tu caso concreto.
        </p>
      </div>
    </div>

    <!-- MODAL COMPRAVENTA -->
    <div class="cv-modal" id="modal-contrato-compra">
      <div class="cv-card">
        <h2>Contrato de compraventa de bien mueble</h2>
        <p class="text-muted">
          Para compras de vehículos, maquinarias, equipos u otros bienes muebles.
        </p>
        <h3>Checklist mínimo</h3>
        <ul>
          <li>Identificación de vendedor y comprador con DNI o RUC.</li>
          <li>Descripción detallada del bien: marca, modelo, serie, color, estado.</li>
          <li>Precio total, forma de pago y calendario si es en cuotas.</li>
          <li>Entrega del bien: lugar, fecha y acta de entrega si es necesario.</li>
          <li>Garantías, responsabilidad por fallas y plazos de reclamo.</li>
          <li>Cláusula de resolución por falta de pago o incumplimiento.</li>
        </ul>
        <p class="text-small text-muted">
          Lleva esta guía cuando te reúnas con tu abogado LexDigital para revisar o redactar tu contrato.
        </p>
      </div>
    </div>

    <!-- MODAL SERVICIOS -->
    <div class="cv-modal" id="modal-contrato-serv">
      <div class="cv-card">
        <h2>Contrato de servicios / honorarios</h2>
        <p class="text-muted">
          Útil cuando contratas a un profesional independiente o consultor.
        </p>
        <h3>Puntos importantes</h3>
        <ul>
          <li>Datos de quien contrata y de quien presta el servicio.</li>
          <li>Descripción clara del servicio y entregables esperados.</li>
          <li>Honorarios, modalidad de facturación y forma de pago.</li>
          <li>Plazo de ejecución, horario y lugar de prestación del servicio.</li>
          <li>Confidencialidad y propiedad de la información o resultados.</li>
          <li>Penalidades por incumplimiento y forma de terminar el contrato.</li>
        </ul>
        <p class="text-small text-muted">
          Un buen contrato de servicios evita malentendidos y protege a ambas partes.
        </p>
      </div>
    </div>

    ${TabBar('contratos')}
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

    bindModal('btn-contrato-arr', 'modal-contrato-arr');
    bindModal('btn-contrato-compra', 'modal-contrato-compra');
    bindModal('btn-contrato-serv', 'modal-contrato-serv');
  }

  return { html, onMount };
}

