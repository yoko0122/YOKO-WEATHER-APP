import { Search } from "../components/search";
import { Sun } from "../components/sun";
import { Luna } from "../components/lunas";
import { User } from "../components/users";
import { Pin } from "../components/ping";
import { Heart } from "../components/heart";
import { Last } from "../components/hom";
import { Pinal } from "../components/pin";
import { Right } from "../components/right";
import { Left } from "../components/left";
import { useEffect, useState } from "react";

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

        setFilteredCity(filtered.slice(0, 20));
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
        month: "long",   // May
        day: "numeric",  // 14
        year: "numeric"  // 2025
    });

    return (
        <div className="flex">
            {/* Left Section (Day) */}
            <div className="bg-[#F3F4F6] h-screen relative flex flex-1 flex-col items-center justify-center gap-10">
                {/* Search */}
                {/* <div className="absolute top-10 left-10 flex w-[500px] rounded-[80px] shadow-lg bg-white">
                    <div className="p-5">
                        <Search />
                    </div>
                    <input
                        className="w-full h-17 py-4 pl-4 pr-6 rounded-[80px] text-[24px] text-black outline-none"
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                        value={inputName}
                    />
                    <div class="mt-2.5 rounded-3xl bg-white/80 py-4 shadow-lg backdrop-blur-md">
                        <button class="flex w-full items-center gap-x-4 px-6 py-2 transition-all duration-300 hover:bg-gray-100">
                            <p class="truncate text-2xl font-bold">Molah, Afghanistan</p>
                        </button>
                        <button class="flex w-full items-center gap-x-4 px-6 py-2 transition-all duration-300 hover:bg-gray-100">
                            <p class="truncate text-2xl font-bold">Molah, Afghanistan</p>
                        </button>
                    </div>
                </div> */}


                <div className="absolute left-8 top-12 w-2/3 max-w-md z-20">
                    <input
                        type="text"
                        placeholder="Search city"
                        className="w-full rounded-full py-4 px-8 text-xl outline-none shadow bg-white"
                        onChange={handleSearch}
                        value={inputName}
                        autoComplete="off"
                    />
                    {filteredCity && filteredCity.length > 0 && (
                        <ul className="absolute bg-white shadow rounded-md mt-2 w-full max-h-60 overflow-y-auto">
                            {filteredCity.map((city, i) => (
                                <li key={city.city}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                                    onMouseDown={() => {
                                        setInputName(city.city);
                                        setSelectedName(city.city);
                                        setFilteredCity([]);
                                    }}
                                >
                                    <span>{city.city}</span><span className="text-xs text-gray-400">{city.country}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Day Card */}
                <div className="z-20 w-[414px] h-[832px] rounded-[48px] overflow-hidden shadow-xl bg-white/75 backdrop-blur-[24px]">
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

            {/* Center toggle buttons */}
            <div className="flex bg-white gap-4 items-center px-6">
                <Left />
                <Right />
            </div>

            {/* Right Section (Night) */}
            <div className="h-screen relative flex flex-1 items-center justify-center bg-[#0f141e]">
                {/* Night Card */}
                <div className="z-20 w-[414px] h-[832px] rounded-[48px] overflow-hidden shadow-xl bg-[#111827]/75 backdrop-blur-lg">
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
