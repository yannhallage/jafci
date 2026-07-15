import SectionTitle from "../../../components/section-title";
import HomeData from "../../../data/home.json";
import MedicalFeature from "../../../components/medical-feature";

const MedicalFeatureContainer = () => {
    return (
        <section className="feature-section feature-section-jafci bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            classOption="text-center"
                            subTitle="Chiffres clés"
                            title="<span>Les JAFCI</span> en bref"
                        />
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div
                            className="row icon-box-style"
                            data-aos="fade-up"
                            data-aos-duration="1100"
                        >
                            {HomeData[3].medicalFeature &&
                                HomeData[3].medicalFeature.map(
                                    (single, key) => {
                                        return (
                                            <div
                                                key={key}
                                                className="col-sm-6 mb-4"
                                            >
                                                <MedicalFeature data={single} />
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    <div
                        className="col-lg-5"
                        data-aos="fade-left"
                        data-aos-duration="1200"
                    >
                        <div className="feature-side-image text-center">
                            <img
                                src={`${process.env.PUBLIC_URL}/img/photos/coeur-reseau.png`}
                                alt="Innovations en cardiologie — JAFCI"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MedicalFeatureContainer;
