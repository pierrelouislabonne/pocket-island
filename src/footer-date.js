/* ---------------------------------------------------------------------------- */
/*                       AUTOMATIC FOOTER DATE                          */
/* ---------------------------------------------------------------------------- */

function updateYear() {
  const yearElements = document.querySelectorAll('[data-date="year"]');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);
}

updateYear();
