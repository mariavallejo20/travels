/**
 * modal.js — control del modal de información del viaje,
 *             del modal de opciones de comida y del toggle
 *             de espectáculos (Loro Parque).
 */

// ── Modal de información del viaje ───────────────────────────

/** Abre o cierra el modal de información del viaje. */
export function toggleInfo() {
  document.getElementById('info-modal').classList.toggle('open');
}

/** Cierra el modal de información del viaje. */
export function closeInfo() {
  document.getElementById('info-modal').classList.remove('open');
}

// ── Modal de opciones de comida ───────────────────────────────

/**
 * Abre el modal de comida con el contenido de la tarjeta pulsada.
 * @param {HTMLElement} card - Elemento .act.food que originó la acción.
 */
export function openFood(card) {
  if (!card) return;

  const time  = card.querySelector('.act-time')?.textContent ?? '';
  const type  = card.querySelector('.atype')?.textContent   ?? 'Opciones';
  const title = card.querySelector('h3')?.textContent       ?? '';
  const lopts = card.querySelectorAll('.lopt');

  const header = time ? `${time} · ${type}` : type;

  let html = `
    <div class="food-modal-hdr">
      <div class="food-modal-time">${header}</div>
      <div class="food-modal-title">${title}</div>
    </div>`;

  lopts.forEach(lopt => {
    html += `<div class="${lopt.className}">${lopt.innerHTML}</div>`;
  });

  document.getElementById('food-modal-body').innerHTML = html;
  document.getElementById('food-modal').classList.add('open');
}

/** Cierra el modal de opciones de comida. */
export function closeFood() {
  document.getElementById('food-modal').classList.remove('open');
}

// ── Toggle de espectáculos ────────────────────────────────────

/**
 * Expande o colapsa la lista de espectáculos de una sección.
 * El elemento hermano inmediato del botón debe ser el contenedor .shows-list.
 * @param {HTMLElement} btn - Botón .shows-btn pulsado.
 */
export function toggleShows(btn) {
  if (!btn) return;
  btn.classList.toggle('open');
  btn.nextElementSibling?.classList.toggle('open');
}
