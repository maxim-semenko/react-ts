import axios from "axios";

const DEFAULT_API = "https://api.thecatapi.com/v1/breeds"

class BreedService {

    getAll() {
        return axios.get(DEFAULT_API);
    }


    getBreedByName(payload) {
        return axios.get(DEFAULT_API + `/search?q=${payload}`)

    }

}

export default new BreedService()