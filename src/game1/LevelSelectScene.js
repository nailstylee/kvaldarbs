import { getLevelProgress } from '../levelProgress.js'
import { levelConfigs } from './LevelConfig.js';


export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelSelectScene' })
  }

  init() {
    this.levelProgress = []
  }

  create() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    // Title Text
    this.add.text(centerX, 100, 'Select a Level', {
      fontSize: '32px',
      fill: '#ffffff',
    }).setOrigin(0.5)

    this.userId = JSON.parse(localStorage.getItem('user'))?.user_id

    if (!this.userId) {
      console.error('User ID not found in localStorage.')
      window.location.href = './game.html'; // Redirect to main menu if user not logged in
      return
    }

    // Fetch level progress
    this.fetchAndDisplayLevels(centerX, centerY)

    // Question mark icon for fishscene
    const questionMarkIcon = this.add.text(centerX + 900, centerY - 515, '❓', {
      fontSize: '48px',
      fill: '#ffffff',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.pause()
        this.scene.launch('FishInfoScene') 
      })

    const backButton = this.add.text(centerX, centerY + 250, 'Back', {
      fontSize: '24px',
      fill: '#ff0000',
    })
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', () => {
      window.location.href = './game.html';
    })

  }

  fetchAndDisplayLevels(centerX, centerY) {
    getLevelProgress(this.userId).then(({ data, error }) => {
      if (error) {
        console.error('Error fetching level progress:', error)
      } else {
        this.levelProgress = data || []
        this.displayLevels(centerX, centerY)
      }
    })
  }

  displayLevels(centerX, centerY) {
    const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const buttonSpacing = 50;
    const starOffsetX = 100;
  
    levels.forEach((level, index) => {
      // Check level progress
      const progress = this.levelProgress.find((p) => p.level_id === level) || {};
      const isUnlocked = progress.unlocked || false;
      const stars = progress.stars || 0; // Default to 0
  
      const levelButton = this.add
        .text(centerX, 200 + index * buttonSpacing, `Level ${level}`, {
          fontSize: '24px',
          fill: isUnlocked ? '#00ff00' : '#888888',
        })
        .setOrigin(0.5)
        .setInteractive();
  
      // Display stars beside the level button
      this.add.text(
        centerX + 30 + starOffsetX,
        200 + index * buttonSpacing,
        '⭐'.repeat(stars), {
          fontSize: '24px',
          fill: '#ffff00',
        }
      ).setOrigin(0.5);
  
      if (isUnlocked) {
        levelButton.on('pointerdown', () => {
          const levelConfig = levelConfigs[level - 1];
          this.scene.start('CountdownScene', {
            level,
            winCondition: this.getWinCondition(level),
            timeLimit: levelConfig.timeLimit,
            maxThrows: levelConfig.maxBaitUsage,
          });
        });

      
      } else {
        levelButton.on('pointerdown', () => {
          this.showLockedMessage(centerX, centerY + index * buttonSpacing);
        });
      }
    });
  }
  
  

  showLockedMessage() {
    const message = this.add.text(960, 540, 'Level Locked!', {
      fontSize: '34px',
      fill: '#ff0000',
    })
    message.setOrigin(0.5)

    this.time.delayedCall(1500, () => {
      message.destroy()
    })
  }
  getWinCondition(level) {
    const levelConfig = levelConfigs[level - 1];
    return levelConfig?.winCondition || {};
  }
  
}
