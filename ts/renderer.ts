import { TileMap, MaybeTile } from "./map.ts"

export class Renderer {
    ctx: CanvasRenderingContext2D
    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!
    }
    render(map: TileMap<MaybeTile>) {
        /// Renders an entire map
    }
}
