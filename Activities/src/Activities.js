import React from 'react';
import { Browser } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {  ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Crosshair, SplineSeries, DateTime, Legend, Tooltip, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

function Activities() {
    let today = new Date();
    let currentDate = today;
    let maxDate = new Date();
    let datePickerWidth = '100%';
    let heartRate = 80;
    let consumedCalories = 0;
    let expectedCalories = 3000;
    let sleepInMinutes = 350;
    let sleepInHours = getSleepInHours(sleepInMinutes);
    let steps = 1240;
    let burnedCalories = 0;
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
    let theme = 'Tailwind';
    let tooltip = {
          enable: true,
          shared: true,
          format: '${series.name} : ${point.y}',
          textStyle: { fontFamily: 'Inter' },
    };
    let crosshair = { enable: true, lineType: 'Vertical', dashArray: "10,5", line: { color: '#EE4769' } };
    let marker = { visible: true, height: 10, width: 10 };
    let chartDietData = getChartData('Diet');
    let chartData = getChartData('Workout');
    var activityChartMonthData = {};
    var activityChartWeekData = {};
    var todaysWorkoutPercent = 80;
    let dropDownInstance;
    let chartInstance;
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
    
    
    let dropDownData = ['Weekly', 'Monthly'];
    let gridData = getData();
    function onDateChange(args) {
        today = args.value;
        updateComponents();
    }

    function updateComponents() {

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
        let sampleData   = [];
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
    return (
        <div className="e-dashboardlayout-container  e-activity-dashboardlayout-container">
            <div className="e-dashboard-content">
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
                                        <div className="e-bpm-value">{heartRate} <span>bpm</span></div>
                                        <div className="e-progress-annotation"><img src="/assets/Profile/Heart-1.svg"></img></div>
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
                                <GridComponent dataSource={gridData} gridLines='None' rowHeight={60} queryCellInfo={customiseCell} width={'100%'} height={'100%'}>
                                    <ColumnsDirective>
                                        <ColumnDirective field='Workout' headerText='Workout' textAlign='Left' width="200" />
                                        <ColumnDirective field='Distance' headerText='Distance (kms)' textAlign='Left' width="200" format="###.# km" />
                                        <ColumnDirective field='Duration' headerText='Duration (minutes)' textAlign='Left' width="200" format='### mins' />
                                        <ColumnDirective field='Date' headerText='DateTime' textAlign='Left' width="200" format="MMM dd,yyyy hh:mm a" />
                                        <ColumnDirective field='Completion' headerText='Completion' textAlign='Left' width="200" format="###'%'" />
                                    </ColumnsDirective>
                                </GridComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )

}

export default Activities;