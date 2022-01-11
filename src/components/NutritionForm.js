import React, { useState, useEffect } from 'react';

function NutritionForm(props) {  
    const handleChange = (e) => {
        console.log(e.target.value)
    }
    let dailyIntakeForm = (
        <form id='myDay'>
            <div className='my-day-label'>
                <label className='my-day-label' htmlFor='jobTitle'>Calories intake: </label>
                <input className='my-day-field' type='text' name='calories' id='jobTitle'/>
            </div>
        </form>
        )
    return (
        <div>
            <p1>This works</p1>
            {dailyIntakeForm}
        </div>
    )
}
export default NutritionForm