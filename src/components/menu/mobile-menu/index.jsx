import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import SocialIcon from "../../social-icon";

const MobileMenu = ({ show, onClose }) => {
    return (
        <div
            className={`jafci-offcanvas ${show ? "jafci-offcanvas-open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!show}
        >
            <div className="inner">
                <div className="border-bottom mb-3 pb-3 text-end">
                    <button
                        type="button"
                        className="offcanvas-close"
                        onClick={onClose}
                        aria-label="Fermer le menu"
                    >
                        ×
                    </button>
                </div>
                <div className="offcanvas-head mb-3">
                    <div className="header-top-offcanvas">
                        <p>
                            <i className="icofont-google-map"></i>{" "}
                            <span>LIEU :</span> Noom Hôtel, Plateau, Abidjan
                        </p>
                    </div>
                </div>
                <nav className="offcanvas-menu">
                    <ul>
                        <li>
                            <NavLink
                                exact
                                to={process.env.PUBLIC_URL + "/"}
                                onClick={onClose}
                            >
                                Accueil
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={process.env.PUBLIC_URL + "/congres"}
                                onClick={onClose}
                            >
                                Le Congrès
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={process.env.PUBLIC_URL + "/programme"}
                                onClick={onClose}
                            >
                                Programme &amp; Intervenants
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={process.env.PUBLIC_URL + "/partenaires"}
                                onClick={onClose}
                            >
                                Partenaires &amp; Presse
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={process.env.PUBLIC_URL + "/blog"}
                                onClick={onClose}
                            >
                                Blog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={process.env.PUBLIC_URL + "/inscription"}
                                onClick={onClose}
                            >
                                Inscription &amp; Contacts
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="offcanvas-social my-4">
                    <ul>
                        <li>
                            <SocialIcon
                                path="https://www.facebook.com/"
                                icon="icofont-facebook"
                            />
                        </li>
                        <li>
                            <SocialIcon
                                path="https://www.linkedin.com/"
                                icon="icofont-linkedin"
                            />
                        </li>
                        <li>
                            <SocialIcon
                                path="https://twitter.com/"
                                icon="icofont-twitter"
                            />
                        </li>
                    </ul>
                </div>

                <ul className="media-wrap">
                    <li className="media media-list">
                        <span className="media-icon">
                            <i className="icofont-calendar"></i>
                        </span>
                        <div className="media-content">
                            <span className="media-sub-heading">Dates</span>
                            <span className="media-heading">
                                10 – 12 septembre 2026
                            </span>
                        </div>
                    </li>

                    <li className="media media-list">
                        <span className="media-icon">
                            <i className="icofont-ui-call"></i>
                        </span>
                        <div className="media-content">
                            <span className="media-sub-heading">Téléphone</span>
                            <a
                                className="media-heading"
                                href="tel:+2250749800376"
                            >
                                (+225) 07 49 800 376
                            </a>
                        </div>
                    </li>

                    <li className="media media-list">
                        <span className="media-icon">
                            <i className="icofont-envelope"></i>
                        </span>
                        <div className="media-content">
                            <span className="media-sub-heading">Courriel</span>
                            <a
                                className="media-heading"
                                href="mailto:infos@gram.ci"
                            >
                                infos@gram.ci
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

MobileMenu.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

export default MobileMenu;
