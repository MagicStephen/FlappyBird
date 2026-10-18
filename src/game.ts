import { Canvas } from "./canvas";
import { Bird } from "./bird";
import { PillarManager } from "./pillarManager";

export class Game{

    private playGround: HTMLDivElement;

    private canvas: Canvas;
    private bird: Bird;
    private pillarManager: PillarManager;
    
    private lastTime: number = 0;
    private gravity: number = 3500;

    constructor(playGround: HTMLDivElement) {
        this.playGround = playGround;
        this.canvas = new Canvas(playGround.clientWidth, playGround.clientHeight);
        this.bird = new Bird( 10, this.canvas.canvasHeight - 20, 20, 20, 5, 50);
        this.pillarManager = new PillarManager();
    }

    draw(): void {
        this.playGround.appendChild(this.canvas.canvasElement);
        this.bird.draw(this.canvas.canvasElement.getContext("2d")!);
        this.pillarManager.draw(this.canvas.canvasElement.getContext("2d")!);
    }

    start(): void {
        document.addEventListener("keydown", this.keyboardEventHandler.bind(this));
        requestAnimationFrame(this.requestAnimationFrameHandler.bind(this));
        this.lastTime = performance.now();
        requestAnimationFrame(this.requestAnimationFrameHandler.bind(this));
    }

    keyboardEventHandler(event: KeyboardEvent): void {
        if (event.code === "Space") {
            if (this.bird.birdY - this.bird.birdJumpSpeed >= 0) {
                this.bird.jump();
            }
        }
    }

    requestAnimationFrameHandler(currentTime: number = 0): void {
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        
        this.checkBirdCollision(deltaTime);
        this.pillarManager.update(deltaTime, this.canvas.canvasWidth, this.canvas.canvasHeight);

        this.canvas.cleanCanvas();
        this.draw();

        this.lastTime = currentTime;
        requestAnimationFrame(this.requestAnimationFrameHandler.bind(this));
    }

    checkBirdCollision(deltaTime: number): void {

        if (this.bird.birdY < this.canvas.canvasHeight - this.bird.birdHeight) {
            this.bird.fall(deltaTime * this.gravity, deltaTime);
        }
    }
}