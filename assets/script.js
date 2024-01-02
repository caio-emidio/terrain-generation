const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height

const side = 150
const size = width / side
const pixels = []

const blocks = [
    { id: 0, color: '#4361ee' }, // ? ÁGUA.
    { id: 1, color: '#43aa8b' }, // ? GRAMA.
]

// ? GERAÇÃO ALEATÓRIA.
for (let i = 0; i < side * side; i++) {
    const random = Math.floor(Math.random() * blocks.length)
    pixels[i] = blocks[random]
}

// ? ALGORITMO.
for (let i = 0; i < 7; i++) {
    for (let i = 0; i < side * side; i++) {
        const neighbors = []
        const row = Math.floor(i / side)
        const beginning = row * side
        const column = i - beginning

        // ? VIZINHOS.
        if (row != 0) neighbors.push(pixels[i - side]) // ? VIZINHO SUPERIOR.
        if (row != side - 1) neighbors.push(pixels[i + side]) // ? VIZINHO INFERIOR.
        if (column != 0) neighbors.push(pixels[i - 1]) // ? VIZINHO À ESQUERDA.
        if (column != side - 1) neighbors.push(pixels[i + 1]) // ? VIZINHO À DIREITA.
        if (column != 0 && row != 0) neighbors.push(pixels[i - side - 1]) // ? VIZINHO DIAGONAL SUPERIOR ESQUERDA.
        if (column != 0 && row != side - 1) neighbors.push(pixels[i + side - 1]) // ? VIZINHO DIAGONAL INFERIOR ESQUERDA.
        if (column != side - 1 && row != 0) neighbors.push(pixels[i - side + 1]) // ? VIZINHO DIAGONAL SUPERIOR DIREITA.
        if (column != side - 1 && row != side - 1) neighbors.push(pixels[i + side + 1]) // ? VIZINHO DIAGONAL INFERIOR DIREITA.

        // ? CONTAGEM DE VIZINHOS.
        const water = neighbors.filter(n => n.id === 0).length
        const grass = neighbors.filter(n => n.id === 1).length

        // ? REGRAS DE MUDANÇA DE ESTADO.
        if (pixels[i].id === 0 && grass >= 5) {
            pixels[i] = blocks[1]
        } else if (pixels[i].id === 1 && water >= 5) {
            pixels[i] = blocks[0]
        }
    }
}

// ? DESENHA NO CANVAS.
for (let i = 0; i < side * side; i++) {
    const row = Math.floor(i / side)
    const beginning = row * side
    const column = i - beginning

    // ? PREENCHE O RETÂNGULO.
    context.fillStyle = pixels[i].color
    context.fillRect(row * size, column * size, size, size)

    // ? BORDA DO RETÂNGULO.
    context.strokeStyle = 'rgba(34, 34, 34, 0.1)'
    context.strokeRect(row * size, column * size, size, size)
}