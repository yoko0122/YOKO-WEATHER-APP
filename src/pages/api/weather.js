export default async function handler(req, res) {
    const { q = 'Ulan Bator' } = req.query;
    const ApiKey = process.env.WEATHER_API;
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${q}`);
    const data = await response.json();
    res.status(200).json(data);
}
