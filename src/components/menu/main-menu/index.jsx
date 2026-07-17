import React from "react";
import { NavLink } from "react-router-dom";

const MainMenu = () => {
    return (
        <nav className="main-menu-nav">
            <ul className="main-menu">
                <li>
                    <NavLink
                        className="main-menu-link"
                        activeClassName="active"
                        exact
                        to={process.env.PUBLIC_URL + "/"}
                    >
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="main-menu-link"
                        activeClassName="active"
                        to={process.env.PUBLIC_URL + "/congres"}
                    >
                        Le Congrès
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="main-menu-link"
                        activeClassName="active"
                        to={process.env.PUBLIC_URL + "/programme"}
                    >
                        <span className="menu-label-full">
                            Programme &amp; Intervenants
                        </span>
                        <span className="menu-label-short">Programme</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="main-menu-link"
                        activeClassName="active"
                        to={process.env.PUBLIC_URL + "/partenaires"}
                    >
                        <span className="menu-label-full">
                            Partenaires &amp; Presse
                        </span>
                        <span className="menu-label-short">Partenaires</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="main-menu-link"
                        activeClassName="active"
                        to={process.env.PUBLIC_URL + "/blog"}
                    >
                        Blog
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="main-menu-link"
                        activeClassName="active"
                        to={process.env.PUBLIC_URL + "/inscription"}
                    >
                        <span className="menu-label-full">
                            Inscription &amp; Contacts
                        </span>
                        <span className="menu-label-short">Inscription</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MainMenu;
