import React, {useCallback, useMemo} from "react";
import {Rover} from "../interfaces/Rover";
import Select, {SingleValue} from "react-select";
import {OptionRover} from "../interfaces/OptionRover";
import {PropSelectRover} from "../interfaces/PropSelectRover";

export default function SelectRover({list, contextProps}: PropSelectRover) {
    const roverOptions: OptionRover[] = useMemo(() => {
        return list.rovers.map((rover: Rover) => {
            return {value: rover, label: rover.name}
        });
    }, [list]);

    const handleChange = useCallback((option: SingleValue<OptionRover>) => {
        if (option) {
            contextProps.dispatch(option.value);
        }
    }, []);

    return (
        <div>
            <Select
                className="select"
                options={roverOptions}
                placeholder={'Select a rover'}
                onChange={handleChange}
            />
        </div>
    );
}
