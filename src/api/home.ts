import { HomeAdsAndGoodsMode } from "../model/home"
import { getAction } from "../utils/http"

/**
 * 首页轮播图和商品板块
 * @returns 数据列表
*/
const homeGoodsList = async (): Promise<HomeAdsAndGoodsMode> => {
  const res = await getAction('/shop/index-list', {});
  return res.data as HomeAdsAndGoodsMode;
}

// homeGoodsList().then(res => { })

export {
  homeGoodsList
}