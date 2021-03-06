// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Profile from './components/Profile'
import DailyNutrition from './components/DailyNutrition'
import MyWeek from './components/MyWeek'
import './index.css';



const App = () => {

	const [user, setUser] = useState(null)
	const [currentProfile, setCurrentProfile] = useState({})
	const [msgAlerts, setMsgAlerts] = useState([])
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
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id))
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}
	const dailyIntake = () => {
            const allNutrition = currentProfile.nutrition
            console.log('all nutrition', allNutrition)
            let thisDayNutrition = allNutrition.filter(object => object.date == date)
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
	}
	//==================//
	// GET USER PROFILE //
	//==================//
	const loadProfile = () => {
		if (user != null) {
			console.log('user id: ', user._id)
			//fetch req to get profile
			fetch(`http://localhost:8000/profile/${user._id}`)
				.then(profile => {
					// console.log('first .then: ',profile)
					return profile.json()
				})
				.then(profile => {
					console.log('second .then: ', profile)
					setCurrentProfile(profile)
				})
				.catch(error => console.log(error))
		}
	}
	//=================//
	// HOOK UPON LOGIN //
	//=================//
	useEffect(() => {
		loadProfile()
		console.log('this is current profile:', currentProfile)
		// console.log('this is current user:', user)
	}, [user])

	return (
		<Fragment>
			<Header user={user} profile={currentProfile}/>
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/profile'
					element={<Profile currentProfile={currentProfile} loadProfile={loadProfile} dailyIntake={dailyIntake} cal={totalCal} pro={totalPro} carb={totalCarb} fat={totalFat} user={user} msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/my-week'
					element={<MyWeek msgAlert={msgAlert} date={date} setUser={setUser} profile={currentProfile} dailyIntake={dailyIntake} cal={totalCal} pro={totalPro} carb={totalCarb} fat={totalFat} date={date}/>}
				/>
				<Route
					path='/my-day'
					element={<DailyNutrition msgAlert={msgAlert} user={user} profile={currentProfile} loadProfile={loadProfile} dailyIntake={dailyIntake} cal={totalCal} pro={totalPro} carb={totalCarb} fat={totalFat} date={date}/>}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App