let is24HourFormat = true;

function updateClock() {
    const clock = document.getElementById('clock');
    const ampmIndicator = document.getElementById('ampm');
    const dateDisplay = document.getElementById('date');
    const dayDisplay = document.getElementById('day');
    const greeting = document.getElementById('greeting');
    const timezone = document.getElementById('timezone').value;

    const now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (!is24HourFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    }

    const formattedHours = String(hours).padStart(2, '0');

    clock.textContent = `${formattedHours}:${minutes}:${seconds}`;
    ampmIndicator.textContent = !is24HourFormat ? ampm : '';

    const name = document.getElementById('nameInput').value || 'Guest';
    const currentHour = now.getHours();
    let greetingMessage = "Hello";
    if (currentHour < 12) greetingMessage = `Good Morning, ${name}`;
    else if (currentHour < 18) greetingMessage = `Good Afternoon, ${name}`;
    else greetingMessage = `Good Evening, ${name}`;
    greeting.textContent = greetingMessage;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dayOptions = { weekday: 'long' };
    dateDisplay.textContent = now.toLocaleDateString(undefined, options);
    dayDisplay.textContent = now.toLocaleDateString(undefined, dayOptions);
}

function changeTheme(theme) {
    document.body.className = theme;
}

document.getElementById('toggleFormat').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    updateClock();
});

function populateTimeZones() {
    const timezones = ["UTC", "Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Tokyo"];
    const timezoneSelect = document.getElementById('timezone');
    timezones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone;
        timezoneSelect.appendChild(option);
    });
    timezoneSelect.addEventListener('change', updateClock);
}

setInterval(updateClock, 1000);
populateTimeZones();
updateClock();