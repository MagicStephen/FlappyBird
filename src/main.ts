import {Game} from "./game"; 

const canvas = document.getElementById("play-canvas") as HTMLCanvasElement;

new Game(canvas.getContext("2d")!);