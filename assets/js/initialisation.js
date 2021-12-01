import './templates/TemplateFullCanvas.js'
import './templates/TemplateMenu.js'
import WorldGameOfLife from './WorldGameOfLife.js'
import Structures from './Structures.js'

window.onload = () => {
    let can = document.querySelector ("#canvasGameOfLife"),
        menu = document.querySelector ("self-menu")

    let ctx = can.getContext ();

    let game = new WorldGameOfLife (ctx, 5, 200, 200);
    game.setContainerCompteur (menu)

    // game.setStructure (Structures.createCarrelageCube (30, 30, 7, 1, 15))
    // game.setStructure (Structures.createCarrelageCube (30, 30, 11, 0, 13))
    
    // ça génère une boucle sympa
    // game.setStructure (Structures.createCarrelageCube (30, 30, 13, 0, 13))

    // game.setStructure (Structures.createCarrelageCube (30, 30, 30, 0, 9))

    game.setStructure (Structures.createLine (0, 100, 500))

    // game.setStructure (Structures.createPentogramme (100, 100, 0))
    // game.setStructure (Structures.createLine (120, 80, 40, 1))

    // game.setStructure (Structures.createCarrelageCube (30, 30, 13, 0, 13))

    // game.setStructure (Structures.createLine (100, 100, 10, 1))
    // game.setStructure (Structures.createPentogramme (0, 0))

    // game.setStructure (Structures.createOieCanada (100, 100, 0))
    // game.setStructure (Structures.createVaisseauSpatial (10, 30, 0, 0))
    // game.setStructure (Structures.createVaisseauSpatial (10, 50, 1, 0))
    // game.setStructure (Structures.createVaisseauSpatial (10, 70, 2, 0))

    // game.setStructure (Structures.createCanonPlaneur2 (13, 101, 0))
    // game.setStructure (Structures.createCanonPlaneur (50, 100, 1, true))

    // game.setStructure (Structures.createQueen (100, 51));
    // game.setStructure (Structures.createQueen (115, 49));
    game.runWorld (50);

    menu.setPlayPause ((ev) => {
        game.playpause (menu.getButtonPlayPause ())
    })
    menu.setRestart ((ev) => {
        game.restart ()
    })

    window.addEventListener ("keyup", (ev) => {
        switch (ev.key.toUpperCase ()) {
            case "P" :
                return game.playpause (menu.getButtonPlayPause ())
            case "R" :
                return game.restart ()
            case "H" :
                return menu.hide ()
        }
    })
}


