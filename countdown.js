document.addEventListener('DOMContentLoaded', () => {
    const timeRemainingEl = document.getElementById('time-remaining');
    const eventNameEl = document.getElementById('event-name');
    const backBtn = document.getElementById('back-btn');

    // Hàm tính toán thời gian đếm ngược
    function countdownToClosestTime() {
        const savedData = JSON.parse(localStorage.getItem('timeData')) || [];

        if (savedData.length === 0) {
            timeRemainingEl.textContent = 'Không có mốc thời gian nào!';
            return;
        }

        const currentTime = new Date();
        const futureTimes = savedData
            .map(item => ({
                name: item.name,
                time: new Date(item.time)
            }))
            .filter(item => item.time > currentTime);

        if (futureTimes.length === 0) {
            timeRemainingEl.textContent = 'Không có mốc thời gian nào trong tương lai!';
            return;
        }

        const closestEvent = futureTimes.reduce((prev, curr) => (prev.time < curr.time ? prev : curr));

        eventNameEl.textContent = closestEvent.name;
        const closestTime = closestEvent.time;

        function updateCountdown() {
            const now = new Date();
            const diff = closestTime - now;

            if (diff <= 0) {
                clearInterval(interval);
                timeRemainingEl.textContent = 'Mốc thời gian đã đến!';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

            timeRemainingEl.textContent = `${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`;

        }

        updateCountdown(); // Cập nhật lần đầu tiên ngay khi tải trang
        const interval = setInterval(updateCountdown, 1000);
    }

    // Gọi hàm đếm ngược
    countdownToClosestTime();

    // Nút quay lại trang chính
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
