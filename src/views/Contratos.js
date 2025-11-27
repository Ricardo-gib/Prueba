import TabBar from '../components/TabBar.js';

export default function Contratos() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <h1 class="app-title">
          Contratos y planillas<br>
          <span>Modelos base LexDigital</span>
        </h1>
        <p class="text-muted">
          Elige un tipo de contrato para ver sus puntos clave. 
          Estos modelos son referenciales, tu abogado LexDigital los puede adaptar a tu caso.
        </p>
      </header>

      <div class="menu-list">
        <button class="pill-btn" type="button" data-contrato="arrendamiento">
          🏠 Contrato de arrendamiento
        </button>
        <button class="pill-btn" type="button" data-contrato="compraventa">
          🚗 Contrato de compraventa
        </button>
        <button class="pill-btn" type="button" data-contrato="prestamo">
          💸 Contrato de préstamo entre personas
        </button>
      </div>
    </div>

    <!-- Modal genérico -->
    <div class="modal-backdrop" id="modal-contrato" style="display:none">
      <div class="modal-card">
        <h2 id="modal-contrato-titulo"></h2>
        <p class="text-muted" id="modal-contrato-sub"></p>
        <ul id="modal-contrato-lista"></ul>
        <p class="text-small">
          Recomendación: lleva este esquema a tu consulta con tu abogado LexDigital para
          que lo revise y lo adapte a la realidad de Cañete / Chincha.
        </p>
        <button type="button" class="pill-btn" id="modal-contrato-cerrar">Cerrar</button>
      </div>
    </div>
  </div>

  ${TabBar('contratos')}
  `;

  function onMount() {
    const modal = document.getElementById('modal-contrato');
    const titulo = document.getElementById('modal-contrato-titulo');
    const sub = document.getElementById('modal-contrato-sub');
    const lista = document.getElementById('modal-contrato-lista');
    const btnCerrar = document.getElementById('modal-contrato-cerrar');

    function abrirModal(tipo) {
      if (!modal || !titulo || !sub || !lista) return;

      lista.innerHTML = '';

      if (tipo === 'arrendamiento') {
        titulo.textContent = 'Contrato de arrendamiento de inmueble';
        sub.textContent = 'Modelo base para alquiler de casa, departamento o local comercial.';
        [
          'Datos del arrendador y arrendatario (nombres completos, DNI, domicilio).',
          'Descripción del inmueble: dirección, área, detalle de ambientes.',
          'Plazo del contrato (tiempo de alquiler) y fecha de inicio.',
          'Monto de la renta, día de pago y forma (efectivo, depósito, Yape, etc.).',
          'Monto de la garantía y condiciones para su devolución.',
          'Obligaciones de cada parte: mantenimiento, servicios, mejoras.',
          'Causales de resolución del contrato y penalidades.'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
      } else if (tipo === 'compraventa') {
        titulo.textContent = 'Contrato de compraventa de bien mueble';
        sub.textContent = 'Modelo base para venta de moto, auto u otro bien registrable o no registrable.';
        [
          'Identificación del vendedor y comprador (nombres, DNI, domicilio).',
          'Descripción detallada del bien (marca, modelo, año, número de serie o placa).',
          'Precio de venta y forma de pago (al contado, cuotas, transferencia).',
          'Fecha y lugar de entrega del bien.',
          'Cláusula de saneamiento por evicción y vicios ocultos.',
          'Responsabilidad sobre papeleo: SOAT, revisión técnica, impuestos.',
          'Firma de las partes y, de ser posible, firma de un testigo.'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
      } else if (tipo === 'prestamo') {
        titulo.textContent = 'Contrato de préstamo de dinero entre personas';
        sub.textContent = 'Modelo base para préstamos entre familiares, amigos o terceros.';
        [
          'Datos del prestamista y prestatario (nombres completos, DNI, domicilio).',
          'Monto del préstamo y moneda.',
          'Plazo para devolver el dinero y cronograma de pago (si aplica).',
          'Interés pactado (si lo hubiera) y forma de calcularlo.',
          'Medio de pago: transferencia, Yape, Plin, depósito en cuenta.',
          'Consecuencias por incumplimiento: intereses moratorios, refinanciación, etc.',
          'Posibilidad de conciliación antes de iniciar un proceso judicial.'
        ].forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          lista.appendChild(li);
        });
      }

      modal.style.display = 'flex';
    }

    const botones = document.querySelectorAll('[data-contrato]');
    botones.forEach(btn => {
      btn.addEventListener('click', () => {
        const tipo = btn.getAttribute('data-contrato');
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
