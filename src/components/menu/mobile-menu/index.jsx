import PropTypes from "prop-types";
import SocialIcon from "../../social-icon";

const href = (path) => process.env.PUBLIC_URL + path;
const pathname = window.location.pathname.replace(/\/$/, "") || "/";

const isActive = (path) => {
    if (path === "/") {
        return pathname === "/" || pathname === process.env.PUBLIC_URL;
    }
    return pathname === href(path).replace(/\/$/, "");
};

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
                            <a
                                className={isActive("/") ? "active" : ""}
                                href={href("/")}
                            >
                                Accueil
                            </a>
                        </li>
                        <li>
                            <a
                                className={isActive("/congres") ? "active" : ""}
                                href={href("/congres")}
                            >
                                Le Congrès
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    isActive("/programme") ? "active" : ""
                                }
                                href={href("/programme")}
                            >
                                Programme &amp; Intervenants
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    isActive("/partenaires") ? "active" : ""
                                }
                                href={href("/partenaires")}
                            >
                                Partenaires &amp; Presse
                            </a>
                        </li>
                        <li>
                            <a
                                className={isActive("/blog") ? "active" : ""}
                                href={href("/blog")}
                            >
                                Blog
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    isActive("/inscription") ? "active" : ""
                                }
                                href={href("/inscription")}
                            >
                                Inscription &amp; Contacts
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="offcanvas-social my-4">
                    <ul>
                        <li>
                            <SocialIcon
                                path="https://www.facebook.com/jafcii"
                                icon="icofont-facebook"
                            />
                        </li>
                        <li>
                            <SocialIcon
                                path="https://www.linkedin.com/company/135136674/"
                                icon="icofont-linkedin"
                            />
                        </li>
                        <li>
                            <SocialIcon
                                path="https://www.youtube.com/watch?v=oWy7yjvyD_w"
                                icon="icofont-youtube-play"
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
                                href="mailto:contact@jafci.org"
                            >
                                contact@jafci.org
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
