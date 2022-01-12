// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik'

// function NutritionForm(props) {  
//     const formik = useFormik({
//         initialValues: {
//             calories: 0,
//             protein: 0,
//             carbs: 0,
//             fats: 0,
//             date:''
//         },
//         onSubmit: () => {
//             let nutritionInput = {
//                 name: formik.values.name,
//                 age: formik.values.age,
//                 weight: formik.values.weight,
//                 activityLevel: formik.values.activityLevel,
//                 owner: props.user._id
//             }
//             console.log('this is the info', nutritionInput)
//             fetch(`http://localhost:8000/intake/${props.currentProfile._id}`, {
//                 method: 'POST',
//                 body: JSON.stringify(profileInput),
//                 headers: { 'Content-Type': 'application/JSON'}
//             })
//             .then((response) => {
//                 console.log('this is response.json', response)
//             })
//             .catch(error => {console.log(error)})
//         }            
//     })
//     let dailyIntakeForm = (
//         <form id='myDay'>
//             <div>
//                 <label htmlFor='calories'>Calories</label>
//                 <input onChange={formik.handleChange} type='number' name='calories' id='calories' value={formik.values.calories} />
//             </div>
//             <div>
//                 <label htmlFor='protein'>Protein</label>
//                 <input onChange={formik.handleChange} type='number' name='protein' id='protein' value={formik.values.protein} />
//             </div>
//             <div>
//                 <label htmlFor='carbs'>Carbs</label>
//                 <input onChange={formik.handleChange} type='number' name='carbs' id='carbs' value={formik.values.carbs} />
//             </div>
//             <div>
//                 <label htmlFor='fats'>Fats</label>
//                 <input onChange={formik.handleChange} type='number' name='fats' id='fats' value={formik.values.fats} />
//             </div>
//         </form>
//         )
//     return (
//         <div>
//             <p1>This works</p1>
//             {dailyIntakeForm}
//         </div>
//     )
// }
// export default NutritionForm