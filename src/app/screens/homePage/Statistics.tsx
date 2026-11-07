import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import TreatmentService from "../../services/TreatmentService";
import { Treatment } from "../../../lib/types/treatment";

// Davolash xizmatlari yonida ish vaqti haqidagi vaqtinchalik xabarni ko‘rsatadi.
export function Statistics() {
    const [treatments, setTreatments] = useState<Treatment[] | null>(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        let active = true;
        const treatment = new TreatmentService();
        treatment.getTreatments()
            .then((data) => {
                if (active) {
                    setTreatments(data);
                }
            })
            .catch(() => {
                if (active) {
                    setLoadError(true);
                }
            });
        return () => { active = false; };
    }, []);

    let content = <Box component="p" role="status">진료과목을 불러오는 중입니다.</Box>;
    if (loadError) {
        content = <Box component="p" role="alert">진료과목을 불러오지 못했습니다.</Box>;
    } else if (treatments) {
        content = treatments.length === 0 ? (
            <Box component="p" role="status">등록된 진료과목이 없습니다.</Box>
        ) : (
            <Box component="ul" className="treatment-list">
                {treatments.map((treatment) => (
                    <Box component="li" key={treatment._id}>{treatment.treatmentName}</Box>
                ))}
            </Box>
        );
    }

    return (
        <Container component="section" maxWidth={false} className="treatment-guide" aria-labelledby="treatment-guide-title">
            <Box className="treatment-guide-content" id="treatments" tabIndex={-1}>
                <Box component="h2" id="treatment-guide-title">진료 안내</Box>
                {content}
            </Box>
            <Box component="aside" className="clinic-hours" id="clinic-hours" tabIndex={-1} aria-labelledby="clinic-hours-title">
                <Box component="h2" id="clinic-hours-title">진료시간 안내</Box>
                <Box component="p">진료시간은 추후 안내해 드리겠습니다.</Box>
            </Box>
        </Container>
    );
}
