
export default class Structures {
    static setStructurePoints (points, vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, reMatrix (points))}
    static createLine (vx, vy, nb, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createLine (nb)) }
    static createPentogramme (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createPentogramme ()) }
    static createBalise (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createBalise ()) }
    static createCrapeau (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createCrapeau ()) }
    static createCarrelageCube (vx, vy, blocLength, space, repetition, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createCarrelageCube (blocLength, space, repetition)) }
    static createBloc (vx, vy, n, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createBloc (n)) }
    static createPlaneur (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createPlaneur ()) }
    static createAccordeon (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createAccordeon ()) }
    static createOieCanada (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createOieCanada ()) }
    static createVaisseauSpatial (vx, vy, type, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createVaisseauSpatial (type)) }
    static createCanonPlaneur (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createCanonPlaneur ()) }
    static createAllerRetour (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createAllerRetour ()) }
    static createQueen (vx, vy, nbTurns = 0, reverse = false) 
        { return createStructure (vx, vy, nbTurns, reverse, InternalStructures.createQueen ()) }

    static createCanonPlaneur2 (vx, vy, nbTurns = 0, reverse = false)
        { return Structures.setStructurePoints ([[11,0],[12,0],[10,1],[11,1],[12,1],[16,1],[17,1],[19,1],[7,2],[9,2],[10,2],[16,2],[20,2],[23,2],[0,3],[1,3],[7,3],[10,3],[15,3],[20,3],[23,3],[24,3],[0,4],[1,4],[7,4],[9,4],[10,4],[15,4],[16,4],[17,4],[18,4],[24,4],[25,4],[10,5],[11,5],[12,5],[16,5],[24,5],[25,5],[26,5],[34,5],[35,5],[11,6],[12,6],[24,6],[25,6],[34,6],[35,6],[23,7],[24,7],[23,8]],
            vx, vy, nbTurns, reverse)}
}

class InternalStructures {
    static createLine (nb) { return emptyMatrix (nb, 1, 1) }

    static createBalise () { return Structures.createCarrelageCube (vx, vy, 2, 2) }

    static createCrapeau () {
        let struct = emptyMatrix (4, 2)
        for (let i=0; i<3; i++) {
            struct[0][i] = 1
            struct[1][i + 1] = 1
        }
        return struct
    }
    
    static createPentogramme () {
        let struct = emptyMatrix (3, 3)
        struct[0][0] = 1
        struct[0][1] = 1
        struct[1][1] = 1
        struct[2][1] = 1
        struct[1][2] = 1
        return struct
    }

    static createBloc (n) { return emptyMatrix (n, n, 1) }

    // blocLength -> taille du bloc
    // space -> espace entre les blocs
    // repetition -> répétitions
    static createCarrelageCube (blocLength, space, repetition) {
        let matrix = emptyMatrix (blocLength * repetition + space * repetition, blocLength * repetition + space * repetition)
        
        for (let i=0; i<repetition; i++) {
            for (let j=0; j<repetition; j++) {
                if (i % 2 == j % 2) {
                    matrix = concatMatrix (matrix, InternalStructures.createBloc (blocLength), i * blocLength + i * space, j * blocLength + j * space)
                }
            }
        }
        return matrix
    }

    static createPlaneur () {
        let struct = emptyMatrix (3, 3)
        struct[1][0] = 1
        struct[0][1] = 1
        struct[0][2] = 1
        struct[2][2] = 1
        struct[1][2] = 1
        return struct
    }

    static createAccordeon () {
        let struct = emptyMatrix (10, 10)
        for (let i=2; i<4; i++) {
            struct[i][0] = 1
            struct[0][i] = 1
            struct[9-i][9] = 1
            struct[9][9-i] = 1
            struct[i+2][i+2] = 1
        }
        for (let j=3; j<7; j++) {
            struct[j+1][j-1] = 1
            struct[j-1][j+1] = 1
        }
        return struct
    }

    static createOieCanada () {
        let struct = emptyMatrix (12, 13)
        // le bec
        struct[0][10] = 1
        struct[1][10] = 1
        struct[1][11] = 1
        struct[2][11] = 1
        struct[2][9] = 1

        // aile gauche
        struct[2][0] = 1
        struct[2][1] = 1
        struct[3][1] = 1
        for (let i=0; i<3; i++) {
            struct[3+i][3] = 1
            struct[3+i][4] = 1
        }

        // aile droite
        struct[8][8] = 1
        struct[9][8] = 1
        struct[9][9] = 1
        struct[10][9] = 1
        struct[10][7] = 1
        struct[11][10] = 1
        struct[12][9] = 1
        struct[12][8] = 1

        // queue
        struct[8][1] = 1
        struct[7][2] = 1
        struct[8][3] = 1
        struct[8][4] = 1
        struct[7][4] = 1
        struct[10][2] = 1
        struct[10][3] = 1
        struct[10][4] = 1

        // corps
        struct[7][5] = 1
        struct[7][6] = 1
        struct[8][6] = 1
        struct[6][6] = 1
        struct[6][7] = 1
        struct[7][7] = 1

        struct[4][7] = 1
        struct[5][7] = 1
        struct[5][8] = 1
        struct[4][8] = 1
        return struct
    }

    static createVaisseauSpatial (type) {
        let struct;
        switch (type) {
            case 0:
                struct = emptyMatrix (5, 4)
                for (let i=0; i<3; i++) {
                    struct[0][i+1] = 1
                    struct[i][4] = 1
                }
                struct[1][0] = 1
                struct[3][0] = 1
                struct[3][3] = 1
                return struct
            case 1:
                struct = emptyMatrix (6, 5)
                for (let i=0; i<5; i++) {
                    struct[0][i+1] = 1
                }
                struct[1][0] = 1
                struct[3][0] = 1
                struct[4][2] = 1
                struct[3][4] = 1
                struct[2][5] = 1
                struct[1][5] = 1
                return struct
            case 2:
                struct = emptyMatrix (7, 5)
                for (let i=0; i<6; i++) {
                    struct[0][i+1] = 1
                }
                struct[1][0] = 1
                struct[3][0] = 1
                struct[4][2] = 1
                struct[4][3] = 1
                struct[3][5] = 1
                struct[2][6] = 1
                struct[1][6] = 1
                return struct
        }
        return emptyMatrix (0, 0)
    }

    static createCanonPlaneur () {
        function partie1 () {
            let struct = emptyMatrix (8, 7)
            struct[1][1] = 1
            struct[0][2] = 1
            struct[0][3] = 1
            struct[2][0] = 1
            struct[3][0] = 1
            struct[4][0] = 1
            struct[5][1] = 1
            struct[6][2] = 1
            struct[6][3] = 1

            struct[3][4] = 1
            struct[1][5] = 1
            struct[5][5] = 1
            struct[2][6] = 1
            struct[3][6] = 1
            struct[4][6] = 1
            struct[3][7] = 1
            return struct
        }
        function partie2 () {
            let struct = emptyMatrix (5, 7)
            concatMatrix (struct, InternalStructures.createBloc (2), 0, 2)
            struct[4][0] = 1
            struct[4][1] = 1
            struct[5][2] = 1
            struct[1][2] = 1
            struct[1][4] = 1
            struct[0][4] = 1
            struct[6][4] = 1
            struct[5][4] = 1
            return struct
        }
        let struct = emptyMatrix (38, 10)
        concatMatrix (struct, InternalStructures.createBloc (2), 0, 3)
        concatMatrix (struct, InternalStructures.createBloc (2), 34, 5)
        concatMatrix (struct, partie1 (), 10, 0)
        concatMatrix (struct, partie2 (), 20, 2)
        return struct
    }

    static createAllerRetour () {
        let struct = emptyMatrix (22, 7)
        concatMatrix (struct, InternalStructures.createBloc (2), 0, 3)
        concatMatrix (struct, InternalStructures.createBloc (2), 20, 2)
        concatMatrix (struct, InternalStructures.queen (), 6, 0)
        return struct
    }

    static createQueen () {
        let struct = emptyMatrix (8, 7)
        struct[2][0] = 1
        struct[2][1] = 1
        struct[3][0] = 1
        struct[3][1] = 1
        struct[4][0] = 1
        struct[4][1] = 1

        struct[5][2] = 1
        struct[1][2] = 1

        struct[5][4] = 1
        struct[6][4] = 1
        struct[1][4] = 1
        struct[0][4] = 1
        return struct
    }
}

let createStructure = (vx, vy, nbTurns, reverse, matrix) => {
    if (reverse) {
        matrix = reverseHorizontal (matrix)
    }
    for (let i=0; i<nbTurns % 4; i++) {
        matrix = turnRight (matrix)
    }
    let struct = getFilled (matrix)
    translate (struct, vx, vy)
    return struct
},
emptyMatrix = (x, y, value=0) => {
    let matrix = new Array (y)
    for (let i=0; i<y; i++) {
        matrix[i] = new Array (x);
        for (let j=0; j<x; j++) {
            matrix[i][j] = value
        }
    }
    return matrix;
},
concatMatrix = (m1, m2, x, y) => {
    for (let i=0; i<m2.length; i++) {
        for (let j=0; j<m2[0].length; j++) {
            if (m2[i][j] != 0) {
                m1[i + y][j + x] = m2[i][j]
            }
        }
    }
    return m1
},
translate = (struct, vx, vy) => {
    struct.map (v => {v[0] += vx, v[1] += vy})
},
getFilled = (struct) => {
    let res = []
    for (let Y=0; Y<struct.length; Y++) {
        for (let X=0; X<struct[Y].length; X++) {
            if (struct[Y][X] == 1) {
                res.push ([X, Y])
            }
        }
    }
    return res
},
reMatrix = (points) => {
    let minX = 0,
        minY = 0
    points.forEach ((point) => {
        if (point[0] > minX) minX = point[0]
        if (point[1] > minY) minY = point[1]
    })
    let matrix = emptyMatrix (minX+1, minY+1)
    points.forEach ((point) => {console.log(point, matrix); matrix[point[1]][point[0]] = 1} )
    return matrix
},
turnRight = (struct) => {
    let m = struct.length;
    let n = struct[0].length;

    let newStruc = new Array (n)
    for (let i=0; i<n; i++) {
        newStruc[i] = new Array (m)
        for (let j=0; j<m; j++) {
            newStruc[i][j] = struct[(m-1)-j][i]
        }
    }
    return newStruc;
},
reverseHorizontal = (struct) => {
    if (struct.length == 0) { return struct }
    let m = struct[0].length,
        n = struct.length;
    let newStruc = new Array (n)
    for (let i=0; i<n; i++) {
        newStruc[i] = new Array (m)
        for (let j=0; j<m; j++) {
            newStruc[i][j] = struct[i][(m-1) - j]
        }
    }
    return newStruc;
}
