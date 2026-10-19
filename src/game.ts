import { Canvas } from "./canvas";
import { Bird } from "./bird";
import { PillarManager } from "./pillarManager";

export class Game{

    private playGround: HTMLDivElement;

    private canvas: Canvas;
    private bird: Bird;
    private pillarManager: PillarManager;
    
    private lastTime: number = 0;
    private gravity: number = 100;

    private score: number = 0;
    private _gameOver: boolean = false;

    constructor(playGround: HTMLDivElement) {
        this.playGround = playGround;
        this.canvas = new Canvas(playGround.clientWidth, playGround.clientHeight);

        this.bird = new Bird(10, 25, 20, 20);
        this.pillarManager = new PillarManager();

        document.getElementById("start-btn")!.onclick = () => this.start();
        document.getElementById("restart-btn")!.onclick = () => this.restart();

        document.addEventListener("keydown", this.keyboardEventHandler.bind(this));
        this.draw();
    }

    draw(): void {
        this.playGround.appendChild(this.canvas.canvasElement);
        this.bird.draw(this.canvas.canvasElement.getContext("2d")!);
        this.pillarManager.draw(this.canvas.canvasElement.getContext("2d")!);
    }

    start(): void {
        document.getElementById("start-game-scene")!.hidden = true;
        this._gameOver = false;
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop = (currentTime: number): void => {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.bird.update(deltaTime, this.gravity);
        this.checkBirdCollision();

        this.canvas.cleanCanvas();
        this.draw();

        if(!this._gameOver) requestAnimationFrame(this.gameLoop);
    };


    /*
    requestAnimationFrameHandler(currentTime: number = 0): void {
        
        const deltaTime = (currentTime - this.lastTime) / 1000;

        this.bird.update(deltaTime, this.gravity);

        if(this.started) this.checkBirdCollision();

        this.canvas.cleanCanvas();
        this.draw();
       
        /*
        this.pillarManager.update(deltaTime, this.canvas.canvasWidth, this.canvas.canvasHeight);
        
        const hit = this.pillarManager.checkCollidePillar(this.bird.birdX, this.bird.birdY, this.bird.birdWidth, this.bird.birdHeight)

        if(this.pillarManager.checkPastPillar(this.bird.birdX, this.bird.birdWidth)){
            this.score++;
        }

        this.canvas.cleanCanvas();
        this.draw();

        if (hit) {
            this.gameOver();
            return;
        }

        this.canvas.canvasElement.getContext("2d")!.font = "48px serif";
        this.canvas.canvasElement.getContext("2d")!.fillStyle = 'black';        
        this.canvas.canvasElement.getContext("2d")!.fillText(`${this.score}`, this.canvas.canvasWidth/2, this.canvas.canvasHeight/2);
       
        this.lastTime = currentTime;
        requestAnimationFrame(this.requestAnimationFrameHandler.bind(this));
    }
    */
    keyboardEventHandler(event: KeyboardEvent): void {
        if (event.code === "Space") {
            this.bird.jump();
        }
    }
      
    checkBirdCollision(): void {
        if (
            this.bird.birdY <= 0
        ) {
           this.gameOver();
        }
        
        if (
            this.bird.birdY + this.bird.birdHeight >= this.canvas.canvasHeight
        ) {
            this.gameOver();
        }
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