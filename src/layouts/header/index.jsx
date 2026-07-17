import SocialIcon from "../../components/social-icon";
import Button from "../../components/button";
import Logo from "../../components/logo";
import MainMenu from "../../components/menu/main-menu";
import HomeData from "../../data/home.json";
import HeaderContactInfo from "../../components/header-contact-info";
import { Fragment, useEffect, useState } from "react";
import MobileMenu from "../../components/menu/mobile-menu";
import MenuOverlay from "../../components/menu/menu-overlay";

const Header = () => {
    const [ofcanvasShow, setOffcanvasShow] = useState(false);
    const onCanvasHandler = () => {
        setOffcanvasShow((prev) => !prev);
    };
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    useEffect(() => {
        const header = document.querySelector(".sticky-header");
        if (header) {
            setHeaderTop(header.offsetTop);
        }
        const handleScroll = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (ofcanvasShow) {
            document.body.classList.add("jafci-offcanvas-open");
        } else {
            document.body.classList.remove("jafci-offcanvas-open");
        }
        return () => {
            document.body.classList.remove("jafci-offcanvas-open");
        };
    }, [ofcanvasShow]);

    return (
        <Fragment>
            <header className="header">
                <div className="header-top d-none d-lg-block">
                    <div className="container">
                        <div className="row row-cols-2">
                            <div className="col">
                                <p>
                                    <i className="icofont-google-map"></i>{" "}
                                    <span>LIEU :</span> Noom Hôtel, Plateau,
                                    Abidjan · 10–12 sept. 2026
                                </p>
                            </div>
                            <div className="col">
                                <ul className="social-links text-end">
                                    <li>
                                        <SocialIcon
                                            path="https://twitter.com/"
                                            icon="icofont-twitter"
                                        />
                                    </li>
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
                                            path="https://www.instagram.com/"
                                            icon="icofont-instagram"
                                        />
                                    </li>
                                    <li>
                                        <SocialIcon
                                            path="https://www.youtube.com/"
                                            icon="icofont-play-alt-1"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-middle mobile-sticky">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="header-middle-content">
                                    <div className="header-logo">
                                        <Logo image="/img/logo.png" />
                                    </div>
                                    <ul className="media-wrap d-none d-lg-flex">
                                        {HomeData[0].headerInfo &&
                                            HomeData[0].headerInfo.map(
                                                (single, key) => {
                                                    return (
                                                        <HeaderContactInfo
                                                            key={key}
                                                            data={single}
                                                        />
                                                    );
                                                }
                                            )}
                                    </ul>
                                    <Button
                                        path="/inscription"
                                        classOption="book-now-btn d-none d-sm-inline-block d-lg-none"
                                        text="S'inscrire"
                                    />
                                    <div className="mobile-menu-toggle d-lg-none">
                                        <button
                                            type="button"
                                            onClick={onCanvasHandler}
                                            className="offcanvas-toggle"
                                            aria-label="Ouvrir le menu"
                                            aria-expanded={ofcanvasShow}
                                        >
                                            <svg viewBox="0 0 800 600">
                                                <path
                                                    d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                                                    id="top"
                                                ></path>
                                                <path
                                                    d="M300,320 L540,320"
                                                    id="middle"
                                                ></path>
                                                <path
                                                    d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                                    id="bottom"
                                                    transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-bottom d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                    <MainMenu />
                                    <Button
                                        path="/inscription"
                                        classOption="book-now-btn"
                                        text="S'inscrire"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`header-bottom sticky-header d-none d-lg-block ${
                        scroll > headerTop ? "sticky" : ""
                    }`}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                    <div className="d-flex flex-nowrap align-items-center header-bottom-left">
                                        <div className="header-logo header-logo-nav me-3">
                                            <Logo image="/img/logo.png" />
                                        </div>
                                        <MainMenu />
                                    </div>
                                    <Button
                                        path="/inscription"
                                        classOption="book-now-btn"
                                        text="S'inscrire"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MenuOverlay show={ofcanvasShow} onClick={onCanvasHandler} />
            <MobileMenu show={ofcanvasShow} onClose={onCanvasHandler} />
        </Fragment>
    );
};

export default Header;
