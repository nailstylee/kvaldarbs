import { FISH_SIZES } from './Constants.js';

export default class CountdownScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CountdownScene' });
    this.isPaused = false;
  }

  init(data) {
    this.level = data.level;
    this.winCondition = data.winCondition;
    this.timeLimit = data.timeLimit;
    this.maxThrows = data.maxThrows;
  }
  preload() {
    this.load.image('passiveFish1', 'assets/passiveFish1.png');
    this.load.image('passiveFish2', 'assets/passiveFish2.png');
    this.load.image('activeFish1', 'assets/activeFish1.png');
    this.load.image('activeFish2', 'assets/activeFish2.png');
    this.load.image('bothFish1', 'assets/bothFish1.png');
    this.load.image('bothFish2', 'assets/bothFish2.png');
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Add a semi-transparent background
    this.add.rectangle(centerX, centerY, this.scale.width, this.scale.height, 0x000000, 0.5);

    // Add a title
    this.add.text(centerX, centerY - 200, 'Level Objectives', {
      fontSize: '48px',
      fill: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Display fish images and counts
    let yOffset = centerY - 120;
    let xOffset = centerX - 300;
    const rowSpacing = 120;
    const colSpacing = 230;
    let fishInRow = 0;

    const imageKeyMap = {
      passive1: 'passiveFish1',
      passive2: 'passiveFish2',
      active1: 'activeFish1',
      active2: 'activeFish2',
      both1: 'bothFish1',
      both2: 'bothFish2',
    };

    Object.entries(this.winCondition).forEach(([fishType, count]) => {
      const imageKey = imageKeyMap[fishType];
      const fishSize = FISH_SIZES[fishType];

      if (!fishSize) {
        console.error(`No size found for fish type: ${fishType}`);
        return;
      }

      this.add.image(xOffset, yOffset, imageKey).setDisplaySize(fishSize.width, fishSize.height);
      this.add.text(xOffset + 90, yOffset, `x${count}`, {
        fontSize: '32px',
        fill: '#ffffff',
        fontStyle: 'bold',
      }).setOrigin(0, 0.5);

      fishInRow++;
      xOffset += colSpacing;

      if (fishInRow === 3) {
        fishInRow = 0;
        xOffset = centerX - 300;
        yOffset += rowSpacing;
      }
    });

    // Display time limit and max throws
    this.add.text(centerX, yOffset + 90, `Time Limit: ${this.timeLimit} seconds`, {
      fontSize: '28px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(centerX, yOffset + 150, `Max Throws: ${this.maxThrows}`, {
      fontSize: '28px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    // Display ready text
    const readyText = this.add.text(centerX, yOffset + 210, 'Get Ready!', {
      fontSize: '36px',
      fill: '#ffff00',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Countdown timer
    this.timer = this.time.delayedCall(3000, () => {
      this.scene.start('GameScene', { level: this.level });
    });

    // Add pause/unpause button
    const pauseButton = this.add.text(centerX, yOffset + 270, 'Pause', {
      fontSize: '24px',
      fill: '#ff0000',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.togglePause(pauseButton, readyText);
      });

    // Add skip button
    const skipButton = this.add.text(centerX, yOffset + 330, 'Skip', {
      fontSize: '24px',
      fill: '#00ff00',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.skipCountdown();
      });
  }

  togglePause(pauseButton, readyText) {
    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      this.timer.paused = true;
      readyText.setText('Paused');
      pauseButton.setText('Resume');
    } else {
      this.timer.paused = false;
      readyText.setText('Get Ready!');
      pauseButton.setText('Pause');
    }
  }

  skipCountdown() {
    this.timer.remove();
    this.scene.start('GameScene', { level: this.level });
  }
}
