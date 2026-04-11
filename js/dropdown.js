const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // Menü lezárása kívülre kattintáskor
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownMenu.classList.remove('show');
        }
    });
    
    // Menü lezárása linkre kattintáskor
    const menuLinks = dropdownMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });
    });
}

function updateTodayCard() {
    const todayCard = document.querySelector('.today-card');
    if (!todayCard) return;

    const date = new Date();
    const dayName = date.toLocaleDateString('hu-HU', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('hu-HU', { day: 'numeric', month: 'long' });
    const dayNumber = date.getDay();

    todayCard.querySelector('.card-date').textContent = `${formattedDate}, ${dayName}`;

    const isOpen = dayNumber !== 1; // Zárva hétfőn
    const openingHours = isOpen ? '09:00 - 21:00' : 'Zárva ma';
    const statusText = isOpen ? 'Nyitva' : 'Zárva';

    todayCard.querySelector('.card-hours').textContent = openingHours;
    todayCard.querySelector('.card-status').textContent = statusText;
}

updateTodayCard();

