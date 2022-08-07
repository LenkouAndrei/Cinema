import axios from 'axios';

interface IResponseRateMpAA {
    name: string;
    ageLimit: number;
    _id: string;
}

export class RateMpAAService {
    private readonly ratesMpAAUrl = 'http://localhost:5000/api/rateMpAA';
    public getRatesMpAA() {
        return axios.get(this.ratesMpAAUrl)
            .then((res) => {
                return [...res.data.map(({ name, _id }: IResponseRateMpAA) => ({ name, id: _id }))];
            });
    }
}

const rateMpAAService = new RateMpAAService();
export { rateMpAAService };