import { scaleBand, scaleLinear } from 'd3-scale';
import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3'
import moment from 'moment';
import { height } from 'dom-helpers';


function MyWeek(props) {

    const [whichDisplay, setWhichDisplay] = useState('calories')
    let svgRef = useRef()
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
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

    let m = moment()

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
            if (whichDisplay === 'calories') {
                whichNutrient = 'calories'
            } else if (whichDisplay === 'carbs') {
                whichNutrient = 'carbs'
            } else if (whichDisplay === 'protein') {
                whichNutrient = 'protein'
            } else if (whichDisplay === 'fats') {
                whichNutrient = 'fats'
            }
            props.profile.nutrition.forEach(object => {
                //check which variable to use
                console.log('this is object', object)
                //checks if its same week
                if (moment(object.date).isSame(moment(props.date), 'week')) {
                    //check day of week and push results into respective arrays
                    // console.log('this is same week')
                    console.log('this is which nutrient after button click', whichNutrient)
                    if (moment(object.date).format('dddd') == 'Sunday') {
                        totalForSunday.push(object[whichNutrient])
                        reducedSunday = {
                            value: totalForSunday.reduce((a, b) => a + b, 0),
                            day: 'Sunday'
                        }
                        // console.log('sun', totalForSunday)
                    } else if (moment(object.date).format('dddd') == 'Monday') {
                        totalForMonday.push(object[whichNutrient])
                        reducedMonday = {
                            value: totalForMonday.reduce((a, b) => a + b, 0),
                            day: 'Monday'
                        }
                        // console.log('Mon', totalForMonday)
                    } else if (moment(object.date).format('dddd') == 'Tuesday') {
                        totalForTuesday.push(object[whichNutrient])
                        // console.log('Tue', totalForTuesday)
                        reducedTuesday = {
                            value: totalForTuesday.reduce((a, b) => a + b, 0),
                            day: 'Tuesday'
                        }
                    } else if (moment(object.date).format('dddd') == 'Wednesday') {
                        // console.log('Wed', totalForWednesday)
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
                        // console.log('Thur', totalForThursday)
                    } else if (moment(object.date).format('dddd') == 'Friday') {
                        totalForFriday.push(object[whichNutrient])
                        reducedFriday = {
                            value: totalForFriday.reduce((a, b) => a + b, 0),
                            day: 'Friday'
                        }
                        // console.log('Fri', totalForFriday)
                    } else if (moment(object.date).format('dddd') == 'Saturday') {
                        totalForSaturday.push(object[whichNutrient])
                        reducedSaturday = {
                            value: (totalForSaturday.reduce((a, b) => a + b, 0)),
                            day: 'Saturday'
                        }
                        // console.log('Sat', totalForSaturday)
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
            // console.log('this is weeklyIntake', weeklyIntake)
            handleNoData()
            console.log('this is weekly intake', weeklyIntake)
        }


        const renderGraph = () => {
            const w = 600
            const h = 500
            const svg = d3.select(svgRef.current)
                .attr('width', w)
                .attr('height', h)
                .style('overflow', 'visible')
                .style('margin-top', '75px')
                .style('margin-left', '200px')
                .style('margin-bottom', '75px')

            //set scaling
            let xScale = d3.scaleBand()
                .domain(weeklyIntake.map(function(d) { return d.day; }))
                .range([0, w])
                .padding(0.5)
            let yScale = d3.scaleLinear()
                .domain([0, d3.max(weeklyIntake, function(d) { return(d.value) })])
                .range([h, 0])
            //set axis
            let xAxis = d3.axisBottom(xScale)
                .ticks(weeklyIntake.length)
                .tickValues(weeklyIntake.map((object, i) => object.day))
            let yAxis = d3.axisLeft(yScale)
                .ticks(8)
            svg.append('g')
                .call(xAxis)
                .attr('transform', `translate(0, ${h})`)
            svg.append('g')
                .call(yAxis)

            //setup svg data
            svg.selectAll('.bar')
                .data(weeklyIntake)
                .join(`rect`)
                .attr('x', function(d) { return xScale(weeklyIntake.day)})
                .attr('y', function(d) { return yScale(weeklyIntake.value)})
                // .attr('x', (v, i) => xScale(i))
                // .attr('y', yScale)
                .attr('width', xScale.bandwidth())
                .attr('height', val => h - yScale(val))
                }
        const handleClick = (e) => {
            setWhichDisplay(e.target.value)
            console.log(e.target.value)
        }
        useEffect(() => {
            // props.dailyIntake()
            //set up svg container
            console.log('this is working but also not')
            thisWeek()
            renderGraph()
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
                <svg ref={svgRef}>
                </svg>
            </div>
        )
    
}
export default MyWeek