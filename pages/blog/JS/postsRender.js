'use strict'


//função que cria conteiner de coleção de imagens
function createImageCollection(images) {
    const collection = document.createElement('div');
    collection.classList.add('collection');

    const backward = document.createElement('button');
    backward.classList.add('backward');
    backward.textContent = '<';

    const forward = document.createElement('button');
    forward.classList.add('forward');
    forward.textContent = '>';

    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('imagesContainer');

    const img = document.createElement('img');
    img.src = images[0];
    img.alt = 'Imagem do post';
    imagesContainer.appendChild(img);

    const imgInfo = document.createElement('span');
    imgInfo.classList.add('imgInfo');
    imgInfo.textContent = `1/${images.length}`;
    imagesContainer.appendChild(imgInfo);

    collection.appendChild(backward);
    collection.appendChild(imagesContainer);
    collection.appendChild(forward);

    let currentIndex = 0;

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


//função de renderização dos posts
export function renderPosts(container, posts) {
    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = `
        <div class="empty">
            <h2>Nenhum post encontrado!</h2>
        </div>
        `
        return
    }

    posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post');

        const header = document.createElement('header');
        header.classList.add('post-header');

        const title = document.createElement('h2');
        title.classList.add('post-title');
        title.innerHTML = post.title;

        const postInfo = document.createElement('div');
        postInfo.classList.add('post-info');

        const author = document.createElement('span');
        author.classList.add('post-author');
        author.innerHTML = `Por: <strong>${post.author.name}</strong>`;

        const date = document.createElement('span');
        date.classList.add('post-date');
        date.textContent = new Date(post.date).toLocaleDateString('pt-BR');

        postInfo.appendChild(author);
        postInfo.appendChild(date);

        header.appendChild(title);
        header.appendChild(postInfo);
        article.appendChild(header);

        post.content.forEach(item => {
            let element;

            switch(item.type) {
                case 'subtitle':
                    element = document.createElement('h3');
                    break;
                case 'text':
                    element = document.createElement('p');
                    break;
                case 'img':
                    if (Array.isArray(item.value) && item.value.length > 1) {
                        element = createImageCollection(item.value);
                    } else {
                        element = document.createElement('img');
                        element.src = Array.isArray(item.value) ? item.value[0] : item.value;
                        element.alt = item.alt || 'Imagem do post';
                    }
                    break;
                default:
                    console.warn(`Tipo de conteúdo desconhecido: ${item.type}`);
                    return;
            }

            if (element && item.type !== 'img') element.innerHTML = item.value;
            if (element) article.appendChild(element);
        });

        if (post.references && post.references.length > 0) {
            const footer = document.createElement('footer');
            footer.classList.add('post-footer');

            const refsTitle = document.createElement('h4');
            refsTitle.textContent = 'Referências:';
            footer.appendChild(refsTitle);

            const nav = document.createElement('nav');
            const ul = document.createElement('ul');

            post.references.forEach(ref => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = ref.url;
                a.textContent = ref.label;
                a.target = '_blank';
                li.appendChild(a);
                ul.appendChild(li);
            });

            nav.appendChild(ul);
            footer.appendChild(nav);
            article.appendChild(footer);
        }

        container.appendChild(article);
    });
}
