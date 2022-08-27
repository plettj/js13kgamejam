import loadAssets from "../assets";

export default async function worldMap() {
  const { tilemap, tileset } = await loadAssets();

  for (const set of tilemap.tilesets) {
    delete set["source"];
    set["image"] = tileset;
  }

  return tilemap;
}
