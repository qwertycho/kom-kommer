const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.nav-bar');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const locatie = window.location.href;
const currentPage = locatie.substring(locatie.lastIndexOf('/') + 1);
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    if (link.href === locatie) {
        link.classList.add('active');
    } else if(currentPage == null || currentPage == '') {
        navLinks[0].classList.add('active');
    }
});