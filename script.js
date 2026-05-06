/**
 * REVUP - High Performance JS
 * Includes: Three.js Particles, Swiper 3D, Theme Toggler, and Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. INITIALIZE AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });

    // 2. THEME TOGGLER (Dark/Light Mode)
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        toggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';

        // Optional: Update particle colors based on theme
        if (points) {
            points.material.color.setHex(newTheme === 'dark' ? 0xff3e3e : 0x1a1a1a);
        }
    });

    // 3. THREE.JS - 3D PARTICLE BACKGROUND
    const canvas = document.getElementById('three-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 50;

    // Create Mechanical "Sparks" Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3)).getAttribute('position'));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.7,
        color: 0xff3e3e, // RevUp Primary Red
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(points);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        points.rotation.y += 0.001;
        points.rotation.x += 0.0005;

        // Subtle mouse interaction
        window.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;
            points.rotation.y = mouseX * 0.1;
            points.rotation.x = mouseY * 0.1;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 4. SWIPER 3D COVERFLOW INITIALIZATION
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 40,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // 5. NAVBAR SCROLL EFFECT
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.padding = "0.8rem 6%";
            nav.style.background = "var(--nav-bg)";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        } else {
            nav.style.padding = "1.2rem 6%";
            nav.style.boxShadow = "none";
        }
    });
});