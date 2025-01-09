export default class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' })
  }

  init(data) {
    this.level = data.level
    this.starsEarned = data.stars || 0 // Receive stars earned from the GameScene
  }

  create() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    // Display victory message
    this.add.text(centerX, centerY - 100, 'You Win!', {
      fontSize: '48px',
      fill: '#ffffff',
    }).setOrigin(0.5)

    this.add.text(centerX, centerY - 50, `Level ${this.level} Completed!`, {
      fontSize: '32px',
      fill: '#ffffff',
    }).setOrigin(0.5)

    // Display stars earned
    this.add.text(centerX, centerY, `Stars Earned: ${'⭐'.repeat(this.starsEarned)}`, {
      fontSize: '28px',
      fill: '#ffff00',
    }).setOrigin(0.5)

    // Restart button
    const restartButton = this.add.text(centerX, centerY + 100, 'Restart Level', {
      fontSize: '24px',
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

    // Main menu button
    const menuButton = this.add.text(centerX, centerY + 150, 'Main Menu', {
      fontSize: '24px',
      fill: '#ff0000',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        const gameScene = this.scene.get('GameScene')

        this.cleanupGameScene(gameScene)

        // Return to the Level Select screen
        gameScene.isGamePaused = false
        this.scene.stop('GameScene')
        this.scene.start('LevelSelectScene')
        this.scene.stop()
      })
  }

  // Function to clean up GameScene
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
