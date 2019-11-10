let canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight;
canvas.width = canvas.height;
let ctx = canvas.getContext('2d');

let background = new Image();
background.src = 'img/ground.png';
let foodImg = new Image();
foodImg.src = 'img/food.png';

let soundDead = new Audio();
soundDead.src = 'audio/dead.mp3';
let soundFoodEat = new Audio();
soundFoodEat.src = 'audio/eat.mp3';
let soundUp = new Audio();
soundUp.src = 'audio/up.mp3';
let soundDown = new Audio();
soundDown.src = 'audio/down.mp3';
let soundLeft = new Audio();
soundLeft.src = 'audio/left.mp3';
let soundRight = new Audio();
soundRight.src = 'audio/right.mp3';

let block = canvas.width/19;

let dir = 'stop';
let lastMovement = 0;

ctx.fillStyle = '#013220';

let snake = [
    {x: block * 9, y: block * 10}
];

document.addEventListener('keydown', function(e) {
    if(e.keyCode === 37)
        dir = 'left';
    if(e.keyCode === 38)
        dir = 'up';
    if(e.keyCode === 39)
        dir = 'right';
    if(e.keyCode === 40) 
        dir = 'down';
});

function update(animationTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = (Date.now() - (animationTime || Date.now())) / 1000;
    let lastAnimationTime = Date.now();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //pomjeranje svakih pola sekunde
    if(lastMovement < Date.now() - 300) {
        let newHead = {x: 0, y: 0};
        if(dir === 'up') {
            newHead.x = snake[0].x;
            newHead.y = snake[0].y - block;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
        if(dir === 'down') {
            newHead.x = snake[0].x;
            newHead.y = snake[0].y + block;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
        if(dir === 'left') {
            newHead.x = snake[0].x - block;
            newHead.y = snake[0].y;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
        if(dir === 'right') {
            newHead.x = snake[0].x + block;
            newHead.y = snake[0].y;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
    }

    for(let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, block, block);
    }

    window.requestAnimationFrame(() => update(lastAnimationTime));
}

update();