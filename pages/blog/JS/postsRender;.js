'use strict'
function createImageCollection(images) {
    const collection = document.createElement('div');
    collection.classList.add('collection');

    // Botões
    const backward = document.createElement('button');
    backward.classList.add('backward');
    backward.textContent = '<';

    const forward = document.createElement('button');
    forward.classList.add('forward');
    forward.textContent = '>';

    collection.appendChild(backward);
    
    // Container da imagem
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('imagesContainer');
    
    
    const img = document.createElement('img');
    img.src = images[0];
    img.alt = 'Imagem do post';
    imagesContainer.appendChild(img);
    
    // Info da imagem
    const imgInfo = document.createElement('span');
    imgInfo.classList.add('imgInfo');
    imgInfo.textContent = `1/${images.length}`;
    imagesContainer.appendChild(imgInfo);
    
    collection.appendChild(imagesContainer);
    
    // Estado atual da imagem
    let currentIndex = 0;
    
    // Funções de navegação
    collection.appendChild(forward);
    forward.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];
        imgInfo.textContent = `${currentIndex + 1}/${images.length}`;
    });

    backward.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        img.src = images[currentIndex];
        imgInfo.textContent = `${currentIndex + 1}/${images.length}`;
    });

    return collection;
}


export function renderPosts(container, posts) {
    container.innerHTML = '';

    posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post');

        post.content.forEach(item => {
            let element;

            switch(item.type) {
                case 'title':
                    element = document.createElement('h2');
                    break;
                case 'subtitle':
                    element = document.createElement('h3');
                    break;
                case 'text':
                    element = document.createElement('p');
                    break;
                case 'img':
                    if (Array.isArray(item.value) && item.value.length > 1) {
                        // Cria a gallery/collection se houver mais de uma imagem
                        element = createImageCollection(item.value);
                    } else {
                        // Imagem única
                        element = document.createElement('img');
                        element.src = Array.isArray(item.value) ? item.value[0] : item.value;
                        element.alt = item.alt || 'Imagem do post';
                    }
                    break;
                default:
                    console.warn(`Tipo de conteúdo desconhecido: ${item.type}`);
                    return;
            }

            if(element) {
                // só adiciona textContent se não for imagem
                if(item.type !== 'img') element.textContent = item.value;
                article.appendChild(element);
            }
        });

        container.appendChild(article);
    });
}
