# M3U8


M3U8プレイリストを扱うためのJavaScriptライブラリです。

## 特徴
- ローカルファイルまたはURLからのM3U8プレイリストの取得
- M3U8プレイリストの解析とファイル情報の抽出
- ファイルリストからのM3U8プレイリストの作成
- `#EXTINF` のような基本的なM3U8タグをサポート

## 使い方

```js
import { M3U8 } from "https://code4fukui.github.io/M3U8/M3U8.js";

const m3u8 = await M3U8.fetch(url);
console.log(m3u8.getFiles());
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
