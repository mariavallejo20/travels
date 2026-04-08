/**
 * app.js — punto de entrada de la aplicación.
 *
 * Utiliza event delegation sobre document para gestionar todas
 * las interacciones mediante atributos data-action, evitando
 * handlers inline en el HTML.
 *
 * Patrón de overlay: los overlays llevan data-action en el propio
 * div; se comprueba e.target directamente (no closest) para que el
 * dismiss sólo se active al pulsar el fondo, no el contenido interior.
 */

import { showDay, togglePicker, closePicker } from './navigation.js';
import { toggleInfo, closeInfo, openFood, closeFood, toggleShows } from './modal.js';

document.addEventListener('click', handleClick);

/**
 * Manejador central de clicks con event delegation.
 * @param {MouseEvent} e
 */
function handleClick(e) {
  // ── Dismiss de overlays (sólo cuando se pulsa el fondo) ──────
  // e.target es el overlay mismo ⟹ click fuera del panel interior.
  const directAction = /** @type {HTMLElement} */ (e.target).dataset?.action;

  if (directAction === 'close-info')   { closeInfo();    return; }
  if (directAction === 'close-picker') { closePicker();  return; }
  if (directAction === 'close-food')   { closeFood();    return; }

  // ── Acciones delegadas (closest para tolerancia en área táctil) ─
  const el = /** @type {HTMLElement|null} */ (e.target.closest('[data-action]'));
  if (!el) return;

  switch (el.dataset.action) {

    case 'toggle-info':
      toggleInfo();
      break;

    case 'toggle-picker':
      togglePicker();
      break;

    case 'show-day': {
      const dayId = el.dataset.day;
      if (dayId) showDay(dayId);
      break;
    }

    case 'open-food': {
      const card = e.target.closest('.act.food');
      openFood(card);
      break;
    }

    case 'toggle-shows': {
      const btn = e.target.closest('.shows-btn');
      toggleShows(btn);
      break;
    }

    default:
      break;
  }
}
