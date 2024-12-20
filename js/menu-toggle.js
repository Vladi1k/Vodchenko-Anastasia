// Обработчики подменю
const toggleMenus = document.querySelectorAll(".menu-toggle");

toggleMenus.forEach((toggleMenu) => {
    toggleMenu.addEventListener("click", (e) => {
        e.preventDefault();

        const currentSubmenu = toggleMenu.nextElementSibling;

        toggleMenus.forEach((menu) => {
            const submenu = menu.nextElementSibling;
            if (submenu && submenu !== currentSubmenu) {
                submenu.classList.remove('visible');
                submenu.classList.add('hidden');
            }
        });

        if (currentSubmenu) {
            currentSubmenu.classList.toggle('visible');
            currentSubmenu.classList.toggle('hidden');
        }
    });
});

// Мобильное меню
const mobileNav = document.querySelector(".mobileNav");
const mobileMenuLink = document.querySelector(".mobileMenuLink");

mobileMenuLink.addEventListener("click", () => {
    mobileNav.classList.toggle("menu-open");
});

// Обработчик медиа-запросов
const targetElement = document.querySelector('.thumbnails');
const thumbnailsImgg = document.querySelectorAll(".thumbnails-img");
const mediaQuery = window.matchMedia('(max-width: 800px)');

function handleMediaQueryChange(event) {
    if (event.matches) {
        targetElement.classList.remove('stacked');
        targetElement.classList.add('gallery');
        thumbnailsImgg.forEach((thumb) => {
            const realSrc = thumb.getAttribute('data-src');
            if (realSrc && !thumb.src) {
                thumb.src = realSrc;
                thumb.addEventListener('load', () => {
                    thumb.classList.remove('preload');
                });
            }
        });
    } else {
        mobileNav.classList.remove('menu-open');
        targetElement.classList.add('stacked');
        targetElement.classList.remove('gallery');
    }
}

mediaQuery.addEventListener('change', handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);
