import { useState, useEffect } from "react";
import axios from "axios";

export default function Billboard() {
    // State to hold the results from the DB
    const [feature, setFeature] = useState(null);

    // Get a random movie
    const fetchFeature = async () => {
        try {
            const response = await axios.get('http://localhost:3001/billboard');
            setFeature(response.data[0]);
        } catch (err) {
            console.error('Error getting the movie: ', err);
        }
    };

    // Running the fetchFeature on load
    useEffect(() => {
        fetchFeature();
    }, []);

    // console.log(feature);
    if (!feature) return <div>Loading...</div>;

    return (
        <div className="relative h-[70vh]">
            <video 
                className="w-full h-[70vh] object-contain bg-black brightness-[60%]"
                autoPlay
                muted
                loop
                poster={feature.thumbnailUrl}
                src={feature.videoUrl}>
            </video>
            <div className="absolute top-[30%] md:top-[55%] ml-4 md:ml-16">
                <p className="text-white text-1xl md:text-5xl h-full w-50% lg:text-6xl font-bold drop-shadow-xl">
                    {feature.title}
                </p>
                <p className="text-white text-[8px] md:text-xl mt-3 md:mt-8 w-90% md:w-[80%] lg:w-50% drop-shadow-xl">
                    {feature.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <button className="bg-white text-white opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-sm lg:text-lg font-semibold flex flex-row hover:bg-opacity-20 items-center transition">
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );
}
