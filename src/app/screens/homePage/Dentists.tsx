import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import DentistService from "../../services/DentistService";
import { Dentist } from "../../../lib/types/dentist";
import { serverApi } from "../../../lib/config";

// Faqat API tasdiqlagan shifokor profillarini bosh sahifada ko‘rsatadi.
export default function Dentists() {
    const [dentists, setDentists] = useState<Dentist[] | null>(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        let active = true;
        new DentistService().getDentists()
            .then((data) => {
                if (active) {
                    setDentists(data);
                }
            })
            .catch(() => {
                if (active) {
                    setLoadError(true);
                }
            });
        return () => { active = false; };
    }, []);

    let content = <Box component="p" role="status">의료진 정보를 불러오는 중입니다.</Box>;
    if (loadError) {
        content = <Box component="p" role="alert">의료진 정보를 불러오지 못했습니다.</Box>;
    } else if (dentists) {
        content = dentists.length === 0 ? (
            <Box component="p" role="status">등록된 의료진이 없습니다.</Box>
        ) : (
            <Box component="ul" className="dentist-list">
                {dentists.map((dentist) => (
                    <Box component="li" key={dentist._id}>
                        {dentist.dentistImage && (
                            <img src={`${serverApi}/${dentist.dentistImage}`} alt={`${dentist.dentistName} 의료진`} />
                        )}
                        <Box component="h3">{dentist.dentistName}</Box>
                        <Box component="p">{dentist.dentistSpecialty}</Box>
                        <Box component="p" className="dentist-intro">{dentist.dentistIntro}</Box>
                    </Box>
                ))}
            </Box>
        );
    }

    return (
        <Container component="section" maxWidth={false} className="clinic-information" id="dentists" tabIndex={-1} aria-labelledby="clinic-dentists-title">
            <Box component="h2" id="clinic-dentists-title">의료진 소개</Box>
            {content}
        </Container>
    );
}
