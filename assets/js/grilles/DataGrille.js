export default class DataGrille {
    constructor (x, y, value) {
        this.x = x
        this.y = y
        this.lightMatrix = new Array (x * y).fill (value)
        this.starting = false;
    }
    inMatrix (x, y) {
        if (x < 0 || x >= this.x) return false
        if (y < 0 || y >= this.y) return false
        return true;
    }
    get (x, y) { return (this.inMatrix (x, y)) ? this.lightMatrix[y*this.x + x] : null}
    set (x, y, value) { if (this.inMatrix (x, y)) this.lightMatrix[y*this.x + x] = value }
    convertIndexToCoords (index) {
        return [index % this.x, (index / this.x) | 0]
    }
    getNbVoisins (index) {
        let count = 0;
        for (let i=-1; i<2; i++) {
            for (let j=-1; j<2; j++) {
                if (!(i == 0 && j == 0)) {
                    let coords = this.convertIndexToCoords (index)
                    if (this.get (coords[0] + i, coords[1] + j) == 1) count++
                }
            }
        }
        return count;
    }
    generateMatrix () {
        let mat = new Array (this.y)
        for (let Y=0; Y<this.y; Y++) {
            mat[Y] = new Array (this.x)
            for (let X=0; X<this.x; X++) {
                mat[Y][X] = this.get (X, Y)
            }
        }
        return mat;
    }
    updatedDataGrille (rules) {
        if (this.starting) {
            let dt = new DataGrille (this.x, this.y, 0)
            this.lightMatrix.forEach ((v, i) => {
                dt.lightMatrix[i] = rules(v, this.getNbVoisins (i)) ? 1:0
            })
            this.lightMatrix = dt.lightMatrix;
        }
    }
    drawAll (ctx, widthCell) {
        ctx.clearAll ()
        ctx.fillStyle = "ivory"
        this.lightMatrix.forEach ((value, index) => {
            if (value == 1) {
                ctx.save ()
                let c = this.convertIndexToCoords (index);
                ctx.translate (c[0] * widthCell, c[1] * widthCell)
                ctx.fillRect (0, 0, widthCell, widthCell)
                ctx.restore ()
            }
        })
    }
    start () {
        this.starting = true;
    }
}