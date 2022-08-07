import axios from 'axios';

interface IResponseProducer {
    name: string;
    _id: string;
}

export class ProducersService {
    private readonly producersUrl = 'http://localhost:5000/api/producers';
    public getProducers() {
        return axios.get(this.producersUrl)
            .then((res) => {
                return [...res.data.map(({ name, _id }: IResponseProducer) => ({ name, id: _id }))];
            });
    }
}

const producersService = new ProducersService();
export { producersService };