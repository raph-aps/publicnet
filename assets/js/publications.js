/**
 * publications.js
 * Reads publications.json and renders the publications grid automatically.
 * To add a publication:
 *   1. Create folder: publications/Your-Title-Here/
 *   2. Add files:     publications/Your-Title-Here/Your-Title-Here.pdf
 *                     publications/Your-Title-Here/cover.jpg
 *   3. Add entry to publications.json
 */

(function () {
  'use strict';

  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Convert folder name to a human-readable title.
   * "My-Research-Paper-2024" → "My Research Paper 2024"
   */
  function folderToTitle(folder) {
    return folder.replace(/[-_]+/g, ' ');
  }

  /**
   * Format an ISO date string to "Month Year".
   */
  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }

  /**
   * Build a single publication card element.
   */
  function buildCard(pub, isFeatured) {
    const title  = folderToTitle(pub.folder);
    const date   = formatDate(pub.date);
    const pdf    = `publications/${pub.folder}/${pub.folder}.pdf`;
    const cover  = `publications/${pub.folder}/cover.jpg`;

    const article = document.createElement('article');
    article.className = isFeatured ? 'post featured pub-card pub-card--featured' : 'pub-card';
    article.setAttribute('data-folder', pub.folder);

    article.innerHTML = `
      <header${isFeatured ? ' class="major"' : ''}>
        ${date ? `<span class="date">${date}</span>` : ''}
        <h2><a href="${pdf}" target="_blank" rel="noopener">${title}</a></h2>
      </header>
      <a href="${pdf}" target="_blank" rel="noopener" class="image${isFeatured ? ' main' : ' fit'} pub-cover-link">
        <img src="${cover}" alt="Cover of ${title}" class="pub-cover"
             onerror="this.parentElement.classList.add('pub-cover--fallback'); this.style.display='none';" />
        <div class="pub-cover-overlay">
          <span class="icon solid fa-file-pdf pub-pdf-icon"></span>
          <span class="pub-open-label">Open PDF</span>
        </div>
      </a>
      <ul class="actions special">
        <li>
          <a href="${pdf}" target="_blank" rel="noopener" class="button${isFeatured ? ' large' : ''}">
            <span class="icon solid fa-file-pdf"></span> Read Publication
          </a>
        </li>
        <li>
          <a href="${pdf}" download="${pub.folder}.pdf" class="button alt${isFeatured ? ' large' : ''}">
            <span class="icon solid fa-download"></span> Download
          </a>
        </li>
      </ul>
    `;

    // Animate in
    article.style.opacity  = '0';
    article.style.transform = 'translateY(24px)';

    return article;
  }

  /**
   * Animate cards into view with a stagger.
   */
  function animateCards(cards) {
    cards.forEach(function (card, i) {
      setTimeout(function () {
        card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0)';
      }, 80 + i * 90);
    });
  }

  // ── Main render ────────────────────────────────────────────────────────────

  function renderPublications(data) {
    const grid  = document.getElementById('publications-grid');
    const empty = document.getElementById('pub-empty');

    // Clear loading spinner
    grid.innerHTML = '';

    if (!data || data.length === 0) {
      grid.style.display = 'none';
      if (empty) empty.style.display = 'block';
      return;
    }

    const cards = [];

    data.forEach(function (pub, idx) {
      const isFeatured = pub.featured === true && idx === 0;

      if (isFeatured) {
        // Featured card spans full width — insert before the grid
        const card = buildCard(pub, true);
        grid.parentElement.insertBefore(card, grid);
        cards.push(card);
      } else {
        const card = buildCard(pub, false);
        grid.appendChild(card);
        cards.push(card);
      }
    });

    animateCards(cards);
  }

  // ── Bootstrap ──────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    fetch('publications.json?v=' + Date.now())
      .then(function (res) {
        if (!res.ok) throw new Error('publications.json not found');
        return res.json();
      })
      .then(renderPublications)
      .catch(function (err) {
        console.warn('[publications.js]', err.message);
        const grid = document.getElementById('publications-grid');
        if (grid) {
          grid.innerHTML = `
            <div class="pub-error">
              <span class="icon solid fa-exclamation-triangle"></span>
              <p>Could not load publications.json. Make sure the file exists at the repository root.</p>
            </div>`;
        }
      });
  });

}());
