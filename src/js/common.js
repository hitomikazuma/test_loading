const $ = require('jquery');
import { debug } from './debug';

const loading = () => {
  let images = document.getElementsByTagName('img'); // ページ内の画像取得
  let percent = document.getElementById('percent-text'); // パーセントのテキスト部分
  let gauge = document.getElementById('gauge'); // ゲージ
  let loadingBg = document.getElementById('loadingBg'); // ローディング背景
  let loading = document.getElementById('loading'); // ローディング要素
  let imgCount = 0;
  let baseCount = 0;
  let gaugeMax = 400; // ゲージの幅指定
  let current;
  // 画像の読み込み
  for (let i = 0; i < images.length; i++) {
    let img = new Image(); // 画像の作成
    // 画像読み込み完了したとき
    img.onload = function() {
      imgCount += 1;
    };
    // 画像読み込み失敗したとき
    img.onerror = function() {
      imgCount += 1;
    };
    img.src = images[i].src; // 画像にsrcを指定して読み込み開始
  }

// ローディング処理
  let nowLoading = setInterval(function() {
    if(baseCount <= imgCount) { // baseCountがimgCountを追い抜かないようにする
      // 現在の読み込み具合のパーセントを取得
      current = Math.floor(baseCount / images.length * 100);
      // パーセント表示の書き換え
      percent.innerHTML = current;
      // ゲージの変更
      gauge.style.width = Math.floor(gaugeMax / 100 * current) + 'px';
      baseCount += 1;
      // 全て読み込んだ時
      if(baseCount == images.length) {
        // ローディング要素の非表示
        loadingBg.style.display = 'none';
        loading.style.display = 'none';
        // ローディングの終了
        clearInterval(nowLoading);
      }
    }
  }, 20);
};

export const common = () => {
  debug();
  loading();
};
