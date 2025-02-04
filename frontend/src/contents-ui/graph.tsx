"use client"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const chartData = [
    { month: "Monday", desktop: 90 },
    { month: "Tuesday", desktop: 60 },
    { month: "Wednesday", desktop: 90 },
    { month: "Thursday", desktop: 90 },
    { month: "Friday", desktop: 90 },
    { month: "Saturday", desktop: 90 },
    { month: "Sunday", desktop: 90 },
]

export function ChartComponent() {
    return (
        <div className="ml-[40vw]">
        <Card className="w-[80vw] bg-blue-300 max-w-md mx-auto dark:bg-gray-900  rounded-10xl p-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-800 dark:text-white">
                    Weekly Meeting Timings(in mins)
                </CardTitle>
                <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Visitor statistics for this week (in minutes)
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                <ResponsiveContainer width="100%" height={200} >
                    <LineChart data={chartData} margin={{ top: 5, bottom: 5, left: 10, right: 10 }}>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={{ stroke: "#000000" }}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            interval={0}
                            tick={{ fill: "#000000" , fontSize: 12 }} // Change X-axis tick color
                        />

                        <YAxis
                            axisLine={{ stroke: "#000000" }}
                            tickLine={false}
                            tick={{ fill: "#000000", fontSize: 12 }} // Change Y-axis tick color
                            domain={[0, 100]}
                        />
                        <Tooltip formatter={(value) => `${value} min`} />
                        <Line
                            dataKey="desktop"
                            type="monotone"
                            stroke="#4F46E5"
                            strokeWidth={2}
                            dot={{ stroke: "#4F46E5", strokeWidth: 1 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-white">
                    Trending up by 5.2% this week
                    <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-xs">Data is collected from real-time user analytics.</div>
            </CardFooter>
        </Card>
        </div>
    )
}
