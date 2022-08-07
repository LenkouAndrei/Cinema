import axios from 'axios';

interface IResponseCountry {
    name: string;
    _id: string;
}

export class CountriesService {
    private readonly countriesUrl = 'http://localhost:5000/api/countries';
    public getCountries() {
        return axios.get(this.countriesUrl)
            .then((res) => {
                return [...res.data.map(({ name, _id }: IResponseCountry) => ({ name, id: _id }))];
            });
    }
}

const countriesService = new CountriesService();
export { countriesService };