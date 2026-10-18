import { Pillar } from "./pillar";

export class PillarManager{

    private pillars: Pillar[];
    private nextIdx: number;
    
    constructor(){ 
        this.pillars = []
        this.nextIdx = 0;
    }

    update(dt: number, canvasWidth:number, canvasHeight:number){
        this.trySpawn(canvasWidth, canvasHeight);
        this.move(dt);
        this.cleanOffScreen(); 
    }

    checkCollidePillar(x: number, y: number, width: number, height: number): boolean {
        return this.pillars[this.nextIdx].collideWith(x, y, width, height)
    }

    checkPastPillar(x: number, width: number): boolean {

        if(x - width/2 > this.pillars[this.nextIdx].pillarX + this.pillars[this.nextIdx].pillarWidth/2){
            this.nextIdx++;
            return true; 
        }

        return false;
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
            this.pillars.push(new Pillar(canvasWidth, 50, canvasHeight, 100, Math.random() * (canvasHeight - 200) + 100));
        }
    }

    private move(deltaTime: number): void {
        this.pillars.forEach((pillar) => {pillar.move(-deltaTime * 100);})
    }

    private cleanOffScreen(): void {
        if(this.pillars[this.nextIdx].pillarX + this.pillars[this.nextIdx].pillarWidth < 0) {
            this.pillars.shift();
            this.nextIdx--;
        };
    }
}