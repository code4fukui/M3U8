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
  t.assertEquals(files, ["test1.jpg", "test2.jpg"]);
});
