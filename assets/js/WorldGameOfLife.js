import DataGrille from "./grilles/DataGrille.js"
import LawDataGrille from "./grilles/LawDataGrille.js"
import LawDataGrilleMT from "./grilles/LawDataGrilleMT.js"

export default class WorldGameOfLife {

    constructor (ctx, width, X=null, Y=null) {
        let x = (X == null) ? (ctx.WIDTH / width) | 0 : X,
            y = (Y == null) ? (ctx.HEIGHT / width) | 0 : Y
        this.width = width;
            
        this.dataGrille = new LawDataGrilleMT (x, y, 0)
        this.ctx = ctx

        this.selfTime = 1000
        this.play = false
        this.container = null;
    }

    setContainerCompteur (container) {
        this.container = container
    }

    playpause (button) {
        if (this.play) {
            this.dataGrille.setPlay ()
            button.buttonPlay ()
        } else {
            this.dataGrille.setPause ()
            button.buttonPause ()
            console.log (JSON.stringify(this.dataGrille.getCurrentMatrix (), 2, 0))
        }
        this.play = !this.play
    }

    restart () {
        this.dataGrille.restart (this.selfTime)
    }

    setStructure (listPoints) {
        listPoints.forEach ((point) => {
            this.dataGrille.set (point[0], point[1], 1)
        })
    }

    runWorld (time = 1000) {
        this.selfTime = time
        this.dataGrille.start (this.selfTime);
        this.running = this.internalRunWorld (this.selfTime)
    }

    internalRunWorld (time) {
        return setInterval (() => {
            this.updateWorld ()
            this.drawWorld ()
        }, time)
    }

    updateWorld () {
        this.dataGrille.updatedDataGrille (
            (value, nbVoisins) => {
                if (value == 1) {
                    if (nbVoisins == 2) return true;
                }
                if (nbVoisins == 3) return true;
                return false;
            }
        );
        this.container.getCompteur ().innerHTML = this.dataGrille.getCompteur ()
        this.container.setInfoTransition ("<span>" + this.ctx.translationX + "</span>;<span>" 
                                                   + this.ctx.translationY + "</span>")
        this.container.setInfoZoom ("<span>" + this.ctx.currentZoom + "</span>")
    }

    drawWorld () {
        this.dataGrille.drawAll (this.ctx, this.width)
    }
}


