export class Bird {

    private x: number = 0;
    private y: number = 0;

    private width: number;
    private height: number;

    private fallSpeed: number;
    private jumpSpeed: number;

    constructor(x: number, y: number, width: number, height: number, fallSpeed: number, jumpSpeed: number) {
        this.x = x;
        this.y = y;
        
        this.width = width;
        this.height = height;

        this.fallSpeed = fallSpeed;
        this.jumpSpeed = jumpSpeed;
    }

    public jump(){
        this.y -= this.jumpSpeed * 0.3;
    }

    public fall(){
        this.y += this.fallSpeed * 0.2;  
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public get birdJumpSpeed(): number {
        return this.jumpSpeed * 0.3;
    
    }

    public get birdY(): number {
        return this.y;
    }

    public get birdH(): number {
        return this.height;
    }
}