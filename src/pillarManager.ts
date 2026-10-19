import { Pillar } from "./pillar";

export class PillarManager{

    private pillars: Pillar[] = [];
    private nextIdx: number = 0;
    
    constructor(){}

    update(dt: number, canvasWidth:number, canvasHeight:number){
        this.trySpawn(canvasWidth, canvasHeight);
        this.move(dt);
        this.cleanOffScreen(); 
    }

    checkCollide(x: number, y: number, width: number, height: number): boolean {
        const pillar = this.pillars[this.nextIdx];

        if (
            x + width >= pillar.x && y <= pillar.gapY - pillar.gap / 2 ||
            x + width >= pillar.x && y + height >= pillar.gapY + pillar.gap / 2
        ){
            return true;
        }
        
        return false;
    }

    checkPastPillar(x: number): boolean {
        const pillar = this.pillars[this.nextIdx];

        if (x > pillar.x + pillar.width) {
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
            this.pillars[this.pillars.length - 1].x + this.pillars[this.pillars.length - 1].width/2 + 150 < canvasWidth) 
        {
            this.pillars.push(new Pillar(canvasWidth, 50, canvasHeight, 100, Math.random() * (canvasHeight - 200) + 100));
        }
    }

    private move(deltaTime: number): void {
        this.pillars.forEach((pillar) => {pillar.move(-deltaTime * 100);})
    }

    private cleanOffScreen(): void {
        if(this.pillars[this.nextIdx].x + this.pillars[this.nextIdx].width < 0) {
            this.pillars.shift();
            this.nextIdx--;
        };
    }
}