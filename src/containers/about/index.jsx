import React from "react";
import AboutData from "../../data/about.json";
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import AboutAddress from "../../components/about-address";
import HomeData from "../../data/home.json";
import MedicalFeature from "../../components/medical-feature";

const AboutContainer = () => {
    const president = AboutData[5].president;
    const historique = AboutData[6].historique;
    const lieu = AboutData[7].lieu;

    return (
        <div className="about-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <p
                            className="text-pra"
                            data-aos="fade-up"
                            id="presentation"
                        >
                            {AboutData[0].pageTitle}
                        </p>

                        <div
                            className="service-list-content"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                        >
                            <h4 className="title">{AboutData[1].title}</h4>
                            {AboutData[1].excerpt.map((single, i) => (
                                <div
                                    key={i}
                                    className="desc"
                                    dangerouslySetInnerHTML={{ __html: single }}
                                />
                            ))}
                        </div>

                        <div
                            className="service-list-content"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            id="theme"
                        >
                            <h4 className="title">{AboutData[2].title}</h4>
                            {AboutData[2].excerpt.map((single, i) => (
                                <div
                                    key={i}
                                    className="desc"
                                    dangerouslySetInnerHTML={{ __html: single }}
                                />
                            ))}
                        </div>

                        <div
                            className="office-center-content"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            id="president"
                        >
                            <h4 className="title">{president.title}</h4>
                            <div className="row align-items-start">
                                <div className="col-md-4 mb-4 mb-md-0">
                                    <div className="team-member text-center">
                                        <div className="thumb">
                                            <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    "/" +
                                                    president.image
                                                }
                                                alt={president.author}
                                            />
                                        </div>
                                        <div className="content mt-3">
                                            <h5 className="name">
                                                {president.author}
                                            </h5>
                                            <p className="mb-0">
                                                {president.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="desc">
                                        <blockquote className="blockquote-style">
                                            <p
                                                style={{
                                                    whiteSpace: "pre-line",
                                                }}
                                            >
                                                « {president.quote} »
                                            </p>
                                        </blockquote>
                                        <p className="text-muted mb-0">
                                            <em>{president.note}</em>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="service-list-content"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            id="historique"
                        >
                            <h4 className="title">Historique des éditions</h4>
                            <div className="row icon-box-style">
                                {historique.map((item) => (
                                    <div
                                        key={item.id}
                                        className="col-md-6 mb-4"
                                    >
                                        <div className="media">
                                            <div className="media-body">
                                                <h5 className="title">
                                                    {item.edition}
                                                </h5>
                                                <p className="mb-1">
                                                    {item.dates}
                                                </p>
                                                <p className="mb-1">
                                                    {item.lieu}
                                                </p>
                                                <p>
                                                    <em>{item.status}</em>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="office-center-content"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            id="lieu"
                        >
                            <h4 className="title">{lieu.title}</h4>
                            <div className="desc">
                                <p>{lieu.excerpt}</p>
                            </div>
                            <LightgalleryProvider>
                                <div className="row noom-gallery">
                                    {lieu.images &&
                                        lieu.images.map((image, i) => (
                                            <div
                                                key={i}
                                                className="col-sm-6 col-lg-3 mb-3"
                                                data-aos="fade-up"
                                                data-aos-duration={
                                                    800 + i * 150
                                                }
                                            >
                                                <div className="gallery-item mb-0">
                                                    <LightgalleryItem
                                                        group="noom"
                                                        src={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            "/" +
                                                            image
                                                        }
                                                    >
                                                        <div className="thumb noom-thumb">
                                                            <div className="lightbox-image">
                                                                <img
                                                                    src={
                                                                        process
                                                                            .env
                                                                            .PUBLIC_URL +
                                                                        "/" +
                                                                        image
                                                                    }
                                                                    alt={`Noom Hôtel Abidjan ${
                                                                        i + 1
                                                                    }`}
                                                                />
                                                            </div>
                                                            <div className="overlay">
                                                                <i className="icofont-plus"></i>
                                                            </div>
                                                        </div>
                                                    </LightgalleryItem>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </LightgalleryProvider>
                            <div
                                className="office-address-content"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                            >
                                {AboutData[4].address.map((single, i) => (
                                    <AboutAddress key={i} data={single} />
                                ))}
                            </div>
                        </div>

                        <div
                            className="service-list-content mb-5"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            id="chiffres"
                        >
                            <h4 className="title">Les JAFCI en chiffres</h4>
                            <div className="row icon-box-style">
                                {HomeData[3].medicalFeature
                                    .slice(0, 4)
                                    .map((single, key) => (
                                        <div key={key} className="col-md-6">
                                            <MedicalFeature data={single} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutContainer;
