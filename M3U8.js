import { fetchTextOrLoad } from "./fetchOrLoad.js";

export class M3U8 {
  constructor(txt, basepath) {
    if (basepath && basepath.lastIndexOf("/") >= 0) {
      basepath = basepath.substring(0, basepath.lastIndexOf("/") + 1);
      if (basepath != "./") this.basepath = basepath;
    }
    if (typeof txt == "string") {
      if (!txt.startsWith("#EXTM3U\n")) {
        this.files = txt.split("\n").filter(i => !i.startsWith("#") && i.length > 0).map(i => ({ file: i }));;
      } else {
        this.files = [];
        const ss = txt.split("\n");
        let obj = { file: "" };
        for (let i = 0; i < ss.length; i++) {
          const s = ss[i];
          if (s.length == 0) continue;
          if (s[0] == "#") {
            if (s.startsWith("#EXTINF:")) {
              let n = s.indexOf(",", 8);
              if (n < 0) {
                const num = parseInt(s.substring(8));
                if (!isNaN(n)) obj.duration = num;
              } else {
                const num = parseInt(s.substring(8, n));
                if (!isNaN(n)) obj.duration = num;
                const n2 = s.indexOf("-", n + 1);
                if (n2 < 0) {
                  obj.title = s.substring(n + 1).trim();
                } else {
                  obj.title = s.substring(n + 1, n2).trim();
                  obj.author = s.substring(n2 + 1).trim();
                }
              }
              continue;
            } else {
              continue;
            }
          }
          obj.file = s;
          this.files.push(obj);
          obj = { file: "" };
        }
      }
    } else if (Array.isArray(txt)) {
      this.files = txt;
    } else {
      throw new Error("accept only string or array");
    }
  }
  makePath(path) {
    if (this.basepath) {
      return this.basepath + path;
    }
    return path;
  }
  getFiles() {
    return this.files.map(i => this.makePath(i.file));
  }
  getInfo() {
    return this.files.map(i => {
      i.file = this.makePath(i.file);
      return i;
    });
  }
  static async fetch(path) {
    const txt = await fetchTextOrLoad(path);
    return new M3U8(txt, path);
  }
  static async fromDir(dir) {
    const list = [];
    for await (const f of Deno.readDir(dir)) {
      if (f.isDirectory) continue;
      if (f.name.startsWith(".")) continue;
      list.push({ file: f.name });
    }
    return new M3U8(list);
  }
  toString() {
    const ss = this.files.map(i => {
      if (i.duration) {
        if (i.title) {
          if (i.author) {
            return "#M3U8INFO:" + i.duration + ", " + i.title + " - " + i.author + "\n" + i.file;
          } else {
            return "#M3U8INFO:" + i.duration + ", " + i.title + "\n" + i.file;
          }
        }
        return "#M3U8INFO:" + i.duration + "\n" + i.file;
      }
      return i.file;
    });
    ss.unshift("#M3U8EXT");
    return ss.join("\n") + "\n";
  }
};
