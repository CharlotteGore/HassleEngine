export type AtlasTexture = {
    id: string,
    origin: {
        x: number,
        y: number,
        width: number,
        height: number,
    },
    gridSize: {
        rows: number,
        columns: number
    }
}

export type AtlasSource = {
    id: string,
    filePath: string,
    pixelWidth: number,
    pixelHeight: number,
    items: Array<AtlasTexture>
}

export type Atlas = {
    sources: Array<AtlasSource>
}