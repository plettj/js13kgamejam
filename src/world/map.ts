import { tilemap, tileset } from "../assets";

export default async function worldMap() {
  for (const set of tilemap.tilesets) {
    delete set["source"];
    set["image"] = tileset;
  }

  return tilemap;
}
