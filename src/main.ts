import { init, Sprite, GameLoop, TileEngine } from "kontra";
//import loadAssets from "./assets";
import worldMap from "./world/map";

const { canvas } = init();

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

let sprite = Sprite({
  x: 0, // starting x,y position of the sprite
  y: 0,
  color: "blue", // fill color of the sprite rectangle
  width: unit, // width and height of the sprite rectangle
  height: unit,
  dx: 2, // move the sprite 2px to the right every frame
});

async function main() {
  const tileMap = await worldMap();
  const tileEngine = TileEngine(tileMap);

  const loop = GameLoop({
    clearCanvas: true,
    // create the main game loop
    update: function () {
      // update the game state
      sprite.update();

      // wrap the sprites position when it reaches
      // the edge of the screen
      if (sprite.x > canvas.width) {
        sprite.x = -sprite.width;
      }
    },
    render: function () {
      // render the game state

      tileEngine.render();
      sprite.render();
    },
  });

  loop.start();
}

main();
