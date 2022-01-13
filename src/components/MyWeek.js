import { scaleBand, scaleLinear } from 'd3-scale';
import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3'

function MyWeek(props) {   
    const svgRef = useRef()
    const [calorieData, setCalorieData] = useState([])
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    let data = [12, 321, 50, 70, 123]

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
            .ticks(data.length)
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

    }, [])

    return (
        <div>
            <svg ref={svgRef}>
            </svg>
        </div>
    )
}
export default MyWeek