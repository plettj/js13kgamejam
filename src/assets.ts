import TilesetSrc from "./assets/tileset.png";
import TilemapSrc from "./assets/mapFile.json";

export default async function loadAssets() {
  const promises = [];

  const tileset = new Image();
  tileset.src = TilesetSrc;

  promises.push(new Promise((res) => (tileset.onload = res)));

  const tilemap = TilemapSrc;

  await Promise.all(promises);

  return { tileset, tilemap };
}
