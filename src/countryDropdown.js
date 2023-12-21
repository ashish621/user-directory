// src/components/CountryDropdown.js
import React, { useEffect, useState } from 'react';

const CountryDropdown = ({ onCountryChange }) => {
    const [timezones, setTimezones] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('Asia/Kolkata');

    useEffect(() => {
        const fetchTimezones = async () => {
            try {
                const response = await fetch('http://worldtimeapi.org/api/timezone');
                const data = await response.json();
                setTimezones(data);
            } catch (error) {

                console.error('Error fetching timezones:', error);
            }
        };

        fetchTimezones();
    }, []);

    const handleCountryChange = (event) => {
        const selected = event.target.value;
        setSelectedCountry(selected);
        onCountryChange(selected);
    };

    return (
        <div>
            <label htmlFor="countryDropdown">Select a Country:</label>
            <select id="countryDropdown" value={selectedCountry} onChange={handleCountryChange}>
                <option value="" disabled>Select a country</option>
                {timezones.map((timezone, index) => (
                    <option key={index} value={timezone}>
                        {timezone}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountryDropdown;
