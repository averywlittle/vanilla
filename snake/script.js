let loopId = 'first'
let snek = null
const apple = '🍎'
let appleInPlay = false
let appleLocation = null

function spawnSnek(len, row, col) {
    snek = new Snek(len, row, col, 'up')
    snek.spawn()
}

function gameOver() {
    snek = null
    stopGameLoop(loopId)
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

function isASnekPiece(location) {
    const tile = document.querySelector(`.row${location.row}col${location.col}`)
    if (tile.classList.contains('game-piece')) return true
    else return false
}

function insertApple(location) {
    const tile = document.querySelector(`.row${location.row}col${location.col}`)
    tile.innerHTML = apple
}

function deleteApple() {
    const tile = document.querySelector(`.row${appleLocation.row}col${appleLocation.col}`)
    tile.innerHTML = ''
    appleLocation = null
}

function calcNewLocation(location, dir) {
    let row = location.row
    let col = location.col
    
    if (row === 0 && dir === 'up') {
        gameOver()
    } else if (row === 14 && dir === 'down') {
        gameOver()
    } else if (col === 0 && dir === 'left') {
        gameOver()
    } else if (col === 14 && dir === 'right') {
        gameOver()
    }

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
        this.grow = false
        this.headPiece = null
    }

    spawn() {
        this.headPiece = new SnekPiece(7, 7, null)
        const firstPiece = new SnekPiece(8, 7, this.headPiece)
        this.headPiece.next = firstPiece
        const secondPiece = new SnekPiece(9, 7, firstPiece)
        firstPiece.next = secondPiece
    }

    move() {
        if (this.grow) {
            this.moveHead()
            this.grow = false
            appleInPlay = false
        } else {
            this.moveHead()
            this.moveTail()
        }
    }

    moveHead() {
        const insertPiece = new SnekPiece(this.headPiece.location.row, this.headPiece.location.col, this.headPiece)
        insertPiece.next = this.headPiece.next

        this.headPiece.next.prev = insertPiece
        this.headPiece.next = insertPiece
        
        const newLoc = calcNewLocation(this.headPiece.location, this.dir)

        if (isASnekPiece(newLoc)) {
            gameOver()
        }

        this.headPiece.location = newLoc
        makePieceVisible(newLoc)

        if (appleLocation !== null && newLoc.row === appleLocation.row && newLoc.col === appleLocation.col) {
            this.grow = true
            deleteApple()
        }

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
        console.log('currentDir', this.dir)
        console.log('newDir', newDir)
        if ((this.dir === 'down' || this.dir === 'up') && (newDir === 'left' || newDir === 'right')) {
            this.dir = newDir
        } else if ((this.dir === 'left' || this.dir === 'right') && (newDir === 'up' || newDir === 'down')) {
            this.dir = newDir
        }
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
        100 //ms
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

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// TODO [ ] get all non snek pieces in a collection then choose randomly from the collection
function spawnApple() {
    let row = getRandomInt(0, 14)
    let col = getRandomInt(0, 14)

    // keep calculating a random position until an unoccupied tile is found
    while(isASnekPiece({ row, col })) {
        row = getRandomInt(0, 14)
        col = getRandomInt(0, 14)
    }

    console.log(`Apple added to row: ${row}, col: ${col}`)

    // add apple to location
    insertApple({ row, col })
    appleLocation = { row, col }
    appleInPlay = true
}

function updateGame() {
    // spawn apple
    if (!appleInPlay) {
        const num = getRandomInt(0, 10)
        if (num > 4) {
            spawnApple()
        }
    }

    // move snek
    snek.move()
}

document.addEventListener("keydown", event => {

    if (event.code === 'ArrowLeft') {
        // left
        snek.turn('left')
    } else if (event.code === 'ArrowUp') {
        // up
        snek.turn('up')
    } else if (event.code === 'ArrowRight') {
        // right
        snek.turn('right')
    } else if (event.code === 'ArrowDown') {
        // down
        snek.turn('down')
    }
})