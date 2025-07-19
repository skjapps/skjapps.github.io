'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCardProps {
  frontTexture?: string;
  backTexture?: string;
  width?: number;
  height?: number;
  depth?: number;
  rotationSpeed?: number;
}

export function ThreeCard({ 
  frontTexture = '/assets/img/BusinessCardFront.png',
  backTexture = '/assets/img/BusinessCardBack.png',
  width = 5,
  height = 0.05,
  depth = 3,
  rotationSpeed = 0.01
}: ThreeCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cardRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // No background color for transparency
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true // Enable transparency
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    rendererRef.current = renderer;

    // Card geometry
    const cardGeometry = new THREE.BoxGeometry(width, height, depth);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const frontTex = textureLoader.load(frontTexture);
    const backTex = textureLoader.load(backTexture);

    // Card materials
    const cardMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Right
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Left
      new THREE.MeshBasicMaterial({ map: backTex }),    // Top (back)
      new THREE.MeshBasicMaterial({ map: frontTex }),   // Bottom (front)
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Front
      new THREE.MeshBasicMaterial({ color: 0xffffff })  // Back
    ];

    // Create card mesh
    const card = new THREE.Mesh(cardGeometry, cardMaterials);
    // Start with front texture facing the camera
    card.rotation.x = 1.25;
    card.rotation.z = 3;
    scene.add(card);
    cardRef.current = card;

    // Mouse/Touch event handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      autoRotateRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !cardRef.current) return;

      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;

      cardRef.current.rotation.y += deltaX * 0.01;
      cardRef.current.rotation.x += deltaY * 0.01;

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      // Resume auto-rotation after a delay
      setTimeout(() => {
        autoRotateRef.current = true;
      }, 2000);
    };

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        autoRotateRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !cardRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - lastMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - lastMousePosRef.current.y;

      cardRef.current.rotation.y += deltaX * 0.01;
      cardRef.current.rotation.x += deltaY * 0.01;

      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      // Resume auto-rotation after a delay
      setTimeout(() => {
        autoRotateRef.current = true;
      }, 2000);
    };

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (cardRef.current && autoRotateRef.current) {
        cardRef.current.rotation.z += rotationSpeed
        cardRef.current.rotation.x += rotationSpeed * 0.1; // Slower X rotation
      }

      renderer.render(scene, camera);
    };

    animate();

    // Add event listeners
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('touchstart', handleTouchStart);
      canvas.addEventListener('touchmove', handleTouchMove);
      canvas.addEventListener('touchend', handleTouchEnd);
    }

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current) return;
      
      const canvas = canvasRef.current;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Keep aspect ratio consistent (1:1 square)
      camera.aspect = 1;
      camera.updateProjectionMatrix();

      rendererRef.current.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Cleanup textures and materials
      frontTex.dispose();
      backTex.dispose();
      cardMaterials.forEach(material => material.dispose());
      
      // Remove event listeners
      if (canvas) {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [frontTexture, backTexture, width, height, depth, rotationSpeed]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-auto h-auto max-w-full max-h-full"
        style={{ borderRadius: '2vh', aspectRatio: '1 / 1' }}
      />
    </div>
  );
} 