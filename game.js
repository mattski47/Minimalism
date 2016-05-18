var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400);
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//create text for displaying score/end message
var score = 0;
var misses = 0;
var cont = true;
var currentScore = new PIXI.Text("Coins Caught: " + score);
var currentMisses = new PIXI.Text("Misses: " + misses);
var gameOver = new PIXI.Text("Game Over.");

//get textures
var backgroundTexture = PIXI.Texture.fromImage("cavebackground.png");
var playerTexture = PIXI.Texture.fromImage("person1.png");
var coinTexture = PIXI.Texture.fromImage("coin.png");

//create sprites
var backgroundSprite = new PIXI.Sprite(backgroundTexture);
var playerSprite = new PIXI.Sprite(playerTexture);
var coin1 = new PIXI.Sprite(coinTexture);
var coin2 = new PIXI.Sprite(coinTexture);
var coin3 = new PIXI.Sprite(coinTexture);
var coin4 = new PIXI.Sprite(coinTexture);
var coin5 = new PIXI.Sprite(coinTexture);

//place background
backgroundSprite.anchor.x = 0.5;
backgroundSprite.anchor.y = 0.5;
backgroundSprite.position.x = 200;
backgroundSprite.position.y = 200;

//place character
playerSprite.anchor.x = 0.5;
playerSprite.anchor.y = 0.5;
playerSprite.position.x = 200;
playerSprite.position.y = renderer.height-15;

//place score
currentScore.position.x = 0;
currentScore.position.y = 0;

//place miss count
currentMisses.position.x = 0;
currentMisses.position.y = 25;

//add sprites to stage
stage.addChild(backgroundSprite);
stage.addChild(playerSprite);
stage.addChild(currentScore);
stage.addChild(currentMisses);

//create coin container
var coins = new PIXI.Container();
stage.addChild(coins);

//set interval for when each coin drops
function initialDrop() {
	setTimeout(dropCoin, 0, coin1);
	setTimeout(dropCoin, 5000, coin2);
	setTimeout(dropCoin, 10000, coin3);
	setTimeout(dropCoin, 15000, coin4);
	setTimeout(dropCoin, 20000, coin5);
}

//set starting position for coin before dropping
function dropCoin(coin) {
	var xPos = Math.floor(Math.random()*(renderer.width-20));
	coin.position.x = xPos;
	coin.position.y = 0;
	coins.addChild(coin);
}

//check coin's state
function catchCoin(coin) {
	//checks that the coin was added to container
	if (coin.parent) {
		//checks if coin is near player
		if (coin.position.x >= playerSprite.position.x-30 && coin.position.x <= playerSprite.position.x+30 && coin.position.y >= playerSprite.position.y-15 && coin.position.y <= playerSprite.position.y+30) {
			score++;
			currentScore.setText("Coins Caught: " + score);
			coins.removeChild(coin);
			dropCoin(coin);
		} else {
			//checks if coin hit the ground
			if (coin.position.y != renderer.height) {
				coin.position.y += 1;
			} else {
				misses++;
				currentMisses.setText("Misses: " + misses);
				coins.removeChild(coin);
				dropCoin(coin);
			}
		}
	}
}

//displays game over message and removes other objects
function endGame () {
	gameOver.position.x = renderer.width/2;
	gameOver.position.y = renderer.height/2 - 15;
	gameOver.anchor.x = 0.5;
	gameOver.anchor.y = 0.5;
	stage.addChild(gameOver);
	
	currentScore.position.x = renderer.width/2;
	currentScore.position.y = renderer.height/2 + 15;
	currentScore.anchor.x = 0.5;
	currentScore.anchor.y = 0.5;
	
	coins.removeChildren();
	stage.removeChild(currentMisses);
}

function animate() {
	requestAnimationFrame(animate);
	
	if (misses < 5) {
		catchCoin(coin1);
		catchCoin(coin2);
		catchCoin(coin3);
		catchCoin(coin4);
		catchCoin(coin5);
	} else {
		endGame();
	}
	
	renderer.render(stage);
}

//handle user input to move player
function keydownEventHandler(e) {
	if (e.keyCode == 37) { //move left
		if (playerSprite.position.x != 10) {
			playerSprite.position.x -= 10;
		}
	}

	if (e.keyCode == 39) { //move right
		if (playerSprite.position.x != renderer.width-10) {
			playerSprite.position.x += 10;
		}
	}
}

initialDrop();
animate();

document.addEventListener('keydown', keydownEventHandler);