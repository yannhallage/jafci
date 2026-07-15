import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const PROFESSIONS = [
    "Médecin cardiologue",
    "Médecin autre spécialité",
    "Médecin généraliste",
    "Interne / élève médecin",
    "Infirmier(e)",
    "Personnel paramédical",
    "Chercheur",
    "Étudiant",
    "Autre",
];

const CATEGORIES = [
    "Médecin",
    "Paramédical / Infirmier",
    "Étudiant / Interne",
    "Intervenant",
    "Autre",
];

const STRUCTURE_TYPES = [
    "Laboratoire pharmaceutique",
    "Industriel / équipementier médical",
    "Établissement de santé",
    "Institution publique",
    "Société savante",
    "Université / école",
    "Association / ONG",
    "Autre",
];

const CIVILITES = ["Dr", "Pr", "M.", "Mme"];

const InscriptionForm = ({ onSuccess }) => {
    const [nature, setNature] = useState("particulier");
    const { register, handleSubmit, errors, reset } = useForm({
        mode: "onBlur",
    });

    const onSubmit = (data) => {
        const payload = { nature, ...data };
        console.log("Inscription JAFCI:", payload);
        reset();
        if (onSuccess) onSuccess(payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <p className="mb-3">
                        <strong>Vous vous inscrivez en tant que :</strong>
                    </p>
                    <button
                        type="button"
                        className={`btn me-2 mb-2 ${
                            nature === "particulier"
                                ? "btn-theme"
                                : "btn-theme btn-border"
                        }`}
                        onClick={() => setNature("particulier")}
                    >
                        Particulier
                    </button>
                    <button
                        type="button"
                        className={`btn mb-2 ${
                            nature === "entreprise"
                                ? "btn-theme"
                                : "btn-theme btn-border"
                        }`}
                        onClick={() => setNature("entreprise")}
                    >
                        Entreprise / Institution
                    </button>
                </div>
            </div>

            {nature === "particulier" ? (
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="civilite"
                                ref={register({
                                    required: "La civilité est obligatoire",
                                })}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Civilité *
                                </option>
                                {CIVILITES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.civilite && (
                                <p>{errors.civilite.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="nom"
                                placeholder="Nom *"
                                ref={register({
                                    required: "Le nom est obligatoire",
                                })}
                            />
                            {errors.nom && <p>{errors.nom.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="prenoms"
                                placeholder="Prénoms *"
                                ref={register({
                                    required: "Les prénoms sont obligatoires",
                                })}
                            />
                            {errors.prenoms && <p>{errors.prenoms.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Adresse électronique *"
                                ref={register({
                                    required: "L'email est obligatoire",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Adresse email invalide",
                                    },
                                })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="tel"
                                name="telephone"
                                placeholder="Téléphone (indicatif inclus) *"
                                ref={register({
                                    required: "Le téléphone est obligatoire",
                                })}
                            />
                            {errors.telephone && (
                                <p>{errors.telephone.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="pays"
                                placeholder="Pays de résidence *"
                                ref={register({
                                    required: "Le pays est obligatoire",
                                })}
                            />
                            {errors.pays && <p>{errors.pays.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="ville"
                                placeholder="Ville *"
                                ref={register({
                                    required: "La ville est obligatoire",
                                })}
                            />
                            {errors.ville && <p>{errors.ville.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="profession"
                                ref={register({
                                    required: "La profession est obligatoire",
                                })}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Profession / statut *
                                </option>
                                {PROFESSIONS.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                            {errors.profession && (
                                <p>{errors.profession.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="categorie"
                                ref={register({
                                    required: "La catégorie est obligatoire",
                                })}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Catégorie d&apos;inscription *
                                </option>
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.categorie && (
                                <p>{errors.categorie.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="specialite"
                                placeholder="Spécialité (si médecin)"
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="etablissement"
                                placeholder="Établissement d'exercice"
                                ref={register}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="raisonSociale"
                                placeholder="Raison sociale / nom de l'institution *"
                                ref={register({
                                    required:
                                        "La raison sociale est obligatoire",
                                })}
                            />
                            {errors.raisonSociale && (
                                <p>{errors.raisonSociale.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="typeStructure"
                                ref={register({
                                    required:
                                        "Le type de structure est obligatoire",
                                })}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Type de structure *
                                </option>
                                {STRUCTURE_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                            {errors.typeStructure && (
                                <p>{errors.typeStructure.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="secteur"
                                placeholder="Secteur d'activité"
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="pays"
                                placeholder="Pays *"
                                ref={register({
                                    required: "Le pays est obligatoire",
                                })}
                            />
                            {errors.pays && <p>{errors.pays.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="ville"
                                placeholder="Ville *"
                                ref={register({
                                    required: "La ville est obligatoire",
                                })}
                            />
                            {errors.ville && <p>{errors.ville.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="url"
                                name="siteWeb"
                                placeholder="Site web"
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="number"
                                name="nbParticipants"
                                min="1"
                                placeholder="Nombre de participants *"
                                ref={register({
                                    required:
                                        "Le nombre de participants est obligatoire",
                                    min: {
                                        value: 1,
                                        message: "Minimum 1 participant",
                                    },
                                })}
                            />
                            {errors.nbParticipants && (
                                <p>{errors.nbParticipants.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <h5 className="mb-3">
                            Représentant / contact principal
                        </h5>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="civilite"
                                ref={register({
                                    required: "La civilité est obligatoire",
                                })}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Civilité *
                                </option>
                                {CIVILITES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.civilite && (
                                <p>{errors.civilite.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="nomRepresentant"
                                placeholder="Nom *"
                                ref={register({
                                    required: "Le nom est obligatoire",
                                })}
                            />
                            {errors.nomRepresentant && (
                                <p>{errors.nomRepresentant.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="prenomsRepresentant"
                                placeholder="Prénoms *"
                                ref={register({
                                    required: "Les prénoms sont obligatoires",
                                })}
                            />
                            {errors.prenomsRepresentant && (
                                <p>{errors.prenomsRepresentant.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="fonction"
                                placeholder="Fonction *"
                                ref={register({
                                    required: "La fonction est obligatoire",
                                })}
                            />
                            {errors.fonction && (
                                <p>{errors.fonction.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Email professionnel *"
                                ref={register({
                                    required: "L'email est obligatoire",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Adresse email invalide",
                                    },
                                })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="tel"
                                name="telephone"
                                placeholder="Téléphone professionnel *"
                                ref={register({
                                    required: "Le téléphone est obligatoire",
                                })}
                            />
                            {errors.telephone && (
                                <p>{errors.telephone.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="interetExposition"
                                    ref={register}
                                />{" "}
                                Intérêt pour l&apos;espace d&apos;exposition
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="interetPartenariat"
                                    ref={register}
                                />{" "}
                                Intérêt pour un partenariat / sponsoring
                            </label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Message / précisions"
                                ref={register}
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="consentement"
                                ref={register({
                                    required: "Le consentement est obligatoire",
                                })}
                            />{" "}
                            J&apos;accepte le traitement de mes données
                            personnelles dans le cadre de mon inscription aux
                            JAFCI 2026. *
                        </label>
                        {errors.consentement && (
                            <p>{errors.consentement.message}</p>
                        )}
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    <div className="form-group mb-0">
                        <button className="btn btn-theme" type="submit">
                            Envoyer mon inscription
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

InscriptionForm.propTypes = {
    onSuccess: PropTypes.func,
};

export default InscriptionForm;
