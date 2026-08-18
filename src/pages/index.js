import React from "react";
import Layout from "../layouts/index.jsx";
import Header from "../layouts/header";
import IntroContainer from "../containers/home/intro";
import HealthFeatureContainer from "../containers/home/health-feature";
import CongresBrefContainer from "../containers/home/congres-bref";
import HomeVideoContainer from "../containers/home/video";
import MedicalFeatureContainer from "../containers/home/medical-feature";
import AppointmentContainer from "../containers/home/appointment";
import TeamContainer from "../containers/home/team";
import TestimonialContainer from "../containers/home/testimonial";
import PaysParticipantsContainer from "../containers/home/pays-participants";
import BrandContainer from "../containers/global/brand";
import BlogAccordion from "../containers/home/blog-accordion";
import CallToAction from "../containers/global/call-to-action";
import Footer from "../layouts/footer";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";

const HomePage = () => {
    return (
        <React.Fragment>
            <Layout>
                <SEO title="JAFCI 2026 – Accueil" />
                <div className="wrapper home-default-wrapper">
                    <Header />
                    <div className="main-content site-wrapper-reveal">
                        <IntroContainer />
                        <HealthFeatureContainer />
                        <CongresBrefContainer />
                        <HomeVideoContainer />
                        <MedicalFeatureContainer />
                        <AppointmentContainer />
                        <TeamContainer />
                        <TestimonialContainer />
                        <PaysParticipantsContainer />
                        {/* <BrandContainer /> */}
                        <BlogAccordion />
                        <CallToAction />
                    </div>
                    <Footer />
                    <ScrollToTop />
                </div>
            </Layout>
        </React.Fragment>
    );
};

export default HomePage;
