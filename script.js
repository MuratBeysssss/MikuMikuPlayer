const musicPlayer = document.getElementById('musicPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const volumeButton = document.getElementById('volumeButton');
const volumeMenu = document.getElementById('volumeMenu');
const volumeControl = document.getElementById('volumeControl');
const songImage = document.getElementById('songImage'); // 新增

let isPlaying = false;
let currentSongIndex = 0;
const songs = [
    '1.mp3',
    '2.mp3',
    '3.mp3',
    '4.mp3',
    '5.mp3',
    '6.mp3',
    '7.mp3',
    '8.mp3',
    '9.mp3',
    '10.mp3'
];

// 定义不同歌曲对应的背景颜色
const backgroundColors = [
    '#ffffff',
    '#58dde4',
    '#f5f1f1',
    '#ffab1c',
    '#f7cb98',
    '#030003',
    '#242155',
    '#eebc84',
    '#faf6fa',
    '#ff170a'
];

// 定义不同歌曲对应的图片
const songImages = [
    '1.gif',
    '2.gif',
    '3.gif',
    '4.gif',
    '5.gif',
    '6.gif',
    '7.gif',
    '8.gif',
    '9.gif',
    '10.gif'
];

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        musicPlayer.pause();
        playPauseButton.innerHTML = '<img src="paused.png" alt="播放">';
    } else {
        musicPlayer.play();
        playPauseButton.innerHTML = '<img src="play.png" alt="暂停">';
    }
    isPlaying = !isPlaying;
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateAudioSource();
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateAudioSource();
});

musicPlayer.addEventListener('timeupdate', () => {
    const currentTime = musicPlayer.currentTime;
    const duration = musicPlayer.duration;
    const percentage = (currentTime / duration) * 100;
    seekBar.value = percentage;
});

musicPlayer.addEventListener('ended', () => {
    // 自动播放下一曲
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateAudioSource();

    // 更改背景颜色
    document.body.style.backgroundColor = backgroundColors[currentSongIndex];

    // 更改图片
    songImage.src = `image/${songImages[currentSongIndex]}`;
});

volumeButton.addEventListener('click', () => {
    if (volumeMenu.style.display === 'block') {
        volumeMenu.style.display = 'none';
    } else {
        volumeMenu.style.display = 'block';
    }
});

volumeControl.addEventListener('input', () => {
    const volume = volumeControl.value / 100;
    musicPlayer.volume = volume;
});

function updateAudioSource() {
    musicPlayer.src = `music/${songs[currentSongIndex]}`;
    musicPlayer.load();
    musicPlayer.play();
    playPauseButton.innerHTML = '<img src="play.png" alt="暂停">';
    isPlaying = true;

    // 更改背景颜色
    document.body.style.backgroundColor = backgroundColors[currentSongIndex];

    // 更改图片
    songImage.src = `image/${songImages[currentSongIndex]}`;
}

// 初始化播放第一首歌曲
updateAudioSource();
