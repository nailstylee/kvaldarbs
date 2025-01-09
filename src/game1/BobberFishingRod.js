export default class BobberFishingRod {
  constructor(scene, player, bobberBait) {
      this.scene = scene;
      this.player = player;
      this.bobberBait = bobberBait;

      this.rod = scene.add.image(player.sprite.x - 145, player.sprite.y - 280, 'bobberFishingRod')
          .setOrigin(0.5, 0)
          .setScale(0.3)
          .setRotation(Phaser.Math.DegToRad(-30));

      // Fishing line connecting the rod and bobber
      this.line = scene.add.line(
          0, 0,
          this.rod.x + 49, this.rod.y + 130,
          this.bobberBait.bobber.x + 46, this.bobberBait.bobber.y + 115, 
          0xa9a9a9
      ).setLineWidth(1.5);

      this.bobberSinkerLine = scene.add.graphics();
  }

  update() {
      // Update the rods position to follow the player
      this.rod.x = this.player.sprite.x - 145;
      this.rod.y = this.player.sprite.y - 280;

      this.line.setTo(
          this.rod.x + 48, this.rod.y + 130,
          this.bobberBait.bobber.x + 46, this.bobberBait.bobber.y + 115
      );

      // Draw the line connecting the bobber and sinker
      this.bobberSinkerLine.clear();
      if (this.bobberBait.sinker) {
          this.bobberSinkerLine.lineStyle(1.5, 0xa9a9a9, 1);
          this.bobberSinkerLine.moveTo(this.bobberBait.bobber.x, this.bobberBait.bobber.y + 25);
          this.bobberSinkerLine.lineTo(this.bobberBait.sinker.x, this.bobberBait.sinker.y);
          this.bobberSinkerLine.strokePath();
      }
  }

  destroy() {
      if (this.rod) this.rod.destroy();
      if (this.line) this.line.destroy();
      if (this.bobberSinkerLine) this.bobberSinkerLine.destroy();
  }
}