import React from "react";
import PropTypes from "prop-types";

const HeaderContactInfo = ({ data }) => {
    const info = data.info || "";
    const isEmail = info.includes("@");
    const isPhone = (data.icon || "").includes("call");
    const href = isEmail
        ? `mailto:${info}`
        : isPhone
        ? `tel:${info.replace(/[^\d+]/g, "")}`
        : null;

    return (
        <li className="media media-list">
            <span className="media-icon">
                <i className={data.icon}></i>
            </span>
            <div className="media-content">
                <span className="media-sub-heading">{data.title}</span>
                {href ? (
                    <a className="media-heading" href={href}>
                        {info}
                    </a>
                ) : (
                    <span className="media-heading">{info}</span>
                )}
            </div>
        </li>
    );
};

HeaderContactInfo.propTypes = {
    data: PropTypes.object,
};

export default HeaderContactInfo;
