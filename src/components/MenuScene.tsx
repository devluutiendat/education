import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#f5f7fb');

    this.add
      .text(width / 2, 80, '🎮 Bé Học Toán', {
        fontSize: '48px',
        color: '#333',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.createButton(
      width / 2,
      220,
      '🔢 Đếm số lượng',
      () => this.scene.start('CountingScene')
    );

    this.createButton(
      width / 2,
      350,
      '🔺 Phân loại hình dạng',
      () => this.scene.start('ShapeClassificationScene')
    );

    this.createButton(
      width / 2,
      480,
      '➕ Cộng trừ số học',
      () => this.scene.start('MathScene')
    );

    this.createBackButton();
  }

  private createButton(
    x: number,
    y: number,
    text: string,
    callback: () => void
  ) {
    const btn = this.add.rectangle(
      x,
      y,
      400,
      80,
      0x4caf50
    );

    const label = this.add.text(x, y, text, {
      fontSize: '28px',
      color: '#ffffff',
    });

    label.setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      btn.setScale(1.05);
    });

    btn.on('pointerout', () => {
      btn.setScale(1);
    });

    btn.on('pointerdown', callback);
  }

  private createBackButton() {
  const btn = this.add.text(
    20,
    20,
    '⬅ Menu',
    {
      fontSize: '24px',
      color: '#1976d2',
      backgroundColor: '#ffffff',
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      },
    }
  );

  btn.setInteractive({ useHandCursor: true });

  btn.on('pointerdown', () => {
    this.scene.start('MenuScene');
  });
}
}