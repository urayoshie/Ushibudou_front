document.addEventListener('DOMContentLoaded', () => {
  // Rails API 側の ベースURL
  const baseURL = 'http://localhost:3000';
  // 投稿リストの DOM 要素オブジェクトを取得
  const menuList = document.getElementById('menu-list');

  // Rails の API から投稿一覧データを取得する関数
  const fetchMenus = async () => {
    // ローカルの Rails サーバーの URL
    const url = `${baseURL}/menus`;
    const response = await fetch(url);

    // レスポンスが 200 OK 以外ならエラーを発生
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }

    // レスポンスが 200 OK なら JSON を抽出
    const menus = await response.json();
    return menus;
  };

  // 投稿データを投稿リストに反映する関数
  const addMenus = (genre, menus) => {
    menus.forEach((menu) => {
      const content = `
      <div class="menu">
        <p class="menu-name">${menu.name}</p>
        <div class="menu-price">￥${menu.price}</div>
        <hr>
      </div>
      `;
      genre.insertAdjacentHTML('beforeend', content);
    });
  };

  // Rails の API から投稿一覧データを取得してページに表示する関数
  const displayMenus = async () => {
    try {
      // 投稿一覧データを取得
      const menus = await fetchMenus();

      // 各投稿を投稿リストに追加

      Object.keys(menus).forEach((key) => {
        const genre = document.createElement('div');
        genre.setAttribute('id', `menu-${key}`);
        genre.insertAdjacentHTML('beforeend', `<div class="genre">${menus[key].genre}</div>`);
        addMenus(genre, menus[key].data);
        // <p>ジャンル: ${menu.genre}</p>
        menuList.appendChild(genre);
        // menuList.insertAdjacentHTML('beforeend', genre);
      });

      // menus.forEach((menu) => addMenu(menu));
    } catch (e) {
      alert(e);
    }
  };

  // 起動時に投稿一覧表示
  displayMenus();
});
