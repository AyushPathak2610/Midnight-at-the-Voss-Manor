const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawSketchyLine(ctx, x1, y1, x2, y2, segments = 20) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 3;
        const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 3;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

function drawSketchyCircle(ctx, x, y, radius, segments = 30) {
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * 4;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
}

function applyFadedEffect(ctx, width, height) {
    // Add sepia/faded overlay
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgba(245, 235, 220, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Add vignette
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/1.5);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add paper texture
    for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = `rgba(200, 180, 160, ${Math.random() * 0.1})`;
        ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }
}

function drawMemory1(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Warm nostalgic background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#f5e6d3');
    bgGradient.addColorStop(1, '#e8d4b8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    // Soft ground
    ctx.fillStyle = 'rgba(180, 160, 130, 0.2)';
    ctx.fillRect(0, h * 0.7, w, h * 0.3);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Dad (left) - detailed figure
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    
    // Dad's head with hair detail
    drawSketchyCircle(ctx, 150, 160, 38);
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
        drawSketchyLine(ctx, 140 + i * 3, 125, 138 + i * 3, 135);
    }
    
    // Dad's facial features
    ctx.fillStyle = 'rgba(60, 50, 40, 0.5)';
    ctx.fillRect(142, 155, 4, 2);
    ctx.fillRect(154, 155, 4, 2);
    ctx.beginPath();
    ctx.arc(150, 168, 6, 0, Math.PI);
    ctx.stroke();
    
    // Dad's body with clothing detail
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 150, 198, 150, 310);
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 130, 220, 170, 220); // shoulders
    drawSketchyLine(ctx, 135, 240, 165, 240); // shirt line
    
    // Dad's arms reaching down to child
    drawSketchyLine(ctx, 130, 220, 110, 270);
    drawSketchyLine(ctx, 110, 270, 230, 290);
    drawSketchyLine(ctx, 170, 220, 190, 270);
    drawSketchyLine(ctx, 190, 270, 250, 285);
    
    // Dad's legs
    drawSketchyLine(ctx, 145, 310, 135, 400);
    drawSketchyLine(ctx, 155, 310, 165, 400);
    
    // Child (center) - small and detailed
    ctx.strokeStyle = 'rgba(70, 60, 50, 0.7)';
    ctx.lineWidth = 2;
    
    // Child's head
    drawSketchyCircle(ctx, 300, 240, 32);
    // Hair
    for (let i = 0; i < 10; i++) {
        drawSketchyLine(ctx, 285 + i * 3, 210, 283 + i * 3, 220);
    }
    
    // Child's happy face
    ctx.fillStyle = 'rgba(60, 50, 40, 0.5)';
    ctx.fillRect(290, 235, 3, 2);
    ctx.fillRect(307, 235, 3, 2);
    ctx.beginPath();
    ctx.arc(300, 248, 8, 0, Math.PI);
    ctx.stroke();
    
    // Child's dress/outfit
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 300, 272, 300, 340);
    ctx.beginPath();
    ctx.moveTo(285, 280);
    ctx.lineTo(300, 340);
    ctx.lineTo(315, 280);
    ctx.stroke();
    
    // Child's arms up in joy
    drawSketchyLine(ctx, 285, 280, 260, 260);
    drawSketchyLine(ctx, 315, 280, 340, 260);
    
    // Child's legs
    drawSketchyLine(ctx, 295, 340, 290, 390);
    drawSketchyLine(ctx, 305, 340, 310, 390);
    
    // Mom (right) - elegant figure
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    
    // Mom's head with long hair
    drawSketchyCircle(ctx, 450, 160, 38);
    ctx.lineWidth = 1.5;
    // Long flowing hair
    drawSketchyLine(ctx, 420, 150, 415, 200);
    drawSketchyLine(ctx, 425, 155, 418, 210);
    drawSketchyLine(ctx, 475, 150, 485, 200);
    drawSketchyLine(ctx, 480, 155, 488, 210);
    
    // Mom's gentle smile
    ctx.fillStyle = 'rgba(60, 50, 40, 0.5)';
    ctx.fillRect(442, 155, 4, 2);
    ctx.fillRect(454, 155, 4, 2);
    ctx.beginPath();
    ctx.arc(450, 168, 7, 0, Math.PI);
    ctx.stroke();
    
    // Mom's body
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 450, 198, 450, 310);
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 430, 220, 470, 220);
    
    // Mom's arms reaching to child
    drawSketchyLine(ctx, 430, 220, 410, 270);
    drawSketchyLine(ctx, 410, 270, 350, 285);
    drawSketchyLine(ctx, 470, 220, 490, 270);
    drawSketchyLine(ctx, 490, 270, 370, 290);
    
    // Mom's legs
    drawSketchyLine(ctx, 445, 310, 435, 400);
    drawSketchyLine(ctx, 455, 310, 465, 400);
    
    // Connecting hands - the emotional center
    ctx.strokeStyle = 'rgba(80, 60, 50, 0.8)';
    ctx.lineWidth = 3;
    drawSketchyLine(ctx, 230, 290, 260, 260);
    drawSketchyLine(ctx, 340, 260, 350, 285);
    
    // Soft hearts floating
    ctx.font = 'italic 28px serif';
    ctx.fillStyle = 'rgba(180, 100, 100, 0.25)';
    ctx.fillText('♥', 290, 120);
    ctx.fillStyle = 'rgba(180, 100, 100, 0.2)';
    ctx.fillText('♥', 200, 140);
    ctx.fillText('♥', 380, 140);
    
    // Grass strokes at bottom
    ctx.strokeStyle = 'rgba(100, 120, 80, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * w;
        drawSketchyLine(ctx, x, h * 0.85, x + Math.random() * 5 - 2.5, h * 0.75);
    }
    
    applyFadedEffect(ctx, w, h);
}

function drawMemory2(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Sunny day background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#e8f4f8');
    bgGradient.addColorStop(0.6, '#f5e6d3');
    bgGradient.addColorStop(1, '#d4c4a8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Sun in corner
    ctx.fillStyle = 'rgba(255, 220, 100, 0.3)';
    ctx.beginPath();
    ctx.arc(80, 80, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(200, 180, 80, 0.4)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 80 + Math.cos(angle) * 50;
        const y1 = 80 + Math.sin(angle) * 50;
        const x2 = 80 + Math.cos(angle) * 70;
        const y2 = 80 + Math.sin(angle) * 70;
        drawSketchyLine(ctx, x1, y1, x2, y2);
    }
    
    // Detailed tree
    ctx.strokeStyle = 'rgba(80, 60, 40, 0.6)';
    ctx.lineWidth = 8;
    drawSketchyLine(ctx, 480, 180, 480, 360);
    ctx.lineWidth = 5;
    drawSketchyLine(ctx, 480, 220, 460, 200);
    drawSketchyLine(ctx, 480, 240, 500, 220);
    
    // Tree foliage with texture
    ctx.fillStyle = 'rgba(100, 140, 80, 0.3)';
    ctx.beginPath();
    ctx.arc(480, 150, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(80, 100, 60, 0.5)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 40 + Math.random() * 30;
        const x = 480 + Math.cos(angle) * r;
        const y = 150 + Math.sin(angle) * r;
        drawSketchyCircle(ctx, x, y, 8 + Math.random() * 5);
    }
    
    // Detailed picnic blanket
    ctx.strokeStyle = 'rgba(160, 80, 80, 0.5)';
    ctx.lineWidth = 2;
    // Blanket outline
    drawSketchyLine(ctx, 140, 300, 360, 300);
    drawSketchyLine(ctx, 140, 300, 140, 410);
    drawSketchyLine(ctx, 360, 300, 360, 410);
    drawSketchyLine(ctx, 140, 410, 360, 410);
    
    // Checkered pattern
    for (let i = 0; i < 5; i++) {
        drawSketchyLine(ctx, 140, 320 + i * 22, 360, 320 + i * 22);
        drawSketchyLine(ctx, 160 + i * 44, 300, 160 + i * 44, 410);
    }
    
    // Dad sitting, leaning back relaxed
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 170, 310, 28);
    // Relaxed posture
    drawSketchyLine(ctx, 170, 338, 180, 380);
    drawSketchyLine(ctx, 150, 345, 140, 390);
    drawSketchyLine(ctx, 190, 345, 200, 390);
    // Arms
    drawSketchyLine(ctx, 150, 345, 130, 370);
    drawSketchyLine(ctx, 190, 345, 250, 360);
    
    // Child sitting cross-legged, excited
    ctx.lineWidth = 2;
    drawSketchyCircle(ctx, 250, 325, 24);
    // Excited expression
    ctx.fillStyle = 'rgba(60, 50, 40, 0.6)';
    ctx.fillRect(243, 322, 3, 2);
    ctx.fillRect(254, 322, 3, 2);
    ctx.beginPath();
    ctx.arc(250, 333, 6, 0, Math.PI);
    ctx.stroke();
    // Body
    drawSketchyLine(ctx, 250, 349, 250, 380);
    // Legs crossed
    drawSketchyLine(ctx, 240, 380, 220, 395);
    drawSketchyLine(ctx, 260, 380, 280, 395);
    // Arms reaching for food
    drawSketchyLine(ctx, 240, 360, 240, 380);
    drawSketchyLine(ctx, 260, 360, 270, 375);
    
    // Mom sitting elegantly
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 330, 315, 28);
    // Hair detail
    ctx.lineWidth = 1.5;
    drawSketchyLine(ctx, 310, 305, 305, 340);
    drawSketchyLine(ctx, 350, 305, 355, 340);
    // Body
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 330, 343, 330, 390);
    // Arms
    drawSketchyLine(ctx, 315, 355, 295, 380);
    drawSketchyLine(ctx, 345, 355, 280, 365);
    
    // Picnic food details
    ctx.strokeStyle = 'rgba(80, 60, 50, 0.6)';
    ctx.lineWidth = 2;
    // Basket
    drawSketchyLine(ctx, 180, 360, 220, 360);
    drawSketchyLine(ctx, 180, 360, 180, 380);
    drawSketchyLine(ctx, 220, 360, 220, 380);
    drawSketchyLine(ctx, 180, 380, 220, 380);
    drawSketchyLine(ctx, 200, 355, 200, 385);
    
    // Sandwiches
    ctx.fillStyle = 'rgba(200, 180, 140, 0.5)';
    ctx.fillRect(240, 375, 20, 12);
    ctx.fillRect(265, 378, 18, 10);
    
    // Fruit
    ctx.fillStyle = 'rgba(200, 80, 80, 0.4)';
    ctx.beginPath();
    ctx.arc(290, 380, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(305, 382, 7, 0, Math.PI * 2);
    ctx.fill();
    
    // Grass and flowers
    ctx.strokeStyle = 'rgba(100, 120, 80, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * w;
        if (x < 130 || x > 370) {
            drawSketchyLine(ctx, x, 420, x + Math.random() * 4 - 2, 405);
        }
    }
    
    // Small flowers
    ctx.fillStyle = 'rgba(200, 100, 150, 0.3)';
    for (let i = 0; i < 8; i++) {
        const x = 50 + Math.random() * 100;
        const y = 380 + Math.random() * 40;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    applyFadedEffect(ctx, w, h);
}

function drawMemory3(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Night sky background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#2a2a3e');
    bgGradient.addColorStop(0.5, '#3a3a4e');
    bgGradient.addColorStop(1, '#d4c4a8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    // Soft moonlight glow
    const moonGlow = ctx.createRadialGradient(500, 80, 20, 500, 80, 100);
    moonGlow.addColorStop(0, 'rgba(255, 255, 220, 0.3)');
    moonGlow.addColorStop(1, 'rgba(255, 255, 220, 0)');
    ctx.fillStyle = moonGlow;
    ctx.fillRect(0, 0, w, h);
    
    // Moon
    ctx.fillStyle = 'rgba(255, 255, 220, 0.4)';
    ctx.beginPath();
    ctx.arc(500, 80, 35, 0, Math.PI * 2);
    ctx.fill();
    
    // Stars
    ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * w;
        const y = Math.random() * (h * 0.4);
        const size = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Detailed bed frame
    ctx.strokeStyle = 'rgba(80, 60, 40, 0.6)';
    ctx.lineWidth = 4;
    // Headboard
    drawSketchyLine(ctx, 200, 250, 200, 300);
    drawSketchyLine(ctx, 200, 250, 400, 250);
    drawSketchyLine(ctx, 400, 250, 400, 300);
    // Footboard
    drawSketchyLine(ctx, 200, 360, 200, 380);
    drawSketchyLine(ctx, 400, 360, 400, 380);
    drawSketchyLine(ctx, 200, 380, 400, 380);
    
    // Bed posts detail
    ctx.lineWidth = 3;
    drawSketchyCircle(ctx, 200, 245, 8);
    drawSketchyCircle(ctx, 400, 245, 8);
    
    // Blanket with folds
    ctx.strokeStyle = 'rgba(100, 120, 140, 0.5)';
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 210, 300, 390, 300);
    drawSketchyLine(ctx, 210, 320, 390, 320);
    drawSketchyLine(ctx, 210, 340, 390, 340);
    drawSketchyLine(ctx, 210, 360, 390, 360);
    // Fold details
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        drawSketchyLine(ctx, 240 + i * 30, 300, 245 + i * 30, 360);
    }
    
    // Child tucked in bed - peaceful
    ctx.strokeStyle = 'rgba(70, 60, 50, 0.7)';
    ctx.lineWidth = 2;
    drawSketchyCircle(ctx, 300, 315, 26);
    // Peaceful sleeping face
    ctx.fillStyle = 'rgba(60, 50, 40, 0.5)';
    ctx.beginPath();
    ctx.arc(293, 312, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(307, 312, 2, 0, Math.PI * 2);
    ctx.fill();
    // Gentle smile
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, 322, 5, 0, Math.PI);
    ctx.stroke();
    
    // Pillow
    ctx.strokeStyle = 'rgba(100, 100, 120, 0.4)';
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 270, 305, 330, 305);
    drawSketchyLine(ctx, 270, 305, 270, 325);
    drawSketchyLine(ctx, 330, 305, 330, 325);
    
    // Dad sitting on left side of bed
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 160, 300, 30);
    // Leaning forward, caring posture
    drawSketchyLine(ctx, 160, 330, 180, 380);
    drawSketchyLine(ctx, 145, 340, 140, 390);
    drawSketchyLine(ctx, 175, 340, 180, 390);
    // Arm holding book
    drawSketchyLine(ctx, 175, 340, 240, 290);
    drawSketchyLine(ctx, 145, 340, 200, 310);
    
    // Mom sitting on right side
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 440, 300, 30);
    // Gentle posture
    drawSketchyLine(ctx, 440, 330, 430, 380);
    drawSketchyLine(ctx, 425, 340, 420, 390);
    drawSketchyLine(ctx, 455, 340, 440, 390);
    // Arm gently touching child
    drawSketchyLine(ctx, 425, 340, 350, 320);
    drawSketchyLine(ctx, 455, 340, 460, 370);
    
    // Storybook - detailed
    ctx.strokeStyle = 'rgba(180, 140, 100, 0.6)';
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 240, 270, 280, 270);
    drawSketchyLine(ctx, 240, 270, 240, 300);
    drawSketchyLine(ctx, 280, 270, 280, 300);
    drawSketchyLine(ctx, 240, 300, 280, 300);
    // Book spine
    drawSketchyLine(ctx, 260, 270, 260, 300);
    // Pages detail
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(100, 80, 60, 0.3)';
    for (let i = 0; i < 5; i++) {
        drawSketchyLine(ctx, 245, 275 + i * 5, 255, 275 + i * 5);
        drawSketchyLine(ctx, 265, 275 + i * 5, 275, 275 + i * 5);
    }
    
    // Bedside lamp glow
    const lampGlow = ctx.createRadialGradient(150, 240, 10, 150, 240, 60);
    lampGlow.addColorStop(0, 'rgba(255, 220, 150, 0.3)');
    lampGlow.addColorStop(1, 'rgba(255, 220, 150, 0)');
    ctx.fillStyle = lampGlow;
    ctx.fillRect(120, 210, 60, 60);
    
    // Lamp
    ctx.strokeStyle = 'rgba(100, 80, 60, 0.5)';
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 150, 240, 150, 260);
    drawSketchyLine(ctx, 140, 230, 160, 230);
    drawSketchyLine(ctx, 140, 230, 150, 240);
    drawSketchyLine(ctx, 160, 230, 150, 240);
    
    // Soft hearts floating
    ctx.font = 'italic 20px serif';
    ctx.fillStyle = 'rgba(200, 150, 150, 0.2)';
    ctx.fillText('♥', 290, 250);
    ctx.fillText('♥', 200, 270);
    ctx.fillText('♥', 380, 270);
    
    applyFadedEffect(ctx, w, h);
}

function drawMemory4(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Bright sunny day
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#e8f4f8');
    bgGradient.addColorStop(0.5, '#f5f0e6');
    bgGradient.addColorStop(1, '#d8e8d0');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    // Sun rays
    ctx.strokeStyle = 'rgba(255, 240, 180, 0.2)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
        drawSketchyLine(ctx, 100, 60, 50 + i * 70, 200);
    }
    
    // Ground with texture
    ctx.fillStyle = 'rgba(160, 180, 140, 0.2)';
    ctx.fillRect(0, h * 0.65, w, h * 0.35);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Ball in mid-air - detailed
    ctx.strokeStyle = 'rgba(200, 80, 80, 0.7)';
    ctx.lineWidth = 3;
    drawSketchyCircle(ctx, 300, 160, 38);
    // Ball pattern
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 270, 160, 330, 160);
    drawSketchyLine(ctx, 300, 130, 300, 190);
    ctx.beginPath();
    ctx.arc(300, 160, 38, 0, Math.PI * 2);
    ctx.stroke();
    // Ball shadow on ground
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(300, 380, 25, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Motion blur lines
    ctx.strokeStyle = 'rgba(200, 80, 80, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
        drawSketchyLine(ctx, 260 - i * 12, 165, 240 - i * 12, 170);
    }
    
    // Dad jumping/reaching - dynamic pose
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 450, 220, 32);
    // Hair flying
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
        drawSketchyLine(ctx, 440 + i * 4, 190, 438 + i * 4, 180);
    }
    // Excited expression
    ctx.fillStyle = 'rgba(60, 50, 40, 0.6)';
    ctx.fillRect(442, 217, 4, 2);
    ctx.fillRect(454, 217, 4, 2);
    ctx.beginPath();
    ctx.arc(450, 228, 6, 0, Math.PI);
    ctx.stroke();
    
    // Body leaning forward
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 450, 252, 445, 340);
    // Arms reaching up for ball
    drawSketchyLine(ctx, 435, 265, 380, 200);
    drawSketchyLine(ctx, 465, 265, 420, 190);
    // Legs in motion
    drawSketchyLine(ctx, 440, 340, 425, 400);
    drawSketchyLine(ctx, 450, 340, 470, 395);
    
    // Child running with joy - action pose
    ctx.strokeStyle = 'rgba(70, 60, 50, 0.7)';
    ctx.lineWidth = 2;
    drawSketchyCircle(ctx, 150, 260, 28);
    // Hair bouncing
    for (let i = 0; i < 8; i++) {
        drawSketchyLine(ctx, 135 + i * 4, 235, 133 + i * 4, 225);
    }
    // Laughing face
    ctx.fillStyle = 'rgba(60, 50, 40, 0.6)';
    ctx.fillRect(143, 257, 3, 2);
    ctx.fillRect(154, 257, 3, 2);
    ctx.beginPath();
    ctx.arc(150, 268, 7, 0, Math.PI);
    ctx.stroke();
    
    // Body in running motion
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 150, 288, 155, 350);
    // Arms pumping
    drawSketchyLine(ctx, 135, 300, 110, 280);
    drawSketchyLine(ctx, 165, 300, 190, 320);
    // Legs running
    drawSketchyLine(ctx, 150, 350, 135, 400);
    drawSketchyLine(ctx, 160, 350, 180, 395);
    
    // Motion lines behind child
    ctx.strokeStyle = 'rgba(100, 90, 80, 0.2)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
        drawSketchyLine(ctx, 120 - i * 8, 270 + i * 5, 100 - i * 8, 275 + i * 5);
    }
    
    // Mom clapping and cheering
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 520, 280, 30);
    // Happy expression
    ctx.fillStyle = 'rgba(60, 50, 40, 0.6)';
    ctx.fillRect(512, 277, 4, 2);
    ctx.fillRect(524, 277, 4, 2);
    ctx.beginPath();
    ctx.arc(520, 288, 7, 0, Math.PI);
    ctx.stroke();
    
    // Body
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 520, 310, 520, 380);
    // Arms up clapping
    drawSketchyLine(ctx, 505, 325, 480, 290);
    drawSketchyLine(ctx, 535, 325, 560, 290);
    // Hands clapping
    ctx.lineWidth = 2;
    drawSketchyCircle(ctx, 478, 288, 8);
    drawSketchyCircle(ctx, 562, 288, 8);
    
    // Legs
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 515, 380, 505, 420);
    drawSketchyLine(ctx, 525, 380, 535, 420);
    
    // Grass with movement
    ctx.strokeStyle = 'rgba(100, 120, 80, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
        const x = Math.random() * w;
        const y = h * 0.85 + Math.random() * 40;
        drawSketchyLine(ctx, x, y, x + Math.random() * 6 - 3, y - 15);
    }
    
    // Joy particles
    ctx.fillStyle = 'rgba(255, 200, 100, 0.3)';
    for (let i = 0; i < 15; i++) {
        const x = 100 + Math.random() * 400;
        const y = 200 + Math.random() * 100;
        ctx.beginPath();
        ctx.arc(x, y, 2 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    applyFadedEffect(ctx, w, h);
}

function drawMemory5(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Warm, glowing background
    const bgGradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/1.5);
    bgGradient.addColorStop(0, '#fff8f0');
    bgGradient.addColorStop(0.5, '#f5e6d8');
    bgGradient.addColorStop(1, '#e8d4c0');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    // Soft light rays from center
    ctx.strokeStyle = 'rgba(255, 240, 200, 0.2)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 300 + Math.cos(angle) * 50;
        const y1 = 250 + Math.sin(angle) * 50;
        const x2 = 300 + Math.cos(angle) * 200;
        const y2 = 250 + Math.sin(angle) * 200;
        drawSketchyLine(ctx, x1, y1, x2, y2);
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Dad (left) - protective embrace
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 250, 200, 34);
    // Hair detail
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
        drawSketchyLine(ctx, 235 + i * 4, 168, 233 + i * 4, 158);
    }
    // Gentle, loving expression
    ctx.fillStyle = 'rgba(60, 50, 40, 0.5)';
    ctx.fillRect(242, 197, 4, 2);
    ctx.fillRect(254, 197, 4, 2);
    ctx.beginPath();
    ctx.arc(250, 208, 7, 0, Math.PI);
    ctx.stroke();
    
    // Dad's body leaning in
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 250, 234, 260, 340);
    // Arms wrapping around family
    drawSketchyLine(ctx, 235, 250, 200, 280);
    drawSketchyLine(ctx, 200, 280, 220, 320);
    drawSketchyLine(ctx, 265, 250, 300, 290);
    drawSketchyLine(ctx, 300, 290, 310, 310);
    
    // Legs
    drawSketchyLine(ctx, 255, 340, 245, 410);
    drawSketchyLine(ctx, 265, 340, 275, 410);
    
    // Mom (right) - tender embrace
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.7)';
    ctx.lineWidth = 2.5;
    drawSketchyCircle(ctx, 350, 200, 34);
    // Long hair flowing
    ctx.lineWidth = 1.5;
    drawSketchyLine(ctx, 325, 190, 315, 240);
    drawSketchyLine(ctx, 330, 195, 318, 250);
    drawSketchyLine(ctx, 370, 190, 385, 240);
    drawSketchyLine(ctx, 375, 195, 388, 250);
    
    // Loving expression
    ctx.fillStyle = 'rgba(60, 50, 40, 0.5)';
    ctx.fillRect(342, 197, 4, 2);
    ctx.fillRect(354, 197, 4, 2);
    ctx.beginPath();
    ctx.arc(350, 208, 7, 0, Math.PI);
    ctx.stroke();
    
    // Mom's body
    ctx.lineWidth = 2.5;
    drawSketchyLine(ctx, 350, 234, 340, 340);
    // Arms embracing
    drawSketchyLine(ctx, 335, 250, 300, 290);
    drawSketchyLine(ctx, 300, 290, 290, 310);
    drawSketchyLine(ctx, 365, 250, 400, 280);
    drawSketchyLine(ctx, 400, 280, 380, 320);
    
    // Legs
    drawSketchyLine(ctx, 335, 340, 325, 410);
    drawSketchyLine(ctx, 345, 340, 355, 410);
    
    // Child (center) - safe and loved
    ctx.strokeStyle = 'rgba(70, 60, 50, 0.7)';
    ctx.lineWidth = 2;
    drawSketchyCircle(ctx, 300, 260, 30);
    // Hair
    for (let i = 0; i < 10; i++) {
        drawSketchyLine(ctx, 283 + i * 3.5, 232, 281 + i * 3.5, 222);
    }
    
    // Pure joy expression
    ctx.fillStyle = 'rgba(60, 50, 40, 0.6)';
    ctx.fillRect(292, 257, 3, 2);
    ctx.fillRect(305, 257, 3, 2);
    // Big smile
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(300, 270, 9, 0, Math.PI);
    ctx.stroke();
    
    // Child's body
    ctx.lineWidth = 2;
    drawSketchyLine(ctx, 300, 290, 300, 350);
    // Arms hugging back
    drawSketchyLine(ctx, 285, 305, 240, 280);
    drawSketchyLine(ctx, 315, 305, 360, 280);
    
    // Legs
    drawSketchyLine(ctx, 295, 350, 290, 400);
    drawSketchyLine(ctx, 305, 350, 310, 400);
    
    // Detailed embrace connections
    ctx.strokeStyle = 'rgba(80, 70, 60, 0.6)';
    ctx.lineWidth = 2;
    // Dad's hand on child's shoulder
    drawSketchyCircle(ctx, 310, 310, 10);
    // Mom's hand on child's other shoulder
    drawSketchyCircle(ctx, 290, 310, 10);
    // Child's hands on parents
    drawSketchyCircle(ctx, 240, 280, 8);
    drawSketchyCircle(ctx, 360, 280, 8);
    
    // Hearts radiating from center - abundance of love
    ctx.font = 'italic 32px serif';
    ctx.fillStyle = 'rgba(200, 100, 120, 0.25)';
    ctx.fillText('♥', 290, 150);
    
    ctx.font = 'italic 26px serif';
    ctx.fillStyle = 'rgba(200, 100, 120, 0.2)';
    ctx.fillText('♥', 220, 180);
    ctx.fillText('♥', 360, 180);
    
    ctx.font = 'italic 22px serif';
    ctx.fillStyle = 'rgba(200, 100, 120, 0.18)';
    ctx.fillText('♥', 180, 230);
    ctx.fillText('♥', 400, 230);
    ctx.fillText('♥', 250, 120);
    ctx.fillText('♥', 340, 120);
    
    ctx.font = 'italic 18px serif';
    ctx.fillStyle = 'rgba(200, 100, 120, 0.15)';
    ctx.fillText('♥', 150, 280);
    ctx.fillText('♥', 440, 280);
    ctx.fillText('♥', 200, 150);
    ctx.fillText('♥', 390, 150);
    
    // Soft glow around the family
    const familyGlow = ctx.createRadialGradient(300, 280, 50, 300, 280, 150);
    familyGlow.addColorStop(0, 'rgba(255, 240, 220, 0.3)');
    familyGlow.addColorStop(1, 'rgba(255, 240, 220, 0)');
    ctx.fillStyle = familyGlow;
    ctx.fillRect(150, 130, 300, 300);
    
    // Ground with soft shadows
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.beginPath();
    ctx.ellipse(300, 410, 80, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    applyFadedEffect(ctx, w, h);
}

// Generate all images
const outputDir = path.join(__dirname, '..', 'public', 'images', 'crayon-drawings');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const drawings = [
    { name: 'family-1.png', draw: drawMemory1, title: 'Family Holding Hands' },
    { name: 'family-2.png', draw: drawMemory2, title: 'Picnic Memory' },
    { name: 'family-3.png', draw: drawMemory3, title: 'Bedtime Stories' },
    { name: 'family-4.png', draw: drawMemory4, title: 'Playing Together' },
    { name: 'family-5.png', draw: drawMemory5, title: 'Group Embrace' }
];

console.log('🎨 Generating faded memory images...\n');

drawings.forEach((item, index) => {
    const canvas = createCanvas(600, 450);
    item.draw(canvas);
    
    const buffer = canvas.toBuffer('image/png');
    const filepath = path.join(outputDir, item.name);
    fs.writeFileSync(filepath, buffer);
    
    console.log(`✓ [${index + 1}/5] Generated: ${item.title} → ${item.name}`);
});

console.log('\n✓ All images generated successfully!');
console.log(`Saved to: ${outputDir}`);
console.log('\nYou can now play the Nursery puzzle and see these faded memory drawings! 🎨');
