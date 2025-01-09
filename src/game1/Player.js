export default class Player {
  constructor(scene, landConfig) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // land boundaries
    this.landLeft = landConfig.topLeft.x;
    this.landRight = landConfig.bottomRight.x;
    this.landY = landConfig.topLeft.y;

    // Create the player
    const playerStartX = (this.landLeft + this.landRight) / 2;
    const playerStartY = this.landY - 100;
    this.sprite = scene.physics.add.sprite(playerStartX, playerStartY, 'player');
    this.sprite.setScale(0.5);

    // Enable physics
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setAllowGravity(true);
  }

  update() {
    if (this.cursors.left.isDown && this.sprite.x > this.landLeft) {
      this.sprite.x -= 3;
    } else if (this.cursors.right.isDown && this.sprite.x < this.landRight) {
      this.sprite.x += 3;
    }
  }
}
