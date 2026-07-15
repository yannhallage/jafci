import React, { useState } from "react";
import SectionTitle from "../../components/section-title";
import InscriptionForm from "../../components/inscription-form";
import ContactAddress from "../../components/contact-address";

const InscriptionContainer = () => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <section className="contact-area">
            <div className="container">
                <div className="row">
                    <div
                        className="col-lg-12"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        <ContactAddress />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="contact-form appointment-form">
                            <SectionTitle
                                classOption="text-center"
                                subTitle="Inscription"
                                title="<span>Inscrivez-vous</span> aux JAFCI 2026"
                            />
                            <p className="text-center mb-4">
                                Rejoignez la communauté de la cardiologie
                                interventionnelle africaine les 10, 11 et 12
                                septembre 2026 au Noom Hôtel d&apos;Abidjan.
                                L&apos;inscription se fait en ligne, en quelques
                                minutes. Après validation de votre formulaire,
                                vous recevrez une confirmation par courriel avec
                                les modalités pratiques.
                            </p>
                            {submitted ? (
                                <div
                                    className="alert alert-success text-center"
                                    role="status"
                                >
                                    <h4>Inscription enregistrée</h4>
                                    <p className="mb-0">
                                        Merci ! Votre demande a bien été prise
                                        en compte. Vous recevrez prochainement
                                        un courriel de confirmation avec les
                                        modalités pratiques.
                                    </p>
                                </div>
                            ) : (
                                <InscriptionForm
                                    onSuccess={() => setSubmitted(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InscriptionContainer;
