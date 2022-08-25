import TilesetSrc from "./assets/Sprite-0001.webp";
import TilemapSrc from "./assets/mapFile.json";

export default async function loadAssets() {
  const promises = [];

  const tileset = new Image();
  tileset.src = TilesetSrc;

  promises.push(new Promise((res) => (tileset.onload = res)));

  await Promise.all(promises);

  return { tileset, TilemapSrc };
}
