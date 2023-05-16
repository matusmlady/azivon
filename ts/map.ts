import { Texture } from "./tileset.ts"

export interface ITile {}

export type TileIndex = Number

export class TexturedTile implements ITile {
    texture_id: Texture,
    connections: []TileIndex
}

export class MaybeTile implements ITile {
    tile?: TexturedTile
}

export type Layer<T implements ITile> = []T

export type TileMap<T implements ITile> = {
    rows: Number,
    cols: Number,
    layers: []Layer<T>
}
