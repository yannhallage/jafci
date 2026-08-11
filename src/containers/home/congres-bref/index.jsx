import React from "react";
import HomeData from "../../../data/home.json";
import SectionTitle from "../../../components/section-title";
import Button from "../../../components/button";

const CongresBrefContainer = () => {
    const data = HomeData[9].congresBref;

    return (
        <section className="about-area bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div
                        className="col-lg-5 mb-4 mb-lg-0"
                        data-aos="fade-right"
                        data-aos-duration="1100"
                    >
                        <div className="gallery-item">
                            <div className="thumb">
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/WKE00821.jpg`}
                                    alt="Session scientifique JAFCI — salle de conférence"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <SectionTitle
                            subTitle={data.subTitle}
                            title={data.title}
                        />
                        {data.excerpt.map((p, i) => (
                            <p
                                key={i}
                                className="mb-3"
                                data-aos="fade-up"
                                data-aos-duration={1000 + i * 200}
                            >
                                {p}
                            </p>
                        ))}
                        <div className="mt-4" data-aos="fade-up">
                            <Button
                                path="/congres"
                                classOption="btn btn-theme"
                                text="En savoir plus"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CongresBrefContainer;
