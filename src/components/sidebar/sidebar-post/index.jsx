import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SidebarPost = ({ data }) => {
    return (
        <div className="widget-blog-post">
            <ul>
                {data.map((single, i) => {
                    const imagePath = (single.media.rcImage || "").replace(
                        /^\.\//,
                        "/"
                    );
                    const imageSrc = /^https?:\/\//i.test(imagePath)
                        ? imagePath
                        : `${process.env.PUBLIC_URL}${
                              imagePath.startsWith("/") ? "" : "/"
                          }${imagePath}`;

                    return (
                        <li key={i}>
                            <div className="thumb">
                                <img src={imageSrc} alt={single.title} />
                            </div>
                            <div className="content">
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        `/blog-details/${single.id}`
                                    }
                                >
                                    {single.title}
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

SidebarPost.propTypes = {
    data: PropTypes.array,
};

export default SidebarPost;
