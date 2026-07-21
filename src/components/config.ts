import Phaser from 'phaser';
import MenuScene from './MenuScene';
import CountingScene from '../games/CountingScene';
import ShapeClassificationScene from '../games/ShapeClassificationScene';
import CalculatingScene from '../games/CalculatingScene';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#0000',
  scene: [
    MenuScene,
    CountingScene,
    ShapeClassificationScene,
    CalculatingScene
  ],
};