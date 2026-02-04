// ==========================================
// 3D SKILL ICONS
// ==========================================

class SkillIcons3D {
    constructor() {
        this.container = document.getElementById('skills-container');
        this.skills = [
            { name: 'JavaScript', level: 'Expert', color: 0xf0db4f },
            { name: 'React', level: 'Advanced', color: 0x61dafb },
            { name: 'Three.js', level: 'Advanced', color: 0x00f0ff },
            { name: 'Node.js', level: 'Advanced', color: 0x68a063 },
            { name: 'Python', level: 'Expert', color: 0x3776ab },
            { name: 'CSS/SCSS', level: 'Expert', color: 0x264de4 },
            { name: 'WebGL', level: 'Intermediate', color: 0xff00ff },
            { name: 'TypeScript', level: 'Advanced', color: 0x3178c6 },
        ];

        this.init();
    }

    init() {
        this.skills.forEach((skill, index) => {
            this.createSkillItem(skill, index);
        });
    }

    createSkillItem(skill, index) {
        // Create skill item container
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.style.animationDelay = `${index * 0.1}s`;

        // Create canvas for 3D icon
        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 160;
        canvas.className = 'skill-icon-container';

        // Create skill info
        const skillName = document.createElement('div');
        skillName.className = 'skill-name';
        skillName.textContent = skill.name;

        const skillLevel = document.createElement('div');
        skillLevel.className = 'skill-level';
        skillLevel.textContent = skill.level;

        // Append elements
        skillItem.appendChild(canvas);
        skillItem.appendChild(skillName);
        skillItem.appendChild(skillLevel);
        this.container.appendChild(skillItem);

        // Initialize 3D icon
        this.create3DIcon(canvas, skill);
    }

    create3DIcon(canvas, skill) {
        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(160, 160);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create 3D shape (cube with wireframe)
        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        const material = new THREE.MeshBasicMaterial({
            color: skill.color,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add inner solid shape for depth
        const innerGeometry = new THREE.IcosahedronGeometry(1, 0);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: skill.color,
            transparent: true,
            opacity: 0.3
        });
        const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
        scene.add(innerMesh);

        // Animation variables
        let isHovered = false;
        let rotationSpeed = 0.01;

        // Mouse enter/leave events
        canvas.parentElement.addEventListener('mouseenter', () => {
            isHovered = true;
            rotationSpeed = 0.03;
        });

        canvas.parentElement.addEventListener('mouseleave', () => {
            isHovered = false;
            rotationSpeed = 0.01;
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            mesh.rotation.x += rotationSpeed;
            mesh.rotation.y += rotationSpeed;

            innerMesh.rotation.x -= rotationSpeed * 0.5;
            innerMesh.rotation.y -= rotationSpeed * 0.5;

            // Scale effect on hover
            const targetScale = isHovered ? 1.2 : 1;
            mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
            innerMesh.scale.copy(mesh.scale);

            renderer.render(scene, camera);
        };

        animate();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SkillIcons3D();
    });
} else {
    new SkillIcons3D();
}
