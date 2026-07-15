import React from "react";

const GoogleMap = () => {
    return (
        <iframe
            title="Noom Hôtel Abidjan Plateau"
            className="contact-map"
            src="https://maps.google.com/maps?q=Noom+Hotel+Abidjan+Plateau&t=&z=16&ie=UTF8&iwloc=&output=embed"
            aria-hidden="false"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ width: "100%", height: "100%", border: 0 }}
        ></iframe>
    );
};

export default GoogleMap;
