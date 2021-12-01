export default class LawDataGrilleMT {
    constructor (x, y, value) {
        
        this.listWorlds = [];

        this.workerCalcul = new Worker ("./assets/js/grilles/workers/WorkerLawDataGrilleMT.js");
        this.workerCalcul.onmessage = (ev) => {
            this.listWorlds.push (ev.data.grille);
        }
        this.listCells = {}
        this.initialListCells = {}

        this.play = true
        this.compteur = 0
    }
    set (x, y) { this.listCells[x + "," + y] = [1, 0]}
    updatedDataGrille (rules) {
        (this.listWorlds.length > 10) ? this.workerCalcul.postMessage ({message: "PAUSE"}) : 
                                        this.workerCalcul.postMessage ({message: "RESTART"})
        
    }
    drawAll (ctx, widthCell) {
        if (this.listWorlds.length > 0) {
            ctx.clearAll ()
            ctx.fillStyle = "ivory"
            Object.keys(this.listWorlds[0]).forEach ((key) => {
                let cell = key.split (",").map ((v) => parseInt (v))
                ctx.save ()
                ctx.translate (cell[0] * widthCell, cell[1] * widthCell)
                ctx.fillRect (0, 0, widthCell, widthCell)
                ctx.restore ()
            })

            if (this.play) {
                this.listWorlds.splice (0, 1);
                this.compteur++
            }
        }
    }
    start (time=1000) {
        this.initialListCells = Object.assign(this.listCells)
        this.workerCalcul.postMessage ({grille: this.listCells, message: "START", time: time * 0.5})
    }
    setPause () {
        this.play = false
    }
    setPlay () {
        this.play = true
    }
    restart (time=1000) {
        this.listCells = Object.assign(this.initialListCells)
        this.listWorlds.splice(0, this.listWorlds.length)
        this.compteur = 0
        this.workerCalcul.postMessage ({grille: this.listCells, message: "RESTART-ZERO", time: time * 0.5})
    }
    getCompteur () { return this.compteur }
    getCurrentMatrix () {
        let cellMin = {x: null, y: null}
        let cellMax = {x: null, y: null}
        Object.keys(this.listWorlds[0]).map(v => v.split(",").map (v => parseInt (v))).forEach ((cell) => {
            if (cellMin.x > cell[0]) cellMin.x = cell[0]
            if (cellMin.y > cell[1]) cellMin.y = cell[1]
            if (cellMax.x < cell[0]) cellMax.x = cell[0]
            if (cellMax.y < cell[1]) cellMax.y = cell[1]
            if (cellMin.x == null) cellMin.x = cell[0]
            if (cellMin.y == null) cellMin.y = cell[1]
            if (cellMax.x == null) cellMax.x = cell[0]
            if (cellMax.y == null) cellMax.y = cell[1]
        })

        let vecteur = {vx: -cellMin.x, vy: -cellMin.y}
        let x = Math.abs(cellMax.x - cellMin.x) + 1,
            y = Math.abs(cellMax.y - cellMin.y) + 1
        let matrix = new Array (y)
        for (let i=0; i<y; i++) {
            matrix[i] = new Array (x);
            for (let j=0; j<x; j++) {
                matrix[i][j] = 0
            }
        }
        Object.keys(this.listWorlds[0]).map(v => v.split(",").map (v => parseInt (v))).forEach ((cell) => {
            matrix[cell[1] + vecteur.vy][cell[0] + vecteur.vx] = 1
        })

        return matrix
    }
}