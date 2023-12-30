const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height

const side = 60
const size = width / side
const pixels = []

const blocks = [
    { id: 0, name: 'Water', color: 'rgba(0, 128, 255, 1)' },
    { id: 1, name: 'Grass', color: 'rgba(34, 139, 34, 1)' },
]

// * PRIMEIRA GERAÇÃO RANDOMICA.
for (let i = 0; i < side * side; i++) {
    const random = Math.floor(Math.random() * blocks.length)
    pixels[i] = blocks[random]
}

for (let c = 0; c < 7; c++) {
    for (let i = 0; i < side * side; i++) {
        const neighbors = []

        const y = Math.floor(i / side)
        const start = y * side
        const x = i - start

        // ! GRUDADO NA ESQUERDA.
        if (x != 0) {
            neighbors.push(pixels[i - 1])
        }
        // ! GRUDADO NA DIREITA.
        if (x != side - 1) {
            neighbors.push(pixels[i + 1])
        }
        // ! GRUDADO NO TOPO.
        if (y != 0) {
            neighbors.push(pixels[i - side])
        }
        // ! GRUDADO NO FINAL.
        if (y != side - 1) {
            neighbors.push(pixels[i + side])
        }
        // ! GRUDADO NA BORDA ESQUERDA SUPERIOR.
        if (x != 0 && y != 0) {
            neighbors.push(pixels[i - side - 1])
        }
        // ! GRUDADO NA BORDA DIREITA SUPERIOR.
        if (x != side - 1 && y != 0) {
            neighbors.push(pixels[i - side + 1])
        }
        // ! GRUDADO NA BORDA ESQUERDA INFERIOR.
        if (x != 0 && y != side - 1) {
            neighbors.push(pixels[i + side - 1])
        }
        // ! GRUDADO NA BORDA DIREITA INFERIOR.
        if (x != side - 1 && y != side - 1) {
            neighbors.push(pixels[i + side + 1])
        }

        const grass = neighbors.filter(n => n.id == 1).length

        if (pixels[i].id == 1 && grass >= 4) continue
        if (pixels[i].id == 0 && grass >= 5) { pixels[i] = blocks[1] }
        else { pixels[i] = blocks[0] }
    }
}

for (let i = 0; i < side * side; i++) {
    const y = Math.floor(i / side)
    const start = y * side
    const x = i - start

    context.fillStyle = pixels[i].color
    context.fillRect(x * size, y * size, size, size)
}

/*

    ? Funções.

    * fillStyle
    * fillRect

    ? Blocos.

    * 0. Water
    * 1. Dirt
    * 2. Grass
    * 3. Sand
    * 4. Stone
    * 5. Dark Grass
    * 6. Deep Water

*/