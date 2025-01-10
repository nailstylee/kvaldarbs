import { FISH_SIZES } from './Constants.js';
const levelConfigs = [
  {
    land: {
      topLeft: { x: 1500, y: 570 },
      bottomRight: { x: 1920, y: 600 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1920, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 350 },
    fishes: [
      { x: 600, y: 550, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 600, y: 550, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
    ],
    winCondition: {
      active2: 1,
      both2: 4,
    },
    timeLimit: 120,
    maxBaitUsage: 20,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 920,
        y: 160,
        radius: 1400,
        intensity: 7
      }
    },
    skyImage: 'sky1',
  },
  {
    land: {
      topLeft: { x: 1500, y: 570 },
      bottomRight: { x: 1920, y: 600 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1920, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 350 },
    fishes: [
      { x: 600, y: 650, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 200, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 750, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
    ],
    winCondition: {
      active2: 2,
      both2: 5,
    },
    timeLimit: 160,
    maxBaitUsage: 20,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 920,
        y: 160,
        radius: 1400,
        intensity: 7
      }
    },
    skyImage: 'sky1',
  },
  {
    land: {
      topLeft: { x: 1500, y: 570 },
      bottomRight: { x: 1920, y: 600 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1920, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 350 },
    fishes: [
      { x: 600, y: 650, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 200, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 750, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
    ],
    winCondition: {
      active2: 1,
      passive1: 1,
      both2: 3,
    },
    timeLimit: 160,
    maxBaitUsage: 20,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 920,
        y: 160,
        radius: 1400,
        intensity: 7
      }
    },
    skyImage: 'sky1',
  },
  {
    land: {
      topLeft: { x: 1500, y: 450 },
      bottomRight: { x: 1920, y: 500 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1920, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 320 },
    fishes: [
      { x: 110, y: 700, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2']},
      { x: 100, y: 800, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 100, y: 900, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1000, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1100, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 500, y: 850, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 900, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 850, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 700, y: 950, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
    ],
    winCondition: {
      active1: 3,
      passive2: 2,
    },
    timeLimit: 140,
    maxBaitUsage: 20,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 980,
        y: 300,
        radius: 1800,
        intensity: 7
      }
    },
    skyImage: 'sky2',
  },
  {
    land: {
      topLeft: { x: 1500, y: 450 },
      bottomRight: { x: 1920, y: 500 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1920, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 320 },
    fishes: [
      { x: 110, y: 700, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2']},
      { x: 100, y: 800, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 100, y: 900, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1000, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1100, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 500, y: 850, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 900, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 850, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 700, y: 950, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 800, y: 750, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 700, y: 850, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 800, y: 750, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 600, y: 850, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
    ],
    winCondition: {
      active1: 3,
      passive2: 2,
      both1: 1,
    },
    timeLimit: 140,
    maxBaitUsage: 25,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 980,
        y: 300,
        radius: 1800,
        intensity: 7
      }
    },
    skyImage: 'sky2',
  },
  {
    land: {
      topLeft: { x: 1500, y: 450 },
      bottomRight: { x: 1920, y: 500 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1920, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 320 },
    fishes: [
      { x: 110, y: 700, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2']},
      { x: 100, y: 800, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 100, y: 900, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1000, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1100, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 500, y: 850, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 900, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 850, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 700, y: 950, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 800, y: 750, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 700, y: 850, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 800, y: 750, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 600, y: 850, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
    ],
    winCondition: {
      active1: 1,
      passive2: 3,
      both1: 3,
    },
    timeLimit: 140,
    maxBaitUsage: 25,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 980,
        y: 300,
        radius: 1800,
        intensity: 7
      }
    },
    skyImage: 'sky2',
  },
  {
    land: {
      topLeft: { x: 1600, y: 470 },
      bottomRight: { x: 1820, y: 500 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1720, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 320 },
    fishes: [
      { x: 600, y: 650, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 200, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 750, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
    ],
    winCondition: {
      active2: 1,
      passive1: 1,
      both2: 3,
    },
    timeLimit: 160,
    maxBaitUsage: 20,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 950,
        y: 220,
        radius: 1000,
        intensity: 2
      }
    },
    skyImage: 'sky3',
  },
  {
    land: {
      topLeft: { x: 1600, y: 470 },
      bottomRight: { x: 1820, y: 500 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1720, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 320 },
    fishes: [
      { x: 600, y: 650, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 200, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 750, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
    ],
    winCondition: {
      active2: 4,
      passive1: 2,
      both2: 3,
    },
    timeLimit: 200,
    maxBaitUsage: 25,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 950,
        y: 220,
        radius: 1000,
        intensity: 2
      }
    },
    skyImage: 'sky3',
  },
  {
    land: {
      topLeft: { x: 1600, y: 470 },
      bottomRight: { x: 1820, y: 500 },
    },
    water: {
      topLeft: { x: 0, y: 550 },
      bottomRight: { x: 1720, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1600, y: 320 },
    fishes: [
      { x: 600, y: 650, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 200, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 750, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
    ],
    winCondition: {
      active2: 3,
      passive1: 2,
      both2: 3,
    },
    timeLimit: 200,
    maxBaitUsage: 25,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 950,
        y: 220,
        radius: 1000,
        intensity: 2
      }
    },
    skyImage: 'sky3',
  },
  {
    land: {
      topLeft: { x: 1750, y: 470 },
      bottomRight: { x: 1820, y: 500 },
    },
    water: {
      topLeft: { x: 0, y: 650 },
      bottomRight: { x: 1720, y: 1080 },
    },
    waterlineOffset: 0,
    player: { x: 1800, y: 320 },
    fishes: [
      { x: 600, y: 650, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 200, y: 750, type: 'passive1', imageKey: 'passiveFish1', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 800, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 500, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 700, y: 850, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 1000, y: 750, type: 'both2', imageKey: 'bothFish2', size: FISH_SIZES['both2'] },
      { x: 600, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 200, y: 650, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 900, y: 750, type: 'active2', imageKey: 'activeFish2', size: FISH_SIZES['active2'] },
      { x: 110, y: 700, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2']},
      { x: 100, y: 800, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 100, y: 900, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1000, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 300, y: 1100, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 500, y: 850, type: 'passive2', imageKey: 'passiveFish2', size: FISH_SIZES['passive2'] },
      { x: 900, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 850, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 400, y: 650, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 700, y: 950, type: 'active1', imageKey: 'activeFish1', size: FISH_SIZES['active1'] },
      { x: 800, y: 750, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 700, y: 850, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 800, y: 750, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
      { x: 600, y: 850, type: 'both1', imageKey: 'bothFish1', size: FISH_SIZES['both1'] },
    ],
    winCondition: {
      active2: 1,
      passive1: 1,
      both2: 1,
      active1: 1,
      passive2: 1,
      both1: 1,
    },
    timeLimit: 200,
    maxBaitUsage: 25,
    lighting: {
      ambientColor: 0x555555,
      light: {
        x: 950,
        y: 300,
        radius: 1900,
        intensity: 4
      }
    },
    skyImage: 'sky4',
  }
]

export { levelConfigs }
