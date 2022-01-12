import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function DailyNutrition(props) {   
    const [totalCal, setTotalCal] = useState()
    const [totalPro, setTotalPro] = useState()
    const [totalCarb, setTotalCarb] = useState()
    const [totalFat, setTotalFat] = useState()

    let today = new Date(),
    month = ("0" + (today.getMonth() + 1)).slice(-2),
    date = `${today.getFullYear()}-${month}-${today.getDate()}`

    let calArray = []
    let proArray = []
    let carbArray = []
    let fatArray = []
    
    const testFunction = (e) => {
        console.log('this is formik date', formik.values.date)
        console.log('this is date,', date)
    }
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
                props.getProfile()
            })
            .then(()=>{
                
                const allNutrition = props.profile.nutrition
                // console.log('this is today', today.getDate)
                console.log('all nutrition', allNutrition)
                // console.log('this is date', date)
                let thisDayNutrition = allNutrition.filter(object => object.date == date)
                console.log('this is todays nutrition', thisDayNutrition)
                thisDayNutrition.forEach(object => {
                    calArray.push(object.calories)
                    proArray.push(object.protein)
                    carbArray.push(object.carbs)
                    fatArray.push(object.fats)
                })
                setTotalCal(calArray.reduce((a, b) => a + b, 0))
                setTotalPro(proArray.reduce((a, b) => a + b, 0))
                setTotalCarb(carbArray.reduce((a, b) => a + b, 0))
                setTotalFat(fatArray.reduce((a, b) => a + b, 0))
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
                <input onChange={formik.handleChange} type='date' name='date' id='date' value={formik.values.date} />
            </div>
            <input type='submit'></input>
        </form>
        )
        // through props.profile, display the information related to nutrition
        let dailyIntakeCard = (
            <div>

            </div>
        )

    return (
    <div>
        <div>
            <h1>Today is {date}</h1>
            {dailyIntakeForm}
            {/* <button onClick={testFunction}>test</button> */}
        </div>
        <div>
            <h2>Here is your intake for the day:</h2>
            <p>Total Calories: {totalCal}</p>
            <p>Total Protein: {totalPro}</p>
            <p>Total Carbs: {totalCarb}</p>
            <p>Total Fats: {totalFat}</p>
        </div>
    </div>
    )
}
export default DailyNutrition