import { Bird } from "./bird";
import { PillarManager } from "./pillarManager";

export class Game{

    private ctx: CanvasRenderingContext2D;

    private bird: Bird;
    private pillarManager: PillarManager;
    
    private lastTime: number = 0;
    private gravity: number = 500;

    private score: number = 0;
    private _gameOver: boolean = false;

    constructor(ctx: CanvasRenderingContext2D) {

        this.ctx = ctx;
        this.bird = new Bird(10, 25, 20, 20);
        this.pillarManager = new PillarManager();

        document.getElementById("start-btn")!.onclick = () => this.start();
        document.getElementById("restart-btn")!.onclick = () => this.restart();

        document.addEventListener("keydown", this.keyboardEventHandler.bind(this));
        this.draw();
    }

    draw(): void {
        this.bird.draw(this.ctx);
        this.pillarManager.draw(this.ctx);
    }

    start(): void {
        document.getElementById("start-game-scene")!.hidden = true;
        this._gameOver = false;
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop = (currentTime: number): void => {
        const deltaTime = (currentTime - this.lastTime) / 1000;

        this.bird.update(deltaTime, this.gravity);
        this.pillarManager.update(deltaTime, this.ctx.canvas.width, this.ctx.canvas.height);

        this.checkBirdCollision();

        if(this.pillarManager.checkPastPillar(this.bird.birdX, this.bird.birdWidth)){
            this.score++;
        }

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.draw();

        this.drawScore();

        this.lastTime = currentTime;
        if(!this._gameOver) requestAnimationFrame(this.gameLoop);
    };

    keyboardEventHandler(event: KeyboardEvent): void {
        if (event.code === "Space") {
            this.bird.jump();
        }
    }
      
    checkBirdCollision(): void {
        if (this.bird.birdY + this.bird.birdHeight >= this.ctx.canvas.height) {
            this.gameOver();
        }
        else if(this.pillarManager.checkCollide(this.bird.birdX, this.bird.birdY, this.bird.birdWidth, this.bird.birdHeight)){
            this.gameOver();  
        }
    }

    drawScore(): void{
        this.ctx.font = "bold 48px sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(String(this.score), this.ctx.canvas.width / 2, 20);
    }

    gameOver(): void{
        this._gameOver = true;
        document.getElementById("game-over-scene")!.hidden = false;
    }

    restart(): void{
        this.bird = new Bird(10, 25, 20, 20);
        this.pillarManager = new PillarManager();
        this.score = 0
        document.getElementById("game-over-scene")!.hidden = true;
        this.start();
    }
}