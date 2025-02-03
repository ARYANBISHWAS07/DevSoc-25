import Navbar from "@/app/navbar";
import { ChartComponent } from "@/contents-ui/graph";
import { Calendar, Clock, Users } from "lucide-react";

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-20">
                <h1 className="font-bold text-white text-4xl tracking-wide">MINUTES OF MEETING</h1>
            </div>


            <div className="w-[80vw] mb-4 mx-auto mt-6 p-6 bg-blue-300 text-blue-800 rounded-xl shadow-xl border border-gray-700">

                <h1 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="ml-2">Minutes of The Meeting</span>
                </h1>
                <div className="mb-6 space-y-3">
                    <div className="flex items-center text-lg">
                        <Calendar className="w-6 h-6 mr-3 text-blue-800" />
                        <span className="font-semibold">Date:</span>
                        <span className="ml-2 font-normal">February 3, 2025</span>
                    </div>
                    <div className="flex items-center text-lg">
                        <Clock className="w-6 h-6 mr-3 text-blue-800" />
                        <span className="font-semibold">Time:</span>
                        <span className="ml-2 font-normal">10:00 AM – 11:30 AM</span>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-bold flex items-center">
                        <Users className="w-6 h-6 mr-2 text-blue-800" />
                        Attendees:
                    </h2>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-blue-800">
                        <li>John Doe <span className="text-blue-800">(Project Manager)</span></li>
                        <li>Jane Smith <span className="text-blue-800">(Software Engineer)</span></li>
                        <li>Mike Brown <span className="text-blue-800">(UI/UX Designer)</span></li>
                        <li>Emily White <span className="text-blue-800">(QA Engineer)</span></li>
                        <li>Robert Lee <span className="text-blue-800">(Marketing Lead)</span></li>
                    </ul>
                    <h1 className="text-blue-800 font-bold mt-4">DESCRIPTION:</h1>
                    <p>

                    </p>
                </div>
            </div>
        </>
    );
}
