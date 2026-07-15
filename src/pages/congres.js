import React from "react";
import Layout from "../layouts/index.jsx";
import Header from "../layouts/header";
import PageTitleContainer from "../containers/global/page-title/index.jsx";
import Footer from "../layouts/footer";
import AboutContainer from "../containers/about";
import GoogleMapContainer from "../containers/global/map";
import CallToAction from "../containers/global/call-to-action";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";

const CongresPage = () => {
    return (
        <React.Fragment>
            <Layout>
                <SEO title="JAFCI 2026 – Le Congrès" />
                <div className="wrapper">
                    <Header />
                    <div className="main-content site-wrapper-reveal">
                        <PageTitleContainer
                            image="img/photos/coeur-reseau.png"
                            subTitle="4ème édition · Abidjan"
                            title="Le <span>Congrès</span>"
                        />
                        <AboutContainer />
                        {/* <GoogleMapContainer classOption="contact-map-area map-area-large" /> */}
                        <CallToAction />
                    </div>
                    <Footer />
                    <ScrollToTop />
                </div>
            </Layout>
        </React.Fragment>
    );
};

export default CongresPage;
