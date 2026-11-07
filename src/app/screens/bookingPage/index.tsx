import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppointmentService from "../../services/AppointmentService";
import DentistService from "../../services/DentistService";
import TreatmentService from "../../services/TreatmentService";
import { useGlobals } from "../../hooks/useGlobals";
import { Appointment, AppointmentSlot } from "../../../lib/types/appointment";
import { Dentist } from "../../../lib/types/dentist";
import { Treatment } from "../../../lib/types/treatment";
import "../../../css/booking.css";

const timeFormatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", hour12: false,
});

// Mavjud login va qabul API lari orqali Seul vaqti bo‘yicha bron yaratadi.
export default function BookingPage({ openLogin }: { openLogin: () => void }) {
    const { authMember } = useGlobals();
    const [treatments, setTreatments] = useState<Treatment[] | null>(null);
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const [loadError, setLoadError] = useState(false);
    const [treatmentId, setTreatmentId] = useState("");
    const [dentistId, setDentistId] = useState("");
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState<AppointmentSlot[] | null>(null);
    const [appointmentStart, setAppointmentStart] = useState("");
    const [slotError, setSlotError] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [saving, setSaving] = useState(false);
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [availabilityVersion, setAvailabilityVersion] = useState(0);
    const today = moment().utcOffset(540).format("YYYY-MM-DD");
    const selectedSlot = slots?.find((slot) => slot.appointmentStart === appointmentStart);
    const canLoadSlots = Boolean(treatmentId && dentistId && date && date >= today);
    const eligibleDentists = dentists.filter((dentist) => dentist.treatmentIds.includes(treatmentId));

    useEffect(() => {
        let active = true;
        Promise.all([
            new TreatmentService().getTreatments(100),
            new DentistService().getDentists(100),
        ]).then(([treatmentData, dentistData]) => {
            if (active) {
                setTreatments(treatmentData);
                setDentists(dentistData);
            }
        }).catch(() => {
            if (active) {
                setLoadError(true);
            }
        });
        return () => { active = false; };
    }, []);

    useEffect(() => {
        let active = true;
        setSlots(null);
        setAppointmentStart("");
        setSlotError(false);
        if (!authMember || !canLoadSlots) {
            return;
        }
        new AppointmentService().getAvailability(dentistId, treatmentId, date)
            .then((data) => {
                if (active) {
                    setSlots(data);
                }
            })
            .catch(() => {
                if (active) {
                    setSlotError(true);
                }
            });
        return () => { active = false; };
    }, [authMember, treatmentId, dentistId, date, canLoadSlots, availabilityVersion]);

    // Faqat API bergan vaqtni yuboradi; eskirgan vaqt yoki login xatosini alohida ko‘rsatadi.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!authMember) {
            openLogin();
            return;
        }
        if (saving || !selectedSlot) {
            return;
        }
        setSaving(true);
        setSubmitError("");
        try {
            const result = await new AppointmentService().createAppointment({ dentistId, treatmentId, appointmentStart });
            setAppointment(result);
        } catch (err) {
            const status = axios.isAxiosError(err) ? err.response?.status : undefined;
            if (status === 401) {
                setSubmitError("로그인이 만료되었습니다. 다시 로그인해 주세요.");
                openLogin();
            } else if (status === 409) {
                setSubmitError("선택한 시간은 예약할 수 없습니다. 다른 시간을 선택해 주세요.");
            } else {
                setSubmitError("예약 신청에 실패했습니다. 잠시 후 다시 시도해 주세요.");
            }
            setAvailabilityVersion((value) => value + 1);
        } finally {
            setSaving(false);
        }
    };

    let content = <Box component="p" role="status">예약 정보를 불러오는 중입니다.</Box>;
    if (!authMember) {
        content = (
            <Box>
                <Box component="p">진료 예약은 로그인 후 이용하실 수 있습니다.</Box>
                <Button variant="contained" onClick={openLogin}>로그인 후 예약</Button>
            </Box>
        );
    } else if (appointment) {
        content = (
            <Box role="status">
                <Box component="h2">예약 신청이 접수되었습니다.</Box>
                <Box component="p">{moment(appointment.appointmentStart).utcOffset(540).format("YYYY-MM-DD HH:mm")} (한국 시간)</Box>
                <Box component="p">예약 상태는 접수 후 확인됩니다.</Box>
                <Button onClick={() => {
                    setAppointment(null);
                    setAvailabilityVersion((value) => value + 1);
                }}>새 예약</Button>
            </Box>
        );
    } else if (loadError) {
        content = <Box component="p" role="alert">예약 정보를 불러오지 못했습니다. 페이지를 새로고침해 주세요.</Box>;
    } else if (treatments) {
        if (treatments.length === 0 || dentists.length === 0) {
            content = <Box component="p" role="status">현재 예약 가능한 진료과목 또는 의료진이 없습니다.</Box>;
        } else {
            content = (
                <Box component="form" onSubmit={handleSubmit} className="booking-form">
                    <TextField id="booking-treatment" label="진료과목" select SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} value={treatmentId} required disabled={saving}
                        onChange={(event) => {
                            setTreatmentId(event.target.value);
                            setDentistId("");
                            setAppointmentStart("");
                            setSlots(null);
                            setSubmitError("");
                        }}>
                        <option value="">선택하세요</option>
                        {treatments.map((treatment) => <option key={treatment._id} value={treatment._id}>{treatment.treatmentName}</option>)}
                    </TextField>
                    <TextField id="booking-dentist" label="의료진" select SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} value={dentistId} required disabled={saving || !treatmentId}
                        onChange={(event) => {
                            setDentistId(event.target.value);
                            setAppointmentStart("");
                            setSlots(null);
                            setSubmitError("");
                        }}>
                        <option value="">선택하세요</option>
                        {eligibleDentists.map((dentist) => <option key={dentist._id} value={dentist._id}>{dentist.dentistName}</option>)}
                    </TextField>
                    {treatmentId && eligibleDentists.length === 0 && <Box component="p" role="status">선택한 진료과목의 예약 가능한 의료진이 없습니다.</Box>}
                    <TextField id="booking-date" label="진료 날짜 (한국 시간)" type="date" value={date} required inputProps={{ min: today }} InputLabelProps={{ shrink: true }} disabled={saving}
                        onChange={(event) => {
                            setDate(event.target.value);
                            setAppointmentStart("");
                            setSlots(null);
                            setSubmitError("");
                        }} />
                    {canLoadSlots && (
                        <Box>
                            {slotError && <Box component="p" role="alert">예약 가능 시간을 불러오지 못했습니다.</Box>}
                            {!slotError && slots === null && <Box component="p" role="status">예약 가능 시간을 확인 중입니다.</Box>}
                            {slots?.length === 0 && <Box component="p" role="status">선택한 날짜에 예약 가능한 시간이 없습니다.</Box>}
                            {slots && slots.length > 0 && (
                                <TextField id="booking-time" label="진료 시간 (한국 시간)" select SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} value={appointmentStart} required fullWidth disabled={saving}
                                    onChange={(event) => {
                                        setAppointmentStart(event.target.value);
                                        setSubmitError("");
                                    }}>
                                    <option value="">선택하세요</option>
                                    {slots.map((slot) => (
                                        <option key={slot.appointmentStart} value={slot.appointmentStart}>
                                            {timeFormatter.format(new Date(slot.appointmentStart))}–{timeFormatter.format(new Date(slot.appointmentEnd))}
                                        </option>
                                    ))}
                                </TextField>
                            )}
                        </Box>
                    )}
                    {submitError && <Box component="p" role="alert">{submitError}</Box>}
                    <Button type="submit" variant="contained" disabled={saving || !selectedSlot}>
                        {saving ? "예약 신청 중…" : "예약 신청"}
                    </Button>
                </Box>
            );
        }
    }

    return (
        <Container component="main" className="booking-page">
            <Box component="h1">진료 예약</Box>
            <Box component="p">진료과목과 의료진을 선택한 뒤 예약 가능한 시간을 확인하세요. 모든 날짜와 시간은 한국 시간 기준입니다.</Box>
            {content}
            <Button component={Link} to="/#contact">문의 안내</Button>
        </Container>
    );
}
