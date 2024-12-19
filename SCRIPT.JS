let currentDate = new Date();
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    calendar.innerHTML = "";

    // Menambahkan header untuk hari (Sen, Sel, Rab, Kam, Jum, Sab, Min)
    const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    weekdays.forEach(day => {
        calendar.innerHTML += `<div class="calendar-day header">${day}</div>`;
    });

    // Menambahkan hari kosong sebelum tanggal pertama
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendar.innerHTML += `<div class="calendar-day"></div>`;
    }

    // Menambahkan tanggal dan angka kecil di dalam sel jika ada tugas
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const taskCount = tasks.filter(task => task.date === dateStr).length;

        calendar.innerHTML += `
            <div class="calendar-day" onclick="openTasks('${dateStr}')">
                ${day}
                ${taskCount > 0 ? `<span class="task-count">${taskCount}</span>` : ''}
            </div>
        `;
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;

    if (title && date && time) {
        tasks.push({ title, desc, date, time });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert("Tugas berhasil ditambahkan!");
        renderCalendar();
    } else {
        alert("Mohon lengkapi semua kolom!");
    }
}

function openTasks(date) {
    localStorage.setItem('selectedDate', date);
    window.location.href = "tasks.html";
}

renderCalendar();