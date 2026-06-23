import Phaser from "phaser";
import questions from "../data/counting.json";
import thunderImage from "../assets/vite.svg";
import atomicImage from "../assets/react.svg";
export default class CountObjectsGame extends Phaser.Scene {
  private currentQuestion = 0;
  private score = 0;
  
  constructor() {
    super("CountObjectsGame");
  }

  preload() {
    this.load.image(
      "apple",
      "https://labs.phaser.io/assets/sprites/apple.png"
    );
    this.load.image(
      "atomic",
      atomicImage
    );
    this.load.image(
      "thunder",
      thunderImage
    );
  }

  create() {
    this.showQuestion();
  }

  private showQuestion() {
    this.children.removeAll();

    const question = questions[this.currentQuestion];

    this.add.text(250, 50, `Có bao nhiêu ${question.object}?`, {
      fontSize: "32px",
      color: "#fff",
    });

    for (let i = 0; i < question.count; i++) {
      this.add.image(
        250 + i * 100,
        250,
        question.image
      );
    }

    const answers = [
      question.count - 1,
      question.count,
      question.count + 1,
    ];

    Phaser.Utils.Array.Shuffle(answers);

    answers.forEach((answer, index) => {
      const btn = this.add
        .text(
          250 + index * 120,
          450,
          answer.toString(),
          {
            fontSize: "40px",
            backgroundColor: "#4CAF50",
            padding: { x: 20, y: 10 },
          }
        )
        .setInteractive();

      btn.on("pointerdown", () => {
        this.handleAnswer(answer === question.count);
      });
    });
  }

  private handleAnswer(correct: boolean) {
    if (correct) {
      this.score++;
      this.add.text(350, 520, "✅ Correct!", {
        fontSize: "28px",
        color: "#00aa00",
      });
    } else {
      this.add.text(350, 520, "❌ Wrong!", {
        fontSize: "28px",
        color: "#ff0000",
      });
    }

    this.time.delayedCall(1000, () => {
      this.currentQuestion++;

      if (this.currentQuestion >= questions.length) {
        this.showGameFinished();
      } else {
        this.showQuestion();
      }
    });
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