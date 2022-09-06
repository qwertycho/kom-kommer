const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.nav-bar');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    });