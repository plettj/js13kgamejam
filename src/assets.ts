import TilemapSrc from "./assets/tilemap.jpg";

export default async function loadAssets() {
  const promises = [];

  const tilemap = new Image();
  tilemap.src = TilemapSrc;

  promises.push(new Promise((res) => (tilemap.onload = res)));

  await Promise.all(promises);

  return { tilemap };
}
