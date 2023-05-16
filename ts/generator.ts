import { TileMap, MaybeTile, TexturedTile } from "./map.ts"
import { Texture } from "./tileset.ts"

class UncertainTile implements ITile {
    probabilities: Map<Texture, Number>        // {texture_id -> generation_chance}
    choose(): Number {
        /// picks a texture_id randomly, based on the probability distribution
    }
}

export function generate(distribution: TileMap<MaybeTile>): TileMap<TexturedTile> {
    /// determines all the tiles on a partially generated map
    /// => distributes probabilities and collapes them to a concrete value
}
