document.addEventListener('DOMContentLoaded', function() {
    const servicesContainer = document.getElementById('services-container');

    // Массив услуг (в реальном проекте можно получать с сервера)
    const services = [
        {
            id: 1,
            name: "Лендинг для бизнеса",
            description: "Одностраничный сайт, сфокусированный на конверсии. Идеально для запуска продукта или рекламной кампании.",
            price: 25000,
            category: "site"
        },
        {
            id: 2,
            name: "Корпоративный сайт",
            description: "Многостраничный сайт для представления вашей компании, услуг и команды.",
            price: 50000,
            category: "site"
        },
        {
            id: 3,
            name: "Интернет-магазин",
            description: "Полнофункциональный онлайн-магазин с каталогом, корзиной и интеграцией с платежными системами.",
            price: 80000,
            category: "site"
        },
        {
            id: 4,
            name: "Бизнес-приложение",
            description: "Веб-приложение для автоматизации внутренних процессов вашего бизнеса (CRM, ERP и т.д.).",
            price: 120000,
            category: "app"
        }
    ];

    // Функция для отображения услуг
    function renderServices() {
        servicesContainer.innerHTML = ''; // Очищаем контейнер

        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'service-item';
            serviceElement.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <p class="service-price">${service.price.toLocaleString()} руб.</p>
                <button class="btn btn-primary add-to-cart" data-id="${service.id}">Добавить в корзину</button>
            `;
            servicesContainer.appendChild(serviceElement);
        });

        // Добавляем обработчики событий для кнопок "Добавить в корзину"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Функция добавления в корзину
    function addToCart(event) {
        const serviceId = parseInt(event.target.getAttribute('data-id'));
        const service = services.find(s => s.id === serviceId);

        // Получаем текущую корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('pzf-cart')) || [];

        // Проверяем, есть ли уже эта услуга в корзине
        const existingItem = cart.find(item => item.id === serviceId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: service.id,
                name: service.name,
                price: service.price,
                quantity: 1
            });
        }

        // Сохраняем обновленную корзину
        localStorage.setItem('pzf-cart', JSON.stringify(cart));

        // Обновляем счетчик в шапке
        updateCartCount();

        // Даем обратную связь пользователю
        alert(`Услуга "${service.name}" добавлена в корзину!`);
    }

    // Запускаем отрисовку услуг при загрузке страницы
    renderServices();
});