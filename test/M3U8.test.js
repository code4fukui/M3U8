import * as t from "https://deno.land/std/testing/asserts.ts";
import { M3U8 } from "../M3U8.js";

Deno.test("from file", async () => {
  const m3u8 = await M3U8.fetch("./test.m3u8");
  const files = m3u8.getFiles();
  t.assertEquals(files, ["test1.jpg", "test2.jpg"]);
});
Deno.test("from json", async () => {
  const m3u8 = new M3U8([
    { file: "test1.jpg" },
    { file: "test2.jpg" },
  ]);
  const files = m3u8.getFiles();
  t.assertEquals(files, ["test1.jpg", "test2.jpg"]);
});
Deno.test("via fetch", async () => {
  const m3u8 = await M3U8.fetch("https://code4fukui.github.io/M3U8/test/test.m3u8");
  const files = m3u8.getFiles();
  t.assertEquals(files, [
    "https://code4fukui.github.io/M3U8/test/test1.jpg",
    "https://code4fukui.github.io/M3U8/test/test2.jpg",
  ]);
});
Deno.test("EXTM3U from file", async () => {
  const m3u8 = await M3U8.fetch("./testext.m3u8");
  const files = m3u8.getFiles();
  t.assertEquals(files, ["test1.jpg", "test2.jpg"]);
  const info = m3u8.getInfo();
  t.assertEquals(info, [{
    file: "test1.jpg",
    duration: 3,
  }, {
    file: "test2.jpg",
    author: "Code for FUKUI",
    title: "title",
    duration: 5,
  }]);
});
Deno.test("toString", async () => {
  const info = [{
    file: "test1.jpg",
    duration: 3,
  }, {
    file: "test2.jpg",
    author: "Code for FUKUI",
    title: "title",
    duration: 5,
  }];
  const m3u8 = new M3U8(info);
  t.assertEquals(m3u8.toString(), `#M3U8EXT
#M3U8INFO:3
test1.jpg
#M3U8INFO:5, title - Code for FUKUI
test2.jpg
`);
});
Deno.test("fromDir on Deno", async () => {
  const m3u8 = await M3U8.fromDir("./dir")
  t.assertEquals(m3u8.toString(), `#M3U8EXT
dummy1.jpg
dummy2.jpg
`);
});
