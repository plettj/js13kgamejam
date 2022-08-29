import TilesetSrc from "./assets/tileset.png";
import tilemap from "./assets/mapFile.json";

const tileset = new Image();
tileset.src = TilesetSrc;

export default async function loadAssets() {
  const promises = [];

  promises.push(new Promise((res) => (tileset.onload = res)));

  await Promise.all(promises);
}

export { tileset, tilemap };
