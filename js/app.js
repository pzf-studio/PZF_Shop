// Главный файл приложения
class PZFApp {
    constructor() {
        this.init();
    }

    async init() {
        // Инициализация прелоадера
        await this.initPreloader();
        
        // Инициализация основных систем
        this.initWebGL();
        this.initAnimations();
        this.initEventListeners();
        this.initScrollEffects();
        
        // Показываем контент
        this.showContent();
    }

    initPreloader() {
        return new Promise((resolve) => {
            const progressFill = document.querySelector('.progress-fill');
            const progressText = document.querySelector('.progress-text');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    progressFill.style.width = '100%';
                    progressText.textContent = '100%';
                    
                    setTimeout(() => {
                        document.querySelector('.preloader').classList.add('fade-out');
                        setTimeout(resolve, 500);
                    }, 500);
                } else {
                    progressFill.style.width = `${progress}%`;
                    progressText.textContent = `${Math.round(progress)}%`;
                }
            }, 100);
        });
    }

    initWebGL() {
        // Простая WebGL сцена с частицами
        const canvas = document.getElementById('webgl-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            alpha: true,
            antialias: true 
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Создаем частицы
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
            colorArray[i] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 5;

        // Анимация
        const clock = new THREE.Clock();
        
        function animate() {
            requestAnimationFrame(animate);
            
            const elapsedTime = clock.getElapsedTime();
            
            particlesMesh.rotation.x = elapsedTime * 0.1;
            particlesMesh.rotation.y = elapsedTime * 0.05;
            
            renderer.render(scene, camera);
        }

        animate();

        // Ресайз
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    initAnimations() {
        // Анимация счетчиков
        this.animateCounters();
        
        // Анимация появления элементов при скролле
        this.initScrollAnimations();
        
        // Магнитные эффекты
        this.initMagneticEffects();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    initScrollAnimations() {
        // Простые анимации появления
        const animatedElements = document.querySelectorAll('.service-card, .section-title, .section-subtitle');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    initEventListeners() {
        // Переключение темы
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        
        // Обработка форм
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
        
        // Плавная прокрутка для навигации
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', this.smoothScroll.bind(this));
        });
    }

    initScrollEffects() {
        // Простой параллакс для фона
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.shape');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // Здесь будет обработка формы
        console.log('Форма отправлена');
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showContent() {
        document.querySelector('.content').style.display = 'block';
    }
}

// Запуск приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new PZFApp();
});