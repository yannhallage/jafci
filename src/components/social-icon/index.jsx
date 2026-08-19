import PropTypes from "prop-types";

const SocialIcon = ({ path, icon }) => {
    const href = /^https?:\/\//i.test(path)
        ? path
        : process.env.PUBLIC_URL + path;

    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <i className={icon}></i>
        </a>
    );
};

SocialIcon.propTypes = {
    path: PropTypes.string,
    icon: PropTypes.string,
};

export default SocialIcon;
