export class Bird {

    private x: number = 0;
    private y: number = 0;

    private width: number;
    private height: number;

    private jumpSpeed: number;

    constructor(x: number, y: number, width: number, height: number, fallSpeed: number, jumpSpeed: number) {
        this.x = x;
        this.y = y;
        
        this.width = width;
        this.height = height;

        this.jumpSpeed = jumpSpeed;
    }

    public jump(){
        this.y -= this.jumpSpeed * 0.3;
    }

    public fall(velocity: number, deltaTime: number){
        this.y += velocity * deltaTime;  
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    get birdJumpSpeed(): number {
        return this.jumpSpeed * 0.3;
    
    }

    get birdY(): number {
        return this.y;
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
}