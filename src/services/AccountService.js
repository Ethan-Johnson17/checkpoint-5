import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { Account } from '../Models/Account'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      logger.log('account', res.data)
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async edit(id, account) {
    const res = await api.put('account' + id, account)
    logger.log(res.data)
  }
}

export const accountService = new AccountService()
