// Get a random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Define enemy's position and speed
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    // Update the bug speed and check if the bug have hit the end of the canvas x axis, if so reset the bug to the start of x
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    // Check if the player collided with an enemy, if so reset the player position
    if (player.y + 130 >= this.y + 90 && player.x + 25 <= this.x + 70 && player.y + 70 <= this.y + 135 && player.x + 75 >= this.x + 10) {
        player.x = 200;
        player.y = 370;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define the player's position and speed
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the key presses
Player.prototype.handleInput = function(keyPress) {
    // Switch between key presses
    switch(keyPress) {
      case 'up':
        this.y -= player.speed + 33;
        break;
      case 'down':
        this.y += player.speed + 33;
        break;
      case 'left':
        this.x -= player.speed;
        break;
      case 'right':
        this.x += player.speed;
        break;
    }
    // Check if the player is in the boundaries of the canvas
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // Check if the player reach the top and if its true add a new enemy
    if (this.y + 50 <= 0) {
        this.x = 200;
        this.y = 370;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        var enemy = new Enemy(0, getRandomInt(40, 210), Math.random() * 256);
        allEnemies.push(enemy);
    }
};

Player.prototype.update = function() {
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(200, 370, 50);
var enemy = new Enemy(0, getRandomInt(40, 210), Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// .handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
