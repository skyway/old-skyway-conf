# SkyWay Conference

[SkyWay](https://webrtc.ecl.ntt.com/)を利用した[Web会議アプリ「SkyWay Conference」](https://conf.webrtc.ecl.ntt.com/)のソースコードです。

![SkyWay Conf](https://webrtc.ecl.ntt.com/img/conf/useimage1.png)

利用するには、SkyWayのへの登録とアプリケーション作成が必要です。   
SkyWayにまだアカウントを持っていない方は、以下のサイトから登録を行って下さい。  
https://console-webrtc-free.ecl.ntt.com/users/registration

アプリケーション作成時は、利用可能ドメインに **localhost** を追加して下さい。

## ビルド方法

### 1. ソースコードをダウンロード

- ZIPでダウンロードする場合
  - https://github.com/skyway/skyway-conf/archive/master.zip

- git clone する場合

```
$ git clone https://github.com/skyway/skyway-conf.git
```

### 2. APIキーを追記

SkyWayのアプリケーションのAPIキーを追記して下さい。

**src/conf/utils/skyway.ts**

```ts
import Peer, { SfuRoom } from "skyway-js";

export const initPeer = (forceTurn: boolean): Promise<Peer> => {
  return new Promise((resolve, reject) => {
    const peer = new Peer({
      key: "", //ここにAPIキーを追記
      debug: 2,
      config: {
        iceTransportPolicy: forceTurn ? "relay" : "all",
      },
    });
```

### 3. 実行

```
$ npm install
$ npm run dev
```

以下のURLにアクセスして動作確認して下さい。  
http://localhost:9000/webpack-dev-server/


注: SkyWay Confで利用している navigator.mediaDevices.getUserMedia は、localhost以外のサイトでは、TLS/SSLにより保護されたサイトでしか利用できません。そのため、コンソールに出てくる http://0.0.0.0:9000/webpack-dev-server/ では動作確認できませんので、ご注意下さい。

## プロダクション環境へのデプロイ

以下のコマンドで、プロダクション環境用のビルドを行います。

```
$ npm run build
```

docs フォルダに生成された以下のファイルを、ご自身で管理されているサーバにアップロードしてください。

```
image/
conf.bundle.js
conf.html
index.bundle.js
index.html
vendor.bundle.js
```

注: SkyWayのダッシュボードの「利用可能ドメイン」にご自身のサーバのドメイン名を登録して下さい。  
注: TLS/SSLにより保護されたサイトでお使い下さい。  
注: 公開サーバにアップロードすると誰でも利用可能な状態になりますので、アクセス制限や認証を行って下さい。  

## 動作環境

- Google Chrome 最新の安定版
- Firefox 最新の安定版
- Safari 最新の安定版
- Microsoft Edge 最新の安定版(Chromium版 v79以上)

Android Chrome、Mobile Safari(iOS,iPadOS)でも利用可能ですが、画面UIはモバイルデバイスに最適化されていないため使いにくい場合があります。Android Firefoxについてはデバイスの選択がうまく動作しない不具合があるためご利用はお控えください。

## サポート

ビルド方法やWebサーバへの設置、カスタマイズに関するテクニカルサポートは提供していません。

## IssueやPullRequestの作成について

原則対応致しません。不具合修正や機能追加を行いたい場合は、ご自身でリポジトリをForkして行って下さい。

## License / Copyright

[MIT License](./LICENSE)  
Copyright (c) 2020 NTT Communications Corp.

ソフトウェアの一部に [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0) のソフトウェアが含まれています。