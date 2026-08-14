import PropTypes from "prop-types";
import React from "react";

const Button = ({ classOption, text, path }) => {
    return (
        <React.Fragment>
            <a
                href={process.env.PUBLIC_URL + path}
                className={`${classOption}`}
            >
                {text}
            </a>
        </React.Fragment>
    );
};

Button.propTypes = {
    classOption: PropTypes.string,
    text: PropTypes.string,
    path: PropTypes.string,
};
Button.defaultProps = {
    classOption: "btn",
};

export default Button;
