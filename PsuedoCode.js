/*
TODO LIST
1. learn/add graph stuff
2. add edit function based on graph click 
3. stretch goal allow them to view graph by different week

things i still need to do nutrition till goal
thats basically it



function to get caloric goal
BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)
first convert weight into kg 
0.453592kg per pound 

2.57 cm per inch

bmrMen = 88.362 + (13.397 * profile.weight * .4535) + (4.799 * profile.height * 2.57) - (5.677 * profile.age)

820.197
814.006
136
bmrWomen = 447.6 + (9.25 x weight * .4535) + (3.10 x height * 2.57) – (4.33 x age)



if goal is lose weight
caloric maintenance - 500
macros need research

FOR CUT
protein: 1.1-1.4 grams per bodyweight * 4 = calories

fats: 15-25% bmr/9 = grams

carbs: fill in the rest/4 = grams

GAINING
protein: 0.8-1.0 grams per pound * 4 = calories

fats: 20-30% of calories/9 = grams

carbs: fill in the rest/4 = grams

MAINTAIN
protein 25%
fats 25%
carbs 50%



            if(formik.values.sex === 'male'){
            bmr = formik.values.activityLevel * (88.362 + (13.397 * props.currentProfile.weight * .4535) + (4.799 * props.currentProfile.height * 2.57) 
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

    fetch localhost8000/profile to get the profile
    return profile
    .then((profile) => {
                        bmr = profile.activityLevel * (447.6 + (9.25 * profile.weight * .4535) + (3.10 * props.profile.height * 2.57)
                - (4.33 * props.profile.age))
    })

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
        const calcDailyIntake = () => {
            const allNutrition = props.profile.nutrition
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


        get total for all the days
        push them into an array
        whole thing array index 0 - 6

        moment().inBetween()
        moment().isAfter()

        look into doomsday 

        see how many days between anchor date and day trying to identify then use modulus

        

        destringify
        get current date, check with date
        get DAY (mon tues etc)

        switch statement based on DAY 
        ex. if tues, gen tues + last 2 days
        if wed gen wed + last 3 days

        last day would be 1st + 6
*/