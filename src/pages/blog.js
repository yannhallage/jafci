import React from "react";
import Layout from "../layouts/index.jsx";
import Header from "../layouts/header";
import Breadcrumb from "../containers/global/breadcrumb";
import Footer from "../layouts/footer";
import BlogListContainer from "../containers/blog/blog-list/index.jsx";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";

const BlogPage = () => {
    return (
        <React.Fragment>
            <Layout>
                <SEO title="JAFCI 2026 – Actualités & Articles" />
                <div className="wrapper">
                    <Header />
                    <div className="main-content site-wrapper-reveal">
                        <Breadcrumb
                            classOptionOne="content-style3"
                            classOptionTwo="bread-crumbs-style2"
                            prevs={[{ text: "Accueil", path: "/" }]}
                            contentThree="Blog"
                            title="<span>Actualités</span> &amp; Articles"
                        />
                        <BlogListContainer />
                    </div>
                    <Footer />
                    <ScrollToTop />
                </div>
            </Layout>
        </React.Fragment>
    );
};

export default BlogPage;
