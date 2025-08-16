import { fetchBinOrLoad, fetchTextOrLoad } from "../fetchOrLoad.js";
import { M3U8 } from "../M3U8.js";
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

// https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata

/*
  {
    src: "https://code4fukui.github.io/opendata-songs/handagote-song.mp3",
    title: "はんだごてのうた",
    artist: "taisukef",
    album: "はんだごて",
    artwork: [{ src: "https://code4fukui.github.io/opendata-songs/handagote-song.jpg", sizes: "512x512", type: "image/jpeg" }]
  },
*/

const getFilename = (path) => {
  const n = path.lastIndexOf("/");
  if (n < 0) return path;
  return path.substring(n + 1);
};

const setExt = (fn, ext) => {
  const n = fn.lastIndexOf(".");
  if (n < 0) return fn + ".ext";
  return fn.substring(0, n + 1) + ext;
};

const fn = Deno.args[0];
const m3u8 = await M3U8.fetch(fn);
console.log(m3u8);
const files = m3u8.getFiles();
const metas = [];
const base = fn.substring(0, fn.lastIndexOf("/") + 1);
console.log(base);
for (const file of files) {
  const src = file;
  const fn = file.substring(file.lastIndexOf("/") + 1);
  console.log(fn);

  const bin = await fetchBinOrLoad(file);
  console.log(bin);
  const tags = await MediaTags.decode(bin);
  console.log(tags);
  const meta = {
    src,
    title: tags.tags.title,
    artist: tags.tags.artist,
  };
  if (tags.tags.picture) {
    const p = tags.tags.picture;
    const bin = new Uint8Array(p.data);
    const ext = p.format.substring(p.format.indexOf("/") + 1);
    const fnimg = setExt(fn, ext);
    await Deno.writeFile(fnimg, bin);
    meta.artwork = [
      {
        src: base + fnimg,
        sizes: "512x512",
        type: p.format,
      }
    ];
  }
  metas.push(meta);
}
await Deno.writeTextFile(setExt(getFilename(fn), "media.json"), JSON.stringify(metas, null, 2));
