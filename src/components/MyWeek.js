// import { scaleBand, scaleLinear } from 'd3-scale';
import React, { useState, useRef, useEffect } from 'react';
// import * as d3 from 'd3'
import moment from 'moment';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const MyWeek = (props) => {

    const [whichDisplay, setWhichDisplay] = useState('calories')
    const [data, setData] = useState()
    let weeklyIntake = []
    let reducedSunday = []
    let reducedMonday = []
    let reducedTuesday = []
    let reducedWednesday = []
    let reducedThursday = []
    let reducedFriday = []
    let reducedSaturday = []
    let totalForSunday = []
    let totalForMonday = []
    let totalForTuesday = []
    let totalForWednesday = []
    let totalForThursday = []
    let totalForFriday = []
    let totalForSaturday = []
    let whichNutrient;

    const handleNoData = () => {
        let dayTracker = {
            '0': 'Sunday',
            '1': 'Monday',
            '2': 'Tuesday',
            '3': 'Wednesday',
            '4': 'Thursday',
            '5': 'Friday',
            '6': 'Saturday',
        }
        for (let i = 0; i < weeklyIntake.length; i++) {
            let currentDay = 0
            currentDay++
            if (Array.isArray(weeklyIntake[i])) {
                weeklyIntake[i] = {
                    value: 0,
                    day: dayTracker[i.toString()]
                }
            }
        }
    }
    const thisWeek = () => {
        console.log('this is first thisWeek')
        if (whichDisplay === 'calories') {
            whichNutrient = 'calories'
        } else if (whichDisplay === 'carbs') {
            whichNutrient = 'carbs'
        } else if (whichDisplay === 'protein') {
            whichNutrient = 'protein'
        } else if (whichDisplay === 'fats') {
            whichNutrient = 'fats'
        }
        console.log('this is which nutrient after button click', whichNutrient)
        props.profile.nutrition.forEach(object => {
            if (moment(object.date).isSame(moment(props.date), 'week')) {
                if (moment(object.date).format('dddd') == 'Sunday') {
                    totalForSunday.push(object[whichNutrient])
                    reducedSunday = {
                        value: totalForSunday.reduce((a, b) => a + b, 0),
                        day: 'Sunday'
                    }
                } else if (moment(object.date).format('dddd') == 'Monday') {
                    totalForMonday.push(object[whichNutrient])
                    reducedMonday = {
                        value: totalForMonday.reduce((a, b) => a + b, 0),
                        day: 'Monday'
                    }
                } else if (moment(object.date).format('dddd') == 'Tuesday') {
                    totalForTuesday.push(object[whichNutrient])
                    reducedTuesday = {
                        value: totalForTuesday.reduce((a, b) => a + b, 0),
                        day: 'Tuesday'
                    }
                } else if (moment(object.date).format('dddd') == 'Wednesday') {
                    totalForWednesday.push(object[whichNutrient])
                    reducedWednesday = {
                        value: totalForWednesday.reduce((a, b) => a + b, 0),
                        day: 'Wednesday'
                    }
                } else if (moment(object.date).format('dddd') == 'Thursday') {
                    totalForThursday.push(object[whichNutrient])
                    reducedThursday = {
                        value: totalForThursday.reduce((a, b) => a + b, 0),
                        day: 'Thursday'
                    }
                } else if (moment(object.date).format('dddd') == 'Friday') {
                    totalForFriday.push(object[whichNutrient])
                    reducedFriday = {
                        value: totalForFriday.reduce((a, b) => a + b, 0),
                        day: 'Friday'
                    }
                } else if (moment(object.date).format('dddd') == 'Saturday') {
                    totalForSaturday.push(object[whichNutrient])
                    reducedSaturday = {
                        value: (totalForSaturday.reduce((a, b) => a + b, 0)),
                        day: 'Saturday'
                    }
                }
            }
        })
        weeklyIntake.push(reducedSunday)
        weeklyIntake.push(reducedMonday)
        weeklyIntake.push(reducedTuesday)
        weeklyIntake.push(reducedWednesday)
        weeklyIntake.push(reducedThursday)
        weeklyIntake.push(reducedFriday)
        weeklyIntake.push(reducedSaturday)
        handleNoData()
        setData(weeklyIntake)
    }

    const handleClick = (e) => {
        setWhichDisplay(e.target.value)
        console.log(e.target.value)
    }

    useEffect(() => {
        thisWeek()
    }, [whichDisplay])

    return (
        <div>
            <div>
                <label htmlFor='calories'>Calories</label>
                <button onClick={handleClick} type='radio' name='calories' value='calories'></button>
                <label htmlFor='protein'>Protein</label>
                <button onClick={handleClick} type='radio' name='protein' value='protein'></button>
                <label htmlFor='carbs'>Carbs</label>
                <button onClick={handleClick} type='radio' name='carbs' value='carbs'></button>
                <label htmlFor='fats'>Fats</label>
                <button onClick={handleClick} type='radio' name='fats' value='fats'></button>
            </div>
            <div>
            <BarChart
            width={900}
            height={600}
            data={data}
            margin={{
                top: 50,
                right: 30,
                left: 50,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" interval={0}/>
            <YAxis />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
            </div>
        </div>
    )
}
export default MyWeek