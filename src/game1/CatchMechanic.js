export default class CatchMechanic {
  constructor(scene, bait, fishes, bobberBait = null) {
    this.scene = scene
    this.bait = bait
    this.fishes = fishes
    this.bobberBait = bobberBait

    this.caughtFish = null

    // Overlap detection for the regular bait
    if (this.bait && this.bait.ball) {
      this.scene.physics.add.overlap(
        this.bait.ball,
        this.fishes.map(fish => fish.sprite),
        this.catchFish,
        null,
        this
      )
    }

    // Overlap detection for the bobber baits sinker
    if (this.bobberBait && this.bobberBait.sinker) {
      this.scene.physics.add.overlap(
        this.bobberBait.sinker,
        this.fishes.map(fish => fish.sprite),
        this.catchFish,
        null,
        this
      )
    }
  }

  addOverlapForBobberSinker() {
    if (this.bobberBait && this.bobberBait.sinker) {
      this.scene.physics.add.overlap(
        this.bobberBait.sinker,
        this.fishes.map(fish => fish.sprite),
        this.catchFish,
        null,
        this
      )
    }
  }

  catchFish(baitOrSinker, fishSprite) {
    if (this.caughtFish) return // Prevent catching multiple fish at the same time
  
    const fish = this.fishes.find(f => f.sprite === fishSprite)
  
    if (fish) {
      const isRegularBait = baitOrSinker === this.bait?.ball
      const isBobberBait = baitOrSinker === this.bobberBait?.sinker
  
      const isCatchAllowed = 
        (isRegularBait && fish.type.startsWith('active')) ||// Regular rod can catch active fish, 
        (isBobberBait && fish.type.startsWith('passive')) ||// bobber rod can catch passive fish
        (fish.type.startsWith('both'))
  
      if (!isCatchAllowed) {
        console.log(`Cannot catch ${fish.type} with this rod/bait.`)
        return
      }
  
      // Stop the fishs movement and mark it as caught
      fish.stopRandomMovement()
      this.caughtFish = fish
      fish.sprite.body.setVelocity(0, 0)
      fish.sprite.body.setAllowGravity(false)
      fish.sprite.body.setImmovable(true)
      this.fishes.splice(this.fishes.indexOf(fish), 1)
    }
  }
  
  


  resetCatch() {
    if (this.caughtFish) {
      
      this.scene.addFishToInventory(this.caughtFish.type)

      this.caughtFish.destroy() 
      this.caughtFish = null 
    }
  }

  update() {
    if (this.bobberBait && this.bobberBait.sinker && !this.bobberBait.sinker.overlapSet) {
      this.addOverlapForBobberSinker()
      this.bobberBait.sinker.overlapSet = true
    }

    // If a fish is caught, attach it to the bait or sinker
    if (this.caughtFish) {
      if (this.bait && this.bait.ball) {
        this.caughtFish.sprite.setPosition(this.bait.ball.x - 50, this.bait.ball.y + 10)
      } else if (this.bobberBait && this.bobberBait.sinker) {
        this.caughtFish.sprite.setPosition(this.bobberBait.sinker.x - 50, this.bobberBait.sinker.y + 10)
      }
    }
  }
}
