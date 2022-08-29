import { GameLoop, init, initKeys, TileEngine } from "kontra";
import loadAssets from "./assets";
import worldMap from "./world/map";
import CreatePlayer from "./world/player";

const { canvas, context } = init("MainCanvas");

const WINDOW_SIZE = {
  x: 12,
  y: 9,
};
const ASPECT_RATIO = WINDOW_SIZE.x / WINDOW_SIZE.y;

function calculateUnit() {
  let newUnit =
    Math.floor(
      (window.innerWidth / window.innerHeight > ASPECT_RATIO
        ? Math.floor(window.innerHeight / WINDOW_SIZE.y)
        : Math.floor(window.innerWidth / WINDOW_SIZE.x)) / 4
    ) * 4;
  document.body.style.setProperty("--unit", newUnit + "px");

  canvas.width = 10 * WINDOW_SIZE.x;
  canvas.height = 10 * WINDOW_SIZE.y;

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

  const tileMap = await worldMap(WINDOW_SIZE);
  const tileEngine = TileEngine(tileMap);

  tileEngine.add(player);

  const loop = GameLoop({
    context: context,
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
      tileEngine.render();
      player.render();
    },
  });

  loop.start();
}

main();
