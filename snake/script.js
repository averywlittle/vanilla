console.log('BEGIN')
let loopId = 'first'
let snek = null
const apple = '🍎'
let appleInPlay = false

function spawnSnek(len, row, col) {
    snek = new Snek(len, row, col, 'up')
    snek.spawn()
}

function gameOver() {
    snek = null
    stopGameLoop()
    console.log('GAME OVER')

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            makeBoardVisible({ row: i, col: j })
        }
    }
}

function makePieceVisible(location) {
    const tile = document.querySelector(`.row${location.row}col${location.col}`)
    tile.classList.replace('game-tile', 'game-piece')
}

function makeBoardVisible(location) {
    const tile = document.querySelector(`.row${location.row}col${location.col}`)
    tile.classList.replace('game-piece', 'game-tile')
}

function calcNewLocation(location, dir) {
    let row = location.row
    let col = location.col
    
    switch (dir) {
        case 'up':
            row--
            break
        case 'down':
            row++
            break
        case 'left':
            col--
            break
        case 'right':
            col++
            break
        default:
            console.log('hwat')
    }
    
    return {
        row: row,
        col: col
    }
}

class Snek {
    constructor(len, row, col, dir) {
        this.len = len
        this.dir = dir
        this.location = {
            row: row,
            col: col
        }
        this.headPiece = null
    }

    spawn() {
        this.headPiece = new SnekPiece(7, 7, null)
        const firstPiece = new SnekPiece(8, 7, this.headPiece)
        this.headPiece.next = firstPiece
        const secondPiece = new SnekPiece(9, 7, firstPiece)
        firstPiece.next = secondPiece
    }

    grow() {
        this.moveHead()
        this.len++
    }

    move() {
        this.moveHead()
        this.moveTail()
    }

    moveHead() {
        const insertPiece = new SnekPiece(this.headPiece.location.row, this.headPiece.location.col, this.headPiece)
        insertPiece.next = this.headPiece.next

        this.headPiece.next.prev = insertPiece
        this.headPiece.next = insertPiece
        
        const newLoc = calcNewLocation(this.headPiece.location, this.dir)
        this.headPiece.location = newLoc
        makePieceVisible(newLoc)

        console.log('HEAD', this.headPiece)
    }

    moveTail() {
        let tempPiece = this.headPiece

        while (tempPiece.next !== null) tempPiece = tempPiece.next

        makeBoardVisible(tempPiece.location)
        tempPiece = tempPiece.prev
        tempPiece.next = null

    }

    turn(newDir) {
        this.dir = newDir
    }
}

class SnekPiece {
    constructor(row, col, prev) {
        this.location = {
            row: row,
            col: col
        }
        this.prev = prev
        this.next = null

        makePieceVisible(this.location)
    }
}

function initGameLoop() {
    const intervalId = setInterval(
        () => {
            updateGame()
        },
        1000 //ms
    )
    return intervalId
}

function stopGameLoop(id) {
    clearInterval(id)
}

function startGame() {
    if (loopId === "first") {
        spawnSnek(3, 7, 7)
        loopId = initGameLoop()
    } else {
        loopId = initGameLoop()
    }
}

function pauseGame() {
    stopGameLoop(loopId)
}

function updateGame() {
    // spawn apple
    
    // turn snek

    // move snek
    snek.move()
}