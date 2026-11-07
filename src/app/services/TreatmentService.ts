import axios from "axios";
import { serverApi } from "../../lib/config";
import { Treatment } from "../../lib/types/treatment";

class TreatmentService {
    private readonly path: string;

    // Davolash API manzilini mavjud sozlamadan oladi.
    constructor() {
        this.path = serverApi;
    }

    // Faol davolash xizmatlari ro‘yxatini API orqali oladi.
    public async getTreatments(): Promise<Treatment[]> {
        try {
            const { data } = await axios.get<Treatment[]>(`${this.path}/treatment/all`);
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
