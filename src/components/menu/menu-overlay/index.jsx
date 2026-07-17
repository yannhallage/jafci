import PropTypes from "prop-types";

const MenuOverlay = ({ show, onClick }) => {
    return (
        <div
            className={`jafci-offcanvas-overlay ${show ? "active" : ""}`}
            onClick={onClick}
            role="presentation"
        ></div>
    );
};

MenuOverlay.propTypes = {
    show: PropTypes.bool,
    onClick: PropTypes.func,
};

export default MenuOverlay;
