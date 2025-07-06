const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 574

// c.fillStyle = 'black'
// c.fillRect(0, 0, canvas.width, canvas.height)

const collisionsMap= []
for (let i=0; i<collision.length; i+=70){
    collisionsMap.push(collision.slice(i,70+i))
    // console.log(i)
}

const enter1Map= []
for (let i=0; i<enter1.length; i+=70){
    enter1Map.push(enter1.slice(i,70+i))
    // console.log(i)
}

const enter2Map= []
for (let i=0; i<enter2.length; i+=70){
    enter2Map.push(enter2.slice(i,70+i))
    // console.log(i)
}

const enter3Map= []
for (let i=0; i<enter3.length; i+=70){
    enter3Map.push(enter3.slice(i,70+i))
    console.log(i)
}

const offset = {
    x: -595,
    y: -500
}

const boundaries = []
collisionsMap.forEach((row,i) =>{
    row.forEach((symbol,j )=> {
        if (symbol === 1025){
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

const enter01 = []
enter1Map.forEach((row,i) =>{
    row.forEach((symbol,j )=> {
        if (symbol === 1025){
            enter01.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

const enter02 = []
enter2Map.forEach((row,i) =>{
    row.forEach((symbol,j )=> {
        if (symbol === 1025){
            enter02.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

const enter03 = []
enter3Map.forEach((row,i) =>{
    row.forEach((symbol,j )=> {
        if (symbol === 1025){
            enter03.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})



const image = new Image()
image.src = 'assets/Game Map.png'
// c.drawImage(image,0,0)

const playerImage = new Image()
playerImage.src = 'assets/playerDown.png'

const playerImageU = new Image()
playerImageU.src = 'assets/playerUp.png'

const playerImageL = new Image()
playerImageL.src = 'assets/playerLeft.png'

const playerImageR = new Image()
playerImageR.src = 'assets/playerRight.png'

const foregroundImage = new Image()
foregroundImage.src = 'assets/foreground.png'

// let backgroundImageX = -595
// let playerImageX = -595



const player = new Sprite({
    position:{
        x:canvas.width/2 - 192/8,
        y:(canvas.height/2) - 68/2
    },
    image:playerImage,
    frames:{
        max:4
    },
    sprites:{
        up:playerImageU,
        down:playerImage,
        left:playerImageL,
        right:playerImageR
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image,

})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage,

})


const keys = {
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    },
}


const moveables = [background,...boundaries,foreground, ...enter01, ...enter02, ...enter03]

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}

const entryContent = {
    initiated: false,
}

// Check if returning from profile page
const returnFromProfile = localStorage.getItem('returnFromProfile');
if (returnFromProfile === 'true') {
    // Clear the flag
    localStorage.removeItem('returnFromProfile');
    
    // Get return position
    const returnPosition = JSON.parse(localStorage.getItem('returnPosition') || '{"x": 0, "y": 50}');
    localStorage.removeItem('returnPosition');
    
    // Reposition player slightly down to avoid re-triggering entry
    moveables.forEach((moveable) => {
        moveable.position.y -= returnPosition.y;
    });
    
    // Reset entry detection
    entryContent.initiated = false;
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw() 
    })
    enter01.forEach((boundary) => {
        boundary.draw() 
    })
    enter02.forEach((boundary) => {
        boundary.draw() 
    })
    enter03.forEach((boundary) => {
        boundary.draw() 
    })
    player.draw()
    foreground.draw()
    
    let moving = true
    player.moving = false
    if (entryContent.initiated){
        return
    }
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i < enter01.length; i++){
            const e1 = enter01[i]
            const overlappingAre =( Math.min(player.position.x + player.width, e1.position.x + e1.width) - Math.max(player.position.x, e1.position.x)) * (Math.min(player.position.y+ player.height, e1.position.y + e1.height) - Math.max(player.position.y, e1.position.y))
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: e1
            }) && overlappingAre>(player.width*player.height)/4
        ){
                console.log('entry1 detected')
                entryContent.initiated = true
                break
            }
        }
    }

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i < enter02.length; i++){
            const e2 = enter02[i]
            const overlappingAre =( Math.min(player.position.x + player.width, e2.position.x + e2.width) - Math.max(player.position.x, e2.position.x)) * (Math.min(player.position.y+ player.height, e2.position.y + e2.height) - Math.max(player.position.y, e2.position.y))
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: e2
            }) && overlappingAre>(player.width*player.height)/4
        ){
                console.log('entry2 detected - navigating to profile')
                // Navigate to profile page
                window.location.href = 'profile.html';
                return;
            }
        }
    }

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i < enter01.length; i++){
            const e3 = enter03[i]
            const overlappingAre =( Math.min(player.position.x + player.width, e3.position.x + e3.width) - Math.max(player.position.x, e3.position.x)) * (Math.min(player.position.y+ player.height, e3.position.y + e3.height) - Math.max(player.position.y, e3.position.y))
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: e3
            }) && overlappingAre>(player.width*player.height)/4
        ){
                console.log('entry3 detected')
                entryContent.initiated = true
                break
            }
        }
    }



    if (keys.w.pressed && lastKey === 'w'){
        player.moving = true
        player.image = player.sprites.up
        for (let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                }}
            })){
                // console.log('collision detected')
                moving = false
                break
            }
        }
        
        if (moving){
        moveables.forEach((moveable) => {
            moveable.position.y += 3
        })}

    }
    else if (keys.s.pressed && lastKey === 's'){
        player.moving = true
        player.image = player.sprites.down
        for (let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                }}
            })){
                console.log('collision detected')
                moving = false
                break
            }
        }
        if (moving){
        moveables.forEach((moveable) => {
            moveable.position.y -= 3
        })}
    }
    else if (keys.a.pressed && lastKey === 'a'){
        player.moving = true
        player.image = player.sprites.left
        for (let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x + 3,
                    y: boundary.position.y 
                }}
            })){
                console.log('collision detected')
                moving = false
                break
            }
        }
        if (moving){
        moveables.forEach((moveable) => {
                    moveable.position.x += 3
                })}
    }
    else if (keys.d.pressed && lastKey === 'd'){
        player.moving = true
        player.image = player.sprites.right
        for (let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x - 3,
                    y: boundary.position.y 
                }}
            })){
                console.log('collision detected')
                moving = false
                break
            }
        }
        if (moving){
        moveables.forEach((moveable) => {
            moveable.position.x -= 3
        })}
    }
}

animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break  
        case 's':
            keys.s.pressed = true  
            lastKey = 's' 
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break  
        case 's':
            keys.s.pressed =false 
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})