let wakeLock = null;

// Hàm kích hoạt wake lock
const requestWakeLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock activated!');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
};

// Hàm tắt wake lock
const releaseWakeLock = async () => {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
        console.log('Wake Lock released!');
    }
};

// Kích hoạt wake lock khi trang load
window.addEventListener('load', requestWakeLock);

// Tắt wake lock khi tab không còn visible
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        requestWakeLock();
    } else {
        releaseWakeLock();
    }
});

// Tắt wake lock khi user tắt fullscreen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        releaseWakeLock();
    }
});
