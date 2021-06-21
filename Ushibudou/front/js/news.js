document.addEventListener('DOMContentLoaded', () => {
  // Rails API 側の ベースURL
  const baseURL = 'http://localhost:3000';
  // 投稿リストの DOM 要素オブジェクトを取得
  const notificationList = document.getElementById('notification-list');

  // Rails の API から投稿一覧データを取得する関数
  const fetchNotifications = async () => {
    // ローカルの Rails サーバーの URL
    const url = `${baseURL}/notifications`;
    const response = await fetch(url);

    // レスポンスが 200 OK 以外ならエラーを発生
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }

    // レスポンスが 200 OK なら JSON を抽出
    const notifications = await response.json();
    return notifications;
  };

  // 投稿データを投稿リストに反映する関数
  const addNotification = (notification) => {
    const content = `
  <div class="news">
    <span class="news-date">${notification.date}</span>
    <span class="title">${notification.title}</span>
    <p class="content">${notification.content}</p>
    <hr>
  </div>
  `;
    //   <img src="${notification.image.url}" />
    notificationList.insertAdjacentHTML('beforeend', content);
  };

  // Rails の API から投稿一覧データを取得してページに表示する関数
  const displayNotifications = async () => {
    try {
      // 投稿一覧データを取得
      const notifications = await fetchNotifications();
      // 各投稿を投稿リストに追加
      notifications.forEach((notification) => addNotification(notification));
    } catch (e) {
      alert(e);
    }
  };

  // 起動時に投稿一覧表示
  displayNotifications();
});
