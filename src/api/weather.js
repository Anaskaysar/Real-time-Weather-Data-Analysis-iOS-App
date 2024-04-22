import axios from 'axios';

import { apiKey } from '../constants';


const foreCastEndpoint= params => `https://us-central1-weatherapp-421018.cloudfunctions.net/foreCastApi?apiKey=${apiKey}&city=${params.cityName}` ;


const locationsEndpoint= params => `https://us-central1-weatherapp-421018.cloudfunctions.net/searchApi?apiKey=${apiKey}&city=${params.cityName}`;




const apiCall = async (endpoint) =>{
    const options = {
        method: 'GET',
        url : endpoint
    }

    try{
        const response = await axios.request(options)
        return response.data;
    }catch(err){
        console.log('error',err);
        return null;
    }
}

export const fetchWeatherForecast = params =>{
    let forecastUrl = foreCastEndpoint(params);
    return apiCall(forecastUrl);

}

export const fetchLocations = params =>{
    let locationUrl = locationsEndpoint(params);
    return apiCall(locationUrl);

}