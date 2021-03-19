var config = {
    type: Phaser.AUTO,
    // width: 800,
    // height: 600,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: 'phaser-example',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1080,
      height: 1920
  },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload () {
  this.load.atlasXML('round', '/assets/platformer-pack-redux-360-assets/Spritesheets/spritesheet_complete.png', '/assets/platformer-pack-redux-360-assets/Spritesheets/spritesheet_complete.xml');


    this.load.image('sky', 'http://labs.phaser.io/assets/skies/bigsky.png');
    this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');
    this.load.spritesheet('complete', '/assets/platformer-pack-redux-360-assets/Spritesheets/spritesheet_complete.png', {
      frameWidth: 128, frameHeight: 128
    })
    this.load.spritesheet('runningGirl', '/assets/running-girl.png', {
      frameWidth: 117, frameHeight: 116
    });
    this.load.image('star', '/assets/PNG/Items/coinGold.png');
    this.load.spritesheet('dude', 'http://labs.phaser.io/assets/sprites/dude.png', {
      frameWidth: 32, frameHeight: 48
    });
    this.load.image('bomb', 'http://labs.phaser.io/assets/particles/blue.png');
    this.load.image('grassMid', '/assets/PNG/Ground/Grass/grassMid.png');
}

const gameObjects = {}
const gameData = {
  score: 0
}

//========================
//      CREATE
//========================

function create () {

  //====== BACKGROUND ======
  // this.add.image(400, 1800, 'sky');
  var graphics = this.add.graphics();
  graphics.fillGradientStyle(0x0776EF, 0x0776EF, 0x65BFF0, 0x65BFF0, 1);
  graphics.fillRect(0, 0, 1080, 1920);

  const complete = this.textures.get('round');
  var frames = complete.getFrameNames();
  // console.log(frames)
  this.add.image(600, 1080, 'round', frames[29]);
  // for (var i = 0; i < frames.length; i++)
  // {
  //     var x = Phaser.Math.Between(0, 800);
  //     var y = Phaser.Math.Between(0, 600);

  //     this.add.image(x, y, 'round', frames[i]);
  // }
  // complete.setCollideWorldBounds(true);
  console.log(complete)
 
  const platforms = this.physics.add.staticGroup();
  platforms.create(445, 540, 'grassMid');
  platforms.create(200, 540, 'grassMid');

  //====== PLayer ======

  const player = this.physics.add.sprite(400, 300, 'dude');


  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  this.physics.add.collider(player, platforms);
  player.body.setGravityY(300)

  //====== STARS ======
  const stars = this.physics.add.group({
    key: 'star',
    repeat: 1,
    setXY: { x: 200, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  gameData.scoreText =  this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  //====== ENEMIES ======
  const bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);

  //====== SHARABLE VARIABLES ======
  gameObjects.player = player
  gameObjects.stars = stars
  gameObjects.bombs = bombs
  gameObjects.platforms = platforms
}

//========================
//      UPDATE
//========================

function update() {
  const {player, platforms} = gameObjects
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
      // game.camera.x -= 4;
      player.setVelocityX(-160);
      player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    console.log(game)
    console.log(this.camera)
      player.setVelocityX(160);
      player.anims.play('right', true);
  } else {
      player.setVelocityX(0);
      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
  }
}


//========================
//      FUNCTIONS
//========================

function hitBomb (player, bomb) {
  console.log('hi')
    this.physics.pause();

    gameObjects.player.setTint(0xff0000);

    gameObjects.player.anims.play('turn');

    gameOver = true;
}

function collectStar (player, star) {
    star.disableBody(true, true);

    gameData.score += 10;
    gameData.scoreText.setText('Score: ' + gameData.score);

    
    if (gameObjects.stars.countActive(true) === 0) {
      gameObjects.stars.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
      });
    }

    var x = (gameObjects.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    gameObjects.bombs.create(x, 16, 'bomb')
    .setBounce(1)
    .setCollideWorldBounds(true)
    .setVelocity(Phaser.Math.Between(-200, 200), 20);
}
// const physics = 

window.addEventListener('DOMContentLoaded', (event) => {
  const c = document.querySelector('canvas')
  console.log(c)
});