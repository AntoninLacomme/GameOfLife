export default class LawDataGrille {
    constructor (x, y, value) {
        this.listCells = {};
        this.starting = false;
    }
    set (x, y) { this.listCells[x + "," + y] = [1, 0]}
    updatedDataGrille (rules) {
        if (this.starting) {
            this.listCells = this.getAvailableCells ()
            Object.keys(this.listCells).forEach ((key) => {
                let cell = key.split (",").map ((v) => parseInt (v));
                (!rules(this.listCells[cell][0], this.listCells[cell][1])) ? delete this.listCells[cell] : this.listCells[key][0] = 1
            })
        }
    }
    getAvailableCells () {
        var result = {}
        Object.keys (this.listCells).forEach ((KEY) => {
            let cell = KEY.split (",").map ((v) => parseInt (v));
            if (result[KEY] == undefined) result[KEY] = [1, 0]
            for (let i=-1; i<2; i++) {
                for (let j=-1; j<2; j++) {
                    if (!(i == 0 && j == 0)) {
                        let key = [cell[0] + i, cell[1] + j],
                            sKey = key[0] + ',' + key[1];
                        let value = (this.listCells[sKey] == undefined) ? 0 : this.listCells[key[0] + "," + key[1]][0];
                        (result[sKey] == undefined) ? result[sKey] = [value, 1] : result[sKey][1]++
                    }
                }
            }
        })
        return result
    }
    drawAll (ctx, widthCell) {
        ctx.clearAll ()
        ctx.fillStyle = "ivory"
        Object.keys(this.listCells).forEach ((key) => {
            let cell = key.split (",").map ((v) => parseInt (v))
            ctx.save ()
            ctx.translate (cell[0] * widthCell, cell[1] * widthCell)
            ctx.fillRect (0, 0, widthCell, widthCell)
            ctx.restore ()
        })
    }
    start () {
        this.starting = true;
    }
}