var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 200);
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//create text for displaying score/end message
var score = 0;
var misses = 0;
var currentScore = new PIXI.Text("Coins Caught: " + score);
var currentMisses = new PIXI.Text("Misses: " + misses);
var gameOver = new PIXI.Text("Coins Caught: " + score);

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

function initialDrop() {
	setTimeout(dropCoin, 0, coin1);
	setTimeout(dropCoin, 5000, coin2);
	setTimeout(dropCoin, 9000, coin3);
	setTimeout(dropCoin, 15000, coin4);
	setTimeout(dropCoin, 23000, coin5);
}

function dropCoin(coin) {
	var xPos = Math.floor(Math.random()*(renderer.width-10)+10);
	coin.position.x = xPos;
	coin.position.y = 0;
	coins.addChild(coin);
}

function animate() {
	requestAnimationFrame(animate);
	
	if (coin1.position.y != renderer.height) {
		coin1.position.y += 1;
	} else {
		misses++;
		coins.removeChild(coin1);
		dropCoin(coin1);
	}
	
	if (coin2.parent) {
		if (coin2.position.y != renderer.height) {
			coin2.position.y += 1;
		} else {
			misses++;
			coins.removeChild(coin2);
			dropCoin(coin2);
		}
	}
	
	if (coin3.parent) {
		if (coin3.position.y != renderer.height) {
			coin3.position.y += 1;
		} else {
			misses++;
			coins.removeChild(coin3);
			dropCoin(coin3);
		}
	}
	
	if (coin4.parent) {
		if (coin4.position.y != renderer.height) {
			coin4.position.y += 1;
		} else {
			misses++;
			coins.removeChild(coin4);
			dropCoin(coin4);
		}
	}
	
	if (coin5.parent) {
		if (coin5.position.y != renderer.height) {
			coin5.position.y += 1;
		} else {
			misses++;
			coins.removeChild(coin5);
			dropCoin(coin5);
		}
	}
	
	renderer.render(stage);
}

function keydownEventHandler(e) {
	if (e.keyCode == 65) { //key a
		if (playerSprite.position.x != 10) {
			playerSprite.position.x -= 10;
		}
	}
	
	if (e.keyCode == 68) { //key d
		if (playerSprite.position.x != renderer.width-10) {
			playerSprite.position.x += 10;
		}
	}
}

initialDrop();
animate();

document.addEventListener('keydown', keydownEventHandler);