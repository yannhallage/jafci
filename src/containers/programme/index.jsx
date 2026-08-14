import { useEffect, useState } from "react";
import ProgrammeData from "../../data/programme.json";
import SectionTitle from "../../components/section-title";
import ProgrammeSlot from "./slot";

const ProgrammeContainer = () => {
    const { intro, pdf, days } = ProgrammeData;
    const [activeDay, setActiveDay] = useState(0);

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        const index = ProgrammeData.days.findIndex((day) => day.id === hash);
        if (index >= 0) {
            setActiveDay(index);
        }
    }, []);

    const selectDay = (index, id) => {
        setActiveDay(index);
        if (window.history.replaceState) {
            window.history.replaceState(null, "", `#${id}`);
        } else {
            window.location.hash = id;
        }
        const panel = document.getElementById(`programme-${id}`);
        if (panel) {
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const currentDay = days[activeDay];
    const pdfHref = encodeURI(`${process.env.PUBLIC_URL}${pdf.href}`);

    return (
        <section className="programme-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            classOption="text-center"
                            subTitle={intro.subTitle}
                            title={intro.title}
                        />
                    </div>
                </div>

                <div
                    className="programme-intro"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <p className="programme-area__note">{intro.note}</p>
                    {intro.stats ? (
                        <ul className="programme-stats">
                            {intro.stats.map((stat) => (
                                <li key={stat.label}>
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    <a
                        className="btn btn-theme"
                        href={pdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {pdf.label}
                        <i className="icofont-download"></i>
                    </a>
                </div>

                <div
                    className="programme-days"
                    data-aos="fade-up"
                    data-aos-duration="1100"
                    role="tablist"
                >
                    {days.map((day, index) => {
                        const isActive = index === activeDay;
                        const num = String(index + 1).padStart(2, "0");
                        return (
                            <button
                                key={day.id}
                                type="button"
                                className={`programme-days__tab${
                                    isActive ? " is-active" : ""
                                }`}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`programme-${day.id}`}
                                id={`tab-${day.id}`}
                                onClick={() => selectDay(index, day.id)}
                            >
                                <span className="programme-days__index">
                                    {num}
                                </span>
                                <span className="programme-days__copy">
                                    <span className="programme-days__label">
                                        {day.label} · {day.tag}
                                    </span>
                                    <span className="programme-days__date">
                                        {day.date}
                                    </span>
                                    <span className="programme-days__excerpt">
                                        {day.excerpt}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div
                    className="programme-timeline"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    role="tabpanel"
                    id={`programme-${currentDay.id}`}
                    aria-labelledby={`tab-${currentDay.id}`}
                >
                    <div className="programme-timeline__header">
                        <p>{currentDay.tag}</p>
                        <h3>{currentDay.date}</h3>
                    </div>
                    {currentDay.slots.map((slot, index) => (
                        <ProgrammeSlot
                            key={`${currentDay.id}-${index}`}
                            slot={slot}
                        />
                    ))}
                </div>

                <div className="text-center programme-area__footer-cta">
                    <a
                        className="btn btn-theme btn-border"
                        href={pdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {pdf.label}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProgrammeContainer;
