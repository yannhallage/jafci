import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidebarTag from "../sidebar/sidebar-tag";
import { slugify } from "../../utils";
import BlogData from "../../data/blog.json";

const BlogDetailsWrap = ({ data }) => {
    const largePath = (data.media.largeImage || "").replace(/^\.\//, "/");
    const largeSrc = /^https?:\/\//i.test(largePath)
        ? largePath
        : `${process.env.PUBLIC_URL}${
              largePath.startsWith("/") ? "" : "/"
          }${largePath}`;

    const cate = data.categories.map((value, i) => {
        return (
            <Link
                className="category"
                to={process.env.PUBLIC_URL + `/category/${slugify(value)}`}
                key={i}
            >
                {value}
                {i !== data.categories.length - 1 && ","}
            </Link>
        );
    });
    return (
        <div className="blog-details-wrpa">
            <div className="content">
                <h2 className="title">{data.title}</h2>
                <img src={largeSrc} alt={data.title} />
                <div className="meta">
                    {cate}
                    <span>-</span>
                    <Link
                        className="author"
                        to={
                            process.env.PUBLIC_URL +
                            `/date/${slugify(data.date)}`
                        }
                    >
                        {data.date}
                    </Link>
                    <span>by</span>
                    <Link
                        className="author"
                        to={
                            process.env.PUBLIC_URL +
                            `/author/${slugify(data.author)}`
                        }
                    >
                        {data.author}
                    </Link>
                </div>
                {data.body.map((single, key) => {
                    return (
                        <div
                            className="desc"
                            key={key}
                            dangerouslySetInnerHTML={{ __html: single }}
                        ></div>
                    );
                })}
                <SidebarTag data={BlogData} />
            </div>
        </div>
    );
};

BlogDetailsWrap.propTypes = {
    data: PropTypes.object,
};

export default BlogDetailsWrap;
