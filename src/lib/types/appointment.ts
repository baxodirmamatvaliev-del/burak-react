export interface AppointmentSlot {
    appointmentStart: string;
    appointmentEnd: string;
}

export interface AppointmentCreateInput {
    dentistId: string;
    treatmentId: string;
    appointmentStart: string;
}

export interface Appointment extends AppointmentSlot {
    _id: string;
    appointmentStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}
