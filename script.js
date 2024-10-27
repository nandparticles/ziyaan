const gallery = document.querySelector('.gallery');
const imageUrls = []; // Array to store image URLs

// Fetch images from Reddit
async function fetchImages() {
    const subreddits = ['Amoledbackgrounds', 'wallpapers'];
    for (const subreddit of subreddits) {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=150`);
        const data = await response.json();
        const images = data.data.children
            .map(post => post.data)
            .filter(post => post.preview && post.preview.images[0].source.width === 1920 && post.preview.images[0].source.height === 1080)
            .map(post => post.preview.images[0].source.url);
        imageUrls.push(...images);
    }
    displayImages();
}

// Display images in the gallery
function displayImages() {
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Reddit Image';
        img.addEventListener('click', () => {
            window.open(url, '_blank').focus();
        });
        gallery.appendChild(img);
    });
}

fetchImages();
