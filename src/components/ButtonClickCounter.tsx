import React, {useEffect, useState} from "react";

export default function ButtonClickCounter() {
    const [clickCount, setClickCount] = useState(Number(localStorage.getItem('ClickCount')) || 0);

    function handleClick() {
        setClickCount(clickCount + 1);
    }

    useEffect(() => {
        localStorage.setItem('ClickCount', String(clickCount));
    }, [clickCount]);

    return (
        <div style={{display: "flex", flexDirection:"column", justifyContent: "center"}} id="button_div">
            <button className="buton" onClick={handleClick}>Click me!</button>
            <small style={{display: "block", textAlign: "center"}}>You've clicked this button {clickCount} times!</small>
        </div>
    );
}