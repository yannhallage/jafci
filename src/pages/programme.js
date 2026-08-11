import React from "react";
import Layout from "../layouts/index.jsx";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import PageTitleContainer from "../containers/global/page-title/index.jsx";
import ServiceContainer from "../containers/service-box/index.jsx";
import TeamContainer from "../containers/home/team/index.jsx";
import CallToAction from "../containers/global/call-to-action";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";

const ProgrammePage = () => {
    return (
        <React.Fragment>
            <Layout>
                <SEO title="JAFCI 2026 – Programme & Intervenants" />
                <div className="wrapper">
                    <Header />
                    <div className="main-content site-wrapper-reveal">
                        <PageTitleContainer
                            image="img/WKE00821.jpg"
                            subTitle="10, 11 et 12 septembre 2026"
                            title="Programme &amp; <span>Intervenants</span>"
                        />
                        <ServiceContainer />
                        <div className="container text-center mb-5">
                            <button
                                type="button"
                                className="btn btn-theme btn-border"
                                disabled
                                title="Disponible dès le programme officiel"
                            >
                                Télécharger le programme (PDF) — bientôt
                            </button>
                        </div>
                        <TeamContainer />
                        <CallToAction />
                    </div>
                    <Footer />
                    <ScrollToTop />
                </div>
            </Layout>
        </React.Fragment>
    );
};

export default ProgrammePage;
