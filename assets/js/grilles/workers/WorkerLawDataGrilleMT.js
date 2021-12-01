var rules = (value, nbVoisins) => {
    if (value == 1) {
        if (nbVoisins == 2) return true;
    }
    if (nbVoisins == 3) return true;
    return false;
}

class Calcul {
    constructor (cellules) {
        this.listCells = cellules
        this.timer = 1000
        this.reinit = false
        this.intervalRunning = 0
    }
    set (x, y) { this.listCells[x + "," + y] = [1, 0]}
    setGrille (grille) { this.listCells = grille; }
    setTimer (time=1000) { this.timer = time }
    updatedDataGrille (rules) {
        this.listCells = this.getAvailableCells ()
        Object.keys(this.listCells).forEach ((key) => {
            let cell = key.split (",").map ((v) => parseInt (v));
            (!rules(this.listCells[cell][0], this.listCells[cell][1])) ? delete this.listCells[cell] : this.listCells[key][0] = 1
        })
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
    calcul () {
        this.intervalRunning = setInterval (() => {
            if (!this.reinit) {
                sendMessage ({grille: this.listCells})
                this.updatedDataGrille (rules)
            }
        }, this.timer)
    }
    setPause () {
        clearInterval (this.intervalRunning);
        this.intervalRunning = 0;
    }
    restart () {
        if (this.intervalRunning == 0) {
            this.calcul ()
        }
    }
}

async function sendMessage (message) {
    postMessage (message)
}


var calcul = new Calcul ({})
onmessage = (ev) => {
    if (ev.data.message == "INIT") {
        calcul.setGrille (ev.data.grille)
        sendMessage ({grille: this.listCells})
    }
    if (ev.data.message == "START") {
        calcul.setGrille (ev.data.grille)
        calcul.setTimer (ev.data.time)
        calcul.calcul ();
    }
    if (ev.data.message == "PAUSE") {
        calcul.setPause ();
    }
    if (ev.data.message == "RESTART") {
        calcul.restart ()
    }
    if (ev.data.message == "RESTART-ZERO") {
        calcul.reinit = true;
        calcul.setPause ()
        calcul.setGrille (ev.data.grille)
        calcul.setTimer (ev.data.time)
        calcul.calcul ()
        calcul.reinit = false
    }
}