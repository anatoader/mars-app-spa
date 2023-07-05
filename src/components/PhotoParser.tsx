import {Photo} from "../interfaces/Photo";
import React from "react";

export function PhotoParser(photo: Photo) {
    return (
        <img className="item" src={photo.url} alt='Rover pic'/>
    );
}