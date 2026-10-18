export class Pillar {
    
    private x: number;
    
    private width: number;
    private height: number;

    private gap: number;
    private gapY: number;

    constructor(x: number, width: number, height: number, gap: number, gapY: number) {
        this.x = x;
        
        this.width = width;
        this.height = height;

        this.gap = gap;
        this.gapY = gapY;
    }

    draw(ctx: CanvasRenderingContext2D): void {

        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, 0, this.width, this.gapY - this.gap / 2);
        ctx.fillRect(this.x, this.gapY + this.gap / 2, this.width, this.height - (this.gapY + this.gap / 2));
    }

    move(deltaX: number): void {
        this.x += deltaX;
    }

    collideWith(x:number, y: number, width: number, height: number): boolean {

        // top/bottom bird boundaries
        if (
            x + width >= this.x && y <= this.gapY - this.gap / 2 ||
            x + width >= this.x && y + height >= this.gapY + this.gap / 2
        ){
            return true;
        }
        
        return false;
    }

    get pillarX(): number { 
        return this.x;
    }

    get pillarWidth(): number {
        return this.width;
    }
}  