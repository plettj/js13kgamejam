import { keyPressed, SpriteClass } from "kontra";

class Player extends SpriteClass {
  speed = 10;
  jumping = false;
  jumpHeight = 20;
  minJumpHeight = 10;
  maxVelocity = 10;
  termVelocity = 0;
  timeToApex = 1;

  constructor(props: any) {
    super(props);
  }

  private handlePhysics(dt: number) {
    const v = Math.sqrt((this.velocity.x ^ 2) + (this.velocity.y ^ 2));
    if (v > 10) {
      const vs = this.maxVelocity / v;
      this.velocity.x = this.velocity.x * vs;
      this.velocity.y = this.velocity.y * vs;
    }
    this.velocity.y = this.velocity.y / 2;
  }

  update(dt: number) {
    this.advance(dt);

    if (keyPressed("arrowleft")) {
      this.dx = -10;
    } else if (keyPressed("arrowright")) {
      this.dx = 10;
    } else {
      this.dx = 0;
    }
    if (keyPressed("space")) {
      // https://2dengine.com/?p=platformers
      this.jumping = true;
      const g = (2 * this.jumpHeight) / (this.timeToApex ^ 2);
      const initJumpVelocity = Math.sqrt(2 * g * this.jumpHeight);
      this.timeToApex = initJumpVelocity / g;

      this.termVelocity = Math.sqrt(
        initJumpVelocity ^ (2 + 2 * g * (this.jumpHeight - this.minJumpHeight))
      );

      this.dy = -initJumpVelocity;
    } else {
      this.jumping = false;
      this.dy = this.termVelocity;
    }

    this.handlePhysics(dt);
  }
}

export default function CreatePlayer() {
  const player = new Player({
    x: 50, // starting x,y position of the sprite
    y: 100,
    color: "blue", // fill color of the sprite rectangle
    width: 10, // width and height of the sprite rectangle
    height: 10,
    dx: 0, // move the sprite 2px to the right every frame
  });

  return player;
}
