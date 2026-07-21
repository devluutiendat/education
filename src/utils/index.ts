import Phaser from 'phaser';

export function generateQuestion() {
  const a = Phaser.Math.Between(1, 20);
  const b = Phaser.Math.Between(1, 20);

  const isAddition = Math.random() > 0.5;

  const answer = isAddition ? a + b : a - b;

  return {
    text: `${a} ${isAddition ? "+" : "-"} ${b}`,
    answer
  };
}
