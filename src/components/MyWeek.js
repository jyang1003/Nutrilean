import { scaleBand, scaleLinear } from 'd3-scale';
import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3'
import moment from 'moment';
import Profile from './Profile';
import { height } from 'dom-helpers';


function MyWeek(props) {

    const svgRef = useRef()
    let days = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
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
                //check day of week and push results into respective arrays
                console.log('this is same week')
                if (moment(object.date).format('dddd') == 'Sunday') {
                    totalForSunday.push(object.calories)
                    totalForSunday = [totalForSunday.reduce((a, b) => a + b, 0)]
                    console.log('sun', totalForSunday)
                } else if (moment(object.date).format('dddd') == 'Monday') {
                    totalForMonday.push(object.calories)
                    totalForMonday = [totalForMonday.reduce((a, b) => a + b, 0)]
                    console.log('Mon', totalForMonday)
                } else if (moment(object.date).format('dddd') == 'Tuesday') {
                    totalForTuesday.push(object.calories)
                    totalForTuesday = [totalForTuesday.reduce((a, b) => a + b, 0)]
                    console.log('Tue', totalForTuesday)
                } else if (moment(object.date).format('dddd') == 'Wednesday') {
                    totalForWednesday.push(object.calories)
                    totalForWednesday = [totalForWednesday.reduce((a, b) => a + b, 0)]
                    console.log('Wed', totalForWednesday)
                } else if (moment(object.date).format('dddd') == 'Thursday') {
                    totalForThursday.push(object.calories)
                    totalForThursday = [totalForThursday.reduce((a, b) => a + b, 0)]
                    console.log('Thur', totalForThursday)
                } else if (moment(object.date).format('dddd') == 'Friday') {
                    totalForFriday.push(object.calories)
                    totalForFriday = [totalForFriday.reduce((a, b) => a + b, 0)]
                    console.log('Fri', totalForFriday)
                } else if (moment(object.date).format('dddd') == 'Saturday') {
                    totalForSaturday.push(object.calories)
                    totalForSaturday = [totalForSaturday.reduce((a, b) => a + b, 0)]
                    console.log('Sat', totalForSaturday)
                }
            }
        })
        weeklyCal.push(totalForSunday[0])
        weeklyCal.push(totalForMonday[0])
        weeklyCal.push(totalForTuesday[0])
        weeklyCal.push(totalForWednesday[0])
        weeklyCal.push(totalForThursday[0])
        weeklyCal.push(totalForFriday[0])
        weeklyCal.push(totalForSaturday[0])
        console.log('this is weeklyCal', weeklyCal)
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
        const w = 600
        const h = 600
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '75px')
            .style('margin-left', '200px')
            .style('margin-bottom', '200px')
            .style('height', '700px')

        //set scaling
        const xScale = d3.scaleBand()
            .domain(days.map((num, i) => i))
            .range([0, w])
            .padding(0.5)
        const yScale = d3.scaleLinear()
            .domain([0, 3500])
            .range([h, 0])
        //set axis
        const xAxis = d3.axisBottom(xScale)
            .ticks(days.length)
        const yAxis = d3.axisRight(yScale)
            .ticks(8)
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)
        svg.append('g')
            .call(yAxis)

        //setup svg data
        svg.selectAll('.bar')
            .data(weeklyCal)
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