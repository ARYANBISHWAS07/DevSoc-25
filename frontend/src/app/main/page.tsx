import {DataTable} from "@/contents-ui/table";
import {Clock,NotebookPen} from "lucide-react";
import {ChartComponent} from "@/contents-ui/graph";
import Navbartwo from "../components/nav2";
import Footer from "../components/fotter";


export default function Page() {
    return (
        <>
        <div className="mb-10">
            <Navbartwo />
            <div className="mt-40 mb-5 justify-center items-center ">
                <div className=" shadow-gray-200 w-full justify-center items-center flex h-[20vh] ">
                    <p className="text-white font-bold font-serif text-4xl">
                        Welcome in, Vansh Dhir
                    </p>
                </div>
                <div
                    className="flex items-center justify-around border-4 border-blue-800 w-[35vw] m-10 h-[22vh] ml-[30vw] rounded-full bg-blue-50/10 shadow-blue-800/50 backdrop-blur-lg">
                    <div className="flex flex-col items-center justify-center">
                        <Clock size={50} className="text-blue-800"/>
                        <h1 className="font-bold text-blue-900">Total Meets:</h1>
                        <p className="text-xl font-semibold text-blue-900">72</p>
                    </div>

                    <div className="w-1 h-[60%] bg-blue-800 rounded-full"></div>
                    <div className="flex flex-col items-center">
                        <NotebookPen size={50} className="text-blue-800"/>
                        <h1 className="font-bold text-blue-900">Total Time:</h1>
                        <p className="text-xl font-semibold text-blue-900">17 Hr 50 Min</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <ChartComponent/>
                </div>
            </div>
            <DataTable/>
        </div>
        <Footer/>
        </>
    );
}
