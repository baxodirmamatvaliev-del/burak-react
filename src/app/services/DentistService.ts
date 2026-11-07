import axios from "axios";
import { serverApi } from "../../lib/config";
import { Dentist } from "../../lib/types/dentist";

class DentistService {
    private readonly path: string;

    // Shifokor API manzilini mavjud sozlamadan oladi.
    constructor() {
        this.path = serverApi;
    }

    // Faol shifokorlarning ommaviy profillarini so‘ralgan limit bilan oladi.
    public async getDentists(limit = 8): Promise<Dentist[]> {
        const { data } = await axios.get<Dentist[]>(`${this.path}/dentist/all`, { params: { limit } });
        if (!Array.isArray(data)) {
            throw new Error("Invalid dentist list response");
        }
        return data;
    }
}

export default DentistService;
