import SectionTitle from "../../../components/section-title";
import YoutubePlayer from "../../../components/youtube-player";

const HomeVideoContainer = () => {
    return (
        <section className="home-video-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <SectionTitle
                            classOption="text-center"
                            subTitle="JAFCI 2026"
                            title="Les Journées <span>en images</span>"
                        />
                        <p
                            className="home-video__lead text-center"
                            data-aos="fade-up"
                        >
                            Découvrez l’esprit des Journées Africaines de
                            Cardiologie Interventionnelle, le rendez-vous
                            scientifique de référence à Abidjan.
                        </p>
                        <div data-aos="fade-up" data-aos-duration="1100">
                            <YoutubePlayer
                                url="https://youtu.be/oWy7yjvyD_w"
                                title="Présentation des JAFCI 2026"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeVideoContainer;
