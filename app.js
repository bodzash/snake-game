window.onload = function() {
    canvas = document.querySelector(".canvas")
    context = canvas.getContext("2d")
    document.addEventListener("keydown",keyPress)
    setInterval(game, 1000/15)
}

//score element
const score = document.querySelector(".score")

//colors
let c_player = "#b2d942"
let c_apple = "#c93038"

//game vars
canvas = document.querySelector(".canvas")
let tileCount = 20
let gridSize = canvas.width / tileCount

//player obj
let playerX = 10
let playerY = 10
let playerHS = 0
let playerVS = 0
let tail = 4
let trail = []
let point = 0

//apple obj
let appleX = Math.floor(Math.random()*tileCount)
let appleY = Math.floor(Math.random()*tileCount)

function game() {
    //movement
    playerX += playerHS
    playerY += playerVS

    //player out of bounds wrap
    if (playerX < 0) {
        playerX = tileCount -1
    }
    if (playerX > tileCount -1) {
        playerX = 0
    }
    if (playerY < 0) {
        playerY = tileCount -1
    }
    if (playerY > tileCount -1) {
        playerY = 0
    }

    //DRAW / RAJZ

    //cls clearscreen each tick
    context.clearRect(0, 0, canvas.width, canvas.height);

    //snake draw
    context.fillStyle = c_player
    for(let i = 0; i < trail.length; i++ ){
        context.fillRect(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2)
        if (trail[i].x == playerX && trail[i].y == playerY) {
            if (tail > 4) {
                point = 0
                score.innerText = "Score: 0";
                score.style.color = c_apple;
            }
            tail = 4
        }
    }

    // trail logic
    trail.push({x: playerX, y: playerY})
    while(trail.length > tail) {
        trail.shift()
        console.log(trail.length)
    }

    //if collision with apple
    if (appleX == playerX && appleY == playerY) {
        tail++
        point++
        score.innerText = "Score: " + point
        score.style.color = "#52c33f"
        appleX = Math.floor(Math.random()*tileCount)
        appleY = Math.floor(Math.random()*tileCount)
    }

    //apple draw
    context.fillStyle = c_apple
    context.fillRect(appleX*gridSize,appleY*gridSize,gridSize-2,gridSize-2)
}

function keyPress(evt) {
    switch(evt.keyCode) {
        //bal left
        case 37:
            playerHS = -1
            playerVS = 0
        break
        //fel up
        case 38:
            playerHS = 0
            playerVS = -1
        break
        //jobb right
        case 39:
            playerHS = 1
            playerVS = 0
        break
        //le down
        case 40:
            playerHS = 0
            playerVS = 1
        break
    }
}