import React from "react";
import Accordion, {
    AccordionItem,
    AccordionTitle,
    AccordionContent,
} from "../accordion";

const AccordionWrap = () => {
    return (
        <Accordion classOption="accordion-style2 no-bg">
            <AccordionItem id="one">
                <AccordionTitle id="one">
                    Jour 1 — Jeudi 10 septembre 2026
                </AccordionTitle>
                <AccordionContent id="one">
                    Interventions en salles de cathétérisme cardiaque avec
                    retransmission live. Horaires et salles détaillés à
                    confirmer dès réception du pré-programme officiel.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="two">
                <AccordionTitle id="two">
                    Jour 2 — Vendredi 11 septembre 2026
                </AccordionTitle>
                <AccordionContent id="two">
                    Conférences, symposium, ateliers, panels d&apos;experts et
                    retransmission live. Programme scientifique provisoire
                    repris de 2024, à actualiser pour 2026.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="three">
                <AccordionTitle id="three">
                    Jour 3 — Samedi 12 septembre 2026
                </AccordionTitle>
                <AccordionContent id="three">
                    Dépistage grand public, prévention des AVC et des crises
                    cardiaques. Une journée tournée vers la sensibilisation des
                    populations.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="four">
                <AccordionTitle id="four">
                    Comment s&apos;inscrire ?
                </AccordionTitle>
                <AccordionContent id="four">
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
