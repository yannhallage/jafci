import React from "react";
import { Link } from "react-router-dom";

const ContactAddress = () => {
    return (
        <div className="contact-info-content">
            <div className="info-address">
                <h2 className="title">
                    Une question ? <span>Contactez-nous</span>
                </h2>
                <p>
                    Comité d&apos;Organisation des JAFCI 2026 · Noom Hôtel,
                    Plateau, Abidjan, Côte d&apos;Ivoire
                </p>
                <a href="mailto:contact@jafci.org">
                    <span>Courriel :</span> contact@jafci.org
                </a>
            </div>
            <div className="brand-office">
                <div className="info-tem style-two">
                    <h6>Téléphone :</h6>
                    <p>
                        <a href="tel:+2250749800376">(+225) 07 49 800 376</a>
                    </p>
                </div>
                <div className="info-tem">
                    <h6>Site de l&apos;organisateur :</h6>
                    <p>
                        <a
                            href="https://www.gram.ci"
                            target="_blank"
                            rel="noreferrer"
                        >
                            www.gram.ci
                        </a>
                    </p>
                </div>
                <div className="info-tem mb-0">
                    <h6>Lieu de l&apos;événement :</h6>
                    <p>
                        Noom Hôtel, Plateau, Abidjan ·{" "}
                        <Link to={process.env.PUBLIC_URL + "/congres"}>
                            En savoir plus
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactAddress;
