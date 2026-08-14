import PropTypes from "prop-types";

const TYPE_META = {
    session: { label: "Session" },
    break: { label: "Pause" },
    ceremony: { label: "Cérémonie" },
    symposium: { label: "Symposium" },
    parallel: { label: "En parallèle" },
    public: { label: "Grand public" },
};

const KIND_META = {
    atelier: "Atelier",
    paramedical: "Paramédical",
    imagerie: "Imagerie",
    "sante-travail": "Santé au travail",
};

const flagSrc = (iso2) =>
    iso2 ? `https://flagcdn.com/w80/${iso2.toLowerCase()}.png` : null;

const TalkList = ({ talks }) => {
    if (!talks || !talks.length) return null;

    let displayIndex = 0;

    return (
        <ol className="programme-talks">
            {talks.map((talk, index) => {
                displayIndex += 1;
                const number = String(displayIndex).padStart(2, "0");
                return (
                    <li key={index}>
                        <span className="programme-talks__num">{number}</span>
                        <div className="programme-talks__body">
                            <p className="programme-talks__title">
                                {talk.title}
                            </p>
                            {talk.speaker ? (
                                <p className="programme-talks__speaker">
                                    {talk.speaker}
                                </p>
                            ) : null}
                        </div>
                        {talk.debate === "vs" ? (
                            <span className="programme-talks__vs">VS</span>
                        ) : null}
                    </li>
                );
            })}
        </ol>
    );
};

TalkList.propTypes = {
    talks: PropTypes.array,
};

const CountryList = ({ countries }) => {
    if (!countries || !countries.length) return null;
    return (
        <ul className="programme-countries">
            {countries.map((item, index) => {
                const flag = flagSrc(item.iso2);
                return (
                    <li key={index}>
                        {flag ? (
                            <img
                                src={flag}
                                alt={`Drapeau ${item.country}`}
                                width="20"
                                height="14"
                                loading="lazy"
                            />
                        ) : null}
                        <span>
                            {item.country}
                            {item.speaker ? (
                                <>
                                    {" "}
                                    <strong>{item.speaker}</strong>
                                </>
                            ) : null}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

CountryList.propTypes = {
    countries: PropTypes.array,
};

const SessionCard = ({ session, variant }) => {
    const typeMeta = TYPE_META[variant] || TYPE_META.session;
    const kindLabel = KIND_META[session.kind];
    const badgeLabel = kindLabel || typeMeta.label;
    const badges = session.badges || [];

    return (
        <article className={`programme-card programme-card--${variant}`}>
            <div className="programme-card__top">
                <h4 className="programme-card__title">{session.title}</h4>
                <div className="programme-card__badges">
                    <span className="programme-badge">{badgeLabel}</span>
                    {badges.map((badge) => (
                        <span
                            key={badge}
                            className="programme-badge programme-badge--live"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
            {session.theme ? (
                <p className="programme-card__theme">{session.theme}</p>
            ) : null}
            {session.moderators ? (
                <p className="programme-card__meta">
                    <span>Modérateurs</span>
                    {session.moderators}
                </p>
            ) : null}
            {session.speakers ? (
                <p className="programme-card__meta">
                    <span>Intervenants</span>
                    {session.speakers.join(" · ")}
                </p>
            ) : null}
            <CountryList countries={session.countries} />
            <TalkList talks={session.talks} />
            {session.items ? (
                <ul className="programme-list">
                    {session.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : null}
            {session.note ? (
                <p className="programme-card__note">{session.note}</p>
            ) : null}
        </article>
    );
};

SessionCard.propTypes = {
    session: PropTypes.object.isRequired,
    variant: PropTypes.string,
};

SessionCard.defaultProps = {
    variant: "session",
};

const ProgrammeSlot = ({ slot }) => {
    if (slot.type === "parallel") {
        const columns = slot.sessions.length > 2 ? 4 : 6;
        return (
            <div className="programme-slot programme-slot--parallel">
                <div className="programme-slot__time">
                    <span>{slot.time}</span>
                </div>
                <div className="programme-slot__body">
                    <p className="programme-slot__parallel-label">
                        Sessions simultanées
                    </p>
                    <div className="row">
                        {slot.sessions.map((session, index) => (
                            <div
                                key={index}
                                className={`col-md-${columns}${
                                    index < slot.sessions.length - 1
                                        ? " mb-3 mb-md-0"
                                        : ""
                                }`}
                            >
                                <SessionCard
                                    session={session}
                                    variant="parallel"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`programme-slot programme-slot--${slot.type}`}>
            <div className="programme-slot__time">
                <span>{slot.time}</span>
            </div>
            <div className="programme-slot__body">
                <SessionCard session={slot} variant={slot.type} />
            </div>
        </div>
    );
};

ProgrammeSlot.propTypes = {
    slot: PropTypes.object.isRequired,
};

export default ProgrammeSlot;
