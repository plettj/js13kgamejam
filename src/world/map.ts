import { tilemap, tileset } from "../assets";

export default async function worldMap(world_size: {x: number, y: number}) {

  // TODO (for zack): use world_size to affect the actual viewable window of our map

  for (const set of tilemap.tilesets) {
    delete set["source"];
    set["image"] = tileset;
  }

  return tilemap;
}
