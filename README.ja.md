# M3U8

M3U8ファイルを扱うためのライブラリです。

## デモ

```js
import { M3U8 } from "https://code4fukui.github.io/M3U8/M3U8.js";

const m3u8 = await M3U8.fetch(url);
console.log(m3u8.getFiles());
```

## 機能

- M3U8ファイルの読み込み
- M3U8ファイルの出力
- ディレクトリからM3U8ファイルの自動生成

## 必要環境

Deno環境での使用を想定しています。

## 使い方

M3U8ファイルを読み込んで、ファイル一覧を取得する例:

```js
import { M3U8 } from "https://code4fukui.github.io/M3U8/M3U8.js";

const m3u8 = await M3U8.fetch(url);
console.log(m3u8.getFiles());
```

ディレクトリからM3U8ファイルを自動生成する例:

```js
import { M3U8 } from "https://code4fukui.github.io/M3U8/M3U8.js";

const m3u8 = await M3U8.fromDir(path);
await Deno.writeTextFile(path + "/out.m3u8", m3u8.toString());
```

## ライセンス

MIT License