import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const TARGET_QUALITY = "hd1080";
const PLAYER_WIDTH = 1920;
const PLAYER_HEIGHT = 1080;

const YOUTUBE_ID_REGEX =
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/;

const getYoutubeId = (url) => {
    const match = url.match(YOUTUBE_ID_REGEX);
    return match ? match[1] : url;
};

const loadYoutubeApi = () => {
    if (loadYoutubeApi.pending) {
        return loadYoutubeApi.pending;
    }

    loadYoutubeApi.pending = new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT);
            return;
        }

        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof previous === "function") {
                previous();
            }
            resolve(window.YT);
        };

        if (
            !document.querySelector(
                'script[src="https://www.youtube.com/iframe_api"]'
            )
        ) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            tag.async = true;
            document.body.appendChild(tag);
        }
    });

    return loadYoutubeApi.pending;
};

const requestHdQuality = (player) => {
    if (!player || typeof player.setPlaybackQuality !== "function") {
        return;
    }

    try {
        player.setPlaybackQuality(TARGET_QUALITY);
        if (typeof player.setPlaybackQualityRange === "function") {
            player.setPlaybackQualityRange(TARGET_QUALITY, TARGET_QUALITY);
        }
    } catch (error) {
        // YouTube peut ignorer la qualité demandée
    }
};

const YoutubePlayer = ({ url, title }) => {
    const frameRef = useRef(null);
    const hostRef = useRef(null);
    const playerRef = useRef(null);
    const [started, setStarted] = useState(false);
    const videoId = getYoutubeId(url);
    const poster = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) {
            return undefined;
        }

        const applyScale = () => {
            const width = frame.clientWidth || PLAYER_WIDTH;
            frame.style.setProperty(
                "--video-scale",
                String(width / PLAYER_WIDTH)
            );
        };

        applyScale();
        const observer = new ResizeObserver(applyScale);
        observer.observe(frame);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started || !hostRef.current) {
            return undefined;
        }

        let cancelled = false;

        loadYoutubeApi().then((YT) => {
            if (cancelled || !hostRef.current) {
                return;
            }

            playerRef.current = new YT.Player(hostRef.current, {
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                videoId,
                playerVars: {
                    autoplay: 1,
                    rel: 0,
                    modestbranding: 1,
                    hl: "fr",
                    color: "white",
                    playsinline: 1,
                    fs: 1,
                    vq: TARGET_QUALITY,
                    origin: window.location.origin,
                },
                events: {
                    onReady: (event) => {
                        requestHdQuality(event.target);
                        event.target.playVideo();
                    },
                    onStateChange: (event) => {
                        if (
                            event.data === YT.PlayerState.BUFFERING ||
                            event.data === YT.PlayerState.PLAYING
                        ) {
                            requestHdQuality(event.target);
                        }
                    },
                    onPlaybackQualityChange: (event) => {
                        if (event.data !== TARGET_QUALITY) {
                            requestHdQuality(event.target);
                        }
                    },
                },
            });
        });

        return () => {
            cancelled = true;
            if (
                playerRef.current &&
                typeof playerRef.current.destroy === "function"
            ) {
                playerRef.current.destroy();
            }
            playerRef.current = null;
        };
    }, [started, videoId]);

    return (
        <div className="home-video__frame" ref={frameRef}>
            {started ? (
                <div className="home-video__host">
                    <div ref={hostRef} title={title} />
                </div>
            ) : (
                <button
                    type="button"
                    className="home-video__poster"
                    onClick={() => setStarted(true)}
                    aria-label={`Lire la vidéo : ${title}`}
                >
                    <img
                        src={poster}
                        alt=""
                        onError={(event) => {
                            event.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                        }}
                    />
                    <span className="home-video__play" aria-hidden="true">
                        <i className="icofont-play-alt-2"></i>
                    </span>
                </button>
            )}
        </div>
    );
};

YoutubePlayer.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
};

YoutubePlayer.defaultProps = {
    title: "Vidéo YouTube JAFCI",
};

export default YoutubePlayer;
