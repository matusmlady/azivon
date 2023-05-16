import { TileMap, MaybeTile } from "./map.ts"
import { generate } from "./generator.ts"
import { Input, UI } from "./ui.ts"

export class Editor implements UI {
    constructor(map: TileMap<MaybeTile>) {
        /// Initializes an editor on a partially filled map
    }

    handleInput(input: Input) {
        /// REVIEW: Quickly designed interface, subject to change
        /// Handles mouse input => brush, tile select...
    }
}
