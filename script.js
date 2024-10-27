document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('wallpaper-container');
    fetch('https://www.reddit.com/r/wallpapers/top/.json?limit=10')
        .then(response => response.json())
        .then(data => {
            const posts = data.data.children;
            posts.forEach(post => {
                const imgUrl = post.data.url;
                if (imgUrl.endsWith('.jpg') || imgUrl.endsWith('.png')) {
                    const wallpaperDiv = document.createElement('div');
                    wallpaperDiv.className = 'wallpaper';
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    wallpaperDiv.appendChild(img);
                    container.appendChild(wallpaperDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching wallpapers:', error));
});
