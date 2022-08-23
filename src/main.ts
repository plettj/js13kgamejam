import { init, Sprite, GameLoop, TileEngine } from "kontra";
import loadAssets from "./assets";

const { canvas } = init();

const ASPECT_RATIO = 4 / 3;

let sprite = Sprite({
  x: 100, // starting x,y position of the sprite
  y: 80,
  color: "blue", // fill color of the sprite rectangle
  width: 20, // width and height of the sprite rectangle
  height: 40,
  dx: 2, // move the sprite 2px to the right every frame
});

async function main() {
  const { tilemap } = await loadAssets();

  let tileEngine = TileEngine({
    tilewidth: 20,
    tileheight: 20,
    width: 9,
    height: 9,
    tilesets: [
      {
        firstgid: 1,
        image: tilemap,
      },
    ],
    layers: [
      {
        name: "collision",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 8, 0, 0, 0, 0, 6, 27, 24,
          24, 25, 0, 0, 0, 0, 23, 24, 24, 24, 26, 8, 0, 0, 0, 23, 24, 24, 24,
          24, 26, 8, 0, 0, 23, 24, 24, 24, 24, 24, 25, 0, 0, 40, 41, 41, 10, 24,
          24, 25, 0, 0, 0, 0, 0, 40, 41, 41, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
      },
    ],
  });

  let loop = GameLoop({
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
      canvas.width = window.innerWidth / 2;
      canvas.height = canvas.width / ASPECT_RATIO;

      // context.fillStyle = "black";
      // context.fillRect(0, 0, canvas.width, canvas.height);

      // render the game state
      tileEngine.render();
      sprite.render();
    },
  });

  loop.start();
}

main();
