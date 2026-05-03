/**
 * Cada categoría contiene un array de objetos con la ruta y el título de la imagen.
 */
const categoriesData = {
    mar: [
        { src: 'assets/img/viajes/viajes-1.jpg', title: 'Chica en una tumbona' },
        { src: 'assets/img/viajes/viajes-2.jpg', title: 'Resort en la playa' },
        { src: 'assets/img/viajes/viajes-6.jpg', title: 'Senda costera' }

    ],
    edificio: [
        { src: 'assets/img/viajes/viajes-2.jpg', title: 'Resort en la playa' },
        { src: 'assets/img/viajes/viajes-4.jpg', title: 'Plaza de España (Sevilla)' },
        { src: 'assets/img/viajes/viajes-5.jpg', title: 'Puente de plaza de España' },
        { src: 'assets/img/viajes/viajes-7.jpg', title: 'Castillo' }


    ],
    señales: [
        { src: 'assets/img/viajes/viajes-3.jpg', title: 'Cruces de caminos' }
    ],
    arena: [
        { src: 'assets/img/viajes/viajes-1.jpg', title: 'Chica en una tumbona' }
    ],
    cosa: [
        { src: 'assets/img/viajes/viajes-2.jpg', title: 'Resort en la playa' },
        { src: 'assets/img/viajes/viajes-3.jpg', title: 'Cruces de caminos' },
        { src: 'assets/img/viajes/viajes-5.jpg', title: 'Puente de plaza de España' },
        { src: 'assets/img/viajes/viajes-4.jpg', title: 'Plaza de España (Sevilla)' },
        { src: 'assets/img/viajes/viajes-6.jpg', title: 'Senda costera' },
        { src: 'assets/img/viajes/viajes-7.jpg', title: 'Castillo' }
    ]
};

//Carga inicial de la aplicación: muestra los botones de categorías.

function init() {
    renderCategories();
}

// Genera los botones de categorías en el nav y asigna los eventos.

function renderCategories() {

    const nav = document.getElementById('categories-nav');
    nav.innerHTML = '';

    const categoryNames = Object.keys(categoriesData);

    categoryNames.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        btn.setAttribute('aria-label', `Ver imágenes de ${category}`);
        btn.addEventListener('click', () => selectCategory(category));
        nav.appendChild(btn);
    });
}

// Muestra la galería completa de una categoría: mensaje, imagen principal y miniaturas.

function selectCategory(category) {
    const images = categoriesData[category];
    if (!images || images.length === 0) return;

    const mainArea = document.getElementById('gallery-area');
    mainArea.innerHTML = '';

    // Botón "Volver"
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← Volver a categorías';
    backBtn.addEventListener('click', () => {
        mainArea.innerHTML = '';
    });
    mainArea.appendChild(backBtn);

    // Mensaje informativo
    const message = document.createElement('p');
    message.className = 'category-message';
    message.textContent = `Se han encontrado ${images.length} imágenes con el tag '${category}'`;
    mainArea.appendChild(message);

    // Contenedor de la galería
    const galleryDiv = document.createElement('div');
    galleryDiv.className = 'gallery';

    // Imagen principal (centrada)
    const mainImg = document.createElement('img');
    mainImg.className = 'main-image';
    mainImg.src = images[0].src;
    mainImg.alt = images[0].title;
    galleryDiv.appendChild(mainImg);

    // Contenedor de miniaturas
    const thumbsContainer = document.createElement('div');
    thumbsContainer.className = 'thumbnails';

    // Agregar todas las imágenes como miniaturas (incluida la primera)
    images.forEach((imgData, index) => {
        const thumbWrapper = document.createElement('div');
        thumbWrapper.className = 'thumb-wrapper';

        const titleEl = document.createElement('p');
        titleEl.className = 'thumb-title';
        titleEl.textContent = imgData.title;

        const thumb = document.createElement('img');
        thumb.className = 'thumb-img';
        thumb.src = imgData.src;
        thumb.alt = imgData.title;
        thumb.dataset.fullSrc = imgData.src;
        thumb.dataset.fullTitle = imgData.title;
        thumb.addEventListener('click', () => swapImage(thumb, mainImg));

        thumbWrapper.appendChild(titleEl);
        thumbWrapper.appendChild(thumb);
        thumbsContainer.appendChild(thumbWrapper);
    });

    galleryDiv.appendChild(thumbsContainer);
    mainArea.appendChild(galleryDiv);
}

// Intercambia la imagen principal con la miniatura clickeada.

function swapImage(thumbImg, mainImg) {
    const tempSrc = mainImg.src;
    const tempAlt = mainImg.alt;

    mainImg.src = thumbImg.dataset.fullSrc;
    mainImg.alt = thumbImg.dataset.fullTitle;

    thumbImg.dataset.fullSrc = tempSrc;
    thumbImg.dataset.fullTitle = tempAlt;
    thumbImg.src = tempSrc;
    thumbImg.alt = tempAlt;
}

// Arrancar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);