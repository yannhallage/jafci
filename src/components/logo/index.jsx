import PropTypes from "prop-types";

const Logo = ({ image, classOption }) => {
    return (
        <a className={`${classOption}`} href={process.env.PUBLIC_URL + "/"}>
            <img
                className="sticky-img"
                src={process.env.PUBLIC_URL + image}
                alt="JAFCI"
            />
        </a>
    );
};

Logo.propTypes = {
    image: PropTypes.string,
    classOption: PropTypes.string,
};

Logo.defaultProps = {
    classOption: "text-center",
};

export default Logo;
