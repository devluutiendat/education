import Phaser from "phaser";import { generateQuestion } from "../utils";

export default class CalculatingScene extends Phaser.Scene {
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text 
  private currentAnswer: number = 0;
  private questionText!: Phaser.GameObjects.Text 
  private choices!: Phaser.GameObjects.Group;
  constructor() {
    super("CalculatingScene");
  }

  create() {
    this.score = 0;

    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "32px"
    });

    this.loadQuestion();
  }

  loadQuestion() {
    const q = generateQuestion();

    this.currentAnswer = q.answer;

    if (this.questionText) {
      this.questionText.destroy();
    }

    this.questionText = this.add.text(
      400,
      100,
      q.text + " = ?",
      {
        fontSize: "48px"
      }
    ).setOrigin(0.5);

    this.createChoices(q.answer);
  }

  createChoices(correctAnswer : number) {
    if (this.choices) {
      this.choices.clear(true, true);
    }

    this.choices = this.add.group();

    const answers = [correctAnswer];

    while (answers.length < 4) {
      const fake =
        correctAnswer +
        Phaser.Math.Between(-10, 10);

      if (!answers.includes(fake)) {
        answers.push(fake);
      }
    }

    Phaser.Utils.Array.Shuffle(answers);

    answers.forEach((ans, index) => {
      const x = 200 + (index % 2) * 300;
      const y = 250 + Math.floor(index / 2) * 150;

      const text = this.add.text(
        x,
        y,
        ans.toString(),
        {
          fontSize: "40px",
          backgroundColor: "#3498db",
          padding: { x: 20, y: 10 },
        }
      )
      .setInteractive();

      text.on("pointerdown", () => {
        this.checkAnswer(ans);
      });

      this.choices.add(text);
    });
  }

  checkAnswer(answer:number) {
    if (answer === this.currentAnswer) {
      this.score += 10;
    } else {
      this.score -= 5;
    }

    this.scoreText.setText(
      `Score: ${this.score}`
    );

    if (this.score > 30) {
      this.showGameFinished();
    }else {
    this.loadQuestion();
    }
  }

  private showGameFinished() {
    this.children.removeAll();

    this.add.text(
      250,
      250,
      "🎉 Game Finished!",
      {
        fontSize: "48px",
        color: "#fff",
      }
    );
  }
}