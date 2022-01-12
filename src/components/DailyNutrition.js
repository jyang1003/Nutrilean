import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function DailyNutrition(props) {   
    const [dailyIntake, setDailyIntake] = useState([])
    let current = new Date()
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

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
            .then((response) => {
                console.log('this is response.json', response)
            })
            .catch(error => {console.log(error)})
        }            
    })
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
                <input onChange={formik.handleChange} type='date' name='date' id='date' placeHolder='hehe' value={formik.values.date} />
            </div>
            <input type='submit'></input>
        </form>
        )
        // through props.profile, display the information related to nutrition

    return (
        <div>
            <p1>This works</p1>
            {dailyIntakeForm}
        </div>
    )
}
export default DailyNutrition