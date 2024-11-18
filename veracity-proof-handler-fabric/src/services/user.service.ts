import { UserService as client } from "../generated/fablo-client"

export class UserService {
  async login(username: string, password: string) {
    return client.getToken({ id: username, secret: password })
  }
}
