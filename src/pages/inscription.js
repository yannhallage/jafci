import React from "react";
import Layout from "../layouts/index.jsx";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import GoogleMapContainer from "../containers/global/map";
import InscriptionContainer from "../containers/inscription";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";

const InscriptionPage = () => {
    return (
        <React.Fragment>
            <Layout>
                <SEO title="JAFCI 2026 – Inscription & Contacts" />
                <div className="wrapper">
                    <Header />
                    <div className="main-content site-wrapper-reveal">
                        <GoogleMapContainer classOption="contact-map-area" />
                        <InscriptionContainer />
                    </div>
                    <Footer />
                    <ScrollToTop />
                </div>
            </Layout>
        </React.Fragment>
    );
};

export default InscriptionPage;
