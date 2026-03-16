# M3U8

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A JavaScript library to handle M3U8 playlists.

## Features
- Fetch M3U8 playlists from local files or URLs
- Parse M3U8 playlists and extract file information
- Create M3U8 playlists from a list of files
- Supports basic M3U8 tags like `#EXTINF`

## Usage

```js
import { M3U8 } from "https://code4fukui.github.io/M3U8/M3U8.js";

const m3u8 = await M3U8.fetch(url);
console.log(m3u8.getFiles());
```

## License
MIT License — see [LICENSE](LICENSE).