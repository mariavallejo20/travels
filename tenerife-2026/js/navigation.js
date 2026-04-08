/**
 * navigation.js — lógica de cambio de día y control del selector
 *
 * Exporta funciones puras sin efectos secundarios en la carga del módulo.
 * El punto de entrada (app.js) se encarga de vincular los eventos.
 */

/** @type {Record<string, { code: string; label: string }>} */
const DAY_META = {
  d1: { code: 'Día 1',  label: 'Viernes 22'    },
  d2: { code: 'Día 2',  label: 'Sábado 23'     },
  d3: { code: 'Día 3',  label: 'Domingo 24'    },
  d4: { code: 'Día 4',  label: 'Lunes 25'      },
  d5: { code: 'Día 5',  label: 'Martes 26'     },
  d6: { code: 'Día 6',  label: 'Miércoles 27'  },
  d7: { code: 'Día 7',  label: 'Jueves 28'     },
  ex: { code: 'Extras', label: 'Alternativas'  },
};

/**
 * Muestra el día indicado, actualiza la píldora y el selector,
 * y hace scroll al inicio de la página.
 * @param {string} id - ID del día ('d1'…'d7' | 'ex')
 */
export function showDay(id) {
  if (!DAY_META[id]) return;

  // Activar sección del día
  document.querySelectorAll('.day').forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');

  // Marcar item activo en el selector
  document.querySelectorAll('.picker-item').forEach(item => {
    item.classList.toggle('active', item.dataset.day === id);
  });

  // Actualizar la píldora flotante
  const { code, label } = DAY_META[id];
  document.getElementById('pill-code').textContent  = code;
  document.getElementById('pill-label').textContent = label;

  closePicker();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Abre o cierra el selector de días. */
export function togglePicker() {
  document.getElementById('day-picker').classList.toggle('open');
}

/** Cierra el selector de días. */
export function closePicker() {
  document.getElementById('day-picker').classList.remove('open');
}
