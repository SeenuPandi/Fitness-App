import React, {useState} from 'react';
import { Browser } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Crosshair, SplineSeries, DateTime, Legend, Tooltip, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

const Profile = React.lazy(() =>
    import('Profile/Profile')
)

function Activities() {

    var title = 'fitness-app';
    var isDevice = Browser.isDevice;
    var isSmallDevice = false;
    var innerWidth = window.innerWidth;
    var today = new Date();
    var currentDate = today;
    var maxDate = new Date();
    var cellSpacing = [10, 20];
    var steps = 1240;
    var [heartRate,setName] = useState('');
    //var heartRate = 80;
    var calories = 1205;
    var expectedCalories = 3000;
    var sleepInMinutes = 350;
    var sleepInHours = getSleepInHours(sleepInMinutes);
    var todaysWorkoutPercent = 80;
    var isBreakFastMenuAdded = false;
    var isSnack1MenuAdded = false;
    var isLunchMenuAdded = false;
    var isSnack2MenuAdded = false;
    var isDinnerMenuAdded = false;
    var breakFastRecom = 440;
    var snack1Recom = 165;
    var lunchRecom = 440;
    var snack2Recom = 165;
    var dinnerRecom = 440;
    var currentBreakFastMenu = [];
    var currentBreakFastCalories = 0;
    var currentLunchMenu = [];
    var currentBreakFastMenuText;
    var currentLunchMenuText;
    var currentSnack1MenuText;
    var currentSnack2MenuText;
    var currentDinnerMenuText;
    var currentLunchCalories = 0;
    var currentDinnerMenu = [];
    var currentDinnerCalories = 0;
    var currentSnack1Menu = [];
    var currentSnack1Calories = 0;
    var currentSnack2Menu = [];
    var currentSnack2Calories = 0;
    var consumedCalories = 0;
    var burnedCalories = 0;
    var fastStartTime;
    var fastEndTime;
    var consumedWaterCount = 4;
    var consumedWaterAmount = 600;
    var expectedWaterAmount = 2400;
    var currentMenuHeader;
    var currentMenu;
    var currentTotalCal = 0;
    var currentTotalProteins = 0;
    var currentTotalFat = 0;
    var currentTotalCarbs = 0;
    var currentTotalCalcium = 0;
    var currentTotalIron = 0;
    var currentTotalSodium = 0;
    var currentRecom = 0;
    var currentQuantity = 1;
    var modifyHeaderTitle = "Change Your Weight";
    var modifyBtnGroup = ['KG', 'LB'];
    var currentWtUnit = 'KG';
    var currentHtUnit = 'CM';
    var currentAddedMenu;
    var isGoalEdit = false;
    var changeTimeBtnText = "CHANGE TIME";
    var currrentTheme = 'Light';
    var theme = 'Tailwind';
    var chartBackGround = '#FFFFFF';
    var weightSliderMin = 0;
    var weightSliderMax = 120;
    var heightSliderMin = 0;
    var heightSliderMax = 200;
    var lastSelectItem = '';
    var dateEnable = false;
    var isToday = true;
    var weightSliderLimit = { enabled: true, minStart: currentWtUnit === 'KG' ? 10 : 20 };
    var heightSliderLimit = { enabled: true, minStart: currentHtUnit === 'CM' ? 30 : 1 };
    var humanImg = 'LightHuman';
    var activityChartMonthData = {};
    var activityChartWeekData = {};
    var masterData = [];
    let circulargauge;
    var breakfastMenu = [
        { item: 'Banana', cal: 105, fat: 0.4, carbs: 27, proteins: 1.3, sodium: 0.0012, iron: 0.00031, calcium: 0.005 },
        { item: 'Bread', cal: 77, fat: 1, carbs: 14, proteins: 2.6, sodium: 0.142, iron: 0.0036, calcium: 0.260 },
        { item: 'Boiled Egg', cal: 78, fat: 5.3, carbs: 0.6, proteins: 6.3, sodium: 0.062, iron: 0.001, calcium: 0.05 },
        { item: 'Wheat Chapathi', cal: 120, fat: 3.7, carbs: 18, proteins: 3.1, sodium: 0.119, iron: 0.001, calcium: 0.01 },
        { item: 'Dosa', cal: 168, fat: 3.7, carbs: 29, proteins: 3.9, sodium: 0.094, iron: 0.0005, calcium: 0.01 },
        { item: 'Tea', cal: 5, fat: 0.1, carbs: 1.4, proteins: 0.1, sodium: 0.0008, iron: 0, calcium: 0.02 },
        { item: 'Coffee', cal: 2, fat: 0.1, carbs: 0, proteins: 0.3, sodium: 0.047, iron: 0, calcium: 0.039 },
        { item: 'Milk', cal: 122, fat: 4.8, carbs: 12, proteins: 8.1, sodium: 0.115, iron: 0, calcium: 0.125 }
    ];
    var snackMenu = [
        { item: 'Banana', cal: 105, fat: 0.4, carbs: 27, proteins: 1.3, sodium: 0.0012, iron: 0.00031, calcium: 0.006 },
        { item: 'Apple', cal: 95, fat: 0.3, carbs: 25, proteins: 0.5, sodium: 0.018, iron: 0.0001, calcium: 0.0085 },
        { item: 'Orange', cal: 69, fat: 0.2, carbs: 18, proteins: 1.3, sodium: 0.0014, iron: 0.0001, calcium: 0.04 },
        { item: 'Samosa', cal: 262, fat: 17, carbs: 24, proteins: 3.5, sodium: 0.423, iron: 0.0005, calcium: 0.013 },
        { item: 'Peas', cal: 134, fat: 0.3, carbs: 25, proteins: 8.6, sodium: 0.048, iron: 0.00015, calcium: 0.036 },
        { item: 'Tea', cal: 5, fat: 0.1, carbs: 1.4, proteins: 0.1, sodium: 0.0008, iron: 0, calcium: 0.02 },
        { item: 'Coffee', cal: 2, fat: 0.1, carbs: 0, proteins: 0.3, sodium: 0.047, iron: 0, calcium: 0.039 },
        { item: 'Biscuits', cal: 37, fat: 1.2, carbs: 6.2, proteins: 0.5, sodium: 0.002, iron: 0.00031, calcium: 0.03 }
    ];

    var lunchMenu = [
        { item: 'Plain Rice', cal: 205, fat: 0.4, carbs: 45, proteins: 4.3, sodium: 0.0016, iron: 0.0002, calcium: 0.011 },
        { item: 'Roti', cal: 120, fat: 3.7, carbs: 18, proteins: 3.1, sodium: 0.119, iron: 0.003, calcium: 0.01 },
        { item: 'Moong Dal', cal: 236, fat: 2, carbs: 41, proteins: 16, sodium: 0.465, iron: 0.0032, calcium: 0.06 },
        { item: 'Mixed Vegetables', cal: 45, fat: 0.5, carbs: 9.7, proteins: 2.4, sodium: 0.043, iron: 0.0021, calcium: 0.022 },
        { item: 'Curd Rice', cal: 207, fat: 3.2, carbs: 38, proteins: 6.1, sodium: 0.167, iron: 0.0006, calcium: 0.272 },
        { item: 'Chicken Curry', cal: 243, fat: 11, carbs: 7.5, proteins: 28, sodium: 0.073, iron: 0.0008, calcium: 0.023 }
    ];
    var todayActivities = [];
    var profileStats = { name: 'John Watson', age: 24, location: 'India', weight: 70, height: 165, goal: 65, email: 'john.watson@gmail.com', weightMes: 'kg', goalMes: 'kg', heightMes: 'cm' };
    let dropDownInstance;
    let chartInstance;
    let gridInstance;
    let weightChartInstance;
    let gridData = getData();
    let chartDietData = getChartData('Diet');
    let chartData = getChartData('Workout');
    let weightChartData = getWeightChartData();
    let countStartDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(18, 0, 0, 0)) : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 0, 0, 0));
    let countDownDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(countStartDate.getDate())).setHours(countStartDate.getHours() + 16, 0, 0, 0));
    let diff = 16;
    let minimumDate = new Date(new Date().setHours(0, 0, 0));
    let maximumDate = new Date(new Date(new Date().setDate(minimumDate.getDate() + 1)).setHours(24, 0, 0));
    //let x = setInterval(intervalFn.bind(this), 1000);
    innerWidth = window.innerWidth;
    if (innerWidth <= 820) {
        isSmallDevice = true;
    }
    currentBreakFastMenu = [];
    currentBreakFastCalories = 0;
    currentBreakFastMenu = breakfastMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    isBreakFastMenuAdded = true;
    currentSnack1Menu = [];
    currentSnack1Calories = 0;
    currentSnack1Menu = snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    isSnack1MenuAdded = true;
    currentLunchMenu = [];
    currentLunchCalories = 0;
    currentLunchMenu = lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    isLunchMenuAdded = true;
    updateConsumedCalories();
    let pieData = getPieChartData();
    todayActivities = getInitialData();
    updateWaterGauge();



    let datePickerWidth = '100%';
    let chartArea = {
        border: {
            width: 0,
        },
    };
    let primaryXAxis = {
        valueType: 'DateTime',
        labelFormat: 'MMM dd',
        intervalType: 'Days',
        interval: 1,
        edgeLabelPlacement: 'Shift',
        labelIntersectAction: 'Hide',
        labelStyle: {
            size: '16px',
            color: '#56648A',
            fontFamily: 'Inter',
            fontWeight: '500',
        },
        majorGridLines: {
            width: 0,
        },
    };
    let primaryYAxis = {
        labelFormat: '{value}%',
        maximum: 100,
        interval: 50,
        labelStyle: {
            size: '16px',
            color: '#56648A',
            fontFamily: 'Inter',
            fontWeight: '500',
        },
        majorGridLines: {
            dashArray: '10,5',
        },
    };
    let activityChartHeight = '70%';
    let legendSettings = { position: 'Top' };
    let tooltip = {
        enable: true,
        shared: true,
        format: '${series.name} : ${point.y}',
        textStyle: { fontFamily: 'Inter' },
    };
    let crosshair = { enable: true, lineType: 'Vertical', dashArray: "10,5", line: { color: '#EE4769' } };
    let marker = { visible: true, height: 10, width: 10 };
    let dropDownData = ['Weekly', 'Monthly'];



    function getChartData(action) {
        let count = (dropDownInstance && dropDownInstance.value === 'Monthly') ? 30 : 7;
        let sampleData = [];
        for (let i = count - 1; i >= 0; i--) {
            let date = (currentDate) ? new Date(currentDate) : new Date();
            let data = {
                x: new Date(new Date(date.setDate(date.getDate() - i)).setHours(0, 0, 0, 0)),
                y: Number((Math.random() * (90 - 50) + 50).toFixed(2).replace(/[.,]00$/, ""))
            };
            sampleData.push(data);
            if (i == 0) {
                todaysWorkoutPercent = data['y'];
            }

        }

        return sampleData;
    }

    function getSleepInHours(minutes) {
        return Math.floor(minutes / 60) + 'h' + ' ' + (minutes % 60) + 'm';
    }

    function onDateChange(args) {
        currentDate = args.value;
        updateComponents();
    }

    function updateConsumedCalories() {
        currentTotalProteins = 0;
        currentTotalFat = 0;
        currentTotalCarbs = 0;
        currentTotalCalcium = 0;
        currentTotalIron = 0;
        currentTotalSodium = 0;
        consumedCalories = 0;
        if (isBreakFastMenuAdded) {
            currentBreakFastMenuText = currentBreakFastMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentBreakFastMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentBreakFastMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentBreakFastMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentBreakFastMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentBreakFastMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentBreakFastMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentBreakFastCalories = currentBreakFastMenu.reduce((a, b) => +a + +b.cal, 0);
            consumedCalories += currentBreakFastCalories;
        }
        if (isSnack1MenuAdded) {
            currentSnack1MenuText = currentSnack1Menu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentSnack1Menu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentSnack1Menu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentSnack1Menu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentSnack1Menu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentSnack1Menu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentSnack1Menu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentSnack1Calories = currentSnack1Menu.reduce((a, b) => +a + +b.cal, 0);
            consumedCalories += currentSnack1Calories;
        }
        if (isLunchMenuAdded) {
            currentLunchMenuText = currentLunchMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentLunchMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentLunchMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentLunchMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentLunchMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentLunchMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentLunchMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentLunchCalories = currentLunchMenu.reduce((a, b) => +a + +b.cal, 0);
            consumedCalories += currentLunchCalories;
        }
        if (isSnack2MenuAdded) {
            currentSnack2MenuText = currentSnack2Menu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentSnack2Menu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentSnack2Menu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentSnack2Menu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentSnack2Menu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentSnack2Menu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentSnack2Menu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentSnack2Calories = currentSnack2Menu.reduce((a, b) => +a + +b.cal, 0);
            consumedCalories += currentSnack2Calories;
        }
        if (isDinnerMenuAdded) {
            currentDinnerMenuText = currentDinnerMenu.map(function (elem) {
                return elem.item;
            }).join(", ");
            currentTotalProteins = Number((currentTotalProteins + currentDinnerMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalFat = Number((currentTotalFat + currentDinnerMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCarbs = Number((currentTotalCarbs + currentDinnerMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalCalcium = Number((currentTotalCalcium + currentDinnerMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalIron = Number((currentTotalIron + currentDinnerMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentTotalSodium = Number((currentTotalSodium + currentDinnerMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2).replace(/[.,]00$/, ""));
            currentDinnerCalories = currentDinnerMenu.reduce((a, b) => +a + +b.cal, 0);
            consumedCalories += currentDinnerCalories;
        }
    }


    function getPieChartData() {
        return [{ x: 'PROTEINS', y: currentTotalProteins, fill: '#4DD291' }, { x: 'FAT', y: currentTotalFat, fill: '#FC892C' },
        { x: 'CARBOHYDRATES', y: currentTotalCarbs, fill: '#FFC147' }, { x: 'CALCIUM', y: currentTotalCalcium, fill: '#E25641' },
        { x: 'SODIUM', y: currentTotalSodium, fill: '#901C53' }, { x: 'IRON', y: currentTotalIron, fill: '#CB4967' }];
    }



    function getInitialData() {
        let data;
        if (masterData.length === 0) {
            let morningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
            let breakfastWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
            let lunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
            steps = morningWalk;
            consumedWaterCount = breakfastWaterTaken + lunchWaterTaken;
            consumedWaterAmount = consumedWaterCount * 150;
            heartRate = Math.round(Math.random() * (100 - 70) + 70);
            sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
            data = {
                date: currentDate.toLocaleDateString(),
                activity: {
                    steps: steps,
                    heartRate: heartRate,
                    calories: consumedCalories,
                    sleep: sleepInMinutes,
                    gridData: JSON.parse(JSON.stringify(gridData)),
                    charDietData: JSON.parse(JSON.stringify(chartDietData)),
                    chartWorkoutData: JSON.parse(JSON.stringify(chartData)),
                    activityChartMonthData: JSON.parse(JSON.stringify(activityChartMonthData)),
                    activityChartWeekData: JSON.parse(JSON.stringify(activityChartWeekData)),
                    morningWalk: morningWalk
                },
                diet: {
                    breakFastMenu: JSON.parse(JSON.stringify(currentBreakFastMenu)),
                    breakFastCalories: currentBreakFastCalories,
                    breakFastText: currentBreakFastMenuText,
                    isBreakFastMenuAdded: isBreakFastMenuAdded,
                    snack1Menu: JSON.parse(JSON.stringify(currentSnack1Menu)),
                    snack1Calories: currentSnack1Calories,
                    snack1Text: currentSnack1MenuText,
                    isSnack1Added: isSnack1MenuAdded,
                    lunchMenu: JSON.parse(JSON.stringify(currentLunchMenu)),
                    lunchCalories: currentLunchCalories,
                    lunchText: currentLunchMenuText,
                    isLunchAdded: isLunchMenuAdded,
                    consumedCalories: consumedCalories,
                    burnedCalories: burnedCalories,
                    breakfastWaterTaken: breakfastWaterTaken,
                    lunchWaterTaken: lunchWaterTaken,
                    proteins: currentTotalProteins,
                    fat: currentTotalFat,
                    carbs: currentTotalCarbs,
                    calcium: currentTotalCalcium,
                    sodium: currentTotalSodium,
                    iron: currentTotalIron,
                },
                fasting: {
                    chartWeightData: weightChartData,
                    consumedWaterCount: consumedWaterCount
                }
            };
            masterData.push(data);
        } else {
            data = masterData[0];
            steps = data.activity.steps;
            consumedWaterCount = data.fasting.consumedWaterCount;
            consumedWaterAmount = consumedWaterCount * 150;
            heartRate = data.activity.heartRate;
            sleepInMinutes = data.activity.sleep;
            sleepInHours = getSleepInHours(sleepInMinutes);
            consumedCalories = data.diet.consumedCalories;
            burnedCalories = data.diet.burnedCalories;
            gridData = data.activity.gridData;
            chartDietData = data.activity.charDietData;
            chartData = data.activity.chartWorkoutData;
            activityChartMonthData = data.activity.activityChartMonthData;
            activityChartWeekData = data.activity.activityChartWeekData;
            currentBreakFastMenu = data.diet.breakFastMenu;
            currentBreakFastCalories = data.diet.breakFastCalories;
            currentBreakFastMenuText = data.diet.breakFastText;
            isBreakFastMenuAdded = data.diet.isBreakFastMenuAdded;
            currentSnack1Menu = data.diet.snack1Menu;
            currentSnack1Calories = data.diet.snack1Calories;
            currentSnack1MenuText = data.diet.snack1Text;
            isSnack1MenuAdded = data.diet.isSnack1Added;
            currentLunchMenu = data.diet.lunchMenu;
            currentLunchCalories = data.diet.lunchCalories;
            currentLunchMenuText = data.diet.lunchText;
            isLunchMenuAdded = data.diet.isLunchAdded;
            weightChartData = data.fasting.chartWeightData;
            currentTotalProteins = data.diet.proteins;
            currentTotalFat = data.diet.fat;
            currentTotalCarbs = data.diet.carbs;
            currentTotalCalcium = data.diet.calcium;
            currentTotalSodium = data.diet.sodium;
            currentTotalIron = data.diet.iron;
        }
        let activities = [
            { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
            { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
            { name: 'Breakfast', activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
            { name: 'Snack1', activity: 'Snack', amount: data.diet.snack1Text, percentage: ((data.diet.snack1Calories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
            { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
            { name: 'Lunch', activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
        ];
        return activities;
    }

    function updateWaterGauge() {

    }

    function updateComponents() {
        isToday = currentDate.getDate() === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
        if (!isToday) {
            let data;
            let isExist = false;
            let index = 0;
            for (let i = 0; i < masterData.length; i++) {
                if (masterData[i].date === currentDate.toLocaleDateString()) {
                    isExist = true;
                    index = i;
                    break;
                }
            }
            if (isExist) {
                data = masterData[index];
                steps = data.activity.steps;
                consumedWaterCount = data.fasting.consumedWaterCount;
                consumedWaterAmount = consumedWaterCount * 150;
                heartRate = data.activity.heartRate;
                sleepInMinutes = data.activity.sleep;
                sleepInHours = getSleepInHours(sleepInMinutes);
                consumedCalories = data.diet.consumedCalories;
                burnedCalories = data.diet.burnedCalories;
                gridData = data.activity.gridData;
                chartDietData = data.activity.charDietData;
                chartData = data.activity.chartWorkoutData;
                activityChartMonthData = data.activity.activityChartMonthData;
                activityChartWeekData = data.activity.activityChartWeekData;
                currentBreakFastMenu = data.diet.breakFastMenu;
                currentBreakFastCalories = data.diet.breakFastCalories;
                currentBreakFastMenuText = data.diet.breakFastText;
                isBreakFastMenuAdded = data.diet.isBreakFastMenuAdded;
                currentSnack1Menu = data.diet.snack1Menu;
                currentSnack1Calories = data.diet.snack1Calories;
                currentSnack1MenuText = data.diet.snack1Text;
                isSnack1MenuAdded = data.diet.isSnack1Added;
                currentLunchMenu = data.diet.lunchMenu;
                currentLunchCalories = data.diet.lunchCalories;
                currentLunchMenuText = data.diet.lunchText;
                isLunchMenuAdded = data.diet.isLunchAdded;
                weightChartData = data.fasting.chartWeightData;
                currentTotalProteins = data.diet.proteins;
                currentTotalFat = data.diet.fat;
                currentTotalCarbs = data.diet.carbs;
                currentTotalCalcium = data.diet.calcium;
                currentTotalSodium = data.diet.sodium;
                currentTotalIron = data.diet.iron;
            } else {
                updateMenu();
                let morningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
                let eveningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
                let breakfastWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
                let lunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
                let eveningWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
                steps = morningWalk + eveningWalk;
                setName(Math.round(Math.random() * (100 - 70) + 70));
                sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
                sleepInHours = getSleepInHours(sleepInMinutes);
                consumedWaterCount = breakfastWaterTaken + lunchWaterTaken + eveningWaterTaken;
                consumedWaterAmount = consumedWaterCount * 150;
                gridData = getData();
                chartDietData = getChartData('Diet');
                chartData = getChartData('Workout');
                weightChartData = getWeightChartData();
                data = {
                    date: currentDate.toLocaleDateString(),
                    activity: {
                        steps: steps,
                        heartRate: heartRate,
                        calories: consumedCalories,
                        sleep: sleepInMinutes,
                        gridData: JSON.parse(JSON.stringify(gridData)),
                        charDietData: JSON.parse(JSON.stringify(chartDietData)),
                        chartWorkoutData: JSON.parse(JSON.stringify(chartData)),
                        activityChartMonthData: JSON.parse(JSON.stringify(activityChartMonthData)),
                        activityChartWeekData: JSON.parse(JSON.stringify(activityChartWeekData)),
                        morningWalk: morningWalk,
                        eveningWalk: eveningWalk
                    },
                    diet: {
                        breakFastMenu: JSON.parse(JSON.stringify(currentBreakFastMenu)),
                        breakFastCalories: currentBreakFastCalories,
                        breakFastText: currentBreakFastMenuText,
                        isBreakFastMenuAdded: isBreakFastMenuAdded,
                        snack1Menu: JSON.parse(JSON.stringify(currentSnack1Menu)),
                        snack1Calories: currentSnack1Calories,
                        snack1Text: currentSnack1MenuText,
                        isSnack1Added: isSnack1MenuAdded,
                        lunchMenu: JSON.parse(JSON.stringify(currentLunchMenu)),
                        lunchCalories: currentLunchCalories,
                        lunchText: currentLunchMenuText,
                        isLunchAdded: isLunchMenuAdded,
                        consumedCalories: consumedCalories,
                        burnedCalories: burnedCalories,
                        breakfastWaterTaken: breakfastWaterTaken,
                        lunchWaterTaken: lunchWaterTaken,
                        eveningWaterTaken: eveningWaterTaken,
                        proteins: currentTotalProteins,
                        fat: currentTotalFat,
                        carbs: currentTotalCarbs,
                        calcium: currentTotalCalcium,
                        sodium: currentTotalSodium,
                        iron: currentTotalIron,
                    },
                    fasting: {
                        chartWeightData: weightChartData,
                        consumedWaterCount: consumedWaterCount
                    }
                };
                masterData.push(data);
            }
            updateWaterGauge();
            if (circulargauge) {
                endFasting();
            }
            if (gridInstance) {
                gridInstance.dataSource = gridData;
            }
            if (chartInstance) {
                chartInstance.series[0].dataSource = chartInstance.series[2].dataSource = chartDietData;
                chartInstance.series[1].dataSource = chartInstance.series[3].dataSource = chartData;
                chartInstance.refresh();
            }
            if (weightChartInstance) {
                weightChartInstance.series[0].dataSource = weightChartData;
            }
            todayActivities = [
                { name: 'Morning Walk', activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:00 AM' },
                { name: 'Breakfast Water', activity: 'Water Taken', count: data.diet.breakfastWaterTaken, amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '7:40 AM' },
                { name: 'Breakfast', activity: 'Breakfast', amount: currentBreakFastMenuText, percentage: ((currentBreakFastCalories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '9:00 AM' },
                { name: 'Snack1', activity: 'Snack', amount: currentSnack1MenuText, percentage: ((currentSnack1Calories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '11:00 AM' },
                { name: 'Lunch Water', activity: 'Water Taken', count: data.diet.lunchWaterTaken, amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '12:00 PM' },
                { name: 'Lunch', activity: 'Lunch', amount: currentLunchMenuText, percentage: ((currentLunchCalories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '1:00 PM' },
                { name: 'Snack2', activity: 'Snack', amount: currentSnack2MenuText, percentage: ((currentSnack2Calories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '3:00 PM' },
                { name: 'Evening Water', activity: 'Water Taken', count: data.diet.eveningWaterTaken, amount: data.diet.eveningWaterTaken + ' Glasses', percentage: (((data.diet.eveningWaterTaken * 150) / expectedWaterAmount) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '4:00 PM' },
                { name: 'Evening Walk', activity: 'Evening Walk', duration: '30m', distance: (data.activity.eveningWalk / 1312).toFixed(2).replace(/[.,]00$/, "") + 'km', percentage: ((data.activity.eveningWalk / 6000) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '5:30 PM' },
                { name: 'Dinner', activity: 'Dinner', amount: currentDinnerMenuText, percentage: ((currentDinnerCalories / expectedCalories) * 100).toFixed(2).replace(/[.,]00$/, "") + '%', time: '8:00 PM' }
            ];
        } else {
            consumedCalories = 0;
            isBreakFastMenuAdded = false;
            isSnack1MenuAdded = false;
            isLunchMenuAdded = false;
            isSnack2MenuAdded = false;
            isDinnerMenuAdded = false;
            todayActivities = getInitialData();
            pieData = getPieChartData();
            countStartDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(18, 0, 0, 0)) : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 0, 0, 0));
            countDownDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(countStartDate.getDate())).setHours(countStartDate.getHours() + 16, 0, 0, 0));
            diff = 16;
            minimumDate = new Date(new Date().setHours(0, 0, 0));
            maximumDate = new Date(new Date().setHours(minimumDate.getHours() + 24, 0, 0));
            //clearInterval(x);
            //x = setInterval(intervalFn.bind(this), 1000);
            updateWaterGauge();
        }
        //disableElements();

    }

    function updateMenu() {
        currentBreakFastMenu = [];
        currentBreakFastCalories = 0;
        currentBreakFastMenu = breakfastMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isBreakFastMenuAdded = true;
        currentSnack1Menu = [];
        currentSnack1Calories = 0;
        currentSnack1Menu = snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isSnack1MenuAdded = true;
        currentLunchMenu = [];
        currentLunchCalories = 0;
        currentLunchMenu = lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isLunchMenuAdded = true;
        currentSnack2Menu = [];
        currentSnack2Calories = 0;
        currentSnack2Menu = snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isSnack2MenuAdded = true;
        currentDinnerMenu = [];
        currentDinnerCalories = 0;
        currentDinnerMenu = lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
        isDinnerMenuAdded = true;
        updateConsumedCalories();
        pieData = getPieChartData();
    }
    

    function customiseCell(args) {
        if (args.column.field === 'Completion') {
            args.cell.classList.add('completion-color');
        }
    }

    function getData() {
        let workout = ['Running', 'Swimming', 'Walking', 'Yoga'];
        let average = [10, 18, 22];
        let hours = [8, 7, 6, 6];
        let minutes = [0, 0, 30, 0];
        let caloriesBurned = [10, 15, 30];
        let count = 1;
        burnedCalories = 0;
        let date = (currentDate) ? new Date(currentDate) : new Date();
        let sampleData = [];
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < workout.length; j++) {
                let time = new Date(new Date(date.setHours(hours[j])).setMinutes(minutes[j]));
                let distance = workout[j] === 'Yoga' ? '' : workout[j] === 'Running' ? Math.random() * (5 - 1) + 1 : Math.random() * (2 - 1) + 1;
                let data = {
                    Workout: workout[j],
                    Distance: distance,
                    Duration: workout[j] === 'Yoga' ? Math.random() * (30 - 10) + 10 : ((distance) * average[j]),
                    Date: time,
                    Completion: Math.random() * (30 - 10) + 10
                };
                sampleData.push(data);
                burnedCalories += workout[j] === 'Yoga' ? 0 : Math.round((data['Duration'] / caloriesBurned[j]) * 100);
            }
        }
        return sampleData;
    }
    function getWeightChartData() {
        let count = 12;
        let sampleData = [];
        for (let i = count - 1; i >= 0; i--) {
            let date = (currentDate) ? new Date(currentDate) : new Date();
            let data = {
                x: new Date(date.setMonth(date.getMonth() - i)),
                y: Math.round(70 + (i * (Math.random() * (3.5 - 2) + 2)))
            };
            sampleData.push(data);
        }
        return sampleData;
    }
    function onDropDownChange() {
        chartDietData = getChartData('Diet');
        chartData = getChartData('Workout');
        chartInstance.series[0].dataSource = chartInstance.series[2].dataSource = chartDietData;
        chartInstance.series[1].dataSource = chartInstance.series[3].dataSource = chartData;
        chartInstance.refresh();
    }
    function legendClick(args) {

    }
    function chartTooltipRender(args) {
        args.text.splice(2, 2);
    }

    function onProfileDateChange(args){
        currentDate = args.value;
        updateComponents();
    }

    const image= {
        avatarUrl: './assets/Profile/Heart-1.svg'
    };
   
    return (
        <div className="e-dashboardlayout-container  e-activity-dashboardlayout-container">
            <div className="col-md-9 e-dashboard-content">
                <div className="col-md-12 col-sm-12">
                    <div id="activity-panel-id" className="e-panel e-my-activities-panel" data-row="0" data-col="0">
                        <div className="e-panel-container">
                            <div className="e-panel-header col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-3 e-my-activities-header">My Activities</div>
                                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-3 e-my-activities-date">
                                    <DatePickerComponent id="datepicker" value={currentDate} max={maxDate} width={datePickerWidth} change={onDateChange} />
                                </div>
                            </div>
                            <div className="e-panel-content e-activity-card-container">
                                <div tabIndex={0} className="e-card e-heart-rate-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Heart e-card-corner"></div>
                                        <div className="e-card-header-caption" style={{ width: "100%" }}>
                                            <div>
                                                <div className="e-card-header-title e-activity-card-title"> Heart Rate</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-bpm-value">{heartRate}<span>bpm</span></div>
                                        <div className="e-progress-annotation"></div>
                                    </div>
                                </div>
                                <div tabIndex={0} className="e-card e-steps-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Steps e-card-corner"></div>
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-steps-card-title"> Steps</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-activity-actual">{steps}</div>
                                        <div className="e-activity-goal">6000</div>
                                    </div>
                                </div>
                                <div tabIndex={0} className="e-card e-calories-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Calories e-card-corner"></div>
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-calories-card-title"> Calories</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-activity-actual">{consumedCalories}
                                            <span className="e-activity-actual-unit">kcal</span>
                                        </div>
                                        <div className="e-activity-goal">{expectedCalories} kcal</div>
                                    </div>
                                </div>
                                <div tabIndex={0} className="e-card e-sleep-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Sleep e-card-corner"></div>
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-sleep-card-title"> Sleep</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-activity-actual">{sleepInHours}</div>
                                        <div className="e-activity-goal">8h</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12">
                    <div id="activity-chart-panel-id" className="e-panel e-activity-panel" >
                        <div className="e-panel-container">
                            <div className="e-panel-header col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                <div className="col-md-5 col-sm-6 col-xs-8 col-lg-4 e-activity-chart-header-text">Activity Statistics</div>
                                <div className="e-chart-dropdown col-md-3 col-sm-4 col-xs-4 col-lg-3">
                                    <DropDownListComponent id='chartdropdown' dataSource={dropDownData} index='0' change={onDropDownChange} ref={(dropdownlist) => { dropDownInstance = dropdownlist }} />
                                </div>
                            </div>
                            <div className="e-chart-panel-content">
                                <ChartComponent
                                    className="e-activity-chart"
                                    chartArea={chartArea}
                                    width="100%"
                                    primaryXAxis={primaryXAxis}
                                    primaryYAxis={primaryYAxis}
                                    height={activityChartHeight}
                                    legendSettings={legendSettings}
                                    theme={theme}
                                    tooltip={tooltip}
                                    crosshair={crosshair}
                                    legendClick={legendClick}
                                    sharedTooltipRender={chartTooltipRender}
                                    ref={(chartIns) => { chartInstance = chartIns }}>
                                    <Inject services={[SplineSeries, DateTime, Legend, Tooltip, Crosshair, SplineAreaSeries]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective
                                            dataSource={chartDietData}
                                            legendShape='Circle'
                                            type='Spline'
                                            fill="#2084FE"
                                            xName="x"
                                            yName="y"
                                            name='Diet'
                                            marker={marker}
                                            width={4} >
                                        </SeriesDirective>
                                        <SeriesDirective
                                            dataSource={chartData}
                                            legendShape='Circle'
                                            type='Spline'
                                            fill="#F547A8"
                                            xName="x"
                                            yName="y"
                                            name='Workout'
                                            marker={marker}
                                            width={4} >
                                        </SeriesDirective>
                                        <SeriesDirective
                                            dataSource={chartDietData}
                                            type='SplineArea'
                                            fill='url(#gradient-diet-chart)'
                                            xName="x"
                                            yName="y" >
                                        </SeriesDirective>
                                        <SeriesDirective
                                            dataSource={chartData}
                                            type='SplineArea'
                                            fill='url(#gradient-activity-chart)'
                                            xName="x"
                                            yName="y" >
                                        </SeriesDirective>
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12">
                    <div id="workout-panel-id" className="e-panel e-workout-panel" data-row="2" data-col="0">
                        <div className="e-panel-container">
                            <div className="e-panel-header" >
                                <div>Recent Workout</div>
                            </div>
                            <div>
                                <GridComponent dataSource={gridData} gridLines='None' rowHeight={60} queryCellInfo={customiseCell} width={'100%'} height={'100%'} ref={(gridIns) => { gridInstance = gridIns }}>
                                    <ColumnsDirective>
                                        <ColumnDirective field='Workout' headerText='Workout' textAlign='Left' width="200" />
                                        <ColumnDirective field='Distance' headerText='Distance (kms)' textAlign='Left' width="200" format="###.# km" />
                                        <ColumnDirective field='Duration' headerText='Duration (minutes)' textAlign='Left' width="200" format='### mins' />
                                        <ColumnDirective field='Date' headerText='Date & Time' textAlign='Left' width="200" format="MMM dd,yyyy hh:mm a" />
                                        <ColumnDirective field='Completion' headerText='Completion' textAlign='Left' width="200" format="###'%'" />
                                    </ColumnsDirective>
                                </GridComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <React.Suspense fallback="Loading">
                    <Profile currentDate={currentDate} activities = {todayActivities} profileStats = {profileStats} onDateChange={onDateChange}></Profile>
                </React.Suspense>
            </div>
        </div>
    )

}

export default Activities;