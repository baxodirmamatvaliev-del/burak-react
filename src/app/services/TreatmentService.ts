import axios from "axios";
import { serverApi } from "../../lib/config";
import { Treatment } from "../../lib/types/treatment";

class TreatmentService {
    private readonly path: string;

    // Davolash API manzilini mavjud sozlamadan oladi.
    constructor() {
        this.path = serverApi;
    }

    // Faol davolash xizmatlarini so‘ralgan limit bilan API dan oladi.
    public async getTreatments(limit = 8): Promise<Treatment[]> {
        try {
            const { data } = await axios.get<Treatment[]>(`${this.path}/treatment/all`, { params: { limit } });
            if (!Array.isArray(data)) {
                throw new Error("Invalid treatment list response");
            }
            return data;
        } catch (err) {
            console.log("Error, getTreatments:", err);
            throw err;
        }
    }
}

export default TreatmentService;
