console.log('BEGIN')
let loopId = 'first'
let snek = null

function spawnSnek(len, location, dir) {

}

class Snek{
    constructor(len, location, dir) {
        this.len = len
        this.dir = dir
        this.length = len
        this.prev = null
        this.next = null
    }

    grow() {
        
    }

    move() {

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
        spawnSnek(3, 'row7col7', 'up')
        loopId = initGameLoop()
    } else {
        loopId = initGameLoop()
    }
}

function pauseGame() {
    stopGameLoop(loopId)
}

function updateGame() {
    console.log('MAGIC STUFF')
    // spawn apple
    
    // turn snek

    //move snek

    //
}