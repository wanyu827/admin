export default {
  token: state => state.user.token,
  menuList: state => state.authority.menuList,
  nav: state => state.nav.nav,
  total: state => state.user.total,
  users: state => state.user.users,
  goods: state => state.goods.goods,
  goodsId: state => state.goods.goods_id
}
