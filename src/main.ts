import { init, Sprite, GameLoop } from "kontra";

const { canvas, context } = init();

const ASPECT_RATIO = 4 / 3;

let sprite = Sprite({
  x: 100, // starting x,y position of the sprite
  y: 80,
  color: "blue", // fill color of the sprite rectangle
  width: 20, // width and height of the sprite rectangle
  height: 40,
  dx: 2, // move the sprite 2px to the right every frame
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

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // render the game state
    sprite.render();
  },
});

loop.start(); // start the game
