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
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    checkCollision(this);
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
    switch(keyPress) {
      case 'up':
        player.y -= player.speed + 33;
        break
      case 'down':
        player.y += player.speed + 33;
        break
      case 'left':
        player.x -= player.speed;
        break
      case 'right':
        player.x += player.speed;
        break
    }
};

Player.prototype.update = function() {
}

var checkCollision = function(enemyUnit) {
    // Check if the player and enemies collided if so reset the player position
    if (player.y + 130 >= enemyUnit.y + 90 && player.x + 25 <= enemyUnit.x + 70 && player.y + 70 <= enemyUnit.y + 135 && player.x + 75 >= enemyUnit.x + 10) {
        player.x = 200;
        player.y = 370;
    }

    // Check if the player reach the top and if it true add a new enemy
    if (player.y + 50 <= 0) {
        player.x = 200;
        player.y = 370;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        var enemy = new Enemy(0, getRandomInt(40, 210), Math.random() * 256);
        allEnemies.push(enemy);
    }

    // Keep the player into the canvas boundaries
    if (player.y > 400) {
        player.y = 400;
    }
    if (player.x > 400) {
        player.x = 400;
    }
    if (player.x < 0) {
        player.x = 0;
    }
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
