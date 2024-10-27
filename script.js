async function fetchImages() {
    const subreddits = ['Amoledbackgrounds', 'wallpapers'];
    const imageUrls = [];

    for (const subreddit of subreddits) {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=150`);
        const data = await response.json();
        const posts = data.data.children;

        posts.forEach(post => {
            if (post.data.post_hint === 'image') {
                imageUrls.push(post.data.url);
            }
        });
    }

    return imageUrls;
}

function createImageElement(url) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Random Image';
    img.addEventListener('click', () => {
        const newWindow = window.open();
        newWindow.document.write(`<img src="${url}" alt="Random Image" style="width:100%;">`);
    });
    return img;
}

async function displayImages() {
    const imageGrid = document.getElementById('image-grid');
    const imageUrls = await fetchImages();

    imageUrls.forEach(url => {
        const imgElement = createImageElement(url);
        imageGrid.appendChild(imgElement);
    });
}

displayImages();
