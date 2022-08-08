import axios from 'axios';
import { ICredentials } from '../types/types';

export class UserService {
    private readonly userUrl = 'http://localhost:5000/api/user';
    public getAccess(credentials: ICredentials) {
        return axios.post(this.userUrl, credentials)
            .then(res => res.data);
    }
}

const userService = new UserService();
export { userService };