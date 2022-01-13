import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function DailyNutrition(props) {   
    // const testFunction = (e) => {
    //     console.log('this is formik date', formik.values.date)
    //     console.log('this is date,', date)
    //     setTotalCal(formik.values.calories)
    // }
	
    const formik = useFormik({
        initialValues: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            date:''
        },
        onSubmit: () => {

            let nutritionInput = {
                calories: formik.values.calories,
                protein: formik.values.protein,
                carbs: formik.values.carbs,
                fats: formik.values.fats,
                date: formik.values.date
            }
            console.log('this is the info', nutritionInput)
            fetch(`http://localhost:8000/intake/${props.profile._id}`, {
                method: 'POST',
                body: JSON.stringify(nutritionInput),
                headers: { 'Content-Type': 'application/JSON'}
            })
            .then(() => {
                props.loadProfile()
                props.dailyIntake()
            })
            .catch(error => {console.log(error)})
        }            
    })
    useEffect(() => {
		props.loadProfile()
        props.dailyIntake()
	}, [formik])

    let dailyIntakeForm = (
        <form id='myDay' onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor='calories'>Calories</label>
                <input onChange={formik.handleChange} type='number' name='calories' id='calories' value={formik.values.calories} />
            </div>
            <div>
                <label htmlFor='protein'>Protein</label>
                <input onChange={formik.handleChange} type='number' name='protein' id='protein' value={formik.values.protein} />
            </div>
            <div>
                <label htmlFor='carbs'>Carbs</label>
                <input onChange={formik.handleChange} type='number' name='carbs' id='carbs' value={formik.values.carbs} />
            </div>
            <div>
                <label htmlFor='fats'>Fats</label>
                <input onChange={formik.handleChange} type='number' name='fats' id='fats' value={formik.values.fats} />
            </div>
            <div>
                <label htmlFor='date'>Date</label>
                <input onChange={formik.handleChange} type='date' name='date' id='date' value={formik.values.date} />
            </div>
            <input type='submit'></input>
        </form>
        )

    return (
    <div>
        <div>
            <h1>Today is {props.date}</h1>
            {dailyIntakeForm}
        </div>
        <div>
            <h2>Here is your intake for the day:</h2>
            <p>Total Calories: {props.cal}</p>
            <p>Total Protein: {props.pro}</p>
            <p>Total Carbs: {props.carb}</p>
            <p>Total Fats: {props.fat}</p>
        </div>
    </div>
    )
}
export default DailyNutrition