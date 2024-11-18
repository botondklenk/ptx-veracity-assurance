import { UserService } from '../services/user.service';
import { POST } from '../utils/requests';

const userService = new UserService();

export const login = POST<'/user/login'>(
  async (params, query, body, headers) => {
    const { username, password } = body;
    return await userService.login(username, password);
  }
);
