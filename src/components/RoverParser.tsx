import {Rover} from "../interfaces/Rover";
import React from "react";

export default function RoverParser(rover: Rover) {
    return (
        <h1 id="header1">{rover.name}</h1>
    );
}