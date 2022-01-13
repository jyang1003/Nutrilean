/*
TODO LIST
1. create all functions for the nutrition math
    caloric goals
    protein goals
    carbs goals
    fats goals

2. make function to add up nutrition by date
3. do the goals - daily intake function
4. learn/add graph stuff
5. add edit function based on graph click 
6. stretch goal allow them to view graph by different week

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


                    calGoal = Math.round(bmr + 400)
                    proGoal = formik.values.weight * 1.3
                    fatGoal = (.20 * bmr)/9
                    carbGoal = (calGoal - (proGoal * 4) + (fatGoal * 9))/4
                    if (profile.sex === 'male'){
                        if(goal ===1){
                            calGoalVar = 
                        }
                    }
calGoalVar
proGoalVar
fatGoalVar
carbGoalVar
            if(formik.values.sex === 'male'){
            bmr = formik.values.activityLevel * (88.362 + (13.397 * props.currentProfile.weight * .4535) + (4.799 * props.currentProfile.height * 2.57) 
            - (5.677 * props.profile.age)) 
                if (formik.values.goal === 1){
                    calGoal = Math.round(bmr - 400)
                    proGoal = formik.values.weight * 1.2
                    fatGoal = (.2 * bmr)/9
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
*/