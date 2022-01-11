import React, { useState, useEffect } from 'react';

function Profile(props) {   
const [newProfile, setNewProfile] = useState({
    name:'',
    age:'',
    weight:'',
    activityLevel:'',
    owner: props.user._id
})
//handle submit
    const handleChange = (e) => {
        setNewProfile({...newProfile, [e.target.name]: e.target.value}) 
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        //take the info
        let preJSONBody = {
            name: newProfile.name,
            age: newProfile.age,
            weight: newProfile.weight,
            activityLevel: newProfile.activityLevel,
            owner: props.user._id
        }
        //post to database
        fetch(`http://localhost8000/profiles`, {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(response => response.json())
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
let profileInfo;
let goalInfo;
        if (!props.currentProfile.age) {
            profileInfo = (
                <form id='new-profile-form-container' onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input onChange={handleChange} type='text' name='name' id='name' value={newProfile.name} />
                    </div>
                    <div>
                        <label htmlFor='skills'>Age</label>
                        <input onChange={handleChange} type='text' name='age' id='age' value={newProfile.skills} />
                    </div>
                    <div>
                        <label htmlFor='zipCode'>Weight</label>
                        <input onChange={handleChange} type='text' name='weight' id='weight' value={newProfile.zipCode} />
                    </div>
                    <input className='brand-button' type='submit' value='submit' />
                    <select>
                        <option>--Choose Actity Level--</option>
                        <option value={1.2}>Sedentary</option>
                        <option value={1.375}>Lightly Active</option>
                        <option value={1.55}>Moderately Active</option>
                        <option value={1.725}>Very Active</option>
                        <option value={1.9}>Extra Active</option>
                    </select>
                    <select>
                        <option>--What's your goal--</option>
                        <option value={1.2}>Sedentary</option>
                        <option value={1.375}>Lightly Active</option>
                        <option value={1.55}>Moderately Active</option>
                    </select>
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