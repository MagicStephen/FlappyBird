export class Pillar {
    
    private _x: number;
    
    private _width: number;
    private _height: number;

    private _gap: number;
    private _gapY: number;

    constructor(x: number, width: number, height: number, gap: number, gapY: number) {
        this._x = x;
        
        this._width = width;
        this._height = height;

        this._gap = gap;
        this._gapY = gapY;
    }

    draw(ctx: CanvasRenderingContext2D): void {

        ctx.fillStyle = 'green';
        ctx.fillRect(this._x, 0, this._width, this._gapY - this._gap / 2);
        ctx.fillRect(this._x, this._gapY + this._gap / 2, this._width, this._height - (this._gapY + this._gap / 2));
    }

    move(deltaX: number): void {
        this._x += deltaX;
    }

    get x(): number { 
        return this._x;
    }

    get width(): number {
        return this._width;
    }

    get gap(): number {
        return this._gap;
    }

    get gapY(): number {
        return this._gapY;
    }
}  