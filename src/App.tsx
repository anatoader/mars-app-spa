import React from 'react';
import './App.css';

import logo from './media/logo.svg';
import NASA_logo from './media/NASA_logo.png';

import ComponentTemplate from "./components/ComponentTemplate";
import TreeCounter from "./components/TreeCounter";
import PageNotFound from "./components/PageNotFound";
import {ComponentProps} from "./components/ComponentTemplate";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function App() {
    return (
        <div className="App App-header">
            <Router>
                <Routes>
                    <Route path="/" element={<InfoNASA/>}/>
                    <Route path="/treecounter" element={<TreeCounter/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </Router>
        </div>
    );
}

function ReactApp() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
            </header>
        </div>
    );
}

function InfoNASA() {
    let props: ComponentProps = {
        title: "NASA",
        paragraph1: `The National Aeronautics and Space Administration (NASA /ˈnæsə/) is an independent agency of the U.S.
         federal government responsible for the civil space program, aeronautics research, and space research.`,
        paragraph2: `NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics (NACA), 
        to give the U.S. space development effort a distinctly civilian orientation, emphasizing peaceful applications
        in space science. NASA has since led most American space exploration, including Project Mercury, Project Gemini,
        the 1968–1972 Apollo Moon landing missions, the Skylab space station, and the Space Shuttle. NASA supports the
        International Space Station and oversees the development of the Orion spacecraft and the Space Launch System for
        the crewed lunar Artemis program, Commercial Crew spacecraft, and the planned Lunar Gateway space station. The 
        agency is also responsible for the Launch Services Program, which provides oversight of launch operations and
        countdown management for uncrewed NASA launches.`,
        logo_img: NASA_logo
    };

    return (
        <div>
            <a className="App-link" href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA OFFICIAL WEBSITE</a>
            <ComponentTemplate {...props}/>
        </div>
    );
}
