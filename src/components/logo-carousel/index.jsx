import PropTypes from "prop-types";

const LogoCarousel = ({ logos, reverse, duration }) => {
    const loop = [...logos, ...logos];

    return (
        <div
            className={`logo-carousel${reverse ? " is-reverse" : ""}`}
            style={{ "--logo-carousel-duration": duration }}
        >
            <div className="logo-carousel__track">
                {loop.map((logo, index) => (
                    <div
                        className="logo-carousel__item"
                        key={`${logo.id}-${index}`}
                    >
                        <img
                            src={process.env.PUBLIC_URL + logo.image}
                            alt={logo.name}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

LogoCarousel.propTypes = {
    logos: PropTypes.arrayOf(PropTypes.object).isRequired,
    reverse: PropTypes.bool,
    duration: PropTypes.string,
};

LogoCarousel.defaultProps = {
    reverse: false,
    duration: "42s",
};

export default LogoCarousel;
