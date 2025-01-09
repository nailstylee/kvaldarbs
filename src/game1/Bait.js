import { MAX_VELOCITY, RESET_DISTANCE, BASE_GRAVITY, STRONG_GRAVITY, BASE_VELOCITY } from './Constants.js'

export default class Bait {
  constructor(scene, player) {
    this.scene = scene
    this.player = player
    this.ball = scene.physics.add.sprite(player.sprite.x - 150, player.sprite.y, 'ball').setDisplaySize(50, 30)
    this.ball.setCollideWorldBounds(true).body.setAllowGravity(false)
    this.isDragging = false
    this.isResetting = false
    this.hasThrown = false
    this.pointerDownTime = 0
    this.isHolding = false
    this.lastPointerX = 0
    this.lastPointerY = 0
    this.velocityX = 0
    this.velocityY = 0

    this.addListeners()
  }

  addListeners() {
    this.pointerDownHandler = (pointer) => {
        if (this.scene.isGamePaused) return;
        if (!this.hasThrown && !this.isResetting) {
            this.pointerDownTime = this.scene.time.now;
            this.isHolding = true;
            this.lastPointerX = pointer.x;
            this.lastPointerY = pointer.y;
            this.ball.body.setVelocity(0, 0);
        }
    };

    this.pointerUpHandler = () => {
        if (this.scene.isGamePaused) return;
        if (this.isHolding && !this.hasThrown) {
            const holdDuration = this.scene.time.now - this.pointerDownTime;

            if (holdDuration > 50) { // Throw is valid only if the pointer was held down long enough
                this.isDragging = false;
                this.hasThrown = true;
                this.ball.body.setAllowGravity(true);

                // Clamp the throw velocity to prevent excessive speed
                const throwVelocityX = Phaser.Math.Clamp(this.velocityX * BASE_VELOCITY, -MAX_VELOCITY, MAX_VELOCITY);
                const throwVelocityY = Phaser.Math.Clamp(this.velocityY * BASE_VELOCITY, -MAX_VELOCITY, MAX_VELOCITY);
                this.ball.body.setVelocity(throwVelocityX, throwVelocityY);

                this.scene.incrementBaitUsage();
            }

            this.isHolding = false;
        }
    };

    this.pointerMoveHandler = (pointer) => {
        if (this.scene.isGamePaused) return;
        if (this.isHolding) {
            // Calculate movement magnitude 
            const deltaX = pointer.x - this.lastPointerX;
            const deltaY = pointer.y - this.lastPointerY;
            const distance = Phaser.Math.Distance.Between(0, 0, deltaX, deltaY);

            // Set velocity based on pointer movement and add a slight boost for vertical direction
            this.velocityX = distance * Math.sign(deltaX);
            this.velocityY = distance * Math.sign(deltaY) * 1.2; 
            this.lastPointerX = pointer.x;
            this.lastPointerY = pointer.y;
        }
    };

    this.wheelHandler = (pointer, gameObjects, deltaX, deltaY) => {
        if (this.scene.isGamePaused) return;
        if (deltaY > 0 && this.hasThrown) {
            this.isResetting = true;
            this.ball.body.setAllowGravity(true);

            // Calculate angle and distance so the movement is towards near the player
            const targetX = this.player.sprite.x - 50;
            const targetY = this.player.sprite.y + 50;
            const angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, targetX, targetY);
            const distanceToPlayer = Phaser.Math.Distance.Between(this.ball.x, this.ball.y, targetX, targetY);

            // Adjust velocity based on distance - slower pull for closer bait
            if (distanceToPlayer <= 100) {
                this.ball.body.setVelocity(Math.cos(angle) * 300, Math.sin(angle) * 300);
            } else {
                this.ball.body.setVelocity(
                    Math.cos(angle) * 700, 
                    Math.sin(angle) * 800
                );
            }

            if (distanceToPlayer < RESET_DISTANCE) {
                this.resetBallPhysics(targetX, targetY);
            }
        }
    };

    this.scene.input.on('pointerdown', this.pointerDownHandler);
    this.scene.input.on('pointerup', this.pointerUpHandler);
    this.scene.input.on('pointermove', this.pointerMoveHandler);
    this.scene.input.on('wheel', this.wheelHandler);
}


  removeListeners() {
    this.scene.input.off('pointerdown', this.pointerDownHandler)
    this.scene.input.off('pointerup', this.pointerUpHandler)
    this.scene.input.off('pointermove', this.pointerMoveHandler)
    this.scene.input.off('wheel', this.wheelHandler)
  }

  resetBallPhysics(targetX, targetY) {
    this.isResetting = false
    this.hasThrown = false
    this.ball.setPosition(targetX, targetY)
    this.ball.body.setVelocity(0, 0)
    this.ball.body.setAllowGravity(false)
    this.ball.body.setGravityY(0) // Reset forces
    this.ball.body.setDrag(0)
    this.ball.body.setDamping(false)

      //Reset catch mechanic
    if (this.scene.catchMechanic) {
      this.scene.catchMechanic.resetCatch()
    }
  }

  update(landY) {
    // Check if the bait has reached land hight
    if (this.hasThrown && this.ball.body.velocity.y > 0 && this.ball.y >= landY) {
      this.ball.body.setVelocity(0, 0)
      this.ball.body.setGravityY(STRONG_GRAVITY)
    }

    // Start the bait near the player
    if (!this.hasThrown && !this.isResetting) {
      this.ball.x = this.player.sprite.x - 150
      this.ball.y = this.player.sprite.y - 40
    }
  }
}
