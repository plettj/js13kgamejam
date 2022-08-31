import { keyPressed, SpriteClass } from "kontra";

class Player extends SpriteClass {
  speed = 30;
  jumping = false;
  jumpHeight = 100;
  minJumpHeight = 50;
  maxVelocity = 10;
  termVelocity = 0;
  timeToApex = 1;

  onGround = false;

  constructor(props: any) {
    super(props);
  }

  private handlePhysics() {
    console.log(this.dy);
    if (this.onGround && !this.jumping) {
      // this.dy = this.dy * -1;
      // this.dy > 0 ? (this.dy = -this.dy) : (this.dy = --this.dy);
      this.velocity.y = 0;

      return;
    }

    const v = Math.sqrt((this.velocity.x ^ 2) + (this.velocity.y ^ 2));

    if (v < this.maxVelocity) {
      const vs = this.maxVelocity / v;
      this.velocity.x = this.velocity.x * vs;
      this.velocity.y = this.velocity.y * vs;
    }
    this.velocity.y = this.velocity.y / 2;
  }

  update(dt: number) {
    this.advance(dt);

    if (keyPressed("arrowleft")) {
      this.dx = -this.speed;
    } else if (keyPressed("arrowright")) {
      this.dx = this.speed;
    } else {
      this.dx = 0;
    }
    if (keyPressed("space")) {
      // https://2dengine.com/?p=platformers
      this.jumping = true;
      this.onGround = false;
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

    this.handlePhysics();
  }
}

export default function CreatePlayer() {
  const player = new Player({
    x: 40, // starting x,y position of the sprite
    y: 40,

    color: "blue", // fill color of the sprite rectangle
    width: 10, // width and height of the sprite rectangle
    height: 10,
    dx: 0, // move the sprite 2px to the right every frame
  });

  return player;
}
