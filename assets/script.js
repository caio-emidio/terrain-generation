class drawToCanvas {
    constructor(canvasId, sideLength, pixels) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.side = sideLength;
        this.size = this.canvas.width / this.side;
        this.pixels = pixels
    }

    drawOnCanvas() {
        for (let i = 0; i < this.side * this.side; i++) {
            const row = Math.floor(i / this.side);
            const column = i % this.side;

            this.context.fillStyle = this.pixels[i].color;
            this.context.fillRect(row * this.size, column * this.size, this.size, this.size);

            this.context.strokeStyle = 'rgba(34, 34, 34, 0.1)';
            this.context.strokeRect(row * this.size, column * this.size, this.size, this.size);
        }
    }

}

class CellularAutomaton {
    constructor(canvasId, sideLength, blocks) {
        this.canvasId = canvasId;
        this.side = sideLength;
        this.pixels = [];
        this.blocks = blocks;
    }

    generateRandomPixels() {
        const randomIndexes = Array.from({ length: this.side * this.side }, () => Math.floor(Math.random() * this.blocks.length));
        this.pixels = randomIndexes.flatMap(index => this.blocks[index]);
    }
    applyAutomatonRules(iterations = 7) {
        for (let i = 0; i < iterations; i++) {
            this.applyAutomatonRule();
        }
    }

    applyAutomatonRule() {
        for (let j = 0; j < this.side * this.side; j++) {
            const neighbors = this.getNeighbors(j);
            const water = neighbors.filter(n => n.name === 'water').length;
            const grass = neighbors.filter(n => n.name === 'grass').length;
            const sand = neighbors.filter(n => n.name === 'sand').length;
            const total = neighbors.length;


            if (this.pixels[j].name === 'water') {
                if(grass / total >= 0.6) {
                    this.pixels[j] = this.blocks.find(b => b.name === 'grass');
                } else if(sand / total >= 0.9) {
                    this.pixels[j] = this.blocks.find(b => b.name === 'sand');
                }
            } 
            
            if (this.pixels[j].name === 'grass') {
                if(water / total >= 0.6) {
                    this.pixels[j] = this.blocks.find(b => b.name === 'water');
                } else if(sand / total >= 0.9) {
                    this.pixels[j] = this.blocks.find(b => b.name === 'sand');
                }
            }

            if (this.pixels[j].name === 'sand') {
                if(water / total >= 0.6) {
                    this.pixels[j] = this.blocks.find(b => b.name === 'water');
                } else if(grass / total >= 0.6) {
                    this.pixels[j] = this.blocks.find(b => b.name === 'grass');
                }
            }
        }
    }

    getNeighbors(index) {
        const neighbors = [];
        const row = Math.floor(index / this.side);
        const column = index % this.side;

        // get the neighbor from top
        if (row > 0) {
            const neighborIndex = (row - 1) * this.side + column;
            neighbors.push(this.pixels[neighborIndex]);
        }

        // get the neighbor from bottom
        if (row < this.side - 1) {
            const neighborIndex = (row + 1) * this.side + column;
            neighbors.push(this.pixels[neighborIndex]);
        }

        // get the neighbor from left
        if (column > 0) {
            const neighborIndex = row * this.side + column - 1;
            neighbors.push(this.pixels[neighborIndex]);
        }

        // get the neighbor from right
        if (column < this.side - 1) {
            const neighborIndex = row * this.side + column + 1;
            neighbors.push(this.pixels[neighborIndex]);
        }

        // get the neighbor from top left
        if (row > 0 && column > 0) {
            const neighborIndex = (row - 1) * this.side + column - 1;
            neighbors.push(this.pixels[neighborIndex]);
        }

        // get the neighbor from top right
        if (row > 0 && column < this.side - 1) {
            const neighborIndex = (row - 1) * this.side + column + 1;
            neighbors.push(this.pixels[neighborIndex]);
        }

        // get the neighbor from bottom left
        if (row < this.side - 1 && column > 0) {
            const neighborIndex = (row + 1) * this.side + column - 1;
            neighbors.push(this.pixels[neighborIndex]);
        }

        // get the neighbor from bottom right
        if (row < this.side - 1 && column < this.side - 1) {
            const neighborIndex = (row + 1) * this.side + column + 1;
            neighbors.push(this.pixels[neighborIndex]);
        }


        return neighbors;
    }

    drawOnCanvas() {
        const canvas = new drawToCanvas(this.canvasId, this.side, this.pixels);
        canvas.drawOnCanvas();
    }

    run() {
        this.generateRandomPixels();
        this.applyAutomatonRules();
        this.drawOnCanvas();
    }
}

const blocks = [
    { id: 0, color: '#4361ee', name: "water" },
    { id: 1, color: '#43aa8b', name: "grass" },
    { id: 2, color: '#f4a261', name: "sand" },
];

const automaton = new CellularAutomaton('canvas', 100, blocks);
automaton.run();
