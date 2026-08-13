import React from "react";
import Accordion, {
    AccordionItem,
    AccordionTitle,
    AccordionContent,
} from "../accordion";
import ProgrammeData from "../../data/programme.json";

const AccordionWrap = () => {
    return (
        <Accordion classOption="accordion-style2 no-bg">
            {ProgrammeData.days.map((day) => (
                <AccordionItem key={day.id} id={day.id}>
                    <AccordionTitle id={day.id}>
                        {day.label} — {day.date}
                    </AccordionTitle>
                    <AccordionContent id={day.id}>
                        {day.excerpt}
                    </AccordionContent>
                </AccordionItem>
            ))}
            <AccordionItem id="inscription">
                <AccordionTitle id="inscription">
                    Comment s&apos;inscrire ?
                </AccordionTitle>
                <AccordionContent id="inscription">
                    L&apos;inscription se fait en ligne sur la page Inscription
                    &amp; Contacts, en tant que particulier ou
                    entreprise/institution. Après validation, vous recevez une
                    confirmation par courriel.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionWrap;
