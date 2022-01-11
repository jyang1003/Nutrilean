import React, { useState, useEffect } from 'react';

function Profile(props) {   
// function to display profile info
let display;
    display = (
        <ul>
            <li>{props.currentProfile.name}</li>
            <li>{props.currentProfile.age}</li>
            <li>{props.currentProfile.weight}</li>
            <li>Base Caloric Maintenence: {props.currentProfile.baseCaloricMaintenence}</li>
        </ul>
    )
// display nutrition goals
// function for math stuff
    return (
        <div>
            <p>this works</p>
            {display}
        </div>
    )
}
export default Profile