const GITHUB_USER = 'PepeRaphael';
const GITHUB_REPO = 'publicnet';
const BRANCH = 'main';

async function fetchPublications() {
    const grid = document.getElementById('publications-grid');
    if (!grid) return;

    const pdfsUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/publications/pdfs`;
    const imgsUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/publications/images`;

    try {
        const [pdfResponse, imgResponse] = await Promise.all([
            fetch(pdfsUrl),
            fetch(imgsUrl)
        ]);

        if (!pdfResponse.ok || !imgResponse.ok) {
            throw new Error();
        }

        const pdfFiles = await pdfResponse.json();
        const imgFiles = await imgResponse.json();

        grid.innerHTML = '';

        const pdfs = pdfFiles.filter(file => file.name.endsWith('.pdf'));

        if (pdfs.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Aucune publication trouvée.</p>';
            return;
        }

        pdfs.forEach(file => {
            const baseName = file.name.replace('.pdf', '');
            const displayTitle = baseName.replace(/[-_]/g, ' ');
            const pdfUrl = file.download_url;

            const matchingImg = imgFiles.find(img => {
                const lastDotIndex = img.name.lastIndexOf('.');
                const imgBaseName = lastDotIndex !== -1 ? img.name.substring(0, lastDotIndex) : img.name;
                return imgBaseName === baseName;
            });

            const imgUrl = matchingImg ? matchingImg.download_url : '';

            const card = document.createElement('a');
            card.href = pdfUrl;
            card.className = 'pub-card';
            card.target = '_blank';
            card.rel = 'noopener noreferrer';

            card.innerHTML = `
                <div class="pub-image-container">
                    <img src="${imgUrl}" alt="${displayTitle}" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23e9ecef\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%236c757d\\' font-family=\\'Arial\\' font-size=\\'14\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>Image non trouvée</text></svg>'">
                </div>
                <div class="pub-content">
                    <h3>${displayTitle}</h3>
                </div>
            `;

            grid.appendChild(card);
        });

    } catch (error) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red;">Erreur lors du chargement des données. Vérifiez l'arborescence du dépôt.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchPublications);
