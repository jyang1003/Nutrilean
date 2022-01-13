import { scaleBand, scaleLinear } from 'd3-scale';
import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3'
import moment from 'moment';
import Profile from './Profile';


function MyWeek(props) {

    const svgRef = useRef()
    const [calorieData, setCalorieData] = useState([])
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    let data = [12, 321, 50, 70, 123]
    let weeklyCal = []
    let weeklyCarb = []
    let weeklyPro = []
    let weeklyFat = []
    let totalForSunday = []
    let totalForMonday = []
    let totalForTuesday = []
    let totalForWednesday = []
    let totalForThursday = []
    let totalForFriday = []
    let totalForSaturday = []


    let m = moment()
    const thisWeek = () => {
        props.profile.nutrition.forEach(object => {
            //checks if its same week
            if (moment(object.date).isSame(moment(props.date), 'week')) {
                //filter by day of week and push results into array 
                console.log('this is same week')
                if (moment(object.date).format('dddd') == 'Sunday') {
                    totalForSunday.push(object.calories)
                    totalForSunday.reduce((a, b) => a + b, 0)
                    console.log('sun', totalForSunday)
                } else if (moment(object.date).format('dddd') == 'Monday') {
                    totalForMonday.push(object.calories)
                    totalForMonday.reduce((a, b) => a + b, 0)
                    console.log('Mon', totalForMonday)
                } else if (moment(object.date).format('dddd') == 'Tuesday') {
                    totalForTuesday.push(object.calories)
                    totalForTuesday.reduce((a, b) => a + b, 0)
                    console.log('Tue', totalForTuesday)
                } else if (moment(object.date).format('dddd') == 'Wednesday') {
                    totalForWednesday.push(object.calories)
                    totalForWednesday.reduce((a, b) => a + b, 0)
                    console.log('Wed', totalForWednesday)
                } else if (moment(object.date).format('dddd') == 'Thursday') {
                    totalForThursday.push(object.calories)
                    totalForThursday = [totalForThursday.reduce((a, b) => a + b, 0)]
                    console.log('Thur', totalForThursday)
                } else if (moment(object.date).format('dddd') == 'Friday') {
                    totalForFriday.push(object.calories)
                    totalForFriday.reduce((a, b) => a + b, 0)
                    console.log('Fri', totalForFriday)
                } else if (moment(object.date).format('dddd') == 'Saturday') {
                    totalForSaturday.push(object.calories)
                    totalForSaturday = totalForSaturday.reduce((a, b) => a + b, 0)
                    console.log('Sat', totalForSaturday)
                }
            }
        })
    }

    // function to input that data into an array
    // add all the numbers with same date
    // push those numbers into an array
    //



    // const filterDay = () => {

    //     const allNutrition = profile.nutrition
    //     console.log('all nutrition', allNutrition)
    //     let thisDayNutrition = allNutrition.filter(object => object.date == date)
    //     thisDayNutrition.forEach(object => {
    //         calArray.push(object.calories)
    //         proArray.push(object.protein)
    //         carbArray.push(object.carbs)
    //         fatArray.push(object.fats)
    //     })
    //     setTotalCal(calArray.reduce((a, b) => a + b, 0))
    //     setTotalPro(proArray.reduce((a, b) => a + b, 0))
    //     setTotalCarb(carbArray.reduce((a, b) => a + b, 0))
    //     setTotalFat(fatArray.reduce((a, b) => a + b, 0))
    // }

    const renderGraph = () => {
        const w = 400
        const h = 300
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '75px')
        //set scaling
        const xScale = d3.scaleBand()
            .domain(data.map((num, i) => i))
            .range([0, w])
            .padding(0.5)
        const yScale = d3.scaleLinear()
            .domain([0, h])
            .range([h, 0])
        //set axis
        const xAxis = d3.axisBottom(xScale)
            .ticks(days)
        const yAxis = d3.axisRight(yScale)
            .ticks(5)
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)
        svg.append('g')
            .call(yAxis)

        //setup svg data
        svg.selectAll('.bar')
            .data(data)
            .join(`rect`)
            .attr('x', (num, i) => xScale(i))
            .attr('y', yScale)
            .attr('width', xScale.bandwidth())
            .attr('height', val => h - yScale(val))
    }
    useEffect(() => {
        // props.dailyIntake()
        //set up svg container
        thisWeek()
        renderGraph()
    }, [])

    return (
        <div>
            <svg ref={svgRef}>
            </svg>
        </div>
    )
}
export default MyWeek