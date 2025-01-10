export default class Fish {
  constructor(scene, x, y, type, imageKey, size, water) {
    this.scene = scene
    this.type = type // Fish type ("passive1", "active1", "both2")
    this.waterBounds = water //topLeft: {x, y}, bottomRight: {x, y} 

    this.behaviorConfig = this.getBehaviorConfig(type)

    // Create the fish using the provided imageKey and size
    this.sprite = scene.physics.add.sprite(x, y, imageKey).setDisplaySize(size.width, size.height)
    this.sprite.setCollideWorldBounds(true)
    this.sprite.body.setAllowGravity(false)

    this.movementEvent = null

    this.startRandomMovement()
  }

  getBehaviorConfig(type) {
    // Custom behavior for each fish type
    const behaviors = {
      passive1: { speed: 50, changeDirectionDelay: 5000, zigzag: false },
      passive2: { speed: 60, changeDirectionDelay: 4000, zigzag: false },
      active1: { speed: 80, changeDirectionDelay: 2000, zigzag: true },
      active2: { speed: 100, changeDirectionDelay: 1500, zigzag: true },
      both1: { speed: 70, changeDirectionDelay: 3500, zigzag: false },
      both2: { speed: 80, changeDirectionDelay: 3000, zigzag: true },
    }

    // Default behavior
    return behaviors[type] || { speed: 80, changeDirectionDelay: 2000, zigzag: false }
  }

  startRandomMovement() {
    this.setRandomMovement();
  
    // Random delay offset for each fish
    const randomDelayOffset = Phaser.Math.Between(0, 1000);
  
    this.movementEvent = this.scene.time.addEvent({
      delay: this.behaviorConfig.changeDirectionDelay + randomDelayOffset,
      callback: this.setRandomMovement,
      callbackScope: this,
      loop: true,
    });
  }
  

  stopRandomMovement() {
    if (this.movementEvent) {
      this.movementEvent.remove()
      this.movementEvent = null
    }
    if (this.sprite.body) {
      this.sprite.body.setVelocity(0, 0)
    }
  }

  setRandomMovement() {
    if (!this.sprite || !this.sprite.body) {
      return;
    }
  
    const { speed, zigzag } = this.behaviorConfig;
  
    // Randomize speed
    const randomSpeedFactor = Phaser.Math.FloatBetween(0.8, 1.2);
    const adjustedSpeed = speed * randomSpeedFactor;
  
    const randomX = Phaser.Math.Between(-adjustedSpeed, adjustedSpeed);
    const randomY = Phaser.Math.Between(-adjustedSpeed, adjustedSpeed);
  
    if (zigzag) {
      const time = this.scene.time.now / 1000; 
      const zigzagFactor = Math.sin(time * Math.PI * 2) * adjustedSpeed;
      this.sprite.body.setVelocity(randomX + zigzagFactor, randomY);
    } else {
      this.sprite.body.setVelocity(randomX, randomY);
    }
  
    // Flip the fish based on horizontal velocity
    if (this.sprite.body.velocity.x < 0) {
      this.sprite.flipX = true;
    } else if (this.sprite.body.velocity.x > 0) {
      this.sprite.flipX = false; 
    }
  
    this.checkWaterBounds();
  }
  
  
  checkWaterBounds() {
    if (!this.sprite || !this.sprite.body) {
      return; 
    }
  
    const bounds = this.waterBounds;
    const margin = 20; 
  // Change fish movement when getting close to bounds
    if (this.sprite.x < bounds.topLeft.x + margin + 60) {
      this.sprite.body.setVelocityX(Math.abs(this.sprite.body.velocity.x));
    }
    if (this.sprite.x > bounds.bottomRight.x - margin - 60) {
      this.sprite.body.setVelocityX(-Math.abs(this.sprite.body.velocity.x));
    }
    if (this.sprite.y < bounds.topLeft.y + margin) {
      this.sprite.body.setVelocityY(Math.abs(this.sprite.body.velocity.y));
    }
    if (this.sprite.y > bounds.bottomRight.y - margin) {
      this.sprite.body.setVelocityY(-Math.abs(this.sprite.body.velocity.y));
    }
    
    // Flip the fish based on horizontal velocity
    if (this.sprite.body.velocity.x < 0) {
      this.sprite.flipX = true;
    } else if (this.sprite.body.velocity.x > 0) {
      this.sprite.flipX = false; 
    }
  }
  

  update() {
    this.checkWaterBounds()
  }

  destroy() {
    this.stopRandomMovement(); 
    this.sprite.destroy();
    
    const index = this.scene.fishes.indexOf(this);
    if (index !== -1) {
      this.scene.fishes.splice(index, 1);
    }
  }
  
}
