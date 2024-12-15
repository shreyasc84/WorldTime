const defaultTimezones = [
    { city: 'New York', timezone: 'America/New_York' },
    { city: 'Mumbai', timezone: 'Asia/Kolkata' },
    { city: 'Lagos', timezone: 'Africa/Lagos' },
    { city: 'Sydney', timezone: 'Australia/Sydney' },
    { city: 'London', timezone: 'Europe/London' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo' }
];

const allTimezones = Intl.supportedValuesOf('timeZone');

function createClockElement(city, timezone) {
    return `
        <div class="clock-container p-6 rounded-lg relative">
            <button onclick="removeClock(this)" class="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <i class="bi bi-x-lg"></i>
            </button>
            <h2 class="text-xl mb-2">${city}</h2>
            <div class="time text-3xl font-bold" data-timezone="${timezone}"></div>
            <div class="text-sm mt-2" data-timezone-date="${timezone}"></div>
        </div>
    `;
}

function updateClocks() {
    document.querySelectorAll('.time').forEach(clock => {
        const timezone = clock.dataset.timezone;
        const time = new Date().toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        clock.textContent = time;
    });

    document.querySelectorAll('[data-timezone-date]').forEach(dateElement => {
        const timezone = dateElement.dataset.timezoneDate;
        const date = new Date().toLocaleDateString('en-US', {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        dateElement.textContent = date;
    });
}

function initializeClocks() {
    const clocksGrid = document.getElementById('clocksGrid');
    defaultTimezones.forEach(({city, timezone}) => {
        clocksGrid.innerHTML += createClockElement(city, timezone);
    });
    updateClocks();
    setInterval(updateClocks, 1000);
}

function showAddClockModal() {
    const modal = document.getElementById('clockModal');
    const select = document.getElementById('timezone');
    select.innerHTML = allTimezones.map(tz => `<option value="${tz}">${tz.replace(/_/g, ' ')}</option>`).join('');
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('clockModal').classList.add('hidden');
}

function addNewClock() {
    const select = document.getElementById('timezone');
    const timezone = select.value;
    const city = timezone.split('/').pop().replace(/_/g, ' ');
    document.getElementById('clocksGrid').innerHTML += createClockElement(city, timezone);
    closeModal();
}

function removeClock(button) {
    button.closest('.clock-container').remove();
}

window.onclick = function(event) {
    const modal = document.getElementById('clockModal');
    if (event.target === modal) {
        closeModal();
    }
}

initializeClocks();