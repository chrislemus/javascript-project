

function startAnimation(animatedObj, animationsCount,offset=false) {
  setInterval(() => {
    const bgSize = parseInt(window.getComputedStyle(avatar).backgroundSize)
    const bgOffsetX = offset || bgSize/animationsCount
    let bgPositionX = window.getComputedStyle(animatedObj).backgroundPosition.split('px ')[0]
    bgPositionX = bgPositionX - bgOffsetX
    if(bgPositionX < -(bgSize-1)) bgPositionX = 0
    animatedObj.style.backgroundPosition = bgPositionX + 'px'
  }, 100);
}


window.onload = () => {
  // startAnimation(avatar, 6)
  const avatar = document.querySelector('#avatar')
  const screen = document.querySelector('#game-screen')
  // const tilesSprite = document.querySelector('.tiles-sprite')
  const layoutSpriteSheet = new Image();
  layoutSpriteSheet.src = '/assets/platformer-pack-redux-360-assets/Spritesheets/spritesheet_ground.png'
  const groundWrapper =  document.querySelector('.ground-wrapper')

  // const dirtTile = document.querySelector('.dirt-tile')

  const height = 70;
  const width = 70

  const gameHistory = {
    steps: 0,
    groundElements: []
  }

  
  let groundElements = 0
  // while (groundElements < (screen.offsetWidth/width) + 1) {
  while (groundElements < 1) {
  //   const ground = document.createElement('canvas');
    // const dirtTile = document.createElement('canvas');
    // dirtTile.width=width
    // dirtTile.height=height
    // dirtTile.style.position='absolute'
    // dirtTile.style.marginTop = (screen.offsetHeight - height) + 'px'
    // dirtTile.style.marginLeft = (groundElements * width) + 'px'

    // groundWrapper.appendChild(dirtTile)
    const ctx = screen.getContext('2d');
    ctx.drawImage(layoutSpriteSheet, 0, 0, 128,128, 0,0, 70,70)
    console.log(ctx)
    // gameHistory.groundElements.push(dirtTile)
    groundElements += 1
  }
  document.addEventListener('keydown', (e) => {


  })

  const runningGame = setInterval(() => {
    const marginOffset = -20 
    
    // groundWrapper.childNodes.forEach(element => {
      // element.style.marginLeft = (element.offsetLeft + marginOffset) + 'px'
    // })
    // const firstGroundElement = groundWrapper.childNodes[0]
    // const isOutOfFrame = firstGroundElement.offsetLeft + firstGroundElement.width < 0

    // if (isOutOfFrame){
      // groundWrapper.removeChild(firstGroundElement) 
      // firstGroundElement.style.marginLeft = (groundWrapper.lastChild.offsetLeft + 70) + 'px'
      // groundWrapper.appendChild(firstGroundElement)
    // };
  }, 300);

  setTimeout(() => {
    clearInterval(runningGame)
  }, 3000);
  


  
  // dirtTile.style.cssText = `height:${height}`

};

function frame() {
  
}

// let spriteSheet;
// let spriteData;
// function preload() {
//   spriteData = loadJSON('')
// }






// const runningGame = setInterval(() => {
//   const marginOffset = -20 
  
//   groundWrapper.childNodes.forEach(element => {
//     element.style.marginLeft = (element.offsetLeft + marginOffset) + 'px'
//   })
//   const firstGroundElement = groundWrapper.childNodes[0]
//   const isOutOfFrame = firstGroundElement.offsetLeft + firstGroundElement.width < 0

//   if (isOutOfFrame){
//     groundWrapper.removeChild(firstGroundElement) 
//     firstGroundElement.style.marginLeft = (groundWrapper.lastChild.offsetLeft + 70) + 'px'
//     groundWrapper.appendChild(firstGroundElement)
//   };
// }, 300);

// setTimeout(() => {
//   clearInterval(runningGame)
// }, 3000);
