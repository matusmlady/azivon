import { TileMap, TexturedTile } from "./map.ts"
import { Input, UI } from "./ui.ts"

export class Game implements UI {
    constructor(map: TileMap<TexturedTile>) {
        /// Initializes a game of Azivon on a specified generated map
    }

    handleInput(input: Input) {
        /// REVIEW: Quickly designed interface, subject to change
        /// Handles the user's turn
    }
}
