import WorldMap from "./map";

export default class World {
  map: WorldMap;

  constructor(map: WorldMap) {
    this.map = map;
  }

  public draw() {}
}
