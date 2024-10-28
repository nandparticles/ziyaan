document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const subreddits = ['darkwallpaper', 'wallpapers'];
    const imageCount = 100;

    async function fetchImages() {
        let images = [];
        for (let subreddit of subreddits) {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=${imageCount / subreddits.length}`);
            const data = await response.json();
            images = images.concat(data.data.children.map(post => post.data.url).filter(url => url.endsWith('.jpg') || url.endsWith('.png')));
        }
        return images;
    }

    function displayImages(images) {
        images.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Reddit Image';
            img.addEventListener('click', () => {
                window.open(url, '_blank');
            });
            gallery.appendChild(img);
        });
    }

    fetchImages().then(displayImages);
});
