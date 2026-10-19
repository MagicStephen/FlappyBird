export class Bird {

    private x: number = 0;
    private _y: number = 0;

    private width: number;
    private height: number;

    private _velocity: number = 0;
    private jumpForce: number = -200;

    private minAngle: number;
    private maxAngle: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this._y = y;
        
        this.width = width;
        this.height = height;

        this.minAngle = -25 * Math.PI / 180;
        this.maxAngle = 120 * Math.PI / 180;
    }

    public jump(){
        this._velocity = this.jumpForce;
    }

    public update(dt: number, gravity: number){
        this._velocity += gravity * dt;
        this._y += this._velocity * dt;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        
        const angle = Math.max(
            this.minAngle, 
            Math.min(this._velocity * this.maxAngle / - this.jumpForce, this.maxAngle)
        );

        ctx.save();
        ctx.translate(this.x + this.width/2, this._y + this.height/2)
        ctx.rotate(angle);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    get birdY(): number {
        return this._y;
    }

    get birdX(): number {
        return this.x;
    }

    get birdHeight(): number {
        return this.height;
    }

    get birdWidth(): number{
        return this.width;
    }

    set velocity(value:number){
        this._velocity = value;
    }

    set y(value:number){
        this._y = value;
    }
}