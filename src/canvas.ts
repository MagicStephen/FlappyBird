export class Canvas {

    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number) {

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = "#70c5ce";

        this.ctx = this.canvas.getContext("2d")!;
    }

    cleanCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    get canvasElement(): HTMLCanvasElement {
        return this.canvas;
    }

    get canvasWidth(): number {
        return this.canvas.width;
    }

    get canvasHeight(): number {
        return this.canvas.height;
    }
}