import Phaser from 'phaser';
import MenuScene from './MenuScene';
import CountingScene from '../games/CountingScene';
import ShapeClassificationScene from '../games/ShapeClassificationScene';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#ffffff',
  scene: [
    MenuScene,
    CountingScene,
    ShapeClassificationScene,
  ],
};