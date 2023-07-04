import {Request, Response} from "express";
import {AxiosError, AxiosResponse} from "axios";

const axios = require('axios');

export const NASA_API_KEY = "moraCBy8AOsu6FLuYUSxu5juPwSl9moTK82W8I9l";
export const URL_ROVERS_LIST = "https://api.nasa.gov/mars-photos/api/v1/rovers";
export const getRoversList = (req: Request, res: Response) => {
    axios.get(`${URL_ROVERS_LIST}?api_key=${NASA_API_KEY}`)
        .then((response: AxiosResponse) => {
            res.send(response.data);
        })
        .catch((error: AxiosError) => {
            res.send(error.code);
        });

    // temporary fix for RATE_LIMIT_EXCEEDED
    // res.send(roversResponseJson);
};

export const getRoverPhotos = (req: Request, res: Response) => {
    axios.get(`${URL_ROVERS_LIST}/${req.params.roverName}/photos`, {
        params: {
            earth_date: "2015-6-3",
            camera: req.params.cameraType,
            api_key: NASA_API_KEY,
        }
    })
        .then((response: AxiosResponse) => {
            res.send(response.data.photos.map((photo: {img_src: string}) => { return photo.img_src; }));
        })
        .catch((error: AxiosError) => {
            res.send(error.code);
        });
};

export const getRequest = (req: Request, res: Response) => {
    axios.get(req.params.url)
        .then((response: AxiosResponse) => {
            res.send(response.data);
        })
        .catch((error: AxiosError) => {
            res.send(error.code);
        });
}