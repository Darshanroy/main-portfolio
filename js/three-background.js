// ==========================================
// THREE.JS BACKGROUND ANIMATION
// ==========================================

class ThreeBackground {
    constructor() {
        this.canvas = document.getElementById('three-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.geometricShapes = [];
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };

        this.init();
        this.createParticles();
        this.createGeometricShapes();
        this.addEventListeners();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0a0f, 1, 1000);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createParticles() {
        const particleCount = 1500;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        // Particle colors (cyan, magenta, purple)
        const colorPalette = [
            new THREE.Color(0x00f0ff), // Cyan
            new THREE.Color(0xff00ff), // Magenta
            new THREE.Color(0x7b00ff), // Purple
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Random positions in a sphere
            const radius = Math.random() * 100;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGeometricShapes() {
        const shapes = [
            { geometry: new THREE.TetrahedronGeometry(2, 0), position: { x: -30, y: 20, z: 0 } },
            { geometry: new THREE.OctahedronGeometry(3, 0), position: { x: 30, y: -20, z: -20 } },
            { geometry: new THREE.IcosahedronGeometry(2.5, 0), position: { x: -20, y: -30, z: -10 } },
            { geometry: new THREE.TorusGeometry(3, 0.8, 16, 100), position: { x: 25, y: 15, z: -30 } },
        ];

        shapes.forEach((shapeData, index) => {
            const material = new THREE.MeshBasicMaterial({
                color: index % 2 === 0 ? 0x00f0ff : 0xff00ff,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });

            const mesh = new THREE.Mesh(shapeData.geometry, material);
            mesh.position.set(shapeData.position.x, shapeData.position.y, shapeData.position.z);

            this.geometricShapes.push(mesh);
            this.scene.add(mesh);
        });
    }

    addEventListeners() {
        // Mouse move for camera interaction
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            this.targetRotation.x = this.mouse.y * 0.1;
            this.targetRotation.y = this.mouse.x * 0.1;
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll handler for parallax
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            this.camera.position.y = scrollY * 0.01;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.001;
        }

        // Rotate geometric shapes
        this.geometricShapes.forEach((shape, index) => {
            shape.rotation.x += 0.005 * (index + 1);
            shape.rotation.y += 0.003 * (index + 1);

            // Float animation
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
        });

        // Smooth camera follow mouse
        this.scene.rotation.x += (this.targetRotation.x - this.scene.rotation.x) * 0.05;
        this.scene.rotation.y += (this.targetRotation.y - this.scene.rotation.y) * 0.05;

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThreeBackground();
    });
} else {
    new ThreeBackground();
}
