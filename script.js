document.getElementById('fetch-wallpapers').addEventListener('click', fetchWallpapers);
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);

async function fetchWallpapers() {
    const response = await fetch('https://www.reddit.com/r/wallpapers/top.json?limit=20');
    const data = await response.json();
    const wallpapers = data.data.children.map(child => child.data.url).filter(url => url.endsWith('.jpg') || url.endsWith('.png'));

    const wallpapersContainer = document.getElementById('wallpapers');
    wallpapersContainer.innerHTML = '';

    wallpapers.forEach(url => {
        const wallpaperDiv = document.createElement('div');
        wallpaperDiv.className = 'wallpaper';

        const img = document.createElement('img');
        img.src = url;
        wallpaperDiv.appendChild(img);

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.innerText = 'Download';
        downloadBtn.addEventListener('click', () => downloadImage(url));
        wallpaperDiv.appendChild(downloadBtn);

        wallpapersContainer.appendChild(wallpaperDiv);
    });
}

function downloadImage(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'wallpaper.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(console.error);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}
