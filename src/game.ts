import { Canvas } from "./canvas";
import { Bird } from "./bird";

export class Game{

    private playGround: HTMLDivElement;

    private canvas: Canvas;
    private bird: Bird;

    constructor(playGround: HTMLDivElement) {
        this.playGround = playGround;
        this.canvas = new Canvas(playGround.clientWidth, playGround.clientHeight);
        this.bird = new Bird( 10, this.canvas.canvasHeight - 20, 20, 20, 5, 50);

        this.draw();
        document.addEventListener("keydown", this.keyboardEventHandler.bind(this));
        requestAnimationFrame(this.requestAnimationFrameHandler.bind(this));
    }

    draw(): void {
        this.playGround.appendChild(this.canvas.canvasElement);
        this.bird.draw(this.canvas.canvasElement.getContext("2d")!);
    }

    keyboardEventHandler(event: KeyboardEvent): void {
        if (event.code === "Space") {
            if (this.bird.birdY - this.bird.birdJumpSpeed >= 0) {
                this.bird.jump();
            }
        }
    }

    requestAnimationFrameHandler(): void {

        if (this.bird.birdY < this.canvas.canvasHeight - this.bird.birdH) {
            this.bird.fall();
        }

        this.canvas.cleanCanvas();
        this.draw();

        requestAnimationFrame(this.requestAnimationFrameHandler.bind(this));
    }
}