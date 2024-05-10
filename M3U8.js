import { fetchTextOrLoad } from "./fetchOrLoad.js";

export class M3U8 {
  constructor(txt) {
    if (typeof txt == "string") {
      this.files = txt.split("\n").filter(i => !i.startsWith("#") && i.length > 0).map(i => ({ file: i }));;
    } else if (Array.isArray(txt)) {
      this.files = txt;
    } else {
      throw new Error("accept only string or array");
    }
  }
  getFiles() {
    return this.files.map(i => i.file);
  }
  static async fetch(path) {
    const txt = await fetchTextOrLoad(path);
    return new M3U8(txt);
  }
};
