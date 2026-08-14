import SocialIcon from "../../components/social-icon";
import Newsletter from "../../components/newsletter";
import Logo from "../../components/logo";

const href = (path) => process.env.PUBLIC_URL + path;

const Footer = () => {
    return (
        <footer className="footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3">
                        <div className="widget-item">
                            <div className="about-widget">
                                <Logo
                                    classOption="footer-logo"
                                    image="/img/logo-pied-de-page.png"
                                />
                                <p className="mb-0">
                                    Journées Africaines de Cardiologie
                                    Interventionnelle — 4ème édition, 10–12
                                    septembre 2026, Noom Hôtel, Abidjan.
                                </p>
                                <ul className="widget-contact-info">
                                    <li className="info-address">
                                        <i className="icofont-location-pin"></i>
                                        Noom Hôtel, Plateau, Abidjan, Côte
                                        d&apos;Ivoire
                                    </li>
                                    <li className="info-mail">
                                        <i className="icofont-email"></i>
                                        <a href="mailto:infos@gram.ci">
                                            infos@gram.ci
                                        </a>
                                    </li>
                                    <li className="info-phone">
                                        <i className="icofont-ui-call"></i>
                                        <a href="tel:+2250749800376">
                                            (+225) 07 49 800 376
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 offset-md-1 col-lg-3 offset-lg-0 col-xl-3 d-lg-none d-xl-block">
                        <div className="widget-item d-inline-block">
                            <h4 className="widget-title line-bottom">
                                Navigation
                            </h4>
                            <div className="widget-tags">
                                <ul>
                                    <li>
                                        <a href={href("/congres")}>
                                            Le Congrès
                                        </a>
                                    </li>
                                    <li>
                                        <a href={href("/programme")}>
                                            Programme
                                        </a>
                                    </li>
                                    <li>
                                        <a href={href("/partenaires")}>
                                            Partenaires
                                        </a>
                                    </li>
                                    <li>
                                        <a href={href("/blog")}>Blog</a>
                                    </li>
                                    <li>
                                        <a href={href("/inscription")}>
                                            Inscription
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.gram.ci"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            GRAM
                                        </a>
                                    </li>
                                    <li>
                                        <span>SICARD</span>
                                    </li>
                                    <li>
                                        <span>ASCAOC</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3">
                        <div className="widget-item">
                            <h4 className="widget-title line-bottom">
                                Accès rapides
                            </h4>
                            <nav className="widget-posts">
                                <ul className="posts-item">
                                    <li>
                                        <a href={href("/inscription")}>
                                            <i className="icon icofont-rounded-double-right"></i>
                                            S&apos;inscrire aux JAFCI 2026
                                        </a>
                                    </li>
                                    <li>
                                        <a href={href("/programme")}>
                                            <i className="icon icofont-rounded-double-right"></i>
                                            Consulter le programme
                                        </a>
                                    </li>
                                    <li>
                                        <a href={href("/congres")}>
                                            <i className="icon icofont-rounded-double-right"></i>
                                            Découvrir le congrès
                                        </a>
                                    </li>
                                    <li>
                                        <a href={href("/partenaires")}>
                                            <i className="icon icofont-rounded-double-right"></i>
                                            Devenir partenaire
                                        </a>
                                    </li>
                                    <li>
                                        <a href={href("/blog")}>
                                            <i className="icon icofont-rounded-double-right"></i>
                                            Actualités &amp; articles
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:infos@gram.ci">
                                            <i className="icon icofont-rounded-double-right"></i>
                                            Contact presse
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 offset-md-1 col-lg-4 offset-lg-0 col-xl-3">
                        <div className="widget-item">
                            <h4 className="widget-title line-bottom">
                                Newsletter
                            </h4>
                            <div className="widget-newsletter">
                                <p>
                                    Recevez les actualités des JAFCI et les
                                    informations d&apos;inscription.
                                </p>
                                <Newsletter mailchimpUrl="//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" />
                            </div>
                            <div className="widget-social-icons">
                                {/* <SocialIcon
                                    path="https://twitter.com/"
                                    icon="icofont-twitter"
                                />
                                <SocialIcon
                                    path="https://www.linkedin.com/"
                                    icon="icofont-linkedin"
                                /> */}
                                <SocialIcon
                                    path="https://www.facebook.com/"
                                    icon="icofont-facebook"
                                />
                                {/* <SocialIcon
                                    path="https://www.instagram.com/"
                                    icon="icofont-instagram"
                                /> */}
                                <SocialIcon
                                    path="https://www.youtube.com/"
                                    icon="icofont-youtube-play"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm-12">
                            <div className="widget-copyright">
                                <p>
                                    &copy; 2026{" "}
                                    <span className="text-uppercase">
                                        JAFCI
                                    </span>
                                    . Organisé par GRAM · SICARD · ASCAOC.
                                    Conception Acredi Group.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
