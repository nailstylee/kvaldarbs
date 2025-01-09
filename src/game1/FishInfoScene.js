import { FISH_SIZES } from './Constants.js';

export default class FishInfoScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FishInfoScene' });
  }

  preload() {
    this.load.image('passiveFish1', 'assets/passiveFish1.png');
    this.load.image('passiveFish2', 'assets/passiveFish2.png');
    this.load.image('activeFish1', 'assets/activeFish1.png');
    this.load.image('activeFish2', 'assets/activeFish2.png');
    this.load.image('bothFish1', 'assets/bothFish1.png');
    this.load.image('bothFish2', 'assets/bothFish2.png');
    this.load.image('board', 'assets/board.png');
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add.rectangle(centerX, centerY, 1920, 1080, 0x003856)
    this.add.image(centerX, centerY, 'board').setDisplaySize(this.scale.width, this.scale.height);

    const fishInfo = [
      { key: 'passiveFish1', type: 'passive1', description: 'Tench: A slow-moving freshwater fish, known for its resilience and golden-green coloration. Native to slow-moving rivers, lakes, and ponds across Europe and Asia. It grows to about 12-20 inches and feeds on insects, mollusks, and plant material.' },
      { key: 'passiveFish2', type: 'passive2', description: 'Butterflyfish: A small, colorful marine fish often found in coral reefs, admired for its striking patterns. Common in tropical waters, it ranges from 4-9 inches in length and feeds on coral polyps, algae, and small invertebrates.' },
      { key: 'activeFish1', type: 'active1', description: 'Tuna: A fast and powerful predator, highly sought after for its value in seafood markets. Found in oceans worldwide, it can grow up to 10 feet long and primarily feeds on smaller fish, squid, and crustaceans.' },
      { key: 'activeFish2', type: 'active2', description: 'Pike: An aggressive and sleek freshwater fish, known for its sharp teeth and hunting prowess. Found in lakes and rivers across North America, Europe, and Eurasia, it can reach lengths of up to 4 feet and feeds on smaller fish, amphibians, and even small mammals.' },
      { key: 'bothFish1', type: 'both1', description: 'Rockfish: A versatile fish found in rocky marine habitats, capable of both active and passive behavior. Native to the Pacific Ocean, it can range from 6 inches to over 3 feet and feeds on plankton, crustaceans, and smaller fish.' },
      { key: 'bothFish2', type: 'both2', description: 'Perch: A hardy freshwater fish, often exhibiting a mix of calm and active behaviors. Found in lakes, rivers, and reservoirs across the Northern Hemisphere, it grows up to 12 inches and feeds on insects, crustaceans, and small fish.' },
    ];

    let descriptionBox = null;
    let descriptionText = null;

    fishInfo.forEach((fish, index) => {
      const fishSize = FISH_SIZES[fish.type];
      if (!fishSize) {
        console.error(`No size found for fish type: ${fish.type}`);
        return;
      }

      const scaledWidth = fishSize.width * 2;
      const scaledHeight = fishSize.height * 2;

      // Calculate positions for fish
      const x = 200 + (index % 3) * 280;
      const y = 200 + Math.floor(index / 3) * 150;

      const fishImage = this.add.image(330 + x, 180 + y, fish.key).setDisplaySize(scaledWidth, scaledHeight).setOrigin(0.5).setInteractive();

      // Show description box and text on hover
      fishImage.on('pointerover', () => {
        const boxX = x + scaledWidth / 2 + 550;
        const boxY = y + 200;

        if (!descriptionBox) {
          descriptionBox = this.add.graphics();
          descriptionBox.fillStyle(0x333333, 0.9);
          descriptionBox.fillRoundedRect(boxX - 200, boxY - 200, 420, 400, 20);
          descriptionText = this.add.text(boxX, boxY, fish.description, {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'justify',
            lineSpacing: 15,
            wordWrap: { width: 360 },
          }).setOrigin(0.5, 0.5);
        } else {
          descriptionBox.clear();
          descriptionBox.fillStyle(0x333333, 0.8);
          descriptionBox.fillRoundedRect(boxX - 200, boxY - 200, 420, 400, 20);
          descriptionText.setPosition(boxX, boxY).setText(fish.description).setVisible(true);
        }
      });

      fishImage.on('pointerout', () => {
        if (descriptionBox) {
          descriptionBox.clear();
          descriptionText.setVisible(false);
        }
      });
    });

    // Back button to return to the level selection
    const backButton = this.add.text(60, 30, 'Back', {
      fontSize: '32px',
      fill: '#ff0000',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.stop('FishInfoScene');
        this.scene.resume('LevelSelectScene');
      });
  }
}
