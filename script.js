document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('gallery');
    const lazyLoadToggle = document.getElementById('lazyLoadToggle');
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

    const loadImages = (urls) => {
        urls.forEach(url => {
            const img = document.createElement('img');
            img.src = lazyLoadToggle.checked ? '' : url;
            img.dataset.src = url;
            img.alt = 'Image';
            img.classList.add('lazy');
            img.addEventListener('click', () => {
                window.open(url, '_blank');
            });
            gallery.appendChild(img);
        });

        if (lazyLoadToggle.checked) {
            const lazyImages = document.querySelectorAll('.lazy');
            const lazyLoad = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            };

            const observer = new IntersectionObserver(lazyLoad);
            lazyImages.forEach(img => {
                observer.observe(img);
            });
        }
    };

    loadImages(finalImages);

    lazyLoadToggle.addEventListener('change', () => {
        gallery.innerHTML = '';
        loadImages(finalImages);
    });
});
