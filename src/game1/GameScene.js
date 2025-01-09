import { levelConfigs } from './LevelConfig.js'
import Player from './Player.js'
import Bait from './Bait.js'
import FishingRod from './FishingRod.js'
import BobberBait from './BobberBait.js'
import BobberFishingRod from './BobberFishingRod.js'
import Fish from './Fish.js'
import CatchMechanic from './CatchMechanic.js'
import { saveLevelProgress, unlockNextLevel, getLevelProgress } from '../levelProgress.js'
import { FISH_SIZES } from './Constants.js'
import { setBobberDistance, BOBBER_DISTANCE } from './Constants.js';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.isUsingBobberRod = false
    this.fishes = []
    this.isGamePaused = false
    this.timeRemaining = 0
    this.timerText = null
    this.userId = null


  }

  init(data) {
    this.selectedLevel = data.level || 1
    this.userId = JSON.parse(localStorage.getItem('user'))?.user_id

    this.levelConfig = levelConfigs[this.selectedLevel - 1]
    if (!this.levelConfig) {
      throw new Error(`Invalid level index: ${this.selectedLevel}`)
    }
    this.winCondition = this.levelConfig.winCondition
    this.timeRemaining = this.levelConfig.timeLimit

    // Fetch level progress and restrict locked levels
    getLevelProgress(this.userId).then(({ data, error }) => {
      if (error) {
        console.error('Error fetching level progress:', error)
      } else {
        const currentLevelProgress = data.find(
          (progress) => progress.level_id === this.selectedLevel
        )
        if (!currentLevelProgress?.unlocked && this.selectedLevel !== 1) {
          this.scene.start('LevelSelectScene')
        }
      }
    })
  }
  preload() {
    this.load.image('sky1', 'assets/sky1.png');
    this.load.image('sky2', 'assets/sky2.png');
    this.load.image('sky3', 'assets/sky3.png');
    this.load.image('sky4', 'assets/sky4.png');
    this.load.image('water1', 'assets/water1.png');
    this.load.image('land1', 'assets/land1.png');
    this.load.image('passiveFish1', 'assets/passiveFish1.png')
    this.load.image('activeFish1', 'assets/activeFish1.png')
    this.load.image('bothFish1', 'assets/bothFish1.png')
    this.load.image('passiveFish2', 'assets/passiveFish2.png')
    this.load.image('activeFish2', 'assets/activeFish2.png')
    this.load.image('bothFish2', 'assets/bothFish2.png')
    this.load.image('player', 'assets/player.png');
    this.load.image('fishingRod', 'assets/fishingRod.png');
    this.load.image('bobberFishingRod', 'assets/bobberFishingRod.png');
    this.load.image('ball', 'assets/bait.png');
    this.load.image('bobber', 'assets/bobberBait.png');
    this.load.image('sinker', 'assets/sinker.png');
  
    this.load.on('complete', () => {
      console.log('Textures loaded:', this.textures.list)
    })
  }

  create() {
    const { land, water, waterlineOffset, player, fishes, colors, skyImage, waterImage, landImage } = this.levelConfig;

    // Enable lighting
    this.lights.enable();
    const lightingConfig = this.levelConfig.lighting;

    if (lightingConfig) {
        this.lights.setAmbientColor(lightingConfig.ambientColor || 0x000000);
        this.light = this.lights.addLight(
            lightingConfig.light.x,
            lightingConfig.light.y,
            lightingConfig.light.radius
        ).setIntensity(lightingConfig.light.intensity);
    }
    // Add a red dot to represent the light source
    //this.lightDot = this.add.graphics();
    //this.lightDot.fillStyle(0xff0000, 1); // Red color with full opacity
    //this.lightDot.fillCircle(0, 0, 5); // Small circle (radius = 5)
    //this.lightDot.setDepth(100); // Ensure it's drawn above other objects
    this.add.image(this.scale.width / 2, this.scale.height / 2, skyImage)
        .setDisplaySize(this.scale.width, this.scale.height)
        .setOrigin(0.5);

    const waterWidth = water.bottomRight.x - water.topLeft.x;
    const waterHeight = water.bottomRight.y - water.topLeft.y;
    const waterX = water.topLeft.x + waterWidth / 2;
    const waterY = water.topLeft.y + waterHeight / 2;
    this.add.image(waterX, waterY)
        .setDisplaySize(waterWidth, waterHeight)
        .setOrigin(0.5);

    const landWidth = land.bottomRight.x - land.topLeft.x;
    const landHeight = land.bottomRight.y - land.topLeft.y;
    const landX = land.topLeft.x + landWidth / 2;
    const landY = land.topLeft.y + landHeight / 2;
    this.land = this.physics.add.staticSprite(landX, landY);
    this.land.displayWidth = landWidth;
    this.land.displayHeight = landHeight;
    this.land.setPipeline('Light2D');
    this.land.refreshBody();

    this.waterLineY = water.topLeft.y + waterlineOffset
    this.add.rectangle(waterX, this.waterLineY, waterWidth, 2)

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, this.levelConfig.land);
    this.player.sprite.setPosition(player.x, player.y);
    this.physics.add.collider(this.player.sprite, this.land);
    this.player.sprite.setPipeline('Light2D')
    
    this.bait = new Bait(this, this.player);
    this.bait.ball.setPipeline('Light2D');
    this.fishingRod = new FishingRod(this, this.player, this.bait);
    this.fishingRod.rod.setPipeline('Light2D');

    this.fishInventory = {};

    this.fishes = [];
    fishes.forEach((fishConfig) => {
        if (!this.textures.exists(fishConfig.imageKey)) {
            console.error(`Texture not found: ${fishConfig.imageKey}`);
        }
        const fish = new Fish(
            this,
            fishConfig.x,
            fishConfig.y,
            fishConfig.type,
            fishConfig.imageKey,
            fishConfig.size,
            water
        );
        fish.sprite.setPipeline('Light2D');
        this.fishes.push(fish);
    });
    this.catchMechanic = new CatchMechanic(this, this.bait, this.fishes, this.bobberBait);

    // Velocity text
    //this.velocityText = this.add.text(10, 10, 'Velocity: 0, 0', { fontSize: '30px', fill: '#fffffa' });

    // Rod switch key
    this.switchKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    // Settings gear icon
    const gearIcon = this.add.text(this.scale.width - 60, 10, '⚙️', { fontSize: '32px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => {
            this.isGamePaused = true;
            this.scene.pause();
            this.scene.launch('SettingsOverlay');
        });

    this.scoreboardYStart = 140;
    this.scoreboardItems = [];

    // Timer display
    this.timerText = this.add.text(10, 90, `Time: ${this.timeRemaining}`, {
        fontSize: '30px',
        fill: '#fffffd',
    });
    this.time.addEvent({
        delay: 1000,
        callback: this.updateTimer,
        callbackScope: this,
        loop: true,
    });

    // Track bait usage
    this.baitUsage = 0;
    this.maxBaitUsage = this.levelConfig.maxBaitUsage;

    // Display bait usage
    this.baitUsageText = this.add.text(10, 50, `Bait Usage: ${this.baitUsage}/${this.maxBaitUsage}`, {
        fontSize: '30px',
        fill: '#fffff0',
    });
    this.increaseBobberKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.decreaseBobberKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.bobberDistanceText = this.add.text(
      this.scale.width - 200,
      20,
      `Bobber Distance: ${BOBBER_DISTANCE/100}m`,
      {
          fontSize: '20px',
          fill: '#ffffff',
      }
    ).setOrigin(1, 0);


}


  incrementBaitUsage() {
    this.baitUsage++
  
    if (this.baitUsageText) {
      this.baitUsageText.setText(`Bait Usage: ${this.baitUsage}/${this.maxBaitUsage}`)
    } else {
      console.error('Bait usage text is not initialized.')
    }
  
    // Lose condition
    if (this.baitUsage > this.maxBaitUsage) {
      this.goToLoseScene('bait')
    }
  }
  
  updateTimer() {
    this.timeRemaining--
  
    this.timerText.setText(`Time: ${this.timeRemaining}`)
  
    if (this.timeRemaining <= 0) {
      this.goToLoseScene()
    }
  }
  
  goToLoseScene(reason) {
    this.scene.start('LoseScene', { level: this.selectedLevel, reason }) // Reason: 'time' or 'bait'
  }
  
  addFishToInventory(fishType) {
    const fishImages = {
      passive1: 'passiveFish1',
      passive2: 'passiveFish2',
      active1: 'activeFish1',
      active2: 'activeFish2',
      both1: 'bothFish1',
      both2: 'bothFish2'
    };
  
    const imageKey = fishImages[fishType];
  
    if (!this.fishInventory[fishType]) {
      // First time catching this type of fish
      this.fishInventory[fishType] = 1;
  
      // Calculate the Y position
      const yOffset = this.scoreboardYStart + this.scoreboardItems.length * 60;
  
      // Use the constants to get the size for the specific fish type
      const fishSize = FISH_SIZES[fishType];
      if (!fishSize) {
        console.error(`No size found for fish type: ${fishType}`);
        return;
      }
  
      const fishIcon = this.add.image(10, yOffset, imageKey)
        .setDisplaySize(fishSize.width, fishSize.height)
        .setOrigin(0, 0);
  
      const fishCountText = this.add.text(90, yOffset, `x${this.fishInventory[fishType]}`, {
        fontSize: '20px',
        fill: '#ffffff'
      });
  
      this.scoreboardItems.push({ icon: fishIcon, text: fishCountText });
    } else {
      // Update the count if already caught
      this.fishInventory[fishType]++;
      const item = this.scoreboardItems.find((item) => item.icon.texture.key === fishImages[fishType]);
      if (item) {
        item.text.setText(`x${this.fishInventory[fishType]}`);
      }
    }
    this.checkWinCondition();
  }
  
  // calculate stars and save progress
  checkWinCondition() {
    for (const [fishType, requiredCount] of Object.entries(this.winCondition)) {
      if ((this.fishInventory[fishType] || 0) < requiredCount) {
        return
      }
    }
    const starsEarned = this.calculateStars()

    // Fetch current stars from the database
    getLevelProgress(this.userId).then(({ data }) => {
      const currentLevelData = data.find(progress => progress.level_id === this.selectedLevel)
      const currentStars = currentLevelData ? currentLevelData.stars : 0

      // Only update if the new stars are greater than the current stars
      if (starsEarned > currentStars) {
        saveLevelProgress(
          this.userId,
          this.selectedLevel,
          starsEarned,
          this.baitUsage,
          this.levelConfig.timeLimit - this.timeRemaining
        ).then(({ error }) => {
          if (error) console.error('Error saving level progress:', error)
        })
      }

      // Unlock the next level
      unlockNextLevel(this.userId, this.selectedLevel).then(({ error }) => {
        if (error) console.error('Error unlocking next level:', error)
      })

      this.scene.start('WinScene', { level: this.selectedLevel, stars: starsEarned })
    })
  }
  calculateStars() {
    const timeScore = this.timeRemaining / this.levelConfig.timeLimit
    const baitScore = 1 - Math.min(this.baitUsage / this.levelConfig.maxBaitUsage, 1)
  
    const finalScore = (timeScore + baitScore) / 2
  
    if (finalScore >= 0.7) {
      return 3
    } else if (finalScore >= 0.4) {
      return 2
    } else {
      return 1
    }
  }
  
  
  
  
  
  toggleRod() {
    const isStationary = !this.bait?.hasThrown && !this.bait?.isResetting &&
                          (!this.bobberBait?.hasThrown && !this.bobberBait?.isResetting)
  
    if (!isStationary) {
      console.log('Rod toggle prevented: bait or bobber is not stationary.')
      return
    }
  
    this.isUsingBobberRod = !this.isUsingBobberRod
  
    if (this.fishingRod) {
      this.fishingRod.rod.destroy()
      this.fishingRod.line.destroy()
      this.fishingRod = null
    }
    if (this.bait) {
      this.bait.removeListeners()
      this.bait.ball.destroy()
      this.bait = null
    }
  
    if (this.bobberFishingRod) {
      this.bobberFishingRod.rod.destroy()
      this.bobberFishingRod.line.destroy()
      if (this.bobberFishingRod.bobberSinkerLine && this.bobberBait?.sinker) {
        this.bobberFishingRod.bobberSinkerLine.destroy()
      }
      this.bobberFishingRod = null
    }
    if (this.bobberBait) {
      this.bobberBait.removeListeners()
      this.bobberBait.bobber.destroy()
      if (this.bobberBait.sinker) {
        this.bobberBait.sinker.destroy()
      }
      if (this.bobberBait.hook) {
        this.bobberBait.hook.destroy()
      }
      this.bobberBait = null
    }
  
    // Initialize the selected rod
    if (this.isUsingBobberRod) {
      this.bobberBait = new BobberBait(this, this.player);
      this.bobberFishingRod = new BobberFishingRod(this, this.player, this.bobberBait);

      // Apply Light2D to the new components
      this.bobberFishingRod.rod.setPipeline('Light2D');
      if (this.bobberFishingRod.bobberSinkerLine) {
          this.bobberFishingRod.bobberSinkerLine.setPipeline('Light2D');
      }
      this.bobberBait.bobber.setPipeline('Light2D');
      if (this.bobberBait.sinker) {
          this.bobberBait.sinker.setPipeline('Light2D');
      }

      this.catchMechanic = new CatchMechanic(this, null, this.fishes, this.bobberBait);
  } else {
      this.bait = new Bait(this, this.player);
      this.fishingRod = new FishingRod(this, this.player, this.bait);

      this.fishingRod.rod.setPipeline('Light2D');
      this.bait.ball.setPipeline('Light2D');

      this.catchMechanic = new CatchMechanic(this, this.bait, this.fishes);
  }
  }
    

  update() {
    if (this.isGamePaused) return

    this.player.update()

    if (Phaser.Input.Keyboard.JustDown(this.switchKey)) {
      this.toggleRod()
    }

    if (this.isUsingBobberRod && this.bobberFishingRod) {
      this.bobberBait.update(this.waterLineY)
      this.bobberFishingRod.update()
      //if (this.bobberBait.bobber && this.bobberBait.bobber.body) {
        //this.velocityText.setText(`Velocity: ${Math.round(this.bobberBait.bobber.body.velocity.x)}, ${Math.round(this.bobberBait.bobber.body.velocity.y)}`)
      //}
    } else if (this.fishingRod && this.bait) {
      this.bait.update(this.waterLineY)
      this.fishingRod.update()
      //if (this.bait.ball && this.bait.ball.body) {
        //this.velocityText.setText(`Velocity: ${Math.round(this.bait.ball.body.velocity.x)}, ${Math.round(this.bait.ball.body.velocity.y)}`)
      //}
    }
    // Update the red dot to match the light's position
    //this.lightDot.setPosition(this.light.x, this.light.y);

    this.fishes.forEach((fish) => fish.update())

    this.catchMechanic.update()
    
    if (this.increaseBobberKey.isDown) {
      const isStationary = !this.bait?.hasThrown && !this.bait?.isResetting &&
      (!this.bobberBait?.hasThrown && !this.bobberBait?.isResetting)

      if (!isStationary) {
      console.log('prevented bobber.')
      return
      }
      setBobberDistance(Math.min(480, BOBBER_DISTANCE + 2));
      this.bobberDistanceText.setText(`Bobber Distance: ${BOBBER_DISTANCE/100}m`);
      console.log('Increased BOBBER_DISTANCE:', BOBBER_DISTANCE);
    }
    
    if (this.decreaseBobberKey.isDown) {
      const isStationary = !this.bait?.hasThrown && !this.bait?.isResetting &&
      (!this.bobberBait?.hasThrown && !this.bobberBait?.isResetting)

      if (!isStationary) {
      console.log('prevented bobber.')
      return
      }
        setBobberDistance(Math.max(50, BOBBER_DISTANCE - 2));
        this.bobberDistanceText.setText(`Bobber Distance: ${BOBBER_DISTANCE/100}m`);
        console.log('Decreased BOBBER_DISTANCE:', BOBBER_DISTANCE);
    }
  
    
  }
}
