import { Box, Button, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppointmentService from "../../services/AppointmentService";
import { Appointment } from "../../../lib/types/appointment";

const PAGE_SIZE = 8;
const statusLabels: Record<Appointment["appointmentStatus"], string> = {
    PENDING: "예약 대기",
    CONFIRMED: "예약 확정",
    COMPLETED: "진료 완료",
    CANCELLED: "예약 취소",
};
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit",
});
const timeFormatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", hour12: false,
});

// Kirgan a’zoning qabul tarixini Seul vaqti va koreyscha holatlar bilan ko‘rsatadi.
export default function AppointmentHistory() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setLoadError(false);
        new AppointmentService().getMyAppointments(page, PAGE_SIZE)
            .then((data) => {
                if (active) {
                    setAppointments((previous) => page === 1 ? data : [...previous, ...data]);
                    setHasMore(data.length === PAGE_SIZE);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (active) {
                    setLoadError(true);
                    setLoading(false);
                }
            });
        return () => { active = false; };
    }, [page, retry]);

    return (
        <Box component="section" className="appointment-history" aria-labelledby="appointment-history-title" aria-busy={loading}>
            <Box component="h2" id="appointment-history-title">예약 내역</Box>
            <Box component="p" className="appointment-timezone">모든 예약 시간은 한국 시간 기준입니다.</Box>
            {appointments.length > 0 && (
                <Box component="ul" className="appointment-history-list">
                    {appointments.map((appointment) => {
                        const start = new Date(appointment.appointmentStart);
                        const end = new Date(appointment.appointmentEnd);
                        const startDate = dateFormatter.format(start);
                        const endDate = dateFormatter.format(end);
                        return (
                            <Box component="li" key={appointment._id}>
                                <Box className="appointment-datetime">
                                    <Box component="p" className="appointment-date">{startDate}</Box>
                                    <Box component="p">
                                        <time dateTime={appointment.appointmentStart}>{timeFormatter.format(start)}</time>
                                        {" – "}
                                        <time dateTime={appointment.appointmentEnd}>
                                            {startDate !== endDate && `${endDate} `}
                                            {timeFormatter.format(end)}
                                        </time>
                                    </Box>
                                </Box>
                                <Chip className="appointment-status" label={statusLabels[appointment.appointmentStatus]} />
                            </Box>
                        );
                    })}
                </Box>
            )}
            {loading && <Box component="p" role="status">예약 내역을 불러오는 중입니다.</Box>}
            {!loading && !loadError && appointments.length === 0 && (
                <Box component="p" role="status">예약 내역이 없습니다.</Box>
            )}
            {loadError && (
                <Box>
                    <Box component="p" role="alert">예약 내역을 불러오지 못했습니다. 다시 시도해 주세요.</Box>
                    <Button onClick={() => { setLoading(true); setRetry((value) => value + 1); }} disabled={loading}>다시 시도</Button>
                </Box>
            )}
            {hasMore && !loadError && (
                <Button onClick={() => { setLoading(true); setPage(page + 1); }} disabled={loading}>더 보기</Button>
            )}
        </Box>
    );
}
