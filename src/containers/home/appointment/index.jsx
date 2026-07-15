import SectionTitle from "../../../components/section-title";
import Button from "../../../components/button";

const AppointmentContainer = () => {
    return (
        <section className="appointment-area bg-gray mt-5">
            <div className="appointment-form-style1">
                <div className="container">
                    <div className="row align-items-center">
                        <div
                            className="col-lg-5 mb-4 mb-lg-0 text-center"
                            data-aos="fade-right"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/img/photos/coeur-geste.png`}
                                alt="Engagement pour la santé du cœur"
                                style={{
                                    maxWidth: "320px",
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </div>
                        <div className="col-lg-7">
                            <div className="appointment-form text-center text-lg-start">
                                <SectionTitle
                                    subTitle="JAFCI 2026 · Abidjan"
                                    title="<span>S'inscrire</span> maintenant"
                                />
                                <p className="mb-4">
                                    Rejoignez le rendez-vous scientifique de
                                    référence de la cardiologie
                                    interventionnelle africaine les 10, 11 et 12
                                    septembre 2026.
                                </p>
                                <Button
                                    path="/inscription"
                                    classOption="btn btn-theme"
                                    text="S'inscrire aux JAFCI 2026"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentContainer;
