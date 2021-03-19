var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

function preload ()
{
    // this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'http://labs.phaser.io/assets/skies/bigsky.png');
    this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');
    this.load.image('complete', '/assets/platformer-pack-redux-360-assets/platformer-pack-redux-360-assets/Spritesheets/spritesheet_complete.png')
    this.load.spritesheet('runningGirl', '/assets/running-girl.png', {
      frameWidth: 117, frameHeight: 116
    });
    this.load.spritesheet('dude', 'http://labs.phaser.io/assets/sprites/dude.png', {
      frameWidth: 32, frameHeight: 48
    });
    this.load.image('grassMid', '/assets/PNG/Ground/Grass/grassMid.png');
}

const gameObjects = {}

function create () {
  
  // new Phaser.Physics(this, Phaser.Physics.Arcade)
  this.add.image(400, 300, 'sky');

  const platforms = this.physics.add.staticGroup();
  const ground = platforms.create(445, 540, 'grassMid');

  const player = this.physics.add.sprite(400, 100, 'dude');
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


  
  console.log(player.anims.play('left'))

  gameObjects.player = player
  gameObjects.platforms = platforms
}

function update() {
  // player.anims.play('left', true);
  // gameObjects.player = player
  // gameObjects.platforms = platforms
  const {player, platforms} = gameObjects
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
  } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
  } else {
      player.setVelocityX(0);

      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);
  }
}
// const physics = 