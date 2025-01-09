export default class SettingsOverlay extends Phaser.Scene {
  constructor() {
    super({ key: 'SettingsOverlay' })
  }

  create() {
    const centerX = this.scale.width / 2
    const centerY = this.scale.height / 2

    this.add.rectangle(centerX, centerY, this.scale.width, this.scale.height, 0x000000, 0.5)

    // Create buttons
    const buttonStyle = { fontSize: '32px', fill: '#ffffff', padding: 10,  }
    const resumeButton = this.add.text(centerX, centerY - 60, 'Resume', buttonStyle).setOrigin(0.5).setInteractive()
    const restartButton = this.add.text(centerX, centerY, 'Restart', buttonStyle).setOrigin(0.5).setInteractive()
    const menuButton = this.add.text(centerX, centerY + 60, 'Menu', buttonStyle).setOrigin(0.5).setInteractive()
    const settingsButton = this.add.text(centerX, centerY + 120, 'Settings', buttonStyle).setOrigin(0.5).setInteractive()

    // Resume the game
    resumeButton.on('pointerdown', () => {
      const gameScene = this.scene.get('GameScene')
      gameScene.isGamePaused = false
      this.scene.resume('GameScene')
      this.scene.stop()
    })

    // Restart the current level
    restartButton.on('pointerdown', () => {
      const gameScene = this.scene.get('GameScene')

      // Perform proper cleanup for all game objects
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
      const selectedLevel = gameScene.selectedLevel; // Retrieve the current level
      const levelConfig = gameScene.levelConfig;
      // Stop and restart the scene
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


    // Return to the level selection menu
    menuButton.on('pointerdown', () => {
      const gameScene = this.scene.get('GameScene')

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
      
      gameScene.isGamePaused = false
      this.scene.stop('GameScene')
      this.scene.start('LevelSelectScene')
      this.scene.stop()
    })


    // Placeholder for settings (does nothing for now)
    settingsButton.on('pointerdown', () => {
      console.log('Settings button clicked')
    })
  }
}
