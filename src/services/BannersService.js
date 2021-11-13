import { AppState } from '../AppState'
import { Banner } from '../Models/Banner'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BannersService {

  async getAll() {
    const res = await api.get('api/ads')
    logger.log('get all ads', res.data)
    AppState.banners = res.data.map(b => new Banner(b))
    logger.log("model", AppState.banners)
  }

}

export const bannersService = new BannersService()