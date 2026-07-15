import React from "react";
import { NavLink } from "react-router-dom";

const MainMenu = () => {
    return (
        <nav>
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
                        Programme &amp; Intervenants
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="main-menu-link"
                        activeClassName="active"
                        to={process.env.PUBLIC_URL + "/partenaires"}
                    >
                        Partenaires &amp; Presse
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
                        Inscription &amp; Contacts
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MainMenu;
