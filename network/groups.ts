import { SECRETS, COMPTETITION_ID } from './constant'
import http from './http_client'

class GroupsService {
  get(name: string) {
    return http.get(`/leagues/table.json?${SECRETS}&competition_id=${COMPTETITION_ID}&group=${name}`)
  }
}
export default new GroupsService()
