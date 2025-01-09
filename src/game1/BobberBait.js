import { MAX_VELOCITY, RESET_DISTANCE, BASE_GRAVITY, STRONG_GRAVITY, BOBBER_DISTANCE, BASE_VELOCITY } from './Constants.js'

export default class BobberBait {
  constructor(scene, player) {
    this.scene = scene
    this.player = player

    this.bobber = scene.physics.add.sprite(player.sprite.x - 50, player.sprite.y, 'bobber').setDisplaySize(30, 50)
    this.bobber.setCollideWorldBounds(true).body.setAllowGravity(false)
    this.bobber.body.setDrag(0)
    this.bobber.body.setDamping(false)

    this.sinker = null
    this.hook = null

    this.isDragging = false
    this.isResetting = false
    this.hasThrown = false
    this.hasTouchedWater = false // Flag to track if bobber has touched water
    this.lastPointerX = 0
    this.lastPointerY = 0
    this.velocityX = 0
    this.velocityY = 0
    this.pointerDownTime = 0
    this.isHolding = false

    this.addListeners()
  }

  addListeners() {
    this.pointerDownHandler = (pointer) => {
      if (this.scene.isGamePaused) return
      if (!this.hasThrown && !this.isResetting) {
        this.pointerDownTime = this.scene.time.now
        this.isHolding = true
        this.isDragging = true
        this.lastPointerX = pointer.x
        this.lastPointerY = pointer.y
        this.bobber.body.setVelocity(0, 0)
      }
    }

    this.pointerUpHandler = () => {
      if (this.scene.isGamePaused) return
      if (this.isHolding && !this.hasThrown) {
        const holdDuration = this.scene.time.now - this.pointerDownTime

        if (holdDuration > 50) { // Only throw if held for more than click
          this.isDragging = false
          this.hasThrown = true
          this.hasTouchedWater = false
          this.bobber.body.setAllowGravity(true)
          const throwVelocityX = Phaser.Math.Clamp(this.velocityX * BASE_VELOCITY, -MAX_VELOCITY, MAX_VELOCITY)
          const throwVelocityY = Phaser.Math.Clamp(this.velocityY * BASE_VELOCITY, -MAX_VELOCITY, MAX_VELOCITY)
          this.bobber.body.setVelocity(throwVelocityX, throwVelocityY)

          this.scene.incrementBaitUsage()
        }

        this.isHolding = false
      }
    }

    this.pointerMoveHandler = (pointer) => {
      if (this.scene.isGamePaused) return
      if (this.isHolding) {
        const deltaX = pointer.x - this.lastPointerX
        const deltaY = pointer.y - this.lastPointerY
        const distance = Phaser.Math.Distance.Between(0, 0, deltaX, deltaY)
        this.velocityX = distance * Math.sign(deltaX)
        this.velocityY = distance * Math.sign(deltaY) * 1.25
        this.lastPointerX = pointer.x
        this.lastPointerY = pointer.y
      }
    }

    this.wheelHandler = (pointer, gameObjects, deltaX, deltaY) => {
      if (this.scene.isGamePaused) return
      if (deltaY > 0 && this.hasThrown) {
        const targetX = this.player.sprite.x - 50
        const targetY = this.player.sprite.y + 50
        const angle = Phaser.Math.Angle.Between(this.bobber.x, this.bobber.y, targetX, targetY)
        const distanceToPlayer = Phaser.Math.Distance.Between(this.bobber.x, this.bobber.y, targetX, targetY)

        // Apply gravity based on whether the bobber has touched water
        if (this.hasTouchedWater) {
          this.bobber.body.setGravityY(STRONG_GRAVITY)
          if (this.sinker) this.sinker.body.setGravityY(STRONG_GRAVITY)
        } else {
          this.bobber.body.setGravityY(BASE_GRAVITY)
        }

        this.bobber.body.setAllowGravity(true)
        if (this.sinker) this.sinker.body.setAllowGravity(true)

        this.isResetting = true

        if (distanceToPlayer <= 400) {
          this.bobber.body.setVelocity(Math.cos(angle) * 400, Math.sin(angle) * 300)
          this.bobber.body.setGravityY(BASE_GRAVITY)
        } else {
          this.bobber.body.setVelocity(Math.cos(angle) * 1000, Math.sin(angle) * 1500)
        }

        // Check if the bobber is close enough to fully reset near the player
        if (distanceToPlayer < RESET_DISTANCE) {
          this.resetBobberPhysics(targetX, targetY)
        }
      }
    }

    this.scene.input.on('pointerdown', this.pointerDownHandler)
    this.scene.input.on('pointerup', this.pointerUpHandler)
    this.scene.input.on('pointermove', this.pointerMoveHandler)
    this.scene.input.on('wheel', this.wheelHandler)
  }

  removeListeners() {
    this.scene.input.off('pointerdown', this.pointerDownHandler)
    this.scene.input.off('pointerup', this.pointerUpHandler)
    this.scene.input.off('pointermove', this.pointerMoveHandler)
    this.scene.input.off('wheel', this.wheelHandler)
  }

  resetBobberPhysics(targetX, targetY) {
    this.isResetting = false
    this.hasThrown = false
    this.hasTouchedWater = false
    this.bobber.setPosition(targetX, targetY)
    this.bobber.body.setVelocity(0, 0)
    this.bobber.body.setAllowGravity(false)
    this.bobber.body.setGravityY(0)
    this.bobber.body.setDrag(0)
    this.bobber.body.setDamping(false)

    if (this.sinker) {
      this.sinker.destroy()
      this.sinker = null
    }

    if (this.hook) {
      this.hook.destroy()
      this.hook = null
    }
      // Catch mechanic
    if (this.scene.catchMechanic) {
      this.scene.catchMechanic.resetCatch()
    }
  }

  spawnSinkerAndHook() {
    // Spawn sinker at the bobber position
    this.sinker = this.scene.physics.add.sprite(this.bobber.x, this.bobber.y + 40, 'sinker').setDisplaySize(20, 50)
    this.sinker.setCollideWorldBounds(true)

    // Reset all forces
    this.sinker.body.setAllowGravity(false)
    this.sinker.body.setVelocity(0, 0)
    this.sinker.body.setDrag(0)
    this.sinker.body.setDamping(false)

    // Spawn hook below the sinker and make it invisible
    this.hook = this.scene.add.star(this.sinker.x, this.sinker.y + 20, 3, 5, 10, 0xffd700).setVisible(false);
  }

  update(waterLineY) {
    if (this.hasThrown && this.bobber.y >= waterLineY && !this.hasTouchedWater) {
      this.hasTouchedWater = true
      this.bobber.body.setVelocity(0, 0) 
      this.bobber.body.setAllowGravity(false)

      this.spawnSinkerAndHook()
    }

    // Prevent the bobber from falling below the water line
    if (this.bobber.y >= waterLineY) {
      this.bobber.y = waterLineY
      this.bobber.body.setVelocity(0, 0)
      this.bobber.body.setAllowGravity(false)
    }

    if (this.sinker && this.hasTouchedWater) {
      const distance = Phaser.Math.Distance.Between(this.bobber.x, this.bobber.y, this.sinker.x, this.sinker.y)

      if (distance < BOBBER_DISTANCE) {
        const maxSinkSpeed = 70
        if (this.sinker.body.velocity.y < maxSinkSpeed) {
          this.sinker.body.velocity.y += 2
        }
      } else {
        this.sinker.body.setVelocity(0, 0)
        this.sinker.body.setAllowGravity(false)

        // Mimic bobbers movement horizontally
        this.sinker.x = this.bobber.x
        this.sinker.y = this.bobber.y + BOBBER_DISTANCE
      }
    }

    if (this.sinker) {
      this.hook.x = this.sinker.x
      this.hook.y = this.sinker.y + 20
    }

    if (!this.hasThrown && !this.isResetting) {
      this.bobber.x = this.player.sprite.x - 142
      this.bobber.y = this.player.sprite.y - 40
    }
  }
}
