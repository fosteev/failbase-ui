import React, {useEffect, useState} from "react";
import {request} from "../../actions/main";
import { ResponsiveLine } from '@nivo/line';


export default function Statistic() {
    const [data, setData] = useState([]);


    useEffect(() => {
        request('statistic', 'GET').then(resp => {
            if (resp.length !== 0) {
                let n = {};

                const last = resp[resp.length - 1];

                Object.keys(last.snapshot).forEach(key => {
                    n[key] = {
                        color: getRandomColor(),
                        data: [],
                        id: key
                    }
                });

                resp.reduce((acc, current) => {
                    if (acc.length !== 0) {
                        const prevDate = new Date(acc[acc.length - 1].date);
                        const currDate = new Date(current.date);

                        if ((currDate.getTime() - prevDate.getTime()) > (700 * 1000)) {
                            return acc.concat(current);
                        } else {
                            return acc;
                        }
                    } else {
                        return acc.concat(current);
                    }
                }, []).forEach(item => {
                    Object.keys(item.snapshot).forEach(key => {
                        n[key].data.push({
                            x: item.date,
                            y: item.snapshot[key]
                        })
                    })
                })

                setData(Object.values(n));
            }
        })
    }, []);

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const handleClickLegent = legend => {
        console.log(legend);
    }


    return (
        <div style={{
            height: '50vh',
            width: '40wh'
        }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        onClick: handleClickLegent,
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />

        </div>
    )
}