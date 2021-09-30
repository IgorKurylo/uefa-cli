import { SECRETS, COMPTETITION_ID } from './constant'
import http from './http_client'

class ApiService {
  groups(name: string) {
    return http.get(`/leagues/table.json?${SECRETS}&competition_id=${COMPTETITION_ID}&group=${name}`)
  }
  live(comptetionId: number) {
    return http.get(`scores/live.json?${SECRETS}&competition_id=${comptetionId}`)
  }
}
export default new ApiService()
