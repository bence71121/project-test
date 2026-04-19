// ===== NAVIGÁCIÓ: legördülő menü =====
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

// ===== KEZDŐOLDAL KÁRTYÁK: mai nyitvatartás =====
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

// ===== KEZDŐOLDAL KÁRTYÁK: napi programok =====
function updateProgramCard() {
    const programCard = document.querySelector('.program-card');
    if (!programCard) return;

    const dayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    const today = new Date().getDay();

    const programsByDay = {
        0: ['Krokodilok etetése (11:30)', 'Hüllőbemutató (15:00)'],
        1: ['Hétfőn zárva tartunk', 'Karbantartási nap'],
        2: ['Fókák etetése és bemutatója (11:00)', 'Fókák etetése és bemutatója (15:00)'],
        3: ['Papagájok interaktív bemutató (10:30)', 'Papagájok interaktív bemutató (14:00)'],
        4: ['Elefántsimogató és etetés (11:00)', 'Elefántsimogató és etetés (16:00)'],
        5: ['Ragadozók etetési bemutatója (12:00)', 'Ragadozók etetési bemutatója (17:00)'],
        6: ['Pingvin-séta és etetés (10:00)', 'Gyerekfoglalkozás (13:00)']
    };

    const dayElement = programCard.querySelector('.program-day');
    const primaryElement = programCard.querySelector('.program-primary');
    const secondaryElement = programCard.querySelector('.program-secondary');

    if (!dayElement || !primaryElement || !secondaryElement) return;

    dayElement.textContent = dayNames[today];
    primaryElement.textContent = programsByDay[today][0] || '--';
    secondaryElement.textContent = programsByDay[today][1] || '--';
}

updateProgramCard();

// ===== KEZDŐOLDAL KÁRTYÁK: ügyfélszolgálat állapot =====
function updateSupportCard() {
    const supportCard = document.querySelector('.support-card');
    if (!supportCard) return;

    const stateElement = supportCard.querySelector('.support-state');
    if (!stateElement) return;

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentMinutes = hour * 60 + minute;

    const isWeekday = day >= 1 && day <= 5;
    const isMorningOpen = currentMinutes >= 8 * 60 && currentMinutes < 12 * 60;
    const isAfternoonOpen = currentMinutes >= 13 * 60 && currentMinutes < 17 * 60;
    const isOpen = isWeekday && (isMorningOpen || isAfternoonOpen);

    stateElement.textContent = isOpen
        ? 'Ebben a pillanatban fogad ügyfeleket'
        : 'Ebben a pillanatban nem fogad ügyfeleket';

    stateElement.classList.toggle('support-open', isOpen);
    stateElement.classList.toggle('support-closed', !isOpen);
}

updateSupportCard();

// ===== INFORMÁCIÓS OLDAL: akkordion vezérlés =====
const accordionButtons = document.querySelectorAll('.accordion-btn');

accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isActive = this.classList.contains('active');
        
        // Szűrd le az összes aktív elemet
        accordionButtons.forEach(btn => {
            if (btn !== this) {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.remove('active');
            }
        });
        
        // Toggle az aktuális elem
        this.classList.toggle('active');
        content.classList.toggle('active');
    });
});

// ===== INFORMÁCIÓS OLDAL: hash alapú automatikus megnyitás =====
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            // Ha az elem egy akkordion item
            const button = element.querySelector('.accordion-btn');
            if (button && !button.classList.contains('active')) {
                button.click();
            }
            // Scroll az elemhez
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
});

// ===== JEGYVÁSÁRLÁS ÉS KOSÁR: állapot =====
let cart = [];

// ===== JEGYVÁSÁRLÁS ÉS KOSÁR: kosár nyitás/zárás =====
const cartBtn = document.querySelector('.cart-btn');
const cartPopup = document.querySelector('.cart-popup');

if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        cartPopup.classList.toggle('show');
    });
}

// ===== JEGYVÁSÁRLÁS ÉS KOSÁR: dátumválasztó =====
const visitDateInput = document.getElementById('visitDate');
const dayStatus = document.getElementById('dayStatus');

if (visitDateInput) {
    // Tiltott napok beállítása (hétfőt szürkítjük)
    visitDateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();
        
        // Hétfő = 1
        if (dayOfWeek === 1) {
            dayStatus.textContent = 'Sajnos hétfőn ZÁRVA vagyunk karbantartás miatt!';
            dayStatus.classList.remove('open');
            dayStatus.classList.add('closed');
        } else if (dayOfWeek === 0) {
            dayStatus.textContent = 'Vasárnap 09:00-21:00 között nyitva vagyunk!';
            dayStatus.classList.remove('closed');
            dayStatus.classList.add('open');
        } else {
            dayStatus.textContent = '09:00-21:00 között nyitva vagyunk!';
            dayStatus.classList.remove('closed');
            dayStatus.classList.add('open');
        }
    });
}

// ===== JEGYVÁSÁRLÁS ÉS KOSÁR: kosárba gomb =====
const addToCartBtn = document.querySelector('.add-to-cart-btn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const dateInput = document.getElementById('visitDate').value;
        if (!dateInput) {
            alert('Kérjük válasszon egy dátumot!');
            return;
        }
        
        const selectedDate = new Date(dateInput);
        if (selectedDate.getDay() === 1) {
            alert('Sajnos erre a napra nem lehet jegyeket vásárolni, mert hétfőn zárva vagyunk!');
            return;
        }
        
        const ticketQtyInputs = document.querySelectorAll('.ticket-qty');
        let hasTickets = false;
        
        ticketQtyInputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                hasTickets = true;
                const price = parseInt(input.dataset.price);
                const type = input.dataset.type;
                const fullLabel = input.parentElement.querySelector('span').textContent;
                const label = fullLabel.split(' -')[0]; // Csak a jegy típusa, az ár nélkül
                
                // Kosárba hozzáadás
                for (let i = 0; i < qty; i++) {
                    cart.push({
                        type: type,
                        label: label,
                        price: price,
                        date: dateInput
                    });
                }
                
                // Nullázás az input
                input.value = 0;
            }
        });
        
        if (hasTickets) {
            updateCart();
            alert('Jegyek sikeresen hozzáadva a kosárhoz!');
        } else {
            alert('Kérjük válasszon legalább egy jegyet!');
        }
    });
}

// ===== JEGYVÁSÁRLÁS ÉS KOSÁR: kosár renderelése =====
function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    
    let total = 0;
    let html = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">A kosár üres</p>';
        cartTotal.textContent = '0 Ft';
        return;
    }
    
    // Jegyek csoportosítása dátumok szerint
    const cartByDate = {};
    cart.forEach((item) => {
        if (!cartByDate[item.date]) {
            cartByDate[item.date] = [];
        }
        cartByDate[item.date].push(item);
        total += item.price;
    });
    
    // HTML felépítése
    Object.keys(cartByDate).forEach(date => {
        const dateLabel = new Date(date).toLocaleDateString('hu-HU');
        html += `<div class="cart-group">`;
        html += `<strong class="cart-group-date">${dateLabel}</strong>`;
        html += `<ul class="cart-group-list">`;
        
        // Jegyek csoportosítása típus szerint
        const ticketsByType = {};
        cartByDate[date].forEach((item) => {
            if (!ticketsByType[item.type]) {
                ticketsByType[item.type] = { count: 0, label: item.label, price: item.price };
            }
            ticketsByType[item.type].count++;
        });
        
        // HTML jegyek listázása
        Object.values(ticketsByType).forEach(ticket => {
            const subtotal = ticket.price * ticket.count;
            html += `<li class="cart-group-item"><span>${ticket.count}x ${ticket.label}</span><strong>${subtotal.toLocaleString('hu-HU')} Ft</strong></li>`;
        });
        
        html += `</ul></div>`;
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = total.toLocaleString('hu-HU') + ' Ft';
}

// ===== JEGYVÁSÁRLÁS ÉS KOSÁR: fizetés befejezése =====
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('A kosár üres!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Vásárlás sikeres!\n\nÖsszeg: ${total.toLocaleString('hu-HU')} Ft\n\nKöszönjük a vásárlást! Jó szórakozást az Állatkertben!`);
        
        // Kosár ürítése
        cart = [];
        updateCart();
        cartPopup.classList.remove('show');
    });
}

