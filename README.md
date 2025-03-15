# nhk-reminder
気になるNHKの番組をGoogleカレンダーに自動登録するGAS

# about

GAS上にこのアプリを作成することで、キーワード登録したNHKの番組が自動でGoogleカレンダーへ登録されます。

登録される条件は以下の通りです。

- 番組名がいずれかのキーワードを含む
- 番組の説明文がいずれかのキーワードを含む

# 構築

1. GASと接続しプロジェクト初期化

```bash
clasp login
```

2. `.clasp.json` を以下のように修正

```json
{
  "scriptId": "{scriptId}",
  "rootDir": "dist",
  "scriptExtensions": [
    ".js",
    ".gs"
  ],
  "htmlExtensions": [
    ".html"
  ],
  "jsonExtensions": [
    ".json"
  ],
  "filePushOrder": ["main.ts"],
  "skipSubdirectories": false
}
```

3. 構築、デプロイ

```bash
npm run build
clasp push
```

4. スクリプトプロパティを登録

|key|value|
|-|-|
|`NHK_API_KEY`|[NHK番組表APIのAPIキー](https://api-portal.nhk.or.jp/)|
|`KEYWORDS`|カレンダーに登録したい番組を選択するキーワード（複数指定する場合は `,` 区切り）|
