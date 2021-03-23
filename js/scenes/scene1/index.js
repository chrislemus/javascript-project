
function preload () {
  completeSprites = this.load.atlasXML('sprites', '/assets/platformer-pack-redux-360-assets/Spritesheets/spritesheet_complete.png', '/assets/platformer-pack-redux-360-assets/Spritesheets/spritesheet_complete.xml');
    // this.load.image('sky', 'http://labs.phaser.io/assets/skies/bigsky.png');
}

const gameObjects = {}
const gameData = {
  score: 0
}

//========================
//      CREATE
//========================

let screenGrid;


// window.addEventListener('resize', () => {
//   console.log(window.innerWidth)
// })

// console.log(window.mobileAndTabletCheck)

function create () {

  //====== GRID ======
// screenGrid = new AlignGrid({scene:this, cols: 22, rows: 39})
// screenGrid.showNumbers();

// const sampleDirt = this.add.image(0, 0, "sprites", `grassMid.png`)
// const sampleDirt2 = platforms.create(0, 0, "sprites", `grassMid.png`)
// Align.scaleToGameW(sampleDirt, .1)
// agrid.placeAtIndex(6, sampleDirt)
// agrid.placeAtIndex(3, sampleDirt2)
// console.log(sampleDirt2)
// console.log(sampleDirt2)


//====== BACKGROUND ======
// this.add.image(400, 1800, 'sky');
var graphics = this.add.graphics();
graphics.fillGradientStyle(0x0776EF, 0x0776EF, 0x65BFF0, 0x65BFF0, 1);
graphics.fillRect(0, 0, 1080, 1920);

// const complete = this.textures.get('sprites');
// var frames = complete.getFrameNames();
// this.add.image(600, 1080, 'sprites', frames[29]);



//====== PLATFORMS ======
const platforms = this.physics.add.staticGroup({
  setDisplaySize: 40
});
// group, x ,y, objName, scale=1, repeat=1, direction='xy',offset=0
const platformsToAdd = [
  {
    group: platforms,
    position: [45.45, 1500],
    objName: 'grassMid',
    repeat: 3
  },
  {
    group: platforms,
    position: [45.45, 1874.55],
    objName: 'grassMid',
    repeat: 8,
    // gridPosition: 198
  },
  {
    group: platforms,
    position: [854, 1874.55],
    objName: 'grassMid',
    repeat: 3,
    direction: 'xyy',
    // gridPosition: 198
  },
  {
    group: platforms,
    position: [45.45, 1300],
    objName: 'grassMid',
    repeat: 12,
    direction: 'xyy',
    // gridPosition: 814
  }

]

platformsToAdd.forEach(platforms => NewGroupObj.call(this, platforms))






//====== PLayer ======

const player = this.physics.add.sprite(250, 1655, "sprites", "alienBeige_walk1.png");
player.setCollideWorldBounds(true).setBounce(0.2);
player.body.setGravityY(300)



this.anims.create({
  key: 'playerMove',
  frameRate: 10,
  frames:this.anims.generateFrameNames('sprites', { 
    prefix: 'alienBeige_walk',
    suffix: '.png',
    start: 1, 
    end: 2,
    zeroPad: 1 
  }),
  repeat: -1
});
this.anims.create({
  key: 'playerStand',
  frameRate: 20,
  frames: [{key: 'sprites', frame: 'alienBeige_stand.png'}],
});


this.physics.add.collider(player, platforms);


//====== STARS ======
const stars = this.physics.add.group({
  key: 'sprites',
  frame: 'boxCrate_warning.png',
  repeat: 9,
  setXY: { x: 80, y: 0, stepX: 120 }
});

stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));
});
// testPlat
this.physics.add.collider(stars, platforms);
// this.physics.add.collider(testPlat, platforms);
// this.physics.add.collider(testPlat, stars);
this.physics.add.overlap(player, stars, collectStar, null, this);



gameData.scoreText =  this.add.text(16, 30, 'score: 0', { fontSize: '60px', fill: '#000' });

//====== ENEMIES ======
const bombs = this.physics.add.group();
// this.physics.add.collider(bombs, platforms);
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
this.physics.add.collider(gameObjects.bombs, gameObjects.platforms);
const {player, platforms} = gameObjects
cursors = this.input.keyboard.createCursorKeys();
touch = this.input.activePointer
if (cursors.left.isDown) {
  player.flipX = true;
  player.setVelocityX(-800);
  player.anims.play('playerMove', true);
    
} else if (cursors.right.isDown) {
  player.flipX = false;
  player.setVelocityX(800);
  player.anims.play('playerMove', true);
} else {
  player.setVelocityX(0);
  player.anims.play('playerStand');
}

if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-430);
}
if (game.input.mousePointer.isDown || touch.isDown) {
  const {x, y} = this.input.mousePointer
  
  console.log(Math.floor(x), Math.floor(y))
  console.log()
}
}


//========================
//      FUNCTIONS
//========================

function hitBomb (player, bomb) {
this.physics.pause();
gameObjects.player.setTint(0xff0000);
gameObjects.player.anims.play('playerStand');
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
  gameObjects.bombs.create(x, 200, 'sprites', 'bomb.png')
  .setBounce(1)
  .setCollideWorldBounds(true)
  .setVelocity(Phaser.Math.Between(-200, 200), 0);
}

function NewGroupObj(config ) {
const scale = config.scale || .703125
const direction = config.direction || 'x'
const {objName} = config;
if (direction.match(/\b(x)\b|\b(xy)\b|\b(y)\b|\b(yy)\b|\b(xyy)\b|\b(xxy)\b|\b(xxyy)\b/)) {
  let newObjects = []
  const duplications = config.repeat || 1
  for (let idx = 0; idx < duplications; idx++) {
    let [x, y] = config.position
    if (idx > 0) {
      const prevObjWidth = newObjects[idx-1].width
      const prevObjX = newObjects[idx-1].x
      const prevObjY = newObjects[idx-1].y
      const prevObjHeight = newObjects[idx-1].width
      const offset = config.offset || 0
      if (direction.match(/^x{1}/))  x = prevObjX + prevObjWidth + offset;
      if (direction.match(/^x{2}/))  x = prevObjX - prevObjWidth - offset;
      if (direction.match(/y{1}$/))  y = prevObjY + prevObjHeight + offset;
      if (direction.match(/y{2}$/))  y = prevObjY - prevObjHeight - offset;
    }

    const newObj = this.add.sprite(x, y, "sprites", `${objName}.png`)
    const width = newObj.width
    const height = newObj.height
    newObj.setDisplaySize(width * scale, height* scale)
    newObj.setSize(width * scale, height * scale)


    // if (config.gridPosition && idx === 0 ) {
    //   screenGrid.placeAtIndex(config.gridPosition, newObj)
    // }

    config.group.add(newObj)
    newObjects.push(newObj)
  }

  DimensionHelper.call(this, newObjects)
  return newObjects
}
}

function DimensionHelper(newObjects) {
const {width, height} = this.game.config
const firstObj = newObjects[0]

const firstObjDimension = `${firstObj.width}.${firstObj.height}`

this.add.text(firstObj.x , firstObj.y, firstObjDimension, { fontSize: '20px', fill: '#000' });
// this.add.text(firstObj.x , firstObj.y, firstObjDimension, { fontSize: '20px', fill: '#000' });

// this.add.text(firstObj.x - 20, firstObj.y-20, firstObjDimension, { fontSize: '20px', fill: '#000' });



const lastObj = newObjects[newObjects.length - 1]



}

const config = {
  // type: Phaser.AUTO,
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
  scene: { preload, create, update }
};
export {config}