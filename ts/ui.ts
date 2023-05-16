export type Input = {
    /// Relative [0;1) x-mouse coordinate
    mouse_x: Number,
    /// Relative [0;1) y-mouse coordinate
    mouse_y: Number,
    /// Tile coordinate [0; MAP_SIZE.x)
    tile_x: Number,
    /// Tile coordinate [0; MAP_SIZE.y)
    tile_y: Number,
}

export interface UI {
    /// REVIEW: Quickly designed interface, subject to change
    handleInput(input: Input)
}
