import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <div
            className="divider-area bg-img cta-photo-banner"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/WKE00855.jpg)`,
            }}
        >
            <div className="container">
                <div className="row content-align-center">
                    <div className="col-lg-12">
                        <div
                            className="divider-content-area divider-content-style1"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                        >
                            <div className="content-inner text-highlight-box">
                                <h2>
                                    S&apos;inscrire aux <span>JAFCI 2026</span>
                                </h2>
                                <p>
                                    10, 11 et 12 septembre 2026 · Noom Hôtel,
                                    Abidjan — inscription en ligne en quelques
                                    minutes.
                                </p>
                            </div>
                            <Link
                                to={process.env.PUBLIC_URL + "/inscription"}
                                className="btn btn-theme btn-white"
                            >
                                S&apos;inscrire maintenant
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
