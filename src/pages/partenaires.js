import React from "react";
import Layout from "../layouts/index.jsx";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import PageTitleContainer from "../containers/global/page-title/index.jsx";
import PartenairesContainer from "../containers/partenaires";
import BrandContainer from "../containers/global/brand";
import CallToAction from "../containers/global/call-to-action";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";

const PartenairesPage = () => {
    return (
        <React.Fragment>
            <Layout>
                <SEO title="JAFCI 2026 – Partenaires & Presse" />
                <div className="wrapper">
                    <Header />
                    <div className="main-content site-wrapper-reveal">
                        <PageTitleContainer
                            image="img/photos/about-bg1.jpg"
                            subTitle="Relations institutionnelles"
                            title="Partenaires &amp; <span>Presse</span>"
                        />
                        <PartenairesContainer />
                        {/* <BrandContainer /> */}
                        <CallToAction />
                    </div>
                    <Footer />
                    <ScrollToTop />
                </div>
            </Layout>
        </React.Fragment>
    );
};

export default PartenairesPage;
