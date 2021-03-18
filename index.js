

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
  const tilesSprite = document.querySelector('.tiles-sprite')
  const groundWrapper =  document.querySelector('.ground-wrapper')
  // const dirtTile = document.querySelector('.dirt-tile')

  const height = 70;
  const width = 70

  const gameHistory = {
    steps: 0,
    groundElements: []
  }

  
  let groundElements = 0
  while (groundElements < screen.offsetWidth/width) {
  //   const ground = document.createElement('canvas');
    const dirtTile = document.createElement('canvas');
    dirtTile.width=width
    dirtTile.height=height
    dirtTile.style.position='absolute'
    // dirtTile.style.marginTop = (screen.offsetHeight - height) + 'px'
    dirtTile.style.marginLeft = (groundElements * width) + 'px'

    groundWrapper.appendChild(dirtTile)
    const ctx = dirtTile.getContext('2d');
    ctx.drawImage(tilesSprite, 504, 578, height,width, 0,0, height,width)
    gameHistory.groundElements.push(dirtTile)
    groundElements += 1
  }
  document.addEventListener('keydown', (e) => {

    
    if (e.key === 'ArrowRight' ) {
      gameHistory.steps += 1
    }
    if (e.key === 'ArrowLeft') {
      if(gameHistory.steps !== 0){
        gameHistory.steps -= 1;
      }
    }

    const cannotProceedLeft = e.key === 'ArrowLeft' && gameHistory.steps === 0


    const marginOffset = e.key === 'ArrowRight' ? -20 : 20
    groundWrapper.childNodes.forEach(element => {
      element.style.marginLeft = (element.offsetLeft + marginOffset) + 'px'
      // console.log(element.offsetLeft)
      console.log(element.width)
    })

console.log(gameHistory)
    
  })


  
  // dirtTile.style.cssText = `height:${height}`

};