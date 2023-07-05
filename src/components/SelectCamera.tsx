import React, {useCallback, useMemo} from "react";
import Select, {SingleValue} from "react-select";
import {OptionCamera} from "../interfaces/OptionCamera";
import {PropSelectCamera} from "../interfaces/PropSelectCamera";

export enum Camera {
    FHAZ = 'FHAZ',
    RHAZ = 'RHAZ',
    MAST = 'MAST',
    CHEMCAM = 'CHEMCAM',
    MAHLI = 'MAHLI',
    MARDI = 'MARDI',
    NAVCAM = 'NAVCAM',
    PANCAM = 'PANCAM',
    MINITES = 'MINITES'
}

const compatibleCamerasMap: Record<string, Camera[]> = {
    'Curiosity': [Camera.FHAZ, Camera.RHAZ, Camera.MAST, Camera.CHEMCAM, Camera.MAHLI, Camera.MARDI, Camera.NAVCAM],
    'Opportunity': [Camera.FHAZ, Camera.RHAZ, Camera.NAVCAM, Camera.PANCAM, Camera.MINITES],
    'Spirit': [Camera.FHAZ, Camera.RHAZ, Camera.NAVCAM, Camera.PANCAM, Camera.MINITES]
};

export default function SelectCamera({roverName, contextProps}: PropSelectCamera) {
    const cameraOptions: OptionCamera[] = useMemo(() => {
        const cameras = compatibleCamerasMap[roverName];

        return cameras?.map((cameraName):OptionCamera => { return {value: cameraName.toString(), label: cameraName.toString()}; }) ?? [];
    }, [roverName]);

    const handleChange = useCallback((option: SingleValue<OptionCamera>) => {
        if (option) {
            contextProps.dispatch(option.value);
        }
    }, []);

    return (
        <Select
            className="select"
            options={cameraOptions}
            placeholder={'Select a camera'}
            onChange={handleChange}
        />
    );
}