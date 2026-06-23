import Phaser from 'phaser';

type ShapeType = 'circle' | 'square' | 'triangle';

interface ShapeData {
  type: ShapeType;
  x: number;
  y: number;
}

export default class ShapeClassificationGame extends Phaser.Scene {
  private score = 0;
  private totalShapes = 0;

  constructor() {
    super('ShapeClassificationGame');
  }

  create() {
    this.cameras.main.setBackgroundColor('#f8f9fa');

    this.createTitle();
    this.createDropZones();
    this.createShapes();
  }

  private createTitle() {
    this.add.text(
      this.scale.width / 2,
      40,
      'Kéo hình vào đúng hộp',
      {
        fontSize: '32px',
        color: '#333',
      }
    ).setOrigin(0.5);
  }

  private createDropZones() {
    const zones = [
      {
        x: 200,
        y: 180,
        type: 'circle',
        label: 'Hình tròn',
        color: 0x4caf50,
      },
      {
        x: 500,
        y: 180,
        type: 'square',
        label: 'Hình vuông',
        color: 0x2196f3,
      },
      {
        x: 800,
        y: 180,
        type: 'triangle',
        label: 'Hình tam giác',
        color: 0xff9800,
      },
    ];

    zones.forEach((zoneData) => {
      const graphics = this.add.graphics();

      graphics.lineStyle(4, zoneData.color);
      graphics.strokeRoundedRect(
        zoneData.x - 100,
        zoneData.y - 60,
        200,
        120,
        16
      );

      this.add
        .text(zoneData.x, zoneData.y - 80, zoneData.label, {
          fontSize: '24px',
          color: '#333',
        })
        .setOrigin(0.5);

      const zone = this.add.zone(
        zoneData.x,
        zoneData.y,
        200,
        120
      );

      zone.setRectangleDropZone(200, 120);
      zone.setData('type', zoneData.type);
    });
  }

  private createShapes() {
    const shapeList: ShapeData[] = [
      { type: 'circle', x: 150, y: 500 },
      { type: 'triangle', x: 300, y: 500 },
      { type: 'square', x: 450, y: 500 },
      { type: 'circle', x: 600, y: 500 },
      { type: 'triangle', x: 750, y: 500 },
      { type: 'square', x: 900, y: 500 },
    ];

    this.totalShapes = shapeList.length;

    shapeList.forEach((shape) => {
      const gameObject = this.createShape(
        shape.type,
        shape.x,
        shape.y
      );

      gameObject.setData('type', shape.type);
      gameObject.setData('startX', shape.x);
      gameObject.setData('startY', shape.y);

      gameObject.setInteractive(
        new Phaser.Geom.Rectangle(-40, -40, 80, 80),
        Phaser.Geom.Rectangle.Contains
      );

      this.input.setDraggable(gameObject);
    });

    this.registerDragEvents();
  }

  private createShape(
    type: ShapeType,
    x: number,
    y: number
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    const g = this.add.graphics();

    switch (type) {
      case 'circle':
        g.fillStyle(0x4caf50);
        g.fillCircle(0, 0, 35);
        break;

      case 'square':
        g.fillStyle(0x2196f3);
        g.fillRect(-35, -35, 70, 70);
        break;

      case 'triangle':
        g.fillStyle(0xff9800);

        g.beginPath();
        g.moveTo(0, -40);
        g.lineTo(-40, 40);
        g.lineTo(40, 40);
        g.closePath();
        g.fillPath();
        break;
    }

    container.add(g);

    return container;
  }

  private registerDragEvents() {
    this.input.on(
      'drag',
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Container,
        dragX: number,
        dragY: number
      ) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    this.input.on(
      'drop',
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Container,
        dropZone: Phaser.GameObjects.Zone
      ) => {
        const shapeType = gameObject.getData('type');
        const zoneType = dropZone.getData('type');

        if (shapeType === zoneType) {
          this.handleCorrect(gameObject, dropZone);
        } else {
          this.handleWrong(gameObject);
        }
      }
    );

    this.input.on(
      'dragend',
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Container,
        dropped: boolean
      ) => {
        if (!dropped) {
          this.handleWrong(gameObject);
        }
      }
    );
  }

  private handleCorrect(
    shape: Phaser.GameObjects.Container,
    zone: Phaser.GameObjects.Zone
  ) {
    shape.x = zone.x;
    shape.y = zone.y;

    shape.disableInteractive();

    this.tweens.add({
      targets: shape,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 150,
      yoyo: true,
    });

    this.score++;

    if (this.score >= this.totalShapes) {
      this.time.delayedCall(500, () => {
        this.showWinMessage();
      });
    }
  }

  private handleWrong(
    shape: Phaser.GameObjects.Container
  ) {
    this.tweens.add({
      targets: shape,
      x: shape.getData('startX'),
      y: shape.getData('startY'),
      duration: 300,
      ease: 'Back.Out',
    });

    this.cameras.main.shake(80, 0.002);
  }

  private showWinMessage() {
    const bg = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      450,
      180,
      0xffffff
    );

    bg.setStrokeStyle(4, 0x4caf50);

    this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        '🎉 Hoàn thành!\nBé làm rất tốt!',
        {
          fontSize: '36px',
          color: '#4caf50',
          align: 'center',
        }
      )
      .setOrigin(0.5);
  }
}