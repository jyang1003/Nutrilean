import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik'

function Profile(props) {   
    const [newProfile, setNewProfile] = useState({
        name:'',
        age:'',
        weight:'',
        activityLevel:'',
        owner: props.user._id
    })
    let bmr;
    let calGoal;
    let carbGoal;
    let proGoal;
    let fatGoal;
    const formik = useFormik({
        initialValues: {
            name: '',
            age: 0,
            weight: 0,
            sex: '',
            activityLevel: 0,
            goal: 0
        },
        onSubmit: () => {
            if(formik.values.sex === 'male'){
            bmr = formik.values.activityLevel * (88.362 + (13.397 * props.profile.weight * .4535) + (4.799 * props.profile.height * 2.57) 
            - (5.677 * props.profile.age)) 
                if (formik.values.goal === 1){
                    calGoal = Math.round(bmr - 400)
                    proGoal = formik.values.weight * 1.3
                    fatGoal = (.20 * bmr)/9
                    carbGoal = (calGoal - (proGoal * 4) + (fatGoal * 9))/4
                }
                else if (formik.values.goal === 2){
                    calGoal = Math.round(bmr)
                    proGoal = formik.values.weight * 1.1
                    fatGoal = (.25 * bmr)/9
                    carbGoal = (calGoal - (proGoal * 4) + (fatGoal * 9))/4
                    
                }
                else {
                    calGoal = Math.round(bmr + 500)
                    proGoal = formik.values.weight * .9
                    fatGoal = (.25 * bmr)/9
                    carbGoal = (calGoal - (proGoal * 4) + (fatGoal * 9))/4
                }
            } else{
                bmr = formik.values.activityLevel * (447.6 + (9.25 * props.profile.weight * .4535) + (3.10 * props.profile.height * 2.57)
                - (4.33 * props.profile.age))
                if (formik.values.goal === 1){
                    calGoal = Math.round(bmr - 400)
                    proGoal = formik.values.weight * 1.3
                    fatGoal = (.20 * bmr)/9
                    carbGoal = (calGoal - (proGoal * 4) + (fatGoal * 9))/4
                }
                else if (formik.values.goal === 2){
                    calGoal = Math.round(bmr)
                    proGoal = formik.values.weight * 1.1
                    fatGoal = (.25 * bmr)/9
                    carbGoal = (calGoal - (proGoal * 4) + (fatGoal * 9))/4
                    
                }
                else {
                    calGoal = Math.round(bmr + 500)
                    proGoal = formik.values.weight * .9
                    fatGoal = (.25 * bmr)/9
                    carbGoal = (calGoal - (proGoal * 4) + (fatGoal * 9))/4
                }
            }
            let profileInput = {
                name: formik.values.name,
                age: formik.values.age,
                weight: formik.values.weight,
                activityLevel: formik.values.activityLevel,
                baseCaloricMaintenence: Math.round(bmr),
                owner: props.user._id
            }
            console.log('this is the info',profileInput)
            fetch(`http://localhost:8000/profiles`, {
                method: 'POST',
                body: JSON.stringify(profileInput),
                headers: { 'Content-Type': 'application/JSON'}
            })
            .then((response) => {
                console.log('this is response.json', response)
            })
            .then(() => {
                setNewProfile({
                    name:'',
                    age:'',
                    weight:'',
                    activityLevel:'',
                    owner: props.user._id
                })
                props.getProfile()
            })
            .catch(error => {console.log(error)})
        }            
    })
        console.log('form values', formik.values)

let profileInfo;
let goalInfo;
        if (!props.currentProfile.age) {
            profileInfo = (
                <form id='new-profile-form-container' onSubmit={formik.handleSubmit} >
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input onChange={formik.handleChange} type='text' name='name' id='name' value={formik.values.name} />
                    </div>
                    <div>
                        <label htmlFor='age'>Age</label>
                        <input onChange={formik.handleChange} type='number' name='age' id='age' value={formik.values.age} />
                    </div>
                    <div>
                        <label htmlFor='weight'>Weight</label>
                        <input onChange={formik.handleChange} type='number' name='weight' id='weight' value={formik.values.weight} />
                    </div>
                    <select name='sex' value={formik.values.sex} onChange={formik.handleChange}>
                        <option>-Choose Your Sex--</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>

                    </select>
                    <select name='activityLevel' value={formik.values.activityLevel} onChange={formik.handleChange}>
                        <option>--Choose Actity Level--</option>
                        <option value={1.2}>Sedentary</option>
                        <option value={1.375}>Lightly active</option>
                        <option value={1.55}>Moderately active</option>
                        <option value={1.725}>Very active</option>
                        <option value={1.9}>Extra active</option>
                    </select>
                    <select value={formik.values.goal}>
                        <option>--What's your goal--</option>
                        <option value={1}>Lose weight</option>
                        <option value={2}>Maintain weight</option>
                        <option value={3}>Gain weight</option>
                    </select>
                    <input className='brand-button' type='submit' value='submit' />

                </form>
            )
        } else{
        profileInfo = (
            <div>
                <ul>
                    <li>Hello {props.currentProfile.name}</li>
                    <li>Age: {props.currentProfile.age}</li>
                    <li>Weight: {props.currentProfile.weight}</li>
                    <li>Base Caloric Maintenence: {props.currentProfile.baseCaloricMaintenence}</li>
                </ul>
            </div>
        )
        goalInfo = (
            <div>
                <ul>
                    <li>Caloric Goal: {props.currentProfile.caloricGoal}</li>
                    <li>Protein Goal: {props.currentProfile.proteinGoal}</li>
                    <li>Carbs Goal: {props.currentProfile.carbsGoal}</li>
                    <li>Fats Goal: {props.currentProfile.fatsGoal}</li>
                </ul>
            </div>
        )
    }
// display nutrition goals
// function for math stuff
    return (
        <div>
            <p>this works</p>
            {profileInfo}
            {goalInfo}
        </div>
    )
}
export default Profile