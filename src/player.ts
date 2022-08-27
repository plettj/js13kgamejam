import { SpriteClass, Sprite } from "kontra";

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

export default class Player extends SpriteClass {
  constructor(params: ArgumentTypes<Sprite>) {
    super();
  }
}
