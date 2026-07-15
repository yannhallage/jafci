import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/section-title";
import PaysData from "../../../data/pays-participants.json";

const PaysParticipantsContainer = () => {
    const [pays, setPays] = useState(
        PaysData.map((item) => ({
            name: item.name,
            iso2: item.iso2,
            flag: item.flag || `https://flagcdn.com/w160/${item.iso2}.png`,
        }))
    );

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/flags/countries-iso-flags.json`)
            .then((res) => (res.ok ? res.json() : []))
            .then((catalog) => {
                if (!Array.isArray(catalog) || !catalog.length) return;
                setPays(
                    PaysData.map((item) => {
                        const match = catalog.find(
                            (c) =>
                                c.iso2 &&
                                c.iso2.toLowerCase() === item.iso2.toLowerCase()
                        );
                        return {
                            name: item.name,
                            iso2: item.iso2,
                            flag:
                                match?.flag?.png ||
                                item.flag ||
                                `https://flagcdn.com/w160/${item.iso2}.png`,
                        };
                    })
                );
            })
            .catch(() => {
                /* fallback déjà en place via PaysData */
            });
    }, []);

    return (
        <section className="feature-section bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            classOption="text-center"
                            subTitle="Communauté internationale"
                            title="<span>Pays</span> participants"
                        />
                    </div>
                </div>
                <div
                    className="row justify-content-center"
                    data-aos="fade-up"
                    data-aos-duration="1100"
                >
                    {pays.map((country) => (
                        <div
                            key={country.iso2}
                            className="col-6 col-sm-4 col-md-3 col-xl-2 mb-4"
                        >
                            <div
                                className="text-center h-100"
                                style={{
                                    background: "#fff",
                                    border: "1px solid #e7e7e7",
                                    padding: "20px 12px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    minHeight: "130px",
                                }}
                            >
                                <img
                                    src={country.flag}
                                    alt={`Drapeau ${country.name}`}
                                    loading="lazy"
                                    width="80"
                                    height="54"
                                    style={{
                                        width: "80px",
                                        height: "54px",
                                        objectFit: "cover",
                                        display: "block",
                                        flexShrink: 0,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                        marginBottom: "12px",
                                    }}
                                />
                                <h6
                                    className="mb-0"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: 1.3,
                                        color: "#222",
                                    }}
                                >
                                    {country.name}
                                </h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PaysParticipantsContainer;
