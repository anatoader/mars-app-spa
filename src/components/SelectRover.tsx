import React, {useCallback, useMemo, useState} from "react";
import {RoversList} from "../interfaces/RoversList";
import {Rover} from "../interfaces/Rover";
import Select, {SingleValue} from "react-select";
import {Option} from "../interfaces/Option";
import axios, {AxiosError} from 'axios';

import {API_port} from "../App";
import {PhotoParser} from "./PhotoParser";

export default function SelectRover(roversList: RoversList) {
    const [isSelected, setIsSelected] = useState(false);
    const [photos, setPhotos] = useState<string[]>([]);

    const options: Option[] = useMemo(() => {
        return roversList.rovers.map((rover: Rover) => {
            return {value: rover, label: rover.name}
        });
    }, [roversList]);

    const fetchRoverPhotos = useCallback(async (rover: Rover) => {
        console.log(rover);
        const response = await axios.get(`http://localhost:${API_port}/rovers/${rover.name}/photos/fhaz`)
            .catch((error: AxiosError) => {
                console.log(error.code);
            });
        if (response) {
            setPhotos(response.data);
        }
    }, [setPhotos]);

    const handleChange = useCallback((option: SingleValue<Option>) => {
        if (option) {
            setIsSelected(true);
            fetchRoverPhotos(option?.value).catch((error: AxiosError) => {
                console.log(error.code)
            });
        }
    }, [fetchRoverPhotos]);


    const showPhotos = useCallback((photos: string[]) => {
        return photos.map((photo: string) => {
            return <PhotoParser url={photo}/>;
        });
    }, []);

    return (
        <div>
            <Select
                id="select"
                options={options}
                placeholder={'Select a rover'}
                onChange={handleChange}
            />
            {isSelected && showPhotos(photos)}
        </div>
    );
}
