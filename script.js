document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const lazyLoadToggle = document.getElementById('lazyLoadToggle');
    let lazyLoad = true;

    lazyLoadToggle.addEventListener('click', () => {
        lazyLoad = !lazyLoad;
        loadImages();
    });

    async function fetchImages() {
        const urls = [
            'https://www.reddit.com/r/Amoledbackgrounds.json',
            'https://www.reddit.com/r/wallpapers.json'
        ];
        const images = [];
        for (const url of urls) {
            const response = await fetch(url);
            const data = await response.json();
            const posts = data.data.children;
            posts.forEach(post => {
                const image = post.data.url;
                if (image.endsWith('.jpg') || image.endsWith('.png') && post.data.preview.images[0].source.width === 1920 && post.data.preview.images[0].source.height === 1080) {
                    images.push(image);
                }
            });
        }
        return images;
    }

    function loadImages() {
        gallery.innerHTML = '';
        fetchImages().then(images => {
            images.slice(0, 300).forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.loading = lazyLoad ? 'lazy' : 'eager';
                img.addEventListener('click', () => {
                    window.open(src, '_blank').focus();
                });
                gallery.appendChild(img);
            });
        });
    }

    loadImages();
});
