import PropTypes from "prop-types";

const TalkList = ({ talks }) => {
    if (!talks || !talks.length) return null;
    return (
        <ol className="programme-talks">
            {talks.map((talk, index) => (
                <li key={index}>
                    <span>{talk.title}</span>
                    {talk.speaker ? <strong> ({talk.speaker})</strong> : null}
                </li>
            ))}
        </ol>
    );
};

TalkList.propTypes = {
    talks: PropTypes.array,
};

const CountryList = ({ countries }) => {
    if (!countries || !countries.length) return null;
    return (
        <ul className="programme-list">
            {countries.map((item, index) => (
                <li key={index}>
                    {item.country}
                    {item.speaker ? (
                        <>
                            {" — "}
                            <strong>{item.speaker}</strong>
                        </>
                    ) : null}
                </li>
            ))}
        </ul>
    );
};

CountryList.propTypes = {
    countries: PropTypes.array,
};

const SessionCard = ({ session, variant }) => {
    return (
        <article className={`programme-card programme-card--${variant}`}>
            <h4 className="programme-card__title">{session.title}</h4>
            {session.theme ? (
                <p className="programme-card__theme">
                    <em>{session.theme}</em>
                </p>
            ) : null}
            {session.moderators ? (
                <p className="programme-card__meta">
                    <span>Modérateurs</span> {session.moderators}
                </p>
            ) : null}
            {session.speakers ? (
                <p className="programme-card__meta">
                    <span>Intervenants</span> {session.speakers.join(", ")}
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
            <div className="programme-slot">
                <div className="programme-slot__time">
                    <span>{slot.time}</span>
                </div>
                <div className="programme-slot__body">
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
