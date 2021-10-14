import { AxiosResponse } from 'axios';
import { getAxiosInstance } from '@core/misc/utils';

const axios = getAxiosInstance();

export interface IUserCredential {
    email: string;
    password: string;
}

export default {
    login: ({ email, password }: IUserCredential): Promise<AxiosResponse> =>
        axios.post('/login', { email, password }),
    logout: (): Promise<AxiosResponse> => axios.post('/logout'),
};
