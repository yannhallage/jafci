import SectionTitle from "../../../components/section-title";
import BlogData from "../../../data/blog.json";
import BlogList from "../../../components/blog";
import AccordionWrap from "../../../components/accordion/AccordionWrap.jsx";
import { Link } from "react-router-dom";

const BlogAccordion = () => {
    return (
        <section className="blog-area blog-default-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <SectionTitle title="<span>Actualités</span> &amp; articles" />
                        <div
                            className="post-items-style1"
                            data-aos="fade-up"
                            data-aos-duration="1100"
                        >
                            {BlogData &&
                                BlogData.slice(0, 3).map((single, key) => {
                                    return <BlogList key={key} data={single} />;
                                })}
                        </div>
                        <Link
                            className="btn-line"
                            to={process.env.PUBLIC_URL + "/blog"}
                        >
                            Voir le blog
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <SectionTitle
                            classOption="mt-md-70"
                            title="<span>Aperçu</span> du programme"
                        />
                        <div
                            className="accordian-content"
                            data-aos="fade-up"
                            data-aos-duration="1100"
                        >
                            <AccordionWrap />
                            <Link
                                className="btn-line"
                                to={process.env.PUBLIC_URL + "/programme"}
                            >
                                Programme complet
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogAccordion;
