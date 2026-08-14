import React from "react";

const homePath = process.env.PUBLIC_URL + "/";
const pathname = window.location.pathname.replace(/\/$/, "") || "/";

const href = (path) => process.env.PUBLIC_URL + path;

const isActive = (path) => {
    if (path === "/") {
        return pathname === "/" || pathname === process.env.PUBLIC_URL;
    }
    return pathname === href(path).replace(/\/$/, "");
};

const MainMenu = () => {
    return (
        <nav className="main-menu-nav">
            <ul className="main-menu">
                <li>
                    <a
                        className={`main-menu-link${
                            isActive("/") ? " active" : ""
                        }`}
                        href={homePath}
                    >
                        Accueil
                    </a>
                </li>
                <li>
                    <a
                        className={`main-menu-link${
                            isActive("/congres") ? " active" : ""
                        }`}
                        href={href("/congres")}
                    >
                        Le Congrès
                    </a>
                </li>
                <li>
                    <a
                        className={`main-menu-link${
                            isActive("/programme") ? " active" : ""
                        }`}
                        href={href("/programme")}
                    >
                        <span className="menu-label-full">
                            Programme &amp; Intervenants
                        </span>
                        <span className="menu-label-short">Programme</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`main-menu-link${
                            isActive("/partenaires") ? " active" : ""
                        }`}
                        href={href("/partenaires")}
                    >
                        <span className="menu-label-full">
                            Partenaires &amp; Presse
                        </span>
                        <span className="menu-label-short">Partenaires</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`main-menu-link${
                            isActive("/blog") ? " active" : ""
                        }`}
                        href={href("/blog")}
                    >
                        Blog
                    </a>
                </li>
                <li>
                    <a
                        className={`main-menu-link${
                            isActive("/inscription") ? " active" : ""
                        }`}
                        href={href("/inscription")}
                    >
                        <span className="menu-label-full">
                            Inscription &amp; Contacts
                        </span>
                        <span className="menu-label-short">Inscription</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default MainMenu;
