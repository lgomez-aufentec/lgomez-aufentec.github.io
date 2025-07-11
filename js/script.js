document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu navigation
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Logic for solution tabs
    const brandTabs = document.querySelectorAll('.brand-tab');
    const brandContentPanes = document.querySelectorAll('.brand-content-pane');

    brandTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const brand = tab.dataset.brand;

            brandTabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');

            brandContentPanes.forEach(pane => {
                if (pane.dataset.brandContent === brand) {
                    pane.classList.remove('hidden');
                } else {
                    pane.classList.add('hidden');
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (!mobileMenu.classList.contains('hidden')) {
                 mobileMenu.classList.add('hidden');
            }
        });
    });

    // Form submission logic with Formspree
    const form = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessages.textContent = 'Mensaje enviado, un asesor se contactara lo antes posible contigo'; // Success message
                formMessages.classList.remove('text-red-500');
                formMessages.classList.add('text-green-600');
                form.reset(); // Clear the form
            } else {
                const data = await response.json();
                if (data.errors) {
                    formMessages.textContent = data.errors.map(error => error.message).join(', ');
                } else {
                    formMessages.textContent = '¡Oops! Hubo un problema al enviar tu mensaje.';
                }
                formMessages.classList.remove('text-green-600');
                formMessages.classList.add('text-red-500');
            }
        } catch (error) {
            formMessages.textContent = 'Hubo un error de conexión. Por favor, inténtalo de nuevo más tarde.';
            formMessages.classList.remove('text-green-600');
            formMessages.classList.add('text-red-500');
        }
    });
});
