import React, {useCallback, useState} from "react";
import axios, {AxiosError} from 'axios';

import rovers_photo from '../media/rovers_photo.png';

import {RoversList} from "../interfaces/RoversList";
import SelectRover from "./SelectRover";

import {API_port} from "../App";
import SelectCamera from "./SelectCamera";
import {Rover} from "../interfaces/Rover";
import {PhotoParser} from "./PhotoParser";

export default function FormComponent() {
    const [fetchRoversList, setFetchRoversList] = useState(false);
    const [roversList, setRoversList] = useState<RoversList>({} as RoversList);
    const [selectedRover, setSelectedRover] = useState<Rover>({} as Rover);
    const [selectedCamera, setSelectedCamera] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);

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

    const fetchPhotos = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:${API_port}/rovers/${selectedRover.name}/photos/${selectedCamera}`)
                .catch((error: AxiosError) => {
                    console.log(error.code);
                });
            if (response) {
                setPhotos(response.data);
            }
        } catch (error) {
            console.log(error);
            console.log(`Camera ${selectedCamera} is not supported by rover ${selectedRover.name}`);
        }
    }, [selectedRover, selectedCamera]);

    const showPhotos = useCallback((photos: string[]) => {
        return photos.slice(0,4).map((photo: string) => {
            return <PhotoParser url={photo}/>;
        });
    }, []);

    return (
        <div>
            {fetchRoversList ? (
                <div>
                    <SelectRover list={roversList} contextProps={{state: selectedRover, dispatch: setSelectedRover}}/>
                    {(Object.keys(selectedRover).length) ? (
                        <div>
                            <div className="rover_container">
                                <img className="rover_image" src={require(`../media/rover_${selectedRover.name.toLowerCase()}.png`)}/>
                                <span className="rover_text">Rover: {selectedRover.name}</span>
                                {selectedCamera && <span className="rover_text">Camera: {selectedCamera}</span>}
                            </div>

                            <SelectCamera roverName={selectedRover.name} contextProps={{state: selectedCamera, dispatch: setSelectedCamera}}/>
                            <button className="buton" onClick={async () => await fetchPhotos()}>
                                Submit
                            </button>

                            <div className="container">
                                {photos && showPhotos(photos)}
                            </div>
                        </div>
                    ) : (
                        <p>Please select the rover first</p>
                    )}
                </div>
            ) : (
                <div>
                    <img src={rovers_photo} className="Logo" alt="Logo"/>
                    <p>Select a rover and view photos captured by its cameras!</p>
                    <button className="buton" onClick={async () => await fetchRovers()}>
                        Click here to get the rovers list!
                    </button>
                </div>
            )}
        </div>
    );
}