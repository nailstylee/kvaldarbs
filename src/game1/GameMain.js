import LevelSelectScene from './LevelSelectScene.js'
import GameScene from './GameScene.js'
import SettingsOverlay from './SettingsOverlay.js'
import WinScene from './WinScene.js'
import FishInfoScene from './FishInfoScene.js'
import LoseScene from './LoseScene.js'
import CountdownScene from './CountdownScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: [LevelSelectScene, GameScene, SettingsOverlay, WinScene, FishInfoScene, LoseScene, CountdownScene]
}

const game = new Phaser.Game(config)
