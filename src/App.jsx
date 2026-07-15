import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import HomePage from "./pages/index";
import "./assets/css/bootstrap.min.css";
import "./assets/scss/style.scss";
import "./assets/css/icofont.css";
import "swiper/components/navigation/navigation.scss";
import "swiper/swiper.scss";
import "./assets/css/animate.css";
import "lightgallery.js/dist/css/lightgallery.css";
import "swiper/components/pagination/pagination.scss";
import CongresPage from "./pages/congres";
import ProgrammePage from "./pages/programme";
import PartenairesPage from "./pages/partenaires";
import BlogPage from "./pages/blog";
import BlogDetailsPage from "./templates/blog-details";
import BlogCategory from "./templates/blog-category";
import BlogTag from "./templates/blog-tag";
import BlogDate from "./templates/blog-date";
import BlogAuthor from "./templates/blog-author";
import InscriptionPage from "./pages/inscription";
import NavScrollTop from "./components/nav-scroll-top";

const App = () => {
    useEffect(() => {
        AOS.init({
            offset: 80,
            duration: 1000,
            once: true,
            easing: "ease",
        });
        AOS.refresh();
    }, []);
    return (
        <Router>
            <NavScrollTop>
                <Switch>
                    <Route
                        path={`${process.env.PUBLIC_URL + "/"}`}
                        exact
                        component={HomePage}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/congres"}`}
                        component={CongresPage}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/programme"}`}
                        exact
                        component={ProgrammePage}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/programme/:id"}`}
                        component={ProgrammePage}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/partenaires"}`}
                        component={PartenairesPage}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/blog"}`}
                        exact
                        component={BlogPage}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/category/:slug"}`}
                        component={BlogCategory}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/tag/:slug"}`}
                        component={BlogTag}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/date/:date"}`}
                        component={BlogDate}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/author/:author"}`}
                        component={BlogAuthor}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/blog-details/:id"}`}
                        component={BlogDetailsPage}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL + "/inscription"}`}
                        component={InscriptionPage}
                    />
                    <Redirect
                        from={`${process.env.PUBLIC_URL + "/about"}`}
                        to={`${process.env.PUBLIC_URL + "/congres"}`}
                    />
                    <Redirect
                        from={`${process.env.PUBLIC_URL + "/service"}`}
                        to={`${process.env.PUBLIC_URL + "/programme"}`}
                    />
                    <Redirect
                        from={`${
                            process.env.PUBLIC_URL + "/service-details/:id"
                        }`}
                        to={`${process.env.PUBLIC_URL + "/programme"}`}
                    />
                    <Redirect
                        from={`${process.env.PUBLIC_URL + "/contact"}`}
                        to={`${process.env.PUBLIC_URL + "/inscription"}`}
                    />
                </Switch>
            </NavScrollTop>
        </Router>
    );
};

export default App;
