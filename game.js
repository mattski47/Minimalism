var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400);
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//get textures
var backgroundTexture = PIXI.Texture.fromImage("cavebackground.png");
var playerTexture = PIXI.Texture.fromImage("person1.png");

//create sprites
var backgroundSprite = new PIXI.Sprite(backgroundTexture);
var playerSprite = new PIXI.Sprite(playerTexture);

//place background
backgroundSprite.anchor.x = 0.5;
backgroundSprite.anchor.y = 0.5;
backgroundSprite.position.x = 200;
backgroundSprite.position.y = 200;

//place character
playerSprite.anchor.x = 0.5;
playerSprite.anchor.y = 0.5;
playerSprite.position.x = 200;
playerSprite.position.y = 200;

//add sprites to stage
stage.addChild(backgroundSprite);
stage.addChild(playerSprite);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}

function keydownEventHandler(e) {
	if (e.keyCode == 65) { //key a
		if (playerSprite.position.x != 8) {
			playerSprite.position.x -= 5;
		}
	}
	
	if (e.keyCode == 68) { //key d
		if (playerSprite.position.x != renderer.width-8) {
			playerSprite.position.x += 5;
		}
	}
	
	
}

animate();
document.addEventListener('keydown', keydownEventHandler);