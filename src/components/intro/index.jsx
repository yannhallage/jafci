import Button from "../button";
import PropTypes from "prop-types";

const Intro = ({ data }) => {
    const primary = data.primaryBtn || {
        text: "S'inscrire",
        path: "/inscription",
    };
    const secondary = data.secondaryBtn || {
        text: "Découvrir le programme",
        path: "/programme",
    };
    const backgroundImage = /^https?:\/\//i.test(data.backgroundImage)
        ? data.backgroundImage
        : process.env.PUBLIC_URL + data.backgroundImage;

    return (
        <div
            className="intro-section"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="slider-content">
                            <p className="text animated delay1">
                                {data.subTitle}
                            </p>
                            <h2
                                className="title animated delay2"
                                dangerouslySetInnerHTML={{ __html: data.title }}
                            />
                            <Button
                                path={primary.path}
                                classOption="btn btn-danger me-3 animated delay1"
                                text={primary.text}
                            />
                            <Button
                                path={secondary.path}
                                classOption="btn btn-outline-secondary animated delay2"
                                text={secondary.text}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Intro.propTypes = {
    data: PropTypes.object,
};

export default Intro;
