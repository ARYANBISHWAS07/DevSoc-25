import Navbar from "@/app/components/navbar";
import {DataTable} from "@/contents-ui/table";
import {ChartComponent} from "@/contents-ui/graph";

export default function Page() {
    return (
        <div>
            <Navbar />
            <div >
                <p className="text-white font-bold font-serif text-2xl">
                    Hello Vansh Dhir
                </p>
                <div className="flex flex-row">
                    <h1>Total Meets:72</h1>
                    <h2>Total Time Spent:17 hr 50 min</h2>
                </div>
                <div className="border-2 border-blue-800 w-[60vw] h-[20vh] ml-[10vw] justify-center rounded-full b">

                </div>
            </div>
            <DataTable/>
        </div>
    );
}
