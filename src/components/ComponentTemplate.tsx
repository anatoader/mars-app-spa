import React from 'react';
import '../App.css';
import ButtonClickCounter from "./ButtonClickCounter";

export interface ComponentProps {
    title: string;
    paragraph1: string;
    paragraph2: string;
    logo_img: string;
}

export default function ComponentTemplate(params: ComponentProps) {
    return (
        <div className="App">
            <header className="InfoNASA-header">
                <img src={params.logo_img} className="InfoNASA-logo" alt="Logo"/>
                <p id="paragraph">
                    {params.paragraph1}
                </p>

                <p id="paragraph">
                    {params.paragraph2}
                </p>
                <ButtonClickCounter/>
            </header>
        </div>
    );
}