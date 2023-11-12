document.addEventListener("DOMContentLoaded",function(){
    const canvas = document.querySelector("#snake_game");
    const canvasContext = canvas.getContext("2d");
    //make object with 2d graphic
    const btn = document.querySelector('.reset');

    const background = new Image();
          background.src = "./groundgrass.png";

    const orange = new Image();
          orange.src = "./Orange.png";

    const snakeHeadRight = new Image();
          snakeHeadRight.src = "./snake_head.png";
    const snakeHeadUp = new Image();
          snakeHeadUp.src = "./snake_head_up.png";
    const snakeHeadDown = new Image();
          snakeHeadDown.src = "./snake_head_down.png";
    const snakeHeadLeft = new Image();
          snakeHeadLeft.src = "./snake_head_left.png";

    const snakeBody = new Image();
          snakeBody.src = "./snake_body.png";
    
    let size = 32;
    let score = 0;
    let food = {
        x: Math.floor((Math.random() * 23 + 1)) * size,
        y: Math.floor((Math.random() * 19 + 3)) * size,
    };
    let snake = [];
    snake[0] = {
        x: 9 * size,
        y: 10 * size
    };
    //snake items coordinates

    let route;

    const snakeControl = (event) => {
        switch (event.keyCode) {
            case 65  :
                if(route!=="right") route = "left";
                break;
            case 87  :
                if(route!=="down") route = "up";
                break;
            case 68  :
                if(route!=="left") route = "right";
                break;
            case 83  :
                if(route!=="up") route = "down";
                break;
            default:
            break;
        }
    }

    document.addEventListener("keydown", snakeControl);
    //listener for pressed buttons

    function eatTail(head, arr) {
        for(let i = 0; i < arr.length; i++) {
            if(head.x == arr[i].x && head.y == arr[i].y) {
                clearInterval(startGame);
                btn.classList.add('active')
            }    
        }
    }
    //end game 

    const  drawGame = () => {
        canvasContext.drawImage(background, 0, 0);

        canvasContext.drawImage(orange, food.x, food.y,size,size);

        snake.forEach((item,index)=>{
  

          if (index  === 0 && route=== "right" || route === undefined) {
            canvasContext.drawImage( snakeHeadRight, snake[index].x, snake[index].y,size,size);
          } else if (index === 0 && route==="up") {
            canvasContext.drawImage( snakeHeadUp, snake[index].x, snake[index].y,size,size);
          } else if (index === 0 && route==="down") {
            canvasContext.drawImage( snakeHeadDown, snake[index].x, snake[index].y,size,size);
          }
          else if (index === 0 && route==="left") {
            canvasContext.drawImage( snakeHeadLeft, snake[index].x, snake[index].y,size,size);
          }
        
          else {
            canvasContext.drawImage( snakeBody, snake[index].x, snake[index].y,size,size);
          }
        })
        //draw snake function 

        canvasContext.fillStyle = "white";
        canvasContext.font = "35px Arial";
        canvasContext.fillText(score, size * 2.5, size * 1.5);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor((Math.random() * 23 + 1)) * size,
                y: Math.floor((Math.random() * 19 + 3)) * size,
            };
        } else
            snake.pop();

        if(snakeX < size || snakeX > size * 23 || snakeY < 3 * size || snakeY > size * 23 ) {
            clearInterval(startGame);
            btn.classList.add('active');
        }

        route === 'left' ? snakeX -= size: snakeX
        route === 'right' ? snakeX += size: snakeX
        route === 'up' ? snakeY -= size: snakeY
        route === 'down' ? snakeY += size: snakeY



        let newHead = {
            x: snakeX,
            y: snakeY
        };

        eatTail(newHead, snake);

        snake.unshift(newHead);
        //Додає нові координати голови на початок нашого масиву 
    }

    let startGame = setInterval(drawGame, 80);
    btn.addEventListener('click',function(e) {

        e.preventDefault();
        this.classList.remove('active');
        score = 0;
        food = {
            x: Math.floor((Math.random() * 23 + 1)) * size,
            y: Math.floor((Math.random() * 19 + 3)) * size,
        };
        snake = [];
        snake[0] = {
            x: 9 * size,
            y: 10 * size
        };
        route = undefined;
        startGame = setInterval(drawGame, 80);
    })
})