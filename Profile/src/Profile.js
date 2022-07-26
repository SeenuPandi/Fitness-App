import React from "react";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

function Profile() {
    let profileStats = { name: 'John Watson', age: 24, location: 'India', weight: 70, height: 165, goal: 65, email: 'john.watson@gmail.com', weightMes: 'kg', goalMes: 'kg', heightMes: 'cm' };
    let today = new Date();
    let currentDate = today;
    let maxDate = new Date();
    let morningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
    let breakfastWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
    let lunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
    let expectedWaterAmount = 2400;
    let currentBreakFastMenuText;
    let currentBreakFastCalories = 0;
    let expectedCalories = 3000;
    let currentSnack1Calories = 0;
    let currentLunchCalories = 0;
    let currentSnack1MenuText;
    let currentLunchMenuText;
    let data = {
        activity: {
            morningWalk: morningWalk
        },
        diet: {
            breakfastWaterTaken: breakfastWaterTaken,
            breakFastText: currentBreakFastMenuText,
            breakFastCalories: currentBreakFastCalories,
            snack1Text: currentSnack1MenuText,
            snack1Calories: currentSnack1Calories,
            lunchWaterTaken: lunchWaterTaken,
            lunchText: currentLunchMenuText,
            lunchCalories: currentLunchCalories,
        }
    }
    let activities = [
        { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
        { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
        { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
        { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((data.diet.snack1Calories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
        { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
        { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
    ];

    function getFullDetails(activity){
        return(
            <div tabIndex={0} className="e-card e-diet-card" >
                        <div className="e-card-header" style={{ width: "100%" }}>
                            <div className="e-card-header-caption">
                                <div className="e-card-header-title">{activity.activity}</div>
                                <div>
                                    <div className="e-card-header-sub-title" style={{ float: "left" }}>
                                        {activity.amount ? (activity.amount + ' |') : ''}
                                        {activity.duration ? (activity.duration + ' |') : ''}
                                        {activity.distance ? (activity.distance + ' |') : ''}
                                    </div>
                                    <div className="e-card-header-sub-title" style={{ float: "right" }}>{activity.time}</div>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
    return (
        <div>
            <div className="e-card e-custom-card">
                <div className="e-card-header">
                    <div className="e-profile-editor">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="e-avatar e-avatar-circle">
                        <img src="./assets/Profile/02.png" alt="JW" />
                    </div>
                    &nbsp;
                </div>
                <div className="e-card-header">
                    <div className="e-card-header-caption center">
                        <div className="e-card-header-title">{profileStats.name}</div>
                        <div className="e-card-header-sub-title">{profileStats.age} Years, {profileStats.location}</div>
                    </div>
                </div>
                <div className="e-card-content">
                    <table className="e-profile-details">
                        <tr>
                            <td>
                                <div className="profile-row">Weight</div>
                            </td>
                            <td>
                                <div className="profile-row">Height</div>
                            </td>
                            <td>
                                <div className="profile-row">Goal</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="profile-value">{profileStats.weight + ' ' + profileStats.weightMes}</div>
                            </td>
                            <td>
                                <div className="profile-value">{profileStats.height + ' ' + profileStats.heightMes}</div>
                            </td>
                            <td>
                                <div className="profile-value">{profileStats.goal + ' ' + profileStats.goalMes}</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div>
                <div className="e-journal" style={{ float: "left" }}>Journals</div>
                <div className="e-journal-date" style={{ float: "right" }}>
                    <DatePickerComponent value={currentDate} maxDate={maxDate} width="100%"></DatePickerComponent>
                </div>
            </div>
            <div className="profile-diet-card-container">{activities.map(getFullDetails)}</div>
        </div>
    );
}

export default Profile;
