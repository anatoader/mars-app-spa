import React, {useContext, useState} from "react";

const CounterContext = React.createContext(0);

export default function TreeCounter() {
    const [counter, setCounter] = useState(0);

    function handleClick(): void {
        setCounter(counter + 1);
    }

    return (
        <CounterContext.Provider value={counter}>
            <Component2 onClick={handleClick}/>
            <Component3/>
        </CounterContext.Provider>
    );
}

function Component2({onClick}: { onClick: any }) {
    return (
        <div>
            <button onClick={onClick} id="buton">Click me!</button>
        </div>
    );
}

function Component3() {
    return (
        <div>
            <p>This is a message from Component 3!</p>
            <Component4/>
        </div>
    );
}

function Component4() {
    const counter = useContext(CounterContext);
    return (
        <div>
            <p>You've clicked the button {counter} times!</p>
        </div>
    );
}