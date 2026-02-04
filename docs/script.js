// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Modal de video
const modal = document.getElementById('videoModal');
const closeBtn = document.querySelector('.close');

function showVideo() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navegación suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones - SIMPLIFICADO
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .stat-item, .skill-tag');
    animatedElements.forEach(el => {
        // Mostrar elementos inmediatamente sin animaciones complejas
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// Efecto parallax sutil en el hero - DESHABILITADO temporalmente para evitar conflictos con el modal
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.1}px)`;
//     }
// });

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica
        if (!nombre || !email || !mensaje) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Simular envío (aquí puedes integrar con un servicio real)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('¡Mensaje enviado con éxito! Te responderé pronto.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Efecto de escritura en el título del hero - DESHABILITADO
// function typeWriter(element, text, speed = 100) {
//     let i = 0;
//     element.innerHTML = '';
//     
//     function type() {
//         if (i < text.length) {
//             element.innerHTML += text.charAt(i);
//             i++;
//             setTimeout(type, speed);
//         }
//     }
//     
//     type();
// }

// Aplicar efecto de escritura al título principal - DESHABILITADO
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.innerHTML;
//         heroTitle.innerHTML = '';
//         
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 50);
//         }, 500);
//     }
// });

// Contador animado para las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observar estadísticas para animar contadores
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(stat => statsObserver.observe(stat));
});

// Efecto de hover en las tarjetas de proyecto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Filtro de proyectos por tecnología (opcional)
function filterProjects(technology) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const techTags = project.querySelectorAll('.tech-tag');
        const hasTech = Array.from(techTags).some(tag => 
            tag.textContent.toLowerCase().includes(technology.toLowerCase())
        );
        
        if (technology === 'all' || hasTech) {
            project.style.display = 'block';
            project.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            project.style.display = 'none';
        }
    });
}

// Agregar filtros si quieres (opcional)
// Puedes agregar botones de filtro en el HTML y llamar a esta función

// Mejora de accesibilidad
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Lazy loading para imágenes (si las agregas en el futuro)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Efecto de partículas en el fondo (opcional, para hacer el portfolio más atractivo)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float 6s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
        `;
        hero.appendChild(particle);
    }
}

// Agregar estilos para partículas si quieres el efecto
const particleStyles = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
`;

// Inyectar estilos de partículas
const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleStyles;
document.head.appendChild(particleStyleSheet);

// Inicializar partículas
document.addEventListener('DOMContentLoaded', createParticles);

// Funcionalidad de overlays de tecnologías
document.addEventListener('DOMContentLoaded', () => {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        const overlay = item.querySelector('.tech-overlay');
        
        // Mostrar overlay al hacer hover
        item.addEventListener('mouseenter', () => {
            // Ocultar otros overlays
            techItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherOverlay = otherItem.querySelector('.tech-overlay');
                    otherOverlay.style.opacity = '0';
                    otherOverlay.style.visibility = 'hidden';
                }
            });
            
            // Mostrar este overlay
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        });
        
        // Ocultar overlay al salir del hover
        item.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
        });
    });
    
    // Cerrar overlays al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tech-item')) {
            techItems.forEach(item => {
                const overlay = item.querySelector('.tech-overlay');
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            });
        }
    });
});

// Funcionalidad del modo nocturno
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Función para cambiar el tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Cambiar el ícono
    if (newTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Event listener para el botón de tema
themeToggle.addEventListener('click', toggleTheme);

// Cargar tema guardado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Establecer ícono correcto
    if (savedTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    // Inicializar efecto de escritura a mano
    initHandwritingEffect();
});

// Efecto de máquina de escribir para el título principal
function initHandwritingEffect() {
    const title = document.querySelector('.typewriter-title');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    let currentIndex = 0;
    const typeSpeed = 100; // Velocidad de escritura
    
    function typeWriter() {
        if (currentIndex < originalText.length) {
            title.textContent += originalText.charAt(currentIndex);
            currentIndex++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Efecto de "escritura completa" con un pequeño delay
            setTimeout(() => {
                title.style.animation = 'writeComplete 0.5s ease-in-out';
                // Ocultar el cursor después de completar
                title.style.setProperty('--cursor-opacity', '0');
                
                // Mostrar la imagen después de completar la escritura
                setTimeout(() => {
                    const heroImage = document.querySelector('.hero-image');
                    if (heroImage) {
                        heroImage.classList.add('show');
                    }
                }, 300);
            }, 500);
        }
    }
    
    // Iniciar escritura después de un pequeño delay
    setTimeout(typeWriter, 800);
} 

// Funcionalidad de tabs del demo
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Solo permitir ver tabs de pasos completados
            if (tabType === 'html' && htmlBuilt) {
                showTab('html');
            } else if (tabType === 'css' && cssAdded) {
                showTab('css');
            } else if (tabType === 'js' && jsAdded) {
                showTab('js');
            }
        });
    });
});

// Funcionalidad para abrir modal de proyectos - VERSIÓN SIMPLE
window.openProjectModal = function(projectType) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Prevenir múltiples aperturas
    if (modal.style.display === 'block') {
        return;
    }
    
    let content = '';
    
    switch(projectType) {
        case 'gastronomica':
            content = `
                <h2>GastronoGuia</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>Guía completa de restaurantes y platos típicos desarrollada completamente con HTML y CSS puro. Incluye navegación por categorías, noticias gastronómicas y diseño responsive.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>Diseño responsive para todos los dispositivos</li>
                            <li>Navegación intuitiva por categorías</li>
                            <li>Sección de noticias gastronómicas</li>
                            <li>Optimizado para SEO</li>
                            <li>Código limpio y bien estructurado</li>
                            <li>Uso de SCSS para estilos</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">HTML5</span>
                            <span class="tag">CSS3</span>
                            <span class="tag">SCSS</span>
                            <span class="tag">Responsive Design</span>
                        </div>
                        
                        <div class="project-links">
                            <a href="https://sidraf94.github.io/GastronoGuia/index.html" target="_blank" class="btn btn-primary">Ver Demo Live</a>
                            <a href="https://github.com/SidraF94/GastronoGuia" target="_blank" class="btn btn-secondary">Ver Código</a>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Vista Previa</h4>
                            <div class="live-preview-container">
                                <img src="img/gastronoguia-cap.png" alt="Preview GastronoGuia" class="project-preview-image">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'javascript':
            content = `
                <h2>Homebanking JavaScript</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>Simulador completo de homebanking desarrollado con JavaScript vanilla. Incluye todas las funcionalidades de un banco real: depósitos, retiros, transferencias, préstamos y más.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>Sistema completo de banca online</li>
                            <li>Gestión de cuentas y movimientos</li>
                            <li>Transferencias entre usuarios</li>
                            <li>Sistema de préstamos y servicios</li>
                            <li>Persistencia de datos con localStorage</li>
                            <li>Integración con APIs externas (clima, geolocalización)</li>
                            <li>Exportación a PDF</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">JavaScript ES6+</span>
                            <span class="tag">localStorage</span>
                            <span class="tag">APIs Externas</span>
                            <span class="tag">jsPDF</span>
                            <span class="tag">Geolocalización</span>
                        </div>
                        
                        <div class="project-links">
                            <a href="https://sidraf94.github.io/Homebanking-JavaScript/" target="_blank" class="btn btn-primary">Ver Demo Live</a>
                            <a href="https://github.com/SidraF94/Homebanking-JavaScript" target="_blank" class="btn btn-secondary">Ver Código</a>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Vista Previa</h4>
                            <div class="live-preview-container">
                                <img src="img/homebanking-cap.png" alt="Preview Homebanking" class="project-preview-image">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'agendamiento':
            content = `
                <h2>Sistema de Agendamiento</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>Sistema completo de gestión de citas y reservas desarrollado con Firebase. Incluye autenticación de usuarios, base de datos en tiempo real y panel de administración.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>Autenticación de usuarios con Firebase Auth</li>
                            <li>Gestión de citas y reservas en tiempo real</li>
                            <li>Base de datos Firestore</li>
                            <li>Panel de administración</li>
                            <li>Notificaciones automáticas</li>
                            <li>Hosting en Firebase</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">JavaScript</span>
                            <span class="tag">Firebase</span>
                            <span class="tag">Firestore</span>
                            <span class="tag">Authentication</span>
                            <span class="tag">Hosting</span>
                        </div>
                        
                        <div class="project-demo">
                            <h4>Video de Demostración</h4>
                            <div class="video-container">
                                <iframe 
                                    src="https://www.youtube.com/embed/yjq590i5v1s" 
                                    title="Sistema de Agendamiento Demo"
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                    class="project-video-iframe">
                                </iframe>
                            </div>
                            <div class="video-info">
                                <p class="video-title">Sistema de Agendamiento GrupoNova - Demo Completo</p>
                                <p class="video-description">Video demostrativo de todas las funcionalidades del sistema de gestión de citas médicas</p>
                            </div>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Vista Previa del Sistema</h4>
                            <div class="live-preview-container">
                                <img src="img/captura-agendamiento.png" alt="Vista previa Sistema de Agendamiento" class="project-preview-image">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'react':
            content = `
                <h2>Tienda Emoji React</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>Landing page de una tienda virtual de emojis construida con React. Incluye modo nocturno, navegación suave entre secciones y popups interactivos con SweetAlert2.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>Landing page completa y responsive</li>
                            <li>Modo nocturno/claro con toggle</li>
                            <li>Navegación suave entre secciones</li>
                            <li>Popup de bienvenida interactivo</li>
                            <li>Diseño moderno y atractivo</li>
                            <li>Optimizado para todos los dispositivos</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">React</span>
                            <span class="tag">JavaScript ES6+</span>
                            <span class="tag">CSS3</span>
                            <span class="tag">SweetAlert2</span>
                            <span class="tag">Git</span>
                        </div>
                        
                        <div class="project-links">
                            <a href="https://github.com/SidraF94/-NavegaLasRutas-Sidra-" target="_blank" class="btn btn-secondary">Ver Código</a>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Vista Previa</h4>
                            <div class="live-preview-container">
                                <img src="img/captura-react.png" alt="Preview Tienda Emoji" class="project-preview-image">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'jabones':
            content = `
                <h2>Tienda de Jabones Artesanales</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>E-commerce completo de jabones artesanales desarrollado con React y Firebase. Incluye catálogo de productos con categorías, sistema de carrito de compras, autenticación de usuarios y gestión de stock en tiempo real.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>Catálogo de productos dinámico con Firebase Firestore</li>
                            <li>Sistema de carrito de compras completo</li>
                            <li>Filtrado por categorías de productos</li>
                            <li>Gestión de stock en tiempo real</li>
                            <li>Diseño responsive y atractivo con temática natural</li>
                            <li>Sección "Sobre Nosotros" con valores de la empresa</li>
                            <li>Formulario de contacto funcional</li>
                            <li>Autenticación de usuarios</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">React</span>
                            <span class="tag">Firebase</span>
                            <span class="tag">Firestore</span>
                            <span class="tag">JavaScript ES6+</span>
                            <span class="tag">CSS3</span>
                            <span class="tag">Responsive Design</span>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Capturas del Proyecto</h4>
                            <div class="project-gallery">
                                <div class="gallery-item">
                                    <img src="img/jabones-captura1.png" alt="Página principal de la tienda" class="project-preview-image">
                                    <p class="gallery-caption">Página principal con catálogo de productos</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/jabones-captura2.png" alt="Sección Sobre Nosotros" class="project-preview-image">
                                    <p class="gallery-caption">Sección "Sobre Nosotros" - Valores de la empresa</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/jabones-captura3.png" alt="Formulario de contacto" class="project-preview-image">
                                    <p class="gallery-caption">Formulario de contacto</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'laboratorio':
            content = `
                <h2>Módulo Laboratorio</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>Sistema integral de gestión de laboratorio médico desarrollado con JavaScript y Firebase. Permite administrar pacientes, registrar análisis, consultar resultados y generar informes en PDF. Utiliza Firestore para datos estructurados y Realtime Database para sincronización en tiempo real.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>Gestión completa de pacientes y fichas médicas</li>
                            <li>Registro y seguimiento de análisis de laboratorio</li>
                            <li>Consulta de resultados en tiempo real</li>
                            <li>Generación automática de informes en PDF</li>
                            <li>Base de datos Firestore para información estructurada</li>
                            <li>Realtime Database para actualizaciones instantáneas</li>
                            <li>Sistema de búsqueda y filtrado de registros</li>
                            <li>Interfaz intuitiva y responsive</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">JavaScript</span>
                            <span class="tag">Firebase</span>
                            <span class="tag">Firestore</span>
                            <span class="tag">Realtime Database</span>
                            <span class="tag">PDF Generation</span>
                            <span class="tag">HTML5</span>
                            <span class="tag">CSS3</span>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Capturas del Sistema</h4>
                            <div class="project-gallery">
                                <div class="gallery-item">
                                    <img src="img/modulolaboratorio1.jpeg" alt="Panel principal del sistema" class="project-preview-image">
                                    <p class="gallery-caption">Panel principal de administración</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/modulolaboratorio2.jpeg" alt="Gestión de pacientes" class="project-preview-image">
                                    <p class="gallery-caption">Módulo de gestión de pacientes</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/modulolaboratorio3.jpeg" alt="Registro de análisis" class="project-preview-image">
                                    <p class="gallery-caption">Registro de análisis de laboratorio</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/modulolaboratorio4.jpeg" alt="Consulta de resultados" class="project-preview-image">
                                    <p class="gallery-caption">Consulta de resultados</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/modulolaboratorio5.jpeg" alt="Generación de informes" class="project-preview-image">
                                    <p class="gallery-caption">Generación de informes en PDF</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/modulolaboratorio6.jpeg" alt="PDF generado" class="project-preview-image">
                                    <p class="gallery-caption">PDF generado automáticamente</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'backend':
            content = `
                <h2>E-Commerce Backend API</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>API RESTful completa para sistema de e-commerce desarrollada con Node.js y Express. Incluye gestión de productos y carritos, actualización en tiempo real con WebSockets, y persistencia de datos en MongoDB con vistas dinámicas renderizadas en el servidor.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>API REST completa para productos y carritos (CRUD)</li>
                            <li>Actualización en tiempo real con Socket.IO</li>
                            <li>Paginación avanzada con filtros y ordenamiento</li>
                            <li>Sistema de carga de imágenes con Multer</li>
                            <li>Vistas dinámicas con Handlebars</li>
                            <li>Arquitectura modular (Models, Managers, Routes, Middleware)</li>
                            <li>Manejo de errores centralizado</li>
                            <li>Integración con MongoDB mediante Mongoose</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">Node.js</span>
                            <span class="tag">Express.js</span>
                            <span class="tag">MongoDB</span>
                            <span class="tag">Mongoose</span>
                            <span class="tag">Socket.IO</span>
                            <span class="tag">Handlebars</span>
                            <span class="tag">Multer</span>
                        </div>
                        
                        <div class="project-links">
                            <a href="https://github.com/SidraF94/EntregaFinal-Sidra" target="_blank" class="btn btn-secondary">Ver Código en GitHub</a>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Capturas del Proyecto</h4>
                            <div class="project-gallery">
                                <div class="gallery-item">
                                    <img src="img/backend1-1.png" alt="Vista de productos con paginación" class="project-preview-image">
                                    <p class="gallery-caption">Vista de productos con paginación y filtros</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="img/backend1-2.png" alt="Panel de administración" class="project-preview-image">
                                    <p class="gallery-caption">Panel de administración en tiempo real</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'auth':
            content = `
                <h2>Sistema de Autenticación de Usuarios</h2>
                <div class="project-modal-content-wide">
                    <div class="project-details">
                        <h4>Descripción</h4>
                        <p>Sistema de autenticación completo con Node.js y Express que implementa múltiples estrategias de autenticación. Incluye registro y login de usuarios, protección de rutas con JWT, gestión de sesiones seguras y autenticación social con GitHub OAuth.</p>
                        
                        <h4>Características</h4>
                        <ul>
                            <li>Registro y login de usuarios con validación</li>
                            <li>Autenticación local y GitHub OAuth</li>
                            <li>Protección de rutas con JWT</li>
                            <li>Gestión de sesiones seguras</li>
                            <li>Encriptación de contraseñas con bcrypt</li>
                            <li>Interfaz web con Handlebars</li>
                            <li>API RESTful</li>
                            <li>Variables de entorno seguras</li>
                        </ul>
                        
                        <h4>Tecnologías</h4>
                        <div class="tech-tags">
                            <span class="tag">Node.js</span>
                            <span class="tag">Express.js</span>
                            <span class="tag">MongoDB</span>
                            <span class="tag">Mongoose</span>
                            <span class="tag">Passport.js</span>
                            <span class="tag">JWT</span>
                            <span class="tag">bcrypt</span>
                            <span class="tag">Handlebars</span>
                        </div>
                        
                        <div class="project-links">
                            <a href="https://github.com/SidraF94/BackendII" target="_blank" class="btn btn-secondary">Ver Código en GitHub</a>
                        </div>
                        
                        <div class="live-preview-section">
                            <h4>Captura del Proyecto</h4>
                            <div class="project-gallery">
                                <div class="gallery-item">
                                    <img src="img/Backend2-1.png" alt="Panel de usuario autenticado" class="project-preview-image">
                                    <p class="gallery-caption">Panel de usuario autenticado con datos de sesión</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    // Actualizar contenido y mostrar modal
    modalContent.innerHTML = content;
    modal.style.display = 'block';
};

// Cerrar modal - VERSIÓN SIMPLE
document.addEventListener('click', function(e) {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close');
    
    if (e.target === modal || e.target === closeBtn) {
        modal.style.display = 'none';
    }
});

// Cerrar modal con ESC - VERSIÓN SIMPLE
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        modal.style.display = 'none';
        
        // Cerrar lightbox si está abierto
        const lightbox = document.querySelector('.image-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }
});

// Función para crear y mostrar lightbox de imágenes
function createImageLightbox() {
    // Verificar si ya existe el lightbox
    let lightbox = document.querySelector('.image-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="" alt="Vista ampliada">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Cerrar al hacer clic en el fondo
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Cerrar con el botón
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
    }
    return lightbox;
}

// Agregar evento de clic a todas las imágenes de proyectos
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('project-preview-image')) {
        const lightbox = createImageLightbox();
        const img = lightbox.querySelector('img');
        img.src = e.target.src;
        img.alt = e.target.alt;
        lightbox.classList.add('active');
    }
});

// Función para navegar a secciones específicas
window.scrollToSection = function(sectionName) {
    if (sectionName === 'inicio') {
        // Scroll al inicio de la página
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    } else {
        // Scroll suave a la sección específica
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
};

// ==========================================
// FORMULARIO DE CONTACTO SIMPLE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formStatus = document.getElementById('form-status');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Validar campos
            const nombre = contactForm.querySelector('#nombre').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const mensaje = contactForm.querySelector('#mensaje').value.trim();
            
            if (!nombre || !email || !mensaje) {
                showFormStatus('Por favor completa todos los campos', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Deshabilitar botón y mostrar estado de envío
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Crear FormData
            const formData = new FormData(contactForm);
            
            // Enviar a Formspree
            fetch('https://formspree.io/f/mdklavvo', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Éxito
                    showFormStatus('¡Mensaje enviado exitosamente! Te responderé pronto.', 'success');
                    contactForm.reset();
                    
                    // Restaurar botón después de 2 segundos
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        formStatus.style.display = 'none';
                    }, 3000);
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFormStatus('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
                
                // Restaurar botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }
    
    function showFormStatus(message, type) {
        const formStatus = document.getElementById('form-status');
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
    }
});
