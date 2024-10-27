document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');

    fetch('https://www.reddit.com/r/wallpapers.json')
        .then(response => response.json())
        .then(data => {
            const posts = data.data.children;
            posts.forEach(post => {
                if (post.data.post_hint === 'image') {
                    const img = document.createElement('img');
                    img.src = post.data.url;
                    img.alt = post.data.title;
                    img.addEventListener('click', () => openImageInNewTab(img.src));
                    imageGrid.appendChild(img);
                }
            });
        })
        .catch(error => console.error('Error fetching images:', error));
});

function openImageInNewTab(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const newUrl = URL.createObjectURL(blob);
            const newTab = window.open();
            newTab.document.write(`<img src="${newUrl}" alt="Image">`);
        })
        .catch(error => console.error('Error opening image:', error));
}
