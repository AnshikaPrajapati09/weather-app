import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("")
    let [error,setError] = useState(false)
    const API_URL = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "fcf70314bbe0bebe42931f312c3da99d";

    let getWeather = async () => {
        try{
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let JsonResponse = await response.json();
        // console.log(JsonResponse)
        let result = {
            city: city,
            temp: JsonResponse.main.temp,
            tempMax: JsonResponse.main.temp_max,
            tempMin: JsonResponse.main.temp_min,
            humidity: JsonResponse.main.humidity,
            feelsLike: JsonResponse.main.feels_like,
            weather: JsonResponse.weather[0].description,
        }
        console.log(result)
        return result
    }catch(err){
        throw err
    }

    }



    let handleChange = (evt) => {
        setCity(evt.target.value)
    }

    let handleSubmit = async(evt) => {
        try{
        evt.preventDefault();
        console.log(city)
        setCity("");
        let newInfo = await getWeather()
        updateInfo(newInfo)
        }catch(err){
            setError(true);
        }
    }

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
                {error && <p style={{color:"red"}}>No such place exists!</p>}
            </form>
        </div>
    )
}