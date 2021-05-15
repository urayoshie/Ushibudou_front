$(function () {
  //video要素の取得
  var video = document.getElementById("video");

  // 自動再生する
  video.autoplay = true;

  // 繰り返し再生する
  video.loop = true;

  // true：無音で再生 / false：音ありで再生
  video.muted = false;
});
