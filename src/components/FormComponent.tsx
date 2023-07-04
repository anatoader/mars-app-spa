import React, {useCallback, useState} from "react";
import axios, {AxiosError} from 'axios';

import rovers_photo from '../media/rovers_photo.png';

import {RoversList} from "../interfaces/RoversList";
import SelectRover from "./SelectRover";

import {API_port} from "../App";

export default function FormComponent() {
    const [fetchRoversList, setFetchRoversList] = useState(false);
    const [roversList, setRoversList] = useState<RoversList>({} as RoversList);

    const fetchRovers = useCallback(async () => {
        const response = await axios.get(`http://localhost:${API_port}/rovers`)
            .catch((error: AxiosError) => {
                console.log(error.code);
            });
        if (response) {
            setRoversList(response.data);
            setFetchRoversList(true);
        }
    }, []);

    return (
        <div>
            {fetchRoversList ? (
                <SelectRover {...roversList}/>
            ) : (
                <div>
                    <img src={rovers_photo} className="Logo" alt="Logo"/>
                    <p>Select a rover and view photos captured by its cameras!</p>
                    <button id="buton" onClick={async () => await fetchRovers()}>
                        Click here to get the rovers list!
                    </button>
                </div>
            )}
        </div>
    );
}