import { Search } from "../components/search";
import { Sun } from "../components/sun";
import { Luna } from "../components/lunas";
import { User } from "../components/users";
import { Pin } from "../components/ping";
import { Heart } from "../components/heart";
import { Last } from "../components/hom";
import { Pinal } from "../components/pin";
import { useEffect, useState } from "react";
import { Circle } from "../components/circle";


export default function Home() {
    const [allCity, setAllCity] = useState([]);
    const [filteredCity, setFilteredCity] = useState([]);
    const [inputName, setInputName] = useState('Ulan Bator');
    const [selectedName, setSelectedName] = useState(inputName);
    const [weather, setWeather] = useState({})

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Серверийн алдаа');
                }
                return res.json();
            }).then((response => {
                if (response.error === false) {
                    const cities = [];

                    response?.data?.forEach(country => {
                        country?.cities?.forEach(city => {
                            cities.push({
                                city: city,
                                country: country.country
                            });
                        });
                    });

                    setAllCity(cities);
                }
            })).catch((err) => {
                console.error('Fetch алдаа:', err);
            });
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setInputName(value);

        const filtered = allCity.filter(city =>
            city.city.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredCity(filtered.slice(0, 4));
    };

    useEffect(() => {
        const fetchWeather = async () => {
            const res = await fetch(`/api/weather?q=${selectedName}`);
            const data = await res.json();
            setWeather(data);
        };

        fetchWeather();
    }, [selectedName]);

    const hours = weather?.forecast?.forecastday[0]?.hour;

    // const dayData = hours.filter(hour => hour.is_day === 1);
    const nightData = hours?.filter(hour => hour.is_day === 0);

    const lastUpdated = weather?.forecast?.forecastday[0]?.date;
    const date = new Date(lastUpdated);
    const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"

    });
    console.log();
    return (
        <div className="flex">
            {/* Left Section (Day) */}
            <div className="bg-[#F3F4F6] h-screen relative flex flex-1 flex-col items-center justify-center gap-10">

                {/* === Circle background === */}
                <div className="absolute z-10">

                </div>

                <img
                    src="/narb.png"
                    className="w-[174px] h-[174px] absolute top-[140px] left-[calc(50%-257px)] z-0"
                />

                {/* === Search and Weather Card === */}
                <div className="absolute left-24 top-34 w-2/3 max-w-md z-30">
                    {/* Search Input */}
                    <div className="relative">
                        <img
                            src="/Vector.png"
                            alt="Search Icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 opacity-80"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-14 pr-6 py-4 text-xl rounded-full outline-none shadow-lg bg-white placeholder-gray-400"
                            onChange={handleSearch}
                            value={inputName}
                            autoComplete="off"
                        />
                    </div>

                    {/* Dropdown List */}
                    {filteredCity && filteredCity.length > 0 && (
                        <ul className="mt-2 w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                            {filteredCity.map((city, i) => (
                                <li
                                    key={city.city}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                    onMouseDown={() => {
                                        setInputName(city.city);
                                        setSelectedName(city.city);
                                        setFilteredCity([]);
                                    }}
                                >
                                    <img
                                        src="/Pin.png"
                                        alt="Location Icon"
                                        className="w-6 h-6"
                                    />
                                    <div className="leading-snug">
                                          {city.city}, {city.country}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>



               
                <div className="z-10 w-[414px] h-[832px] rounded-[48px] overflow-hidden shadow-xl bg-white/75 backdrop-blur-[24px]">


                    <div className="space-y-12 px-10 py-14">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400">{formattedDate}</p>
                                <h1 className="text-black text-5xl">{selectedName}</h1>
                            </div>
                            <Pinal />
                        </div>
                        <div className="pl-7">
                            <Sun />
                        </div>
                        <div className="px-10">
                            <div className="text-transparent bg-clip-text font-extrabold text-[90px] -mt-10 bg-gradient-to-b from-black to-white">
                                {weather?.forecast?.forecastday[0]?.day?.avgtemp_c}°
                            </div>
                            <p className="font-extrabold mb-12 h-6 text-orange-500">
                                {weather?.forecast?.forecastday[0]?.day?.condition?.text}
                            </p>
                            <div className="flex items-center justify-between">
                                <Last />
                                <Pin />
                                <Heart />
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Circle />

            {/* Right Section (Night) */}
            <div className="h-screen relative flex flex-1 items-center justify-center bg-[#0f141e]">
                {/* Night Card */}
                <img
                    src="/aa.png"
                    className="w-[174px] h-[174px] absolute bottom-[140px] left-[calc(50%--90px)] z-0"
                />

                <div className="z-20 w-[414px] h-[832px] rounded-[48px] overflow-hidden shadow-xl bg-[#111827BF]/75 backdrop-blur-lg">
                    <div className="space-y-12 px-10 py-14">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400">{formattedDate}</p>
                                <h1 className="text-white text-5xl">{selectedName}</h1>
                            </div>
                            <Pinal />
                        </div>
                        <div className="pl-7">
                            <Luna />
                        </div>
                        <div className="px-10">
                            <div className="text-transparent bg-clip-text font-extrabold text-[90px] -mt-10 bg-gradient-to-b from-white to-gray-300">
                                {nightData && nightData[0]?.temp_c}°
                            </div>
                            <p className="font-extrabold mb-12 h-6 text-blue-300">
                                {nightData && nightData[0]?.condition.text}
                            </p>
                            <div className="flex items-center justify-between text-white">
                                <Last />
                                <Pin />
                                <Heart />
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}