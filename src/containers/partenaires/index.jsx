import React from "react";
import PartenairesData from "../../data/partenaires.json";
import SectionTitle from "../../components/section-title";
import LogoCarousel from "../../components/logo-carousel";

const PartenairesContainer = () => {
    const {
        tutelles,
        organisateurs,
        // niveaux,
        logos,
        devenirPartenaire,
        presse,
    } = PartenairesData;
    const mid = Math.ceil(logos.length / 2);
    const logosRowOne = logos.slice(0, mid);
    const logosRowTwo = logos.slice(mid);

    return (
        <section className="about-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            classOption="text-center"
                            subTitle="Écosystème"
                            title="<span>Partenaires</span> et sponsors"
                        />
                    </div>
                </div>

                <div className="row mb-5">
                    <div
                        className="col-md-6 mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <div className="team-member h-100">
                            <div className="content pt-0">
                                <h4 className="title mb-3">Sous tutelle de</h4>
                                <ul className="list-style1 text-start">
                                    {tutelles.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-md-6 mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        <div className="team-member h-100">
                            <div className="content pt-0">
                                <h4 className="title mb-3">Organisé par</h4>
                                <div className="row">
                                    {organisateurs.map((item, i) => (
                                        <div
                                            key={i}
                                            className="col-4 text-center mb-2"
                                        >
                                            <div className="media d-block">
                                                <span className="icon icofont-university d-block mb-2"></span>
                                                <strong>{item}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="partenaires-niveaux">
                    {/*
                    <div className="row">
                        <div className="col-12">
                            <h4 className="title text-center partenaires-niveaux__title">
                                Niveaux de partenariat
                            </h4>
                        </div>
                        {niveaux.map((niveau, index) => (
                            <div
                                key={niveau.id}
                                className="col-sm-6 col-lg-3 mb-4"
                                data-aos="fade-up"
                                data-aos-duration={1000 + index * 150}
                            >
                                <div className="service-item partenaires-niveau-card text-center h-100">
                                    <div className="icon">
                                        <i
                                            className={
                                                index === 0
                                                    ? "icofont-badge"
                                                    : index === 1
                                                    ? "icofont-medal"
                                                    : index === 2
                                                    ? "icofont-trophy"
                                                    : "icofont-award"
                                            }
                                        ></i>
                                    </div>
                                    <div className="content">
                                        <h5 className="service-name">
                                            {niveau.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    */}

                    <div
                        className="partenaires-logo-band"
                        data-aos="fade-up"
                        data-aos-duration="1100"
                        aria-label="Logos des partenaires JAFCI 2026"
                    >
                        <p className="partenaires-logo-band__label">
                            Ils accompagnent les JAFCI 2026
                        </p>
                        <LogoCarousel logos={logosRowOne} duration="40s" />
                        <LogoCarousel
                            logos={logosRowTwo}
                            reverse
                            duration="48s"
                        />
                    </div>
                </div>

                <div className="row mb-5" data-aos="fade-up">
                    <div className="col-lg-12">
                        <div className="team-member">
                            <div className="content pt-0 text-center">
                                <h4 className="title">
                                    {devenirPartenaire.title}
                                </h4>
                                <p>{devenirPartenaire.excerpt}</p>
                                <p className="mb-0">
                                    {devenirPartenaire.cta}{" "}
                                    <a href="mailto:infos@gram.ci">
                                        infos@gram.ci
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-5" data-aos="fade-up">
                    <div className="col-lg-12">
                        <div className="team-member">
                            <div className="content pt-0 text-center">
                                <h4 className="title">{presse.title}</h4>
                                <p>{presse.excerpt}</p>
                                <p>
                                    {presse.cta}{" "}
                                    <a href="mailto:infos@gram.ci">
                                        infos@gram.ci
                                    </a>
                                </p>
                                <p className="text-muted mb-0">
                                    <em>
                                        Communiqués, dossier de presse et kit
                                        média seront ajoutés au fil de
                                        l&apos;eau.
                                    </em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartenairesContainer;
