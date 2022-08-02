import React from "react";
import ReactDOM from "react-dom";
import { Browser } from '@syncfusion/ej2-base';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';

const Activities = React.lazy(() =>
    import('Activities/Activities')
)

const Profile = React.lazy(() =>
    import('Profile/Profile')
)

function Tab() {
    const headerPlacement = Browser.isDevice ? 'Bottom' : 'Top';
    let innerWidth = window.innerWidth;
    let isSmallDevice = false;
    if (innerWidth <= 820) {
        isSmallDevice = true;
    }
    const headerText = [{ 'text': 'ACTIVITIES', iconCss: 'icon-Activities', iconPosition: 'top' }, { 'text': 'DIET', iconCss: 'icon-Diet', iconPosition: 'top' }, { 'text': 'FASTING', iconCss: 'icon-Fasting', iconPosition: 'top' }, { 'text': 'PROFILE', iconCss: 'icon-Profile', iconPosition: 'top' }];
    function created() {
        let iconDiv = document.createElement('div');
        iconDiv.className = 'e-tab-header-icon-div';
        let iconSpan = document.createElement('span');
        iconSpan.className = 'e-tab-header-icon icon-Logo';
        iconDiv.appendChild(iconSpan);
        let titleDiv = document.createElement('div');
        titleDiv.className = 'e-tab-title';
        titleDiv.innerText = "GOFIT";
        let containerDiv = document.createElement('div');
        containerDiv.className = 'e-tab-header-icon-container';
        containerDiv.appendChild(iconDiv);
        containerDiv.appendChild(titleDiv);
        this.element.querySelector('.e-tab-header').prepend(containerDiv)
    }
    function tabSelecting(e) {
    }
    function tabSelected(e) {
    }
    function profileTab() {
        return(
            <Profile></Profile>
        )
    }
    function contentActivities() {
        return (
            <Activities></Activities>
        )
    }
    return (
        <TabComponent created={created} iconPosition='top' headerPlacement="headerPlacement" selecting={tabSelecting} selected={tabSelected} >
            <TabItemsDirective>
                <TabItemDirective header={headerText[0]} content={contentActivities}></TabItemDirective>
                <TabItemDirective header={headerText[1]} ></TabItemDirective>
                <TabItemDirective header={headerText[2]} ></TabItemDirective>
                {isSmallDevice && <TabItemDirective header={headerText[3]} content={profileTab}></TabItemDirective> }
            </TabItemsDirective>
        </TabComponent>
    );
}

export default Tab;
