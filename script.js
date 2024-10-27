document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('gallery');
    const subreddits = ['Amoledbackgrounds', 'wallpapers'];
    const imageUrls = [];

    for (const subreddit of subreddits) {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=150`);
        const data = await response.json();
        const images = data.data.children
            .map(post => post.data.url)
            .filter(url => url.endsWith('.jpg') || url.endsWith('.png'));

        imageUrls.push(...images);
    }

    // Filter and prioritize 1920x1080 images
    const filteredImages = imageUrls.filter(url => url.includes('1920x1080'));
    const remainingImages = imageUrls.filter(url => !url.includes('1920x1080'));
    const finalImages = filteredImages.concat(remainingImages.slice(0, 300 - filteredImages.length));

    finalImages.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image';
        img.addEventListener('click', () => {
            window.open(url, '_blank');
        });
        gallery.appendChild(img);
    });
});
