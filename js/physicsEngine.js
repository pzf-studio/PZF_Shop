import Matter from 'matter-js';

class PhysicsEngine {
    constructor() {
        this.engine = Matter.Engine.create({
            gravity: { x: 0, y: 1 }
        });
        
        this.render = Matter.Render.create({
            canvas: document.getElementById('physics-canvas'),
            engine: this.engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
                background: '#0a0a14'
            }
        });
        
        this.setupWorld();
        this.setupEvents();
    }
    
    setupWorld() {
        // Границы
        const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { 
            isStatic: true,
            render: { fillStyle: '#00f0ff' }
        });
        
        Matter.World.add(this.engine.world, [ground]);
        
        // Случайные объекты
        for (let i = 0; i < 10; i++) {
            this.addRandomObject();
        }
    }
    
    addRandomObject() {
        const shapes = ['circle', 'rectangle', 'polygon'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        let body;
        
        const x = Math.random() * 400 + 200;
        const y = Math.random() * -100;
        
        switch(shape) {
            case 'circle':
                body = Matter.Bodies.circle(x, y, 20, {
                    restitution: 0.8,
                    render: {
                        fillStyle: `hsl(${Math.random() * 360}, 70%, 60%)`
                    }
                });
                break;
            case 'rectangle':
                body = Matter.Bodies.rectangle(x, y, 40, 40, {
                    restitution: 0.7,
                    render: {
                        fillStyle: `hsl(${Math.random() * 360}, 70%, 60%)`
                    }
                });
                break;
            case 'polygon':
                body = Matter.Bodies.polygon(x, y, 5, 25, {
                    restitution: 0.9,
                    render: {
                        fillStyle: `hsl(${Math.random() * 360}, 70%, 60%)`
                    }
                });
                break;
        }
        
        Matter.World.add(this.engine.world, body);
        return body;
    }
    
    setupEvents() {
        // Запуск движка
        Matter.Runner.run(this.engine);
        Matter.Render.run(this.render);
        
        // Добавление объектов по клику
        document.getElementById('add-object').addEventListener('click', () => {
            this.addRandomObject();
        });
        
        // Сброс сцены
        document.getElementById('reset-physics').addEventListener('click', () => {
            Matter.World.clear(this.engine.world, false);
            Matter.Engine.clear(this.engine);
            this.setupWorld();
        });
    }
}

export default PhysicsEngine;