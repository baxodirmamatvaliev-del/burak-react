export interface Dentist {
    _id: string;
    dentistName: string;
    dentistSpecialty: string;
    dentistIntro: string;
    dentistImage?: string;
    treatmentIds: string[];
}
