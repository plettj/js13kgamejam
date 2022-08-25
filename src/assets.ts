import TilemapSrc from "./assets/Sprite-0001.webp";

export default async function loadAssets() {
  const promises = [];

  const tilemap = new Image();
  tilemap.src = TilemapSrc;

  promises.push(new Promise((res) => (tilemap.onload = res)));

  await Promise.all(promises);

  return { tilemap };
}
