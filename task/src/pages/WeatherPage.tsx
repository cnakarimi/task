import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { TextField, Button, Typography, CircularProgress, Card, CardContent } from "@mui/material";

// Fetch weather data using the OpenWeatherMap API
const fetchWeather = async (city: string) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Access API key using import.meta.env
    console.log(apiKey);
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        console.log("API Response:", data); // Log the API response for debugging
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Error fetching weather data.");
    }
};

const WeatherComponent: React.FC = () => {
    const [city, setCity] = useState<string>("");

    // Using react-query to fetch data manually when refetch is triggered
    const { data, isLoading, isError, refetch } = useQuery(
        ["weather", city],
        () => fetchWeather(city),
        {
            enabled: false, // Disable automatic query execution
        }
    );

    const handleSearch = () => {
        if (city.trim()) {
            refetch(); // Trigger the query manually when the city is entered
        } else {
            console.log("City name is empty.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h4" gutterBottom>
                Weather Search
            </Typography>
            <div style={{ marginBottom: "20px" }}>
                <TextField
                    label="Enter city name"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                />
            </div>
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>

            {isLoading && (
                <div style={{ marginTop: "20px" }}>
                    <CircularProgress />
                </div>
            )}

            {isError && (
                <Typography color="error" style={{ marginTop: "20px" }}>
                    Error fetching data! Please check the city name and try again.
                </Typography>
            )}

            {data && (
                <Card style={{ marginTop: "20px", width: "300px" }}>
                    <CardContent>
                        <Typography variant="h6">Weather in {data.name}</Typography>
                        <Typography>Temperature: {data.main.temp}°C</Typography>
                        <Typography>Condition: {data.weather[0].description}</Typography>
                        <Typography>Humidity: {data.main.humidity}%</Typography>
                        <Typography>Wind Speed: {data.wind.speed} m/s</Typography>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default WeatherComponent;