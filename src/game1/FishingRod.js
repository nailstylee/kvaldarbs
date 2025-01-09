export default class FishingRod {
  constructor(scene, player, bait) {
    this.scene = scene;
    this.player = player;
    this.bait = bait;

    // Fishing rod
    this.rod = scene.add.image(player.sprite.x - 145, player.sprite.y - 280, 'fishingRod')
      .setOrigin(0.5, 0)
      .setScale(0.3)
      .setRotation(Phaser.Math.DegToRad(-30));

    // the fishing line
    this.line = scene.add.line(
      0, 0,
      this.rod.x + 5, this.rod.y + 135,
      this.bait.ball.x + 10, this.bait.ball.y + 125,
      0xa9a9a9
    ).setLineWidth(1.5);
  }

  update() {
    this.rod.x = this.player.sprite.x - 145;
    this.rod.y = this.player.sprite.y - 280;

    // Update the fishing line to connect the rod to the bait
    this.line.setTo(
      this.rod.x + 5, this.rod.y + 135,
      this.bait.ball.x + 10, this.bait.ball.y + 125,
    );
  }
}
