export class Pillar {
    
    private x: number;
    
    private width: number;
    private height: number;

    private gap: number = 100;
    private gapY: number;

    constructor(x: number, width: number, height: number, gapY: number) {
        this.x = x;
        this.width = width;
        this.height = height;
        this.gapY = gapY;
    }

    public draw(ctx: CanvasRenderingContext2D) {

        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, 0, this.width, this.gapY - this.gap / 2);
        ctx.fillRect(this.x, this.gapY + this.gap / 2, this.width, this.height - (this.gapY + this.gap / 2));
    }

    public move(deltaX: number): void {
        this.x += deltaX;
    }

    get pillarX(): number { 
        return this.x;
    }

    get pillarWidth(): number {
        return this.width;
    }
}  