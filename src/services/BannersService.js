import { AppState } from '../AppState'
import { Banner } from '../Models/Banner'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BannersService {

  async getAll() {
    const res = await api.get('api/ads')
    logger.log('get all ads', res.data)
    AppState.banner1 = res.data[0]
    AppState.banner2 = res.data[1]
    // AppState.banners = res.data.map(b => new Banner(b))
    logger.log('appstate ads', AppState.banners)
  }

}

export const bannersService = new BannersService()