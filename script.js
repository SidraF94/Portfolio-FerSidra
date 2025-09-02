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

// Funcionalidad para construir el formulario con Drag and Drop
let htmlBuilt = false;
let cssAdded = false;
let jsAdded = false;
let currentStep = 0;

// Inicializar el sistema de drag and drop
document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    updateProgress();
    updateInstructions();
});



function initDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZone = document.getElementById('drop-zone');
    
    // Configurar elementos arrastrables
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        
        // Bloquear CSS y JS inicialmente
        if (item.dataset.type === 'css' || item.dataset.type === 'js') {
            item.classList.add('locked');
        }
    });
    
    // Configurar zona de drop
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
}

function handleDragStart(e) {
    const item = e.target.closest('.drag-item');
    if (item.classList.contains('locked')) {
        e.preventDefault();
        return;
    }
    
    e.dataTransfer.setData('text/plain', item.dataset.type);
    item.style.opacity = '0.5';
    
    // Agregar clase de arrastre
    document.body.classList.add('dragging');
}

function handleDragEnd(e) {
    const item = e.target.closest('.drag-item');
    item.style.opacity = '1';
    document.body.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone) {
        dropZone.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone && !dropZone.contains(e.relatedTarget)) {
        dropZone.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    dropZone.classList.remove('drag-over');
    
    const elementType = e.dataTransfer.getData('text/plain');
    
    if (canDropElement(elementType)) {
        buildElement(elementType);
    } else {
        // No puedes agregar este elemento aún. Sigue el orden: HTML → CSS → JS
    }
}

function canDropElement(elementType) {
    switch(elementType) {
        case 'html':
            return !htmlBuilt;
        case 'css':
            return htmlBuilt && !cssAdded;
        case 'js':
            return htmlBuilt && cssAdded && !jsAdded;
        default:
            return false;
    }
}

function buildElement(elementType) {
    switch(elementType) {
        case 'html':
            buildHTML();
            break;
        case 'css':
            buildCSS();
            break;
        case 'js':
            buildJS();
            break;
    }
}

function buildHTML() {
    const formDemo = document.getElementById('form-demo');
    const dropPlaceholder = document.getElementById('drop-placeholder');
    
    // Ocultar placeholder y mostrar formulario
    dropPlaceholder.style.display = 'none';
    formDemo.style.display = 'block';
    
    // El formulario ya está en el HTML, solo necesitamos mostrarlo
    const form = formDemo.querySelector('.contact-form');
    if (form) {
        form.style.display = 'block';
    }
    
    // Marcar como completado
    htmlBuilt = true;
    currentStep = 1;
    
    // Actualizar estado del elemento HTML
    updateDragItemStatus('html', 'completed');
    
    // Desbloquear CSS
    unlockDragItem('css');
    
    // Actualizar progreso y instrucciones
    updateProgress();
    updateInstructions();
    
    // Actualizar botones táctiles
    updateTouchButtons();
}

function buildCSS() {
    if (!htmlBuilt) return;
    
    const formDemo = document.getElementById('form-demo');
    const form = formDemo.querySelector('.contact-form');
    
    // Remover la clase "raw-form" y aplicar estilos
    form.classList.remove('raw-form');
    
    // Aplicar estilos CSS
    form.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 500px;
        margin: 0 auto;
        width: 100%;
        background: var(--bg-primary);
        border: 2px solid var(--border-color);
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    `;
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.cssText = `
            width: 100%;
            padding: 1rem;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            font-family: inherit;
        `;
    });
    
    const button = form.querySelector('button');
    button.style.cssText = `
        background: var(--gradient-primary);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: inherit;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    `;
    
    // Marcar como completado
    cssAdded = true;
    currentStep = 2;
    
    // Actualizar estado del elemento CSS
    updateDragItemStatus('css', 'completed');
    
    // Desbloquear JavaScript
    unlockDragItem('js');
    
    // Actualizar progreso y instrucciones
    updateProgress();
    updateInstructions();
    
    // Actualizar botones táctiles
    updateTouchButtons();
}

function buildJS() {
    if (!htmlBuilt || !cssAdded) return;
    
    const formDemo = document.getElementById('form-demo');
    const form = formDemo.querySelector('.contact-form');
    const button = formDemo.querySelector('button');
    
    // Habilitar el botón de envío
    button.disabled = false;
    button.textContent = 'Enviar Mensaje';
    
    // Funcionalidad de envío simple
    form.addEventListener('submit', handleFormSubmit);
    
    // Marcar como completado
    jsAdded = true;
    currentStep = 3;
    
    // Actualizar estado del elemento JavaScript
    updateDragItemStatus('js', 'completed');
    
    // Actualizar progreso y instrucciones
    updateProgress();
    updateInstructions();
    
    // Actualizar botones táctiles
    updateTouchButtons();
}



// Función mejorada para manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('button');
    
    // Validar campos
    const nameInput = form.querySelector('input[name="nombre"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="mensaje"]');
    
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        // Por favor completa todos los campos correctamente
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        // Por favor ingresa un email válido
        return;
    }
    
    // Animación de envío mejorada
    button.style.transform = 'scale(0.95)';
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    // Crear FormData para enviar
    const formData = new FormData(form);
    
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
            button.style.transform = 'scale(1)';
            button.textContent = '¡Enviado! 🎉';
            button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            button.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
            
            // Mostrar mensaje de éxito
            showSuccessMessage(form);
            
            // Limpiar formulario
            setTimeout(() => {
                form.reset();
                button.textContent = 'Enviar Mensaje';
                button.style.background = 'var(--gradient-primary)';
                button.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
                button.disabled = false;
            }, 3000);
            
                            // ¡Mensaje enviado exitosamente! 🚀
        } else {
            throw new Error('Error en el envío');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        handleSubmitError(button);
    });
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>¡Mensaje enviado exitosamente!</p>
        <small>Gracias por contactarme, te responderé pronto.</small>
    `;
    successMessage.style.cssText = `
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        margin-top: 1.5rem;
        animation: fadeIn 0.6s ease;
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        font-weight: 500;
    `;
    
    form.appendChild(successMessage);
}

function handleSubmitError(button) {
    button.style.transform = 'scale(1)';
    button.textContent = 'Error ❌';
    button.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
    button.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
    button.disabled = false;
    
    setTimeout(() => {
        button.textContent = 'Enviar Mensaje';
        button.style.background = 'var(--gradient-primary)';
        button.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
    }, 2000);
    
                // Error al enviar el mensaje. Intenta nuevamente.
}

// Funciones auxiliares para el sistema de drag and drop
function updateDragItemStatus(elementType, status) {
    const dragItem = document.querySelector(`[data-type="${elementType}"]`);
    if (dragItem) {
        dragItem.classList.remove('locked', 'completed');
        dragItem.classList.add(status);
        
        // Actualizar el ícono de estado
        const statusIcon = dragItem.querySelector('.drag-status i');
        if (status === 'completed') {
            statusIcon.className = 'fas fa-check';
        } else if (status === 'locked') {
            statusIcon.className = 'fas fa-lock';
        } else {
            statusIcon.className = 'fas fa-arrow-right';
        }
    }
}

function unlockDragItem(elementType) {
    const dragItem = document.querySelector(`[data-type="${elementType}"]`);
    if (dragItem) {
        dragItem.classList.remove('locked');
        dragItem.classList.add('unlocked');
        
        // Actualizar el ícono de estado
        const statusIcon = dragItem.querySelector('.drag-status i');
        statusIcon.className = 'fas fa-arrow-right';
        
        // Actualizar el texto
        const smallText = dragItem.querySelector('.drag-content small');
        if (elementType === 'css') {
            smallText.textContent = 'Arrastra aquí para agregar estilos';
        } else if (elementType === 'js') {
            smallText.textContent = 'Arrastra aquí para agregar funcionalidad';
        }
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    const totalSteps = 3;
    const completedSteps = [htmlBuilt, cssAdded, jsAdded].filter(Boolean).length;
    const percentage = (completedSteps / totalSteps) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${completedSteps}/${totalSteps} elementos`;
    }
}

function updateInstructions() {
    const instructions = document.querySelectorAll('.instruction');
    
    instructions.forEach((instruction, index) => {
        if (index + 1 === currentStep + 1) {
            instruction.classList.add('active');
            instruction.style.display = 'flex';
        } else if (index + 1 <= currentStep) {
            instruction.classList.remove('active');
            instruction.style.display = 'none';
        } else {
            instruction.classList.remove('active');
            instruction.style.display = 'none';
        }
    });
}

// Función para agregar elementos por botones táctiles
window.addElementByTouch = function(elementType) {
    if (canDropElement(elementType)) {
        buildElement(elementType);
        
        // Actualizar estado de los botones táctiles
        updateTouchButtons();
    }
};

// Función para actualizar el estado de los botones táctiles
function updateTouchButtons() {
    const touchHtml = document.getElementById('touch-html');
    const touchCss = document.getElementById('touch-css');
    const touchJs = document.getElementById('touch-js');
    
    if (touchHtml) {
        if (htmlBuilt) {
            touchHtml.disabled = true;
            touchHtml.innerHTML = '<i class="fas fa-check"></i><span>HTML Agregado</span>';
        }
    }
    
    if (touchCss) {
        if (htmlBuilt && !cssAdded) {
            touchCss.disabled = false;
        } else if (cssAdded) {
            touchCss.disabled = true;
            touchCss.innerHTML = '<i class="fas fa-check"></i><span>CSS Agregado</span>';
        }
    }
    
    if (touchJs) {
        if (htmlBuilt && cssAdded && !jsAdded) {
            touchJs.disabled = false;
        } else if (jsAdded) {
            touchJs.disabled = true;
            touchJs.innerHTML = '<i class="fas fa-check"></i><span>JavaScript Agregado</span>';
        }
    }
}

// Función para resetear el demo de drag and drop
window.resetDragDemo = function() {
    // Resetear estados
    htmlBuilt = false;
    cssAdded = false;
    jsAdded = false;
    currentStep = 0;
    
    // Resetear elementos arrastrables
    const dragItems = document.querySelectorAll('.drag-item');
    dragItems.forEach((item, index) => {
        item.classList.remove('completed', 'unlocked');
        if (index === 0) {
            item.classList.remove('locked');
            const statusIcon = item.querySelector('.drag-status i');
            statusIcon.className = 'fas fa-arrow-right';
            const smallText = item.querySelector('.drag-content small');
            smallText.textContent = 'Arrastra aquí para comenzar';
        } else {
            item.classList.add('locked');
            const statusIcon = item.querySelector('.drag-status i');
            statusIcon.className = 'fas fa-lock';
            const smallText = item.querySelector('.drag-content small');
            if (index === 1) {
                smallText.textContent = 'Bloqueado hasta agregar HTML';
            } else {
                smallText.textContent = 'Bloqueado hasta agregar CSS';
            }
        }
    });
    
    // Resetear área de construcción
    const dropPlaceholder = document.getElementById('drop-placeholder');
    const formDemo = document.getElementById('form-demo');
    
    dropPlaceholder.style.display = 'block';
    formDemo.style.display = 'none';
    
    // Restaurar el formulario original
    formDemo.innerHTML = `
        <form class="contact-form raw-form" action="https://formspree.io/f/mdklavvo" method="POST" id="contact-form">
            <div class="form-group">
                <input type="text" name="nombre" placeholder="Nombre" required>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <textarea name="mensaje" placeholder="Mensaje" rows="4" required></textarea>
            </div>
            <button type="submit" disabled>Enviar (No funcional aún)</button>
        </form>
    `;
    

    
    // Resetear botones táctiles
    const touchHtml = document.getElementById('touch-html');
    const touchCss = document.getElementById('touch-css');
    const touchJs = document.getElementById('touch-js');
    
    if (touchHtml) {
        touchHtml.disabled = false;
        touchHtml.innerHTML = '<i class="fab fa-html5"></i><span>Agregar HTML</span>';
    }
    
    if (touchCss) {
        touchCss.disabled = true;
        touchCss.innerHTML = '<i class="fab fa-css3-alt"></i><span>Agregar CSS</span>';
    }
    
    if (touchJs) {
        touchJs.disabled = true;
        touchJs.innerHTML = '<i class="fab fa-js-square"></i><span>Agregar JavaScript</span>';
    }
    
    // Resetear progreso
    updateProgress();
    updateInstructions();
    
    // Demo reseteado! 🔄 Puedes empezar de nuevo
}

// Función para actualizar el indicador de pasos
function updateStepIndicator(step) {
    const steps = document.querySelectorAll('.step');
    const tabs = document.querySelectorAll('.tab');
    
    steps.forEach((stepEl, index) => {
        if (index + 1 <= step) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (index + 1 === step + 1) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        } else {
            stepEl.classList.remove('active', 'completed');
        }
    });
    
    // Actualizar tabs activos
    if (step === 1) {
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
        tabs[2].classList.remove('active');
    } else if (step === 2) {
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
        tabs[2].classList.remove('active');
    } else if (step === 3) {
        tabs[0].classList.remove('active');
        tabs[1].classList.remove('active');
        tabs[2].classList.add('active');
    }
}

// Función para resetear el demo
window.resetDemo = function() {
    // Resetear estados
    htmlBuilt = false;
    cssAdded = false;
    jsAdded = false;
    
    // Resetear botones
    document.getElementById('html-btn').disabled = false;
    document.getElementById('css-btn').disabled = true;
    document.getElementById('js-btn').disabled = true;
    
    // Resetear contenido de botones
    document.getElementById('html-btn').innerHTML = '<i class="fab fa-html5"></i><span>HTML</span>';
    document.getElementById('css-btn').innerHTML = '<i class="fab fa-css3-alt"></i><span>CSS</span>';
    document.getElementById('js-btn').innerHTML = '<i class="fab fa-js-square"></i><span>JavaScript</span>';
    
    // Resetear estilos de botones
    document.getElementById('js-btn').style = '';
    
    // Ocultar todos los códigos y mostrar placeholder
    document.getElementById('html-code').classList.remove('active');
    document.getElementById('css-code').classList.remove('active');
    document.getElementById('js-code').classList.remove('active');
    document.getElementById('code-placeholder').style.display = 'block';
    
    // Resetear tabs activos
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector('[data-tab="html"]').classList.add('active');
    
    // Resetear indicador de pasos
    updateStepIndicator(0);
    
    // Resetear estado
    document.getElementById('demo-status').textContent = 'Esperando...';
    document.getElementById('demo-status').className = 'status';
    
    // Resetear formulario
    document.getElementById('form-demo').innerHTML = `
        <div class="demo-placeholder">
            <i class="fas fa-edit"></i>
            <p>El formulario aparecerá aquí</p>
        </div>
    `;
    
    // Demo reseteado! 🔄 Puedes empezar de nuevo
}

// Agregar funcionalidad a los tabs
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
                            <a href="https://sidraf94.github.io/-NavegaLasRutas-Sidra-/" target="_blank" class="btn btn-primary">Ver Demo Live</a>
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

 