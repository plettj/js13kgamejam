import TilesetSrc from "./assets/tileset.png";
import tilemap from "./assets/mapFile.json";
import BGImageSrc from "./assets/background.png";

const tileset = new Image();
tileset.src = TilesetSrc;

const bgImage = new Image();
bgImage.src = BGImageSrc;

export default async function loadAssets() {
  const promises = [];

  promises.push(new Promise((res) => (tileset.onload = res)));
  promises.push(new Promise((res) => (bgImage.onload = res)));

  await Promise.all(promises);
}

export { tileset, bgImage, tilemap };
