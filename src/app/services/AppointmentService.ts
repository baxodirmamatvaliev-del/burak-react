import axios from "axios";
import { serverApi } from "../../lib/config";
import { Appointment, AppointmentCreateInput, AppointmentSlot } from "../../lib/types/appointment";

class AppointmentService {
    private readonly path: string;

    // Qabul API manzilini mavjud sozlamadan oladi.
    constructor() {
        this.path = serverApi;
    }

    // Cookie orqali tasdiqlangan a’zoning qabul tarixini sahifalab oladi.
    public async getMyAppointments(page = 1, limit = 8): Promise<Appointment[]> {
        const { data } = await axios.get<Appointment[]>(`${this.path}/appointment/all`, {
            params: { page, limit },
            withCredentials: true,
        });
        if (!Array.isArray(data)) {
            throw new Error("Invalid appointment history response");
        }
        return data;
    }

    // Shifokor, davolash turi va Seul sanasi uchun bo‘sh vaqtlarni so‘raydi.
    public async getAvailability(dentistId: string, treatmentId: string, date: string): Promise<AppointmentSlot[]> {
        const { data } = await axios.get<AppointmentSlot[]>(`${this.path}/appointment/availability`, {
            params: { dentistId, treatmentId, date },
        });
        if (!Array.isArray(data)) {
            throw new Error("Invalid appointment availability response");
        }
        return data;
    }

    // Tanlangan vaqtni cookie orqali tasdiqlangan foydalanuvchi nomidan band qiladi.
    public async createAppointment(input: AppointmentCreateInput): Promise<Appointment> {
        const { data } = await axios.post<Appointment>(`${this.path}/appointment/create`, input, {
            withCredentials: true,
        });
        if (!data || typeof data._id !== "string" || !data.appointmentStart || !data.appointmentEnd) {
            throw new Error("Invalid appointment creation response");
        }
        return data;
    }
}

export default AppointmentService;
