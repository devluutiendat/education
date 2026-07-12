import { useEffect } from "react";
import Phaser from "phaser";
import { config } from "../components/config";
import MenuScene from "../components/MenuScene";
import CountingScene from "../games/CountingScene";
import ShapeClassificationScene from "../games/ShapeClassificationScene";

export default function GamePage() {
  useEffect(() => {
    const game = new Phaser.Game({...config, scene: [
    MenuScene,
    CountingScene,
    ShapeClassificationScene,
  ],
    });

    return () => game.destroy(true);
  }, []);

  return (
    <div className="flex justify-center mt-5">
      <div id="game-container"></div>
    </div>
  );
}

