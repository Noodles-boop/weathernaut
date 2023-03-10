import CityName from "./CityName.jsx";
import cloudy from "../animated/cloudy.svg";
import thermometerGrid from "../static/thermometer-outline.svg"
import sunGrid from "../static/sunny-outline.svg"
import pressureGrid from "../static/pulse-outline.svg"
import waterGrid from "../static/water-outline.svg"
import Loader from "./Loader.jsx";
import {formatDate, formatTemp} from "../utils.js";
import Carousel from "./Carousel.jsx";
import Form from "./Form.jsx";
import {useState} from "react";
import data from "../../data2.json"

export default function MainView() {
	const [cityName, setCityName] = useState();
	const [currentCity, setCurrentCity] = useState(data[0]);

	const onSubmit = (e) => {
		e.preventDefault();
		if(cityName === "") return;
		setCurrentCity(data.filter((city) => city.name.toLowerCase() === cityName.toLowerCase())[0]);
	}

	return (
		<>
			<main className="w-full p-4">
				<Form cityName={cityName} setter={setCityName} onSubmit={onSubmit} />
				<CityName city={currentCity.name} country={currentCity.sys.country} />
				<section className="w-full bg-blue-500 rounded-lg my-4 overflow-hidden">
					<div className="w-full flex items-center justify-center flex-col p-4">
						<img src={cloudy} alt="oy luffy" className="" />
						<div className="flex items-center flex-col gap-2">
							<h2 className="text-white text-2xl capitalize">{currentCity.weather[0].description}</h2>
							<p className="text-slate-300 text-xs">{formatDate(Date.now())}</p>
						</div>
						<h1 className="text-8xl text-white font-bold my-6">{formatTemp(currentCity.main.temp)}°</h1>
					</div>

					<div className="grid grid-cols-2 grid-rows-2 h-[200px] border-collapse">
						<div className="w-full h-full border-y-[1px] border-t-white p-3 flex items-center gap-2">
							<img src={cloudy} alt="oy luffy" className="h-[40px]" />
							<aside>
								<p className="text-slate-300 text-xs uppercase">Wind</p>
								<p className="text-white text-xs">{currentCity.wind.speed}km/h</p>
							</aside>
						</div>
						<div className="w-full h-full border-[1px] border-r-0 border-white p-3 flex items-center gap-2">
							<img src={thermometerGrid} alt="" className="h-[40px]" />
							<aside>
								<p className="text-slate-300 text-xs uppercase">Feel like</p>
								<p className="text-white text-xs">{formatTemp(currentCity.main.feels_like)}°</p>
							</aside>
						</div>
						<div className="w-full h-full p-3 flex items-center gap-2">
							<img src={waterGrid} alt="" className="h-[40px]" />
							<aside>
								<p className="text-slate-300 text-xs uppercase">Humidity</p>
								<p className="text-white text-xs">{currentCity.main.humidity}%</p>
							</aside>
						</div>
						<div className="w-full h-full border-l-[1px] border-l-white p-3 flex items-center gap-2">
							<img src={pressureGrid} alt="" className="h-[40px]" />
							<aside>
								<p className="text-slate-300 text-xs uppercase">Pressure</p>
								<p className="text-white text-xs">{currentCity.main.pressure} mbar</p>
							</aside>
						</div>
					</div>
				</section>
			</main>

			<Carousel/>
		</>
	)
}
