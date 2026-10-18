import { Pillar } from "./pillar";

export class PillarManager{

    private pillars: Pillar[];
    
    constructor(){ 
        this.pillars = []
    }

    update(dt: number, canvasWidth:number, canvasHeight:number){
        
        this.trySpawn(canvasWidth, canvasHeight);
        this.move(dt);
        this.cleanOffScreen();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.pillars.forEach((pillar) => {
            pillar.draw(ctx);
        });
    }

    private trySpawn(canvasWidth:number, canvasHeight:number): void {
        if (
            this.pillars.length === 0 || 
            this.pillars[this.pillars.length - 1].pillarX + this.pillars[this.pillars.length - 1].pillarWidth/2 + 150 < canvasWidth) 
        {
            this.pillars.push(new Pillar(canvasWidth, 50, canvasHeight, Math.random() * (canvasHeight - 200) + 100));
        }
    }

    private move(deltaTime: number): void {
        this.pillars.forEach((pillar) => {pillar.move(-deltaTime * 100);})
    }

    private cleanOffScreen(): void {
        if( this.pillars[0].pillarX + this.pillars[0].pillarWidth < 0) this.pillars.shift();
    }
}