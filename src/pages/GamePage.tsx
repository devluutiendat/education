import { useEffect } from "react";
import Phaser from "phaser";

export default function GamePage() {
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 900,
      height: 600,
      parent: "game-container",
      scene: []
    });

    return () => game.destroy(true);
  }, []);

  return (
    <div className="flex justify-center mt-5">
      <div id="game-container"></div>
    </div>
  );
}