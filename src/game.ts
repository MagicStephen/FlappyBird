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

    private score: number = 0;

    constructor(playGround: HTMLDivElement) {
        this.playGround = playGround;
        this.canvas = new Canvas(playGround.clientWidth, playGround.clientHeight);

        this.bird = new Bird( 10, this.canvas.canvasHeight - 20, 20, 20, 5, 80);
        this.pillarManager = new PillarManager();

        document.addEventListener("keydown", this.keyboardEventHandler.bind(this));
    }

    draw(): void {
        this.playGround.appendChild(this.canvas.canvasElement);
        this.bird.draw(this.canvas.canvasElement.getContext("2d")!);
        this.pillarManager.draw(this.canvas.canvasElement.getContext("2d")!);
    }

    start(): void {
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

    checkBirdCollision(deltaTime: number): void {

        if (this.bird.birdY < this.canvas.canvasHeight - this.bird.birdHeight) {
            this.bird.fall(deltaTime * this.gravity, deltaTime);
        }
    }

    gameOver(): void{

        const gameOverDiv = this.playGround.appendChild(document.createElement("div"))
        gameOverDiv.setAttribute("id", "game-over-container")
        gameOverDiv.style.position = "absolute";
        gameOverDiv.style.inset = "0";
        gameOverDiv.style.zIndex = "10";
        gameOverDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        gameOverDiv.style.textAlign = "center"

        const p = gameOverDiv.appendChild(document.createElement("h1"));
        p.textContent = "GameOver";

        const button = gameOverDiv.appendChild(document.createElement("button"));
        button.textContent = "Reset";
        button.style.padding = "12px 32px";
        button.style.fontSize = "18px";
        button.style.fontWeight = "bold";
        button.style.color = "white";
        button.style.backgroundColor = "#e63946";
        button.style.border = "none";
        button.style.borderRadius = "8px";
        button.style.cursor = "pointer";
        button.style.boxShadow = "0 4px 0 #a4161a";
        button.style.transition = "background-color 0.2s, transform 0.2s";

        button.onclick = this.reset.bind(this);
    }

    reset(): void{
        this.bird = new Bird( 10, this.playGround.clientHeight - 20, 20, 20, 5, 50);
        this.pillarManager = new PillarManager();
        this.score = 0
        document.getElementById("game-over-container")?.remove();
        this.start();
    }
}