import { GameLoop, init, initKeys, TileEngine } from "kontra";
import loadAssets, { bgImage } from "./assets";
import worldMap from "./world/map";
import CreatePlayer from "./world/player";

const { canvas, context } = init();

const WINDOW_SIZE = {
  x: 16,
  y: 12,
};
const ASPECT_RATIO = WINDOW_SIZE.x / WINDOW_SIZE.y;

function calculateUnit() {
  let newUnit =
    Math.floor(
      (window.innerWidth / window.innerHeight > ASPECT_RATIO
        ? Math.floor(window.innerHeight / WINDOW_SIZE.y)
        : Math.floor(window.innerWidth / WINDOW_SIZE.x)) / 2
    ) * 2;
  document.body.style.setProperty("--unit", newUnit + "px");
  return newUnit;
}

let unit = calculateUnit();

window.onresize = () => {
  unit = calculateUnit();
};

async function main() {
  await loadAssets();
  initKeys();

  const player = CreatePlayer();

  const tileMap = await worldMap();
  const tileEngine = TileEngine(tileMap);

  tileEngine.add(player);

  const loop = GameLoop({
    clearCanvas: true,
    // create the main game loop
    update: function (dt) {
      if (tileEngine.layerCollidesWith("blocks", player)) {
        player.dy -= 10;
      }
      // update the game state
      player.update(dt);
    },
    render: function () {
      // render the game state
      context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      tileEngine.render();
      player.render();
    },
  });

  loop.start();
}

main();
