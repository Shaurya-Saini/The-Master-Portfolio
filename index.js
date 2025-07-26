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
    // console.log(i)
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

// Make entry arrays globally accessible for menu
window.enter01 = enter01;
window.enter02 = enter02;
window.enter03 = enter03;

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

// Check if returning from profile, projects, or contact page
const returnFromProfile = localStorage.getItem('returnFromProfile');
const returnFromProjects = localStorage.getItem('returnFromProjects');
const returnFromContact = localStorage.getItem('returnFromContact');

// Only offset for entry 1 (projects) and 3 (contact)
// if (returnFromProjects === 'true' || returnFromContact === 'true') {
//     // Get return position (default to 20 if not set)
//     const returnPosition = JSON.parse(localStorage.getItem('returnPosition') || '{"x": 0, "y": 20}');
//     moveables.forEach((moveable) => {
//         moveable.position.y -= returnPosition.y;
//     });
//     localStorage.removeItem('returnPosition');
// }

// Clear all flags
localStorage.removeItem('returnFromProfile');
localStorage.removeItem('returnFromProjects');
localStorage.removeItem('returnFromContact');

const lastEntry = localStorage.getItem('lastEntry');
const worldReturnOffset = JSON.parse(localStorage.getItem('worldReturnOffset') || 'null');

if (worldReturnOffset && lastEntry) {
    // Restore background and foreground positions
    background.position.x = worldReturnOffset.background.x;
    background.position.y = worldReturnOffset.background.y;
    foreground.position.x = worldReturnOffset.background.x;
    foreground.position.y = worldReturnOffset.background.y;

    // Also update all moveables (boundaries, entries)
    boundaries.forEach(b => {
        b.position.x += (background.position.x - offset.x);
        b.position.y += (background.position.y - offset.y);
    });
    enter01.forEach(b => {
        b.position.x += (background.position.x - offset.x);
        b.position.y += (background.position.y - offset.y);
    });
    enter02.forEach(b => {
        b.position.x += (background.position.x - offset.x);
        b.position.y += (background.position.y - offset.y);
    });
    enter03.forEach(b => {
        b.position.x += (background.position.x - offset.x);
        b.position.y += (background.position.y - offset.y);
    });

    // For entry 1 and 3, move world up (so player appears below entry)
    if (lastEntry === 'projects' || lastEntry === 'contact' || lastEntry === 'profile') {
        background.position.y -= 30;
        foreground.position.y -= 30;
        boundaries.forEach(b => b.position.y -= 30);
        enter01.forEach(b => b.position.y -= 30);
        enter02.forEach(b => b.position.y -= 30);
        enter03.forEach(b => b.position.y -= 30);
    }

    // Clean up
    localStorage.removeItem('lastEntry');
    localStorage.removeItem('worldReturnOffset');
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
    console.log(background.position.x, background.position.y)
    if (entryContent.initiated){
        return
    }
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i < enter01.length; i++){
            const e1 = enter01[i]
            const overlappingAre =( Math.min(player.position.x + player.width, e1.position.x + e1.width) - Math.max(player.position.x, e1.position.x)) * (Math.min(player.position.y+ player.height, e1.position.y + e1.height) - Math.max(player.position.y, e1.position.y))
            // For entry 1 (projects)
            if (rectangularCollision({ rectangle1: player, rectangle2: e1 }) && overlappingAre > (player.width * player.height) / 4) {
                localStorage.setItem('lastEntry', 'projects');
                localStorage.setItem('worldReturnOffset', JSON.stringify({
                    background: { x: background.position.x, y: background.position.y }
                }));
                console.log(player.position.x, player.position.y)
                window.location.href = 'projects.html';
                return;
            }
        }
    }

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i < enter02.length; i++){
            const e2 = enter02[i]
            const overlappingAre =( Math.min(player.position.x + player.width, e2.position.x + e2.width) - Math.max(player.position.x, e2.position.x)) * (Math.min(player.position.y+ player.height, e2.position.y + e2.height) - Math.max(player.position.y, e2.position.y))
            // For entry 2 (profile)
            if (rectangularCollision({ rectangle1: player, rectangle2: e2 }) && overlappingAre > (player.width * player.height) / 4) {
                localStorage.setItem('lastEntry', 'profile');
                localStorage.setItem('worldReturnOffset', JSON.stringify({
                    background: { x: background.position.x, y: background.position.y }
                }));
                window.location.href = 'profile.html';
                return;
            }
        }
    }

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i < enter03.length; i++){
            const e3 = enter03[i]
            const overlappingAre =( Math.min(player.position.x + player.width, e3.position.x + e3.width) - Math.max(player.position.x, e3.position.x)) * (Math.min(player.position.y+ player.height, e3.position.y + e3.height) - Math.max(player.position.y, e3.position.y))
            // For entry 3 (contact)
            if (rectangularCollision({ rectangle1: player, rectangle2: e3 }) && overlappingAre > (player.width * player.height) / 4) {
                localStorage.setItem('lastEntry', 'contact');
                localStorage.setItem('worldReturnOffset', JSON.stringify({
                    background: { x: background.position.x, y: background.position.y }
                }));
                window.location.href = 'contact.html';
                return;
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

window.moveWorldToEntry1 = function(callback) {
    if (window._worldMoving) return;
    window._worldMoving = true;

    const targetX = -295;
    const targetY = -876;
    const step = 3;

    // Helper to clear all key presses
    function clearKeys() {
        keys.w.pressed = false;
        keys.a.pressed = false;
        keys.s.pressed = false;
        keys.d.pressed = false;
    }

    // Helper to check if moving in a direction would cause collision
    function canMoveFromPos(pos, dir) {
        let dx = 0, dy = 0;
        if (dir === 'w') dy = step;
        if (dir === 's') dy = -step;
        if (dir === 'a') dx = step;
        if (dir === 'd') dx = -step;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            // Simulate boundary at new position
            if (rectangularCollision({
                rectangle1: {
                    position: {
                        x: player.position.x,
                        y: player.position.y
                    },
                    width: player.width,
                    height: player.height
                },
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + dx + (pos.x - background.position.x),
                        y: boundary.position.y + dy + (pos.y - background.position.y)
                    }
                }
            })) {
                return false;
            }
        }
        return true;
    }

    // BFS to find path
    function bfs(start, goal) {
        const queue = [];
        const visited = new Set();
        const parent = {};
        const dirs = ['w', 'a', 's', 'd'];
        queue.push(start);
        visited.add(`${start.x},${start.y}`);

        while (queue.length > 0) {
            const current = queue.shift();
            if (Math.abs(current.x - goal.x) <= step && Math.abs(current.y - goal.y) <= step) {
                // Reached goal
                const path = [];
                let node = `${current.x},${current.y}`;
                while (parent[node]) {
                    path.unshift(parent[node].dir);
                    node = parent[node].from;
                }
                return path;
            }
            for (let dir of dirs) {
                let dx = 0, dy = 0;
                if (dir === 'w') dy = step;
                if (dir === 's') dy = -step;
                if (dir === 'a') dx = step;
                if (dir === 'd') dx = -step;
                const next = { x: current.x + dx, y: current.y + dy };
                const key = `${next.x},${next.y}`;
                if (!visited.has(key) && canMoveFromPos(current, dir)) {
                    visited.add(key);
                    parent[key] = { from: `${current.x},${current.y}`, dir };
                    queue.push(next);
                }
            }
        }
        return null; // No path found
    }

    // Start BFS from current background position
    const start = { x: background.position.x, y: background.position.y };
    const goal = { x: targetX, y: targetY };
    const path = bfs(start, goal);

    if (!path || path.length === 0) {
        window._worldMoving = false;
        alert('No path found to entry!');
        return;
    }

    // Simulate movement along the path
    function moveAlongPath(index) {
        if (index >= path.length) {
            clearKeys();
            localStorage.setItem('lastEntry', 'projects');
            localStorage.setItem('worldReturnOffset', JSON.stringify({
                background: { x: background.position.x, y: background.position.y }
            }));
            window._worldMoving = false;
            window.location.href = 'projects.html';
            if (callback) callback(true);
            return;
        }
        clearKeys();
        const dir = path[index];
        keys[dir].pressed = true;
        lastKey = dir;

        let prevX = background.position.x;
        let prevY = background.position.y;

        function waitForStep() {
            let actuallyMoved = false;
            if (dir === 'w' && background.position.y > prevY) actuallyMoved = true;
            if (dir === 's' && background.position.y < prevY) actuallyMoved = true;
            if (dir === 'a' && background.position.x > prevX) actuallyMoved = true;
            if (dir === 'd' && background.position.x < prevX) actuallyMoved = true;

            if (!keys[dir].pressed) {
                moveAlongPath(index + 1);
                return;
            }
            if (actuallyMoved) {
                moveAlongPath(index + 1);
            } else {
                requestAnimationFrame(waitForStep);
            }
        }
        requestAnimationFrame(waitForStep);
    }

    moveAlongPath(0);
};

window.moveWorldToEntry2 = function(callback) {
    if (window._worldMoving) return;
    window._worldMoving = true;

    const targetX = -589;
    const targetY = -431;
    const step = 3;

    // Helper to clear all key presses
    function clearKeys() {
        keys.w.pressed = false;
        keys.a.pressed = false;
        keys.s.pressed = false;
        keys.d.pressed = false;
    }

    // Helper to check if moving in a direction would cause collision
    function canMoveFromPos(pos, dir) {
        let dx = 0, dy = 0;
        if (dir === 'w') dy = step;
        if (dir === 's') dy = -step;
        if (dir === 'a') dx = step;
        if (dir === 'd') dx = -step;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            // Simulate boundary at new position
            if (rectangularCollision({
                rectangle1: {
                    position: {
                        x: player.position.x,
                        y: player.position.y
                    },
                    width: player.width,
                    height: player.height
                },
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + dx + (pos.x - background.position.x),
                        y: boundary.position.y + dy + (pos.y - background.position.y)
                    }
                }
            })) {
                return false;
            }
        }
        return true;
    }

    // BFS to find path
    function bfs(start, goal) {
        const queue = [];
        const visited = new Set();
        const parent = {};
        const dirs = ['w', 'a', 's', 'd'];
        queue.push(start);
        visited.add(`${start.x},${start.y}`);

        while (queue.length > 0) {
            const current = queue.shift();
            if (Math.abs(current.x - goal.x) <= step && Math.abs(current.y - goal.y) <= step) {
                // Reached goal
                const path = [];
                let node = `${current.x},${current.y}`;
                while (parent[node]) {
                    path.unshift(parent[node].dir);
                    node = parent[node].from;
                }
                return path;
            }
            for (let dir of dirs) {
                let dx = 0, dy = 0;
                if (dir === 'w') dy = step;
                if (dir === 's') dy = -step;
                if (dir === 'a') dx = step;
                if (dir === 'd') dx = -step;
                const next = { x: current.x + dx, y: current.y + dy };
                const key = `${next.x},${next.y}`;
                if (!visited.has(key) && canMoveFromPos(current, dir)) {
                    visited.add(key);
                    parent[key] = { from: `${current.x},${current.y}`, dir };
                    queue.push(next);
                }
            }
        }
        return null; // No path found
    }

    // Start BFS from current background position
    const start = { x: background.position.x, y: background.position.y };
    const goal = { x: targetX, y: targetY };
    const path = bfs(start, goal);

    if (!path || path.length === 0) {
        window._worldMoving = false;
        alert('No path found to entry!');
        return;
    }

    // Simulate movement along the path
    function moveAlongPath(index) {
        if (index >= path.length) {
            clearKeys();
            localStorage.setItem('lastEntry', 'profile');
            localStorage.setItem('worldReturnOffset', JSON.stringify({
                background: { x: background.position.x, y: background.position.y }
            }));
            window._worldMoving = false;
            window.location.href = 'profile.html';
            if (callback) callback(true);
            return;
        }
        clearKeys();
        const dir = path[index];
        keys[dir].pressed = true;
        lastKey = dir;

        let prevX = background.position.x;
        let prevY = background.position.y;

        function waitForStep() {
            let actuallyMoved = false;
            if (dir === 'w' && background.position.y > prevY) actuallyMoved = true;
            if (dir === 's' && background.position.y < prevY) actuallyMoved = true;
            if (dir === 'a' && background.position.x > prevX) actuallyMoved = true;
            if (dir === 'd' && background.position.x < prevX) actuallyMoved = true;

            if (!keys[dir].pressed) {
                moveAlongPath(index + 1);
                return;
            }
            if (actuallyMoved) {
                moveAlongPath(index + 1);
            } else {
                requestAnimationFrame(waitForStep);
            }
        }
        requestAnimationFrame(waitForStep);
    }

    moveAlongPath(0);
};

window.moveWorldToEntry3 = function(callback) {
    if (window._worldMoving) return;
    window._worldMoving = true;

    const targetX = -1411;
    const targetY = -520;
    const step = 3;

    // Helper to clear all key presses
    function clearKeys() {
        keys.w.pressed = false;
        keys.a.pressed = false;
        keys.s.pressed = false;
        keys.d.pressed = false;
    }

    // Helper to check if moving in a direction would cause collision
    function canMoveFromPos(pos, dir) {
        let dx = 0, dy = 0;
        if (dir === 'w') dy = step;
        if (dir === 's') dy = -step;
        if (dir === 'a') dx = step;
        if (dir === 'd') dx = -step;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            // Simulate boundary at new position
            if (rectangularCollision({
                rectangle1: {
                    position: {
                        x: player.position.x,
                        y: player.position.y
                    },
                    width: player.width,
                    height: player.height
                },
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + dx + (pos.x - background.position.x),
                        y: boundary.position.y + dy + (pos.y - background.position.y)
                    }
                }
            })) {
                return false;
            }
        }
        return true;
    }

    // BFS to find path
    function bfs(start, goal) {
        const queue = [];
        const visited = new Set();
        const parent = {};
        const dirs = ['w', 'a', 's', 'd'];
        queue.push(start);
        visited.add(`${start.x},${start.y}`);

        while (queue.length > 0) {
            const current = queue.shift();
            if (Math.abs(current.x - goal.x) <= step && Math.abs(current.y - goal.y) <= step) {
                // Reached goal
                const path = [];
                let node = `${current.x},${current.y}`;
                while (parent[node]) {
                    path.unshift(parent[node].dir);
                    node = parent[node].from;
                }
                return path;
            }
            for (let dir of dirs) {
                let dx = 0, dy = 0;
                if (dir === 'w') dy = step;
                if (dir === 's') dy = -step;
                if (dir === 'a') dx = step;
                if (dir === 'd') dx = -step;
                const next = { x: current.x + dx, y: current.y + dy };
                const key = `${next.x},${next.y}`;
                if (!visited.has(key) && canMoveFromPos(current, dir)) {
                    visited.add(key);
                    parent[key] = { from: `${current.x},${current.y}`, dir };
                    queue.push(next);
                }
            }
        }
        return null; // No path found
    }

    // Start BFS from current background position
    const start = { x: background.position.x, y: background.position.y };
    const goal = { x: targetX, y: targetY };
    const path = bfs(start, goal);

    if (!path || path.length === 0) {
        window._worldMoving = false;
        alert('No path found to entry!');
        return;
    }

    // Simulate movement along the path
    function moveAlongPath(index) {
        if (index >= path.length) {
            clearKeys();
            localStorage.setItem('lastEntry', 'contact');
            localStorage.setItem('worldReturnOffset', JSON.stringify({
                background: { x: background.position.x, y: background.position.y }
            }));
            window._worldMoving = false;
            window.location.href = 'contact.html';
            if (callback) callback(true);
            return;
        }
        clearKeys();
        const dir = path[index];
        keys[dir].pressed = true;
        lastKey = dir;

        let prevX = background.position.x;
        let prevY = background.position.y;

        function waitForStep() {
            let actuallyMoved = false;
            if (dir === 'w' && background.position.y > prevY) actuallyMoved = true;
            if (dir === 's' && background.position.y < prevY) actuallyMoved = true;
            if (dir === 'a' && background.position.x > prevX) actuallyMoved = true;
            if (dir === 'd' && background.position.x < prevX) actuallyMoved = true;

            if (!keys[dir].pressed) {
                moveAlongPath(index + 1);
                return;
            }
            if (actuallyMoved) {
                moveAlongPath(index + 1);
            } else {
                requestAnimationFrame(waitForStep);
            }
        }
        requestAnimationFrame(waitForStep);
    }

    moveAlongPath(0);
};