"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const EnhancedTorusKnot = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = mountRef.current;
        if (!currentRef) return;

        // Create the scene
        const scene = new THREE.Scene();
        
        // Pure white background
        scene.background = new THREE.Color(0xffffff);

        // Set up the camera
        const camera = new THREE.PerspectiveCamera(
            75,
            currentRef.clientWidth / currentRef.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 5);

        // Set up the renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        currentRef.appendChild(renderer.domElement);

        // Bright ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        // Add multiple colored lights
        const redLight = new THREE.PointLight(0xff5555, 5, 10);
        redLight.position.set(-3, 2, 2);
        scene.add(redLight);

        const blueLight = new THREE.PointLight(0x5555ff, 5, 10);
        blueLight.position.set(3, -2, 2);
        scene.add(blueLight);

        // Add a spotlight for dramatic effect and shadows
        const spotLight = new THREE.SpotLight(0xffffff, 10, 15, Math.PI / 3, 0.2, 1);
        spotLight.position.set(0, 5, 5);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048; // Increased resolution
        spotLight.shadow.mapSize.height = 2048;
        spotLight.shadow.camera.near = 0.5;
        spotLight.shadow.camera.far = 30; // Increased far plane
        spotLight.shadow.bias = -0.0005; // Adjusted bias
        // Make shadows softer
        spotLight.shadow.radius = 3;
        scene.add(spotLight);

        // Helper to visualize the shadow camera (uncomment for debugging)
        // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
        // scene.add(spotLightHelper);
        // const shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
        // scene.add(shadowCameraHelper);

        // Create the TorusKnot with higher detail
        const geometry = new THREE.TorusKnotGeometry(1, 0.4, 128, 32, 2, 3);

        // Create a more interesting material with normal mapping
        const material = new THREE.MeshStandardMaterial({
            color: 0x88ccff,
            roughness: 0.2,
            metalness: 0.9,
            emissive: 0x112244,
            emissiveIntensity: 0.5
        });

        // Create the torus knot
        const torusKnot = new THREE.Mesh(geometry, material);
        torusKnot.castShadow = true;
        torusKnot.receiveShadow = true;
        torusKnot.position.y = 0.5; // Lift it slightly above the floor
        scene.add(torusKnot);

        // Create a transparent floor that only shows shadows
        const floorGeometry = new THREE.PlaneGeometry(30, 30);
        const floorMaterial = new THREE.ShadowMaterial({ 
            opacity: 0.3 // Adjust opacity of shadow
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2; // Rotate to horizontal
        floor.position.y = -1.8; // Increased distance from the torus knot
        floor.receiveShadow = true; // This will receive the shadow
        scene.add(floor);

        // Create a glow effect using sprite
        const createGlowSprite = () => {
            const spriteMaterial = new THREE.SpriteMaterial({
                map: createGlowTexture(),
                color: 0x0088ff,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(4, 4, 1);
            return sprite;
        };

        // Add glow sprite
        const glow = createGlowSprite();
        scene.add(glow);

        // Add subtle particles around the torus knot
        const particlesCount = 200;
        const particlesGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.5 + Math.random() * 2.5;
            particlePositions[i * 3] = Math.cos(angle) * radius;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
            particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x88aaff,
            size: 0.05,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Animation loop
        let frameId: number;
        let time = 0;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            time += 0.01;
            
            // Animate the torus knot
            torusKnot.rotation.y = time * 0.5;
            torusKnot.rotation.x = time * 0.3;
            
            // Make the lights move
            redLight.position.x = Math.sin(time) * 3;
            redLight.position.z = Math.cos(time) * 3;
            
            blueLight.position.x = Math.sin(time + Math.PI) * 3;
            blueLight.position.z = Math.cos(time + Math.PI) * 3;
            
            // Animate particles
            const positions = particlesGeometry.attributes.position.array;
            for (let i = 0; i < particlesCount; i++) {
                positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.01;
            }
            particlesGeometry.attributes.position.needsUpdate = true;
            
            // Move camera slightly
            camera.position.x = Math.sin(time * 0.2) * 0.5;
            camera.position.y = Math.cos(time * 0.3) * 0.5;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
            
            // Update helpers if they exist
            // if (spotLightHelper) spotLightHelper.update();
        };
        
        animate();

        // Helper function to create glow texture
        function createGlowTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            if (context) {
                const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                gradient.addColorStop(0.3, 'rgba(100, 150, 255, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 50, 100, 0)');
                context.fillStyle = gradient;
                context.fillRect(0, 0, 64, 64);
            }
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        // Handle window resizing
        const handleResize = () => {
            if (!currentRef) return;
            const width = currentRef.clientWidth;
            const height = currentRef.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
            if (currentRef.contains(renderer.domElement)) {
                currentRef.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

export default EnhancedTorusKnot;