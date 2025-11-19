import TabBar from '../components/TabBar.js';

export default function Laura() {
  const html = `
  <div class="screen">
    <div class="app-card full-card">
      <header class="app-hero">
        <div class="avatar large">
          <img src="assets/abogada_192.png" alt="Dra. Laura Romero">
        </div>
        <h1 class="app-title">Mi abogada<br><span>Dra. Laura Romero</span></h1>
        <p class="text-muted">Ver más sobre mí</p>
      </header>
      <div class="menu-list">
        <button class="pill-btn" type="button">Chat - S/ 20.00</button>
        <button class="pill-btn" type="button">Videollamada - S/ 40.00</button>
        <button class="pill-btn" type="button">Presencial - S/ 50.00</button>
      </div>
    </div>
  </div>
  ${TabBar('abogado')}
  `;
  return { html };
}
