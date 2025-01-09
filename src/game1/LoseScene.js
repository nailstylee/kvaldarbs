export default class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoseScene' })
  }

  create(data) {
    const { reason } = data // Reason parameter

    this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000
    ).setOrigin(0.5)

    this.add.text(this.cameras.main.centerX, 200, 'You Lost!', {
      fontSize: '48px',
      fill: '#ff0000',
    }).setOrigin(0.5)

    // Add loss reason
    const reasonText = reason === 'bait' ? 'Exceeded bait usage!' : 'Time ran out!'
    this.add.text(this.cameras.main.centerX, 300, reasonText, {
      fontSize: '24px',
      fill: '#ffffff',
    }).setOrigin(0.5)

    const restartButton = this.add.text(this.cameras.main.centerX, 400, 'Restart Level', {
      fontSize: '32px',
      fill: '#00ff00',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        const gameScene = this.scene.get('GameScene')

        this.cleanupGameScene(gameScene)
        const selectedLevel = gameScene.selectedLevel;
        const levelConfig = gameScene.levelConfig;
        // Restart the level
        gameScene.isGamePaused = false
        this.scene.stop('GameScene')
        this.scene.start('CountdownScene', {
          level: selectedLevel,
          winCondition: levelConfig.winCondition,
          timeLimit: levelConfig.timeLimit,
          maxThrows: levelConfig.maxBaitUsage,
        });
        this.scene.stop()
      })

    // Add Back to Main Menu button
    const mainMenuButton = this.add.text(this.cameras.main.centerX, 500, 'Main Menu', {
      fontSize: '32px',
      fill: '#00ff00',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        const gameScene = this.scene.get('GameScene')

        this.cleanupGameScene(gameScene)

        gameScene.isGamePaused = false
        this.scene.stop('GameScene')
        this.scene.start('LevelSelectScene')
        this.scene.stop()
      })
  }

  // Function to clean up GameScene objects
  cleanupGameScene(gameScene) {
    if (gameScene.bait) {
      gameScene.bait.removeListeners()
      gameScene.bait.ball.destroy()
      gameScene.bait = null
    }
    if (gameScene.fishingRod) {
      gameScene.fishingRod.rod.destroy()
      gameScene.fishingRod.line.destroy()
      gameScene.fishingRod = null
    }
    if (gameScene.bobberBait) {
      gameScene.bobberBait.removeListeners()
      gameScene.bobberBait.bobber.destroy()
      if (gameScene.bobberBait.sinker) gameScene.bobberBait.sinker.destroy()
      if (gameScene.bobberBait.hook) gameScene.bobberBait.hook.destroy()
      gameScene.bobberBait = null
    }
    if (gameScene.bobberFishingRod) {
      gameScene.bobberFishingRod.rod.destroy()
      gameScene.bobberFishingRod.line.destroy()
      gameScene.bobberFishingRod = null
    }

    gameScene.isUsingBobberRod = false
  }
}
