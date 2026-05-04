// VARIABLES

/**
 * Array de objetos con el id, la ruta, título de la imagen y tag (array de strings) para filtrar cada foto por categorías
 */
const categoriesData = [
    { id: 1, src: 'assets/img/viajes/viajes-1.jpg', title: 'Chica en una tumbona', tag: ['mar', 'arena'] },
    { id: 2, src: 'assets/img/viajes/viajes-2.jpg', title: 'Resort en la playa', tag: ['mar', 'edificio', 'cosa'] },
    { id: 3, src: 'assets/img/viajes/viajes-3.jpg', title: 'Cruce de caminos', tag: ['señales', 'cosa'] },
    { id: 4, src: 'assets/img/viajes/viajes-4.jpg', title: 'Plaza de España (Sevilla)', tag: ['edificio', 'cosa'] },
    { id: 5, src: 'assets/img/viajes/viajes-5.jpg', title: 'Puente de plaza de España', tag: ['edificio', 'cosa'] },
    { id: 6, src: 'assets/img/viajes/viajes-6.jpg', title: 'Senda costera', tag: ['mar', 'arena', 'cosa'] },
    { id: 7, src: 'assets/img/viajes/viajes-7.jpg', title: 'Castillo', tag: ['edificio', 'cosa'] }
];

//Navegación donde se insertan los botones de categoría
const nav = document.getElementById('categories-nav');
//Contenedor principal donde se muestra la galería seleccionada
const galleryArea = document.getElementById('gallery-area');


// FUNCIONES (deben definirse antes de usarse en los eventos)

/**
 * Extrae los tags únicos de todas las imágenes, crea un botón por cada uno
 * y los coloca en el elemento <nav>. Cada botón permite filtrar la galería.
 */
const renderCategories = () => {
    // Se obtienen todos los tags sin repetir
    const uniqueTags = [...new Set(categoriesData.flatMap(p => p.tag))];

    // Se construye el HTML de los botones
    nav.innerHTML = uniqueTags.map(tag => `
        <button class="category-btn" data-tag="${tag}" aria-label="Ver imágenes de ${tag}">
            ${tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
    `).join('');

    // Se asigna el evento click a cada botón
    nav.querySelectorAll('.category-btn').forEach(btn =>
        btn.addEventListener('click', () => selectCategory(btn.dataset.tag))
    );
};

/**
 * Muestra todas las imágenes que contienen el tag indicado.
 * Se inserta un botón para volver, un mensaje con el número de imágenes,
 * una imagen principal y las miniaturas con sus títulos.
 * 
 */
const selectCategory = (tag) => {
    // Filtra las imágenes que incluyen el tag
    const images = categoriesData.filter(p => p.tag.includes(tag));
    if (!images.length) return;

    const [firstImage] = images; // Primera imagen se usa como principal

    // Se reemplaza el contenido del área de la galería
    galleryArea.innerHTML = `
        <button class="back-btn">← Volver a categorías</button>
        <p class="category-message">Se han encontrado ${images.length} imágenes con el tag '${tag}'</p>
        <div class="gallery">
            <img class="main-image" src="${firstImage.src}" alt="${firstImage.title}">
            <div class="thumbnails">
                ${images.map(({ src, title }) => `
                    <div class="thumb-wrapper">
                        <p class="thumb-title">${title}</p>
                        <img class="thumb-img" src="${src}" alt="${title}" data-full-src="${src}" data-full-title="${title}">
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Evento para el botón volver
    galleryArea.querySelector('.back-btn').addEventListener('click', () => {
        galleryArea.innerHTML = '';
    });

    // Evento para cada miniatura: intercambia con la imagen principal
    const mainImg = galleryArea.querySelector('.main-image');
    galleryArea.querySelectorAll('.thumb-img').forEach(thumb =>
        thumb.addEventListener('click', () => swapImage(thumb, mainImg))
    );
};

/**
 * Intercambia la imagen principal con la miniatura clicada,
 * tanto en su atributo src/alt como en los datos almacenados en dataset.
 * 
 */
const swapImage = (thumb, main) => {
    // Guarda temporalmente los valores de la imagen principal
    const tempSrc = main.src;
    const tempAlt = main.alt;
    const tempFullSrc = thumb.dataset.fullSrc;
    const tempFullTitle = thumb.dataset.fullTitle;

    // Intercambia la imagen principal con los datos de la miniatura
    main.src = tempFullSrc;
    main.alt = tempFullTitle;

    // Actualiza la miniatura con los antiguos valores de la principal
    thumb.dataset.fullSrc = tempSrc;
    thumb.dataset.fullTitle = tempAlt;
    thumb.src = tempSrc;
    thumb.alt = tempAlt;
};


// EVENTOS (se registran después de que las funciones hayan sido definidas)

// Al cargar el DOM se generan los botones de categoría.
document.addEventListener('DOMContentLoaded', renderCategories);