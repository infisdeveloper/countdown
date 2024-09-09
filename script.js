document.addEventListener('DOMContentLoaded', () => {
    const timeInputsContainer = document.getElementById('time-inputs');
    const addTimeBtn = document.getElementById('add-time-btn');
    const saveBtn = document.getElementById('save-btn');
    const countdownBtn = document.getElementById('countdown-btn');
    const dataList = document.getElementById('data-list');

    // Hàm tạo một ô nhập thời gian và tên mới
    function createTimeInput() {
        const div = document.createElement('div');

        const inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.placeholder = 'Tên mốc thời gian';
        div.appendChild(inputName);

        const inputTime = document.createElement('input');
        inputTime.type = 'datetime-local';
        div.appendChild(inputTime);

        timeInputsContainer.appendChild(div);
    }

    // Hàm lưu dữ liệu mốc thời gian và tên vào danh sách
    function saveData() {
        const inputs = timeInputsContainer.querySelectorAll('div');
        dataList.innerHTML = ''; // Xóa danh sách cũ

        const dataToSave = [];

        inputs.forEach(div => {
            const inputName = div.querySelector('input[type="text"]').value;
            const inputTime = div.querySelector('input[type="datetime-local"]').value;

            const li = document.createElement('li');
            li.textContent = `${inputName}: ${inputTime}`;
            dataList.appendChild(li);

            dataToSave.push({
                name: inputName,
                time: inputTime
            });
        });

        // Lưu vào localStorage
        localStorage.setItem('timeData', JSON.stringify(dataToSave));
    }

    // Hàm tải dữ liệu đã lưu từ localStorage
    function loadData() {
        const savedData = JSON.parse(localStorage.getItem('timeData')) || [];
        savedData.forEach(item => {
            const div = document.createElement('div');

            const inputName = document.createElement('input');
            inputName.type = 'text';
            inputName.value = item.name;
            inputName.placeholder = 'Tên mốc thời gian';
            div.appendChild(inputName);

            const inputTime = document.createElement('input');
            inputTime.type = 'datetime-local';
            inputTime.value = item.time;
            div.appendChild(inputTime);

            timeInputsContainer.appendChild(div);
        });

        savedData.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name}: ${item.time}`;
            dataList.appendChild(li);
        });
    }

    // Thêm sự kiện click cho nút thêm mốc thời gian
    addTimeBtn.addEventListener('click', createTimeInput);

    // Thêm sự kiện click cho nút lưu dữ liệu
    saveBtn.addEventListener('click', saveData);

    // Thêm sự kiện click cho nút đếm ngược
    countdownBtn.addEventListener('click', () => {
        window.location.href = 'countdown.html';
    });

    // Tải dữ liệu đã lưu khi trang được tải
    loadData();
});
