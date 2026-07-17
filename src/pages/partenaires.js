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
    const publicUrl =
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
        <React.Fragment>
            <Layout>
                <SEO title="JAFCI 2026 – Partenaires & Presse" />
                <div className="wrapper">
                    <Header />
                    <div className="main-content site-wrapper-reveal">
                        <PageTitleContainer
                            image={publicUrl}
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
