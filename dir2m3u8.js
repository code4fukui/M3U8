import { M3U8 } from "./M3U8.js";

const path = Deno.args[0];
if (!path) {
  console.log("dir2m3u8 [dir]");
  Deno.exit(1);
}
const m3u8 = await M3U8.fromDir(path);
await Deno.writeTextFile(path + "/out.m3u8", m3u8.toString());
