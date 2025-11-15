import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';
import type { ChartProps } from '../../types/types';
import './Chart.scss'

import CustomTooltip from '../CustomTooltip/CustomToolTip';
import { useCallback, useEffect, useRef } from 'react';


const Chart = ({ data, variations, line}: ChartProps) => {

    const chartWrapperRef = useRef<HTMLDivElement | null>(null);

    

    return (
        <div className="graph-wrapper" ref={chartWrapperRef}>
            <ResponsiveContainer width="100%" height="100%">
                {line === 'Area' ?
                    <AreaChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 5,
                            left: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="#e0e0e0"
                            strokeDasharray="0"
                            horizontal={true}
                            vertical={false}
                        />

                        <CartesianGrid
                            stroke="#e0e0e0"
                            strokeDasharray="10 9"
                            horizontal={false}
                            vertical={true}
                        />
                        {variations.map((item, i) =>
                            <Area
                                key={item.name}
                                type="monotone"
                                dataKey={item.name}
                                fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7300"][i % 4]}
                                fillOpacity={0.3}
                                stroke={["#8884d8", "#82ca9d", "#ffc658", "#ff7300"][i % 4]}
                                strokeWidth={2}
                                name={item.name}
                                isAnimationActive={false}
                                dot={false}
                                activeDot={false}
                                connectNulls={true}
                            />
                        )}

                        <XAxis
                            dataKey="date"
                            stroke='#918F9A'
                            tickFormatter={(dateStr) => {
                                if (dateStr.indexOf('W') === -1) {
                                    const d = new Date(dateStr);
                                    return d.toLocaleString("en-EN", { day: "numeric" }); // "1 Jan", "2 Jan"
                                } else {
                                    return dateStr
                                }

                            }}
                        />
                        <YAxis stroke='#918F9A' width="auto" label={{ position: 'insideLeft', angle: -90 }} tickFormatter={(value) => `${value}%`} />
                        {/* <Legend align="right" /> */}
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'gray', strokeWidth: 1 }} />
                    </AreaChart>

                    :
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 5,
                            left: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="#e0e0e0"
                            strokeDasharray="0"
                            horizontal={true}
                            vertical={false}
                        />

                        <CartesianGrid
                            stroke="#e0e0e0"
                            strokeDasharray="10 9"
                            horizontal={false}
                            vertical={true}
                        />
                        {variations.map((item, i) => (
                            <Line
                                key={item.id ?? i}
                                type={line === 'Line' ? 'linear' : 'monotone'}
                                dataKey={item.name}
                                name={item.name}
                                stroke={["#8884d8", "#82ca9d", "#ffc658", "#ff7300"][i % 4]}
                                connectNulls
                                strokeWidth='2px'
                                dot={false}
                                activeDot={false}
                                isAnimationActive={false}
                            />


                        ))}

                        <XAxis
                            stroke='#918F9A'
                            dataKey="date"

                            tickFormatter={(dateStr) => {
                                if (dateStr.indexOf('W') === -1) {
                                    const d = new Date(dateStr);
                                    return d.toLocaleString("en-EN", { day: "numeric" }); // "1 Jan", "2 Jan"
                                } else {
                                    return dateStr
                                }

                            }}
                        />
                        <YAxis stroke='#918F9A' width="auto" label={{ position: 'insideLeft', angle: -90 }} tickFormatter={(value) => `${value}%`} />
                        {/* <Legend align="right" /> */}
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'gray', strokeWidth: 1 }} />
                    </LineChart>
                }
            </ResponsiveContainer>
        </div>
    )
}
export default Chart