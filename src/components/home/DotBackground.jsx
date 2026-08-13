import React, { useEffect, useRef } from 'react';

export const DotBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        // Handle High DPI screens for sharp dots
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        const spacing = 20; // Original spacing restored
        const baseRadius = 2.5;
        const maxRadius = 7;
        const effectRadius = 120; // How close the mouse needs to be
        const dotColor = '#d8c8b8'; // Pastel dot color
        
        let mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        let animationFrameId;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = dotColor;

            for (let x = 0; x <= width; x += spacing) {
                for (let y = 0; y <= height; y += spacing) {
                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    let r = baseRadius;
                    if (distance < effectRadius) {
                        // Sine easing for a smoother "dock-like" bulge
                        const progress = 1 - (distance / effectRadius);
                        const scale = Math.sin(progress * (Math.PI / 2));
                        r = baseRadius + (maxRadius - baseRadius) * scale;
                    }
                    
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
};
