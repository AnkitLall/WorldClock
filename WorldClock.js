
//Cities info
var addedCities = [];
let counrtySelectedName = '';
let citySelectedName = '';
let initialTimeRange = {};
let slotsInfo = [];
let slotInfo = {};
let initialDateRange = {};

// Map config
var svg = d3    
    .select('#map-holder')
    .append('svg')
    .attr('width',$('#map-holder').width())
    .attr('height',$('#map-holder').height())
// var width = screen.width;
var width = svg._groups[0][0].width.animVal.value;
var height = svg._groups[0][0].height.animVal.value;

var projection = d3
    .geoEquirectangular()
    .center([0,15])
    .scale([200])
    .translate([width/2,height/2])
;

var path = d3   
    .geoPath()
    .projection(projection)
;

// Time Config
var jun = moment("2014-06-01T12:00:00Z");
var dec = moment("2014-12-01T12:00:00Z");


/*-------------------------Data-----------------*/

function getCities() {
    return [
        { name: "Tokyo",          country:'Japan',        coordinates: [139.6917,35.6895],  population: 37843000, zoneStr:'Asia/Tokyo'},
        { name: "Jakarta",        country:'Thailand',     coordinates: [106.8650,-6.1751],  population: 30539000, zoneStr:'Asia/Jakarta'},
        { name: "Delhi",          country:'India',        coordinates: [77.1025,28.7041],   population: 24998000, zoneStr:'Asia/Kolkata'},
        { name: "Manila",         country:'Thailand',        coordinates: [120.9842,14.5995],  population: 24123000, zoneStr:'Asia/Bangkok'},
        { name: "Seoul",          country:'South Korea',  coordinates: [126.9780,37.5665],  population: 23480000, zoneStr:'Asia/Seoul' },
        { name: "Shanghai",       country:'China',        coordinates: [121.4737,31.2304],  population: 23416000, zoneStr:'Asia/Shanghai' },
        { name: "Karachi",        country:'Pakistan',     coordinates: [67.0099,24.8615],   population: 22123000, zoneStr:'Asia/Karachi' },
        { name: "Beijing",        country:'China',        coordinates: [116.4074,39.9042],  population: 21009000, zoneStr:'Asia/Shanghai' },
        { name: "New York",       country:'USA',          coordinates: [-74.0059,40.7128],  population: 20630000, zoneStr:'America/New_York' },
        { name: "Guangzhou",      country:'China',        coordinates: [113.2644,23.1291],  population: 20597000, zoneStr:'Asia/Shanghai' },
        { name: "Sao Paulo",      country:'Brazil',       coordinates: [-46.6333,-23.5505], population: 20365000, zoneStr:'America/Sao_Paulo' },
        { name: "Mexico City",    country:'Mexico',        coordinates: [-99.1332,19.4326],  population: 20063000, zoneStr:'America/Mexico_City' },
        { name: "Mumbai",         country:'India',        coordinates: [72.8777,19.0760],   population: 17712000, zoneStr:'Asia/Kolkata' },
        { name: "Osaka",          country:'Japan',        coordinates: [135.5022,34.6937],  population: 17444000, zoneStr:'Asia/Osaka' },
        { name: "Moscow",         country:'Russia',        coordinates: [37.6173,55.7558],   population: 16170000, zoneStr:'Asia/Moscow' },
        { name: "Dhaka",          country:'Bangladesh',        coordinates: [90.4125,23.8103],   population: 15669000, zoneStr:'Asia/Dhaka' },
        { name: "Greater Cairo",  country:'Egypt',        coordinates: [31.2357,30.0444],   population: 15600000, zoneStr:'Africa/Greater_Cairo' },
        { name: "Los Angeles",    country:'USA',        coordinates: [-118.2437,34.0522], population: 15058000, zoneStr:'America/Los_Angeles' },
        { name: "Bangkok",        country:'Thailand',        coordinates: [100.5018,13.7563],  population: 14998000, zoneStr:'Asia/Bangkok' },
        { name: "Kolkata",        country:'India',        coordinates: [88.3639,22.5726],   population: 14667000, zoneStr:'Asia/Kolkata' },
        { name: "Buenos Aires",   country:'Brazil',        coordinates: [-58.3816,-34.6037], population: 14122000, zoneStr:'America/Buenos_Aires' },
        { name: "Tehran",         country:'Iran',        coordinates: [51.3890,35.6892],   population: 13532000, zoneStr:'Asia/Tehran' },
        { name: "Istanbul",       country:'Turkey',        coordinates: [28.9784,41.0082],   population: 13287000, zoneStr:'Europe/Istanbul' },
        { name: "Lagos",          country:'Mexico',        coordinates: [3.3792,6.5244],     population: 13123000, zoneStr:'America/Lagos' },
        { name: "Shenzhen",       country:'China',        coordinates: [114.0579,22.5431],  population: 12084000, zoneStr:'Asia/Shanghai' },
        { name: "Rio de Janeiro", country:'Brazil',        coordinates: [-43.1729,-22.9068], population: 11727000, zoneStr:'America/Rio_de_Janeiro' },
        { name: "Kinshasa",       country:'Japan',        coordinates: [15.2663,-4.4419],   population: 11587000, zoneStr:'Asia/Kinshasa' },
        { name: "Tianjin",        country:'China',        coordinates: [117.3616,39.3434],  population: 10920000, zoneStr:'Asia/Shanghai' },
        { name: "Paris",          country:'France',        coordinates: [2.3522,48.8566],    population: 10858000, zoneStr:'Europe/Paris' },
        { name: "Lima",           country:'Peru',        coordinates: [-77.0428,-12.0464], population: 10750000, zoneStr:'America/Lima' },
    ];
}

/*-----------Header Section----------------*/

function scrollLeft() {
    let infoScection = document.getElementById('info-section');
    if((infoScection.scrollLeft-160) >= 0) {
        infoScection.scrollLeft -= 160;
    }
}

function scrollRight() {
    let infoScection = document.getElementById('info-section'); 
    if((infoScection.scrollLeft+160) <= infoScection.scrollWidth) {
        infoScection.scrollLeft += 160;
    }
}

function renderHeader() {
    let headerSection = document.getElementById('header-section');

    while(headerSection.firstChild) {
        headerSection.removeChild(headerSection.firstChild);
    }

    let left = document.createElement('div');
    left.classList.add('arrow-icons');
    let leftArrowIcon = document.createElement('span');
    leftArrowIcon.classList.add("glyphicon");
    leftArrowIcon.classList.add("glyphicon-chevron-left");
    leftArrowIcon.style.color = '#aca0a0';
    left.append(leftArrowIcon);
    left.addEventListener("click",scrollLeft);

    let right = document.createElement('div');
    right.classList.add('arrow-icons');
    let rightArrowIcon = document.createElement('span');
    rightArrowIcon.classList.add("glyphicon");
    rightArrowIcon.classList.add("glyphicon-chevron-right");
    rightArrowIcon.style.color = '#aca0a0';
    right.append(rightArrowIcon);
    right.addEventListener("click",scrollRight);

    let infoSection = document.createElement('div');
    infoSection.id = 'info-section'

    if(addedCities.length) {
        addedCities.forEach((city,idx) => {
            let time = getTime(city.zoneStr);

            let infoPanel = document.createElement('div');
            infoPanel.setAttribute('id',idx);
    
            let label1 = document.createElement('div');
            label1.innerHTML = time[0];
            label1.classList.add('time-label');
            infoPanel.append(label1);
    
            let label2 = document.createElement('div');
            label2.innerHTML = time[1].toUpperCase();
            label2.classList.add('period-label');
            infoPanel.append(label2);

            let label3 = document.createElement('div');
            label3.innerHTML = city.name;
            label3.classList.add('name-label');
            infoPanel.append(label3);
    
            let label4 = document.createElement('div');
            label4.innerHTML = city.country;
            label4.classList.add('name-label');
            infoPanel.append(label4);
            
            if(city.selected) {
                infoPanel.classList.add('info-panel-selected');
            }else {
                infoPanel.classList.add('info-panel');
            }
    
            infoSection.append(infoPanel);
            infoPanel.addEventListener('click',(e) => handleCitySelection(e,'panel'));
        });
    }else {
        let noSelectionLabel = document.createElement('div');
        noSelectionLabel.innerHTML = 'No cities added';
        noSelectionLabel.classList.add('no-cities-label');
        infoSection.append(noSelectionLabel);
    }

    headerSection.append(left);
    headerSection.append(infoSection);
    headerSection.append(right);
}

function getTime(zoneStr,date) {
    let timeObj = (date)? String(moment.tz(zoneStr).format('DD MM YYYY HH:mm z')): String(moment.tz(zoneStr).format('hh:mm a z'));
    return timeObj.split(' ');
}

/*-----------Tail Logic---------*/

function addCity() {
    let popupContainer = document.getElementById('popup-container');
    let addPopup = document.getElementById('add-popup');
    popupContainer.style.visibility = 'visible';
    popupContainer.style.display = 'flex';
    addPopup.style.visibility = 'visible';
    addPopup.style.display = 'block';

    populateLists();
}

function addCalendar() {
    let popupContainer = document.getElementById('popup-container');
    let addCalendar = document.getElementById('add-calendar');
    popupContainer.style.visibility = 'visible';
    popupContainer.style.display = 'flex';
    addCalendar.style.visibility = 'visible';
    addCalendar.style.display = 'block';

    renderCalendarPopup();
}

function closeModal() {
    let popupContainer = document.getElementById('popup-container');
    popupContainer.style.visibility = 'hidden';
    popupContainer.style.display = 'none';

    let addCalendar = document.getElementById('add-calendar');
    addCalendar.style.visibility = 'hidden';
    addCalendar.style.display = 'none';
    
    let addPopup = document.getElementById('add-popup');
    addPopup.style.visibility = 'hidden';
    addPopup.style.display = 'none';

    let errLabel = document.getElementById('err-text');
    errLabel.innerHTML = '';
}

function populateLists() {
    let countrySelect = document.getElementById('country-select');
    let citySelect = document.getElementById('city-select');

    while(citySelect.firstChild) {
        citySelect.removeChild(citySelect.firstChild);
    }

    let countryList = [];

    let cities = getCities();

    if(!counrtySelectedName) {
        counrtySelectedName = cities[0].country;
    }

    let cityIndex = 0;
    cities.forEach((city) => {
        if(!countryList.includes(city.country)) {
            let option = document.createElement('option');
            option.innerHTML = city.country;
            option.value = city.country;

            if(city.country === counrtySelectedName) {
                option.selected = true;
            }

            countryList.push(city.country);
            countrySelect.append(option);
        }

        if(city.country === counrtySelectedName) {
            if(!citySelectedName) {
                citySelectedName = city.name;
            }

            let option = document.createElement('option');
            option.innerHTML = city.name;
            option.value = city.name;
            citySelect.append(option);
            cityIndex += 1;
        }
    })
}

function onSelectCountry() {
    let countrySelect = document.getElementById('country-select');

    counrtySelectedName = countrySelect.selectedOptions[0].value;
    citySelectedName = '';
    populateLists();
}

function onSelectCity() {
    let citySelect = document.getElementById('city-select');
    citySelectedName = citySelect.selectedOptions[0].value;
}

function addCityList() {
    let check = false;
    let cities = getCities();

    let citySelectedObj = cities.filter((city) => {return city.name === citySelectedName});
    addedCities.forEach((city) => {
        if(city.name === citySelectedObj[0].name) {
            check = true;
        }
    });

    if(check) {
        return;
    }
    citySelectedObj[0]['selected'] = true;
    citySelectedObj[0]['order'] = addedCities.length;
    addedCities.push(citySelectedObj[0]);
    closeModal();
    renderMap();
    renderHeader();
}

function handleCitySelection(event,type) {
    let cityObj = {};
    let index;
    if(type === 'panel') {
        index = parseInt(event.target.parentElement.id);
        cityObj = addedCities[index];
    }else if(type === 'map') {
        cityObj = event;
        index = cityObj.order;
    }
    
    if(addedCities[index].selected) {
        addedCities[index].selected = false;
    }else {
        addedCities[index].selected = true;
    } 

    renderMap();
    renderHeader();
}

function renderCalendarPopup() {
    let calendarCitySelect = document.getElementById('calendar-city-select');

    while(calendarCitySelect.firstChild) {
        calendarCitySelect.removeChild(calendarCitySelect.firstChild);
    }

    if(!addedCities.length) {
        let option = document.createElement('option');
        option.innerHTML = 'No cities selected';
        option.value = 'noRows';
        option.disabled = true;
        option.selected = true;
        calendarCitySelect.append(option);

        return;
    }

    let option = document.createElement('option');
    option.innerHTML = 'select city';
    option.value = 'noRows';
    option.disabled = true;
    option.selected = true;
    calendarCitySelect.append(option);

    addedCities.forEach((city) => {
        let option = document.createElement('option');
        option.innerHTML = city.name;
        option.value = city.name;

        calendarCitySelect.append(option);
    })
}

function selectCalendarCity() {
    let calendarCitySelect = document.getElementById('calendar-city-select');
    calendarCityName = calendarCitySelect.selectedOptions[0].value;
    
    let selectedCity = addedCities.filter((city) => calendarCityName === city.name);

    let dateTimeInfo = getTime(selectedCity[0].zoneStr,true);
    let date = parseInt(dateTimeInfo[0]);
    let month = parseInt(dateTimeInfo[1]);
    let year = parseInt(dateTimeInfo[2]);
    let hour = dateTimeInfo[3].split(':')[0];
    let minutes = dateTimeInfo[3].split(':')[1];
    minutes = String((parseInt(minutes)/60)*100);
    let time = parseFloat([hour,minutes].join('.'));
    let dateRange = '';

    if((year < initialDateRange.start.year || month < initialDateRange.start.month || date < initialDateRange.start.date)) {
        time = time-24;
        // dateRange = `${initialDateRange.start.date}/${initialDateRange.start.month}/${initialDateRange.start.year} - ${initialDateRange.end.date}/${initialDateRange.end.month}/${initialDateRange.end.year}`;
    }
    // else {
    //     dateRange = `${initialDateRange.start.date}/${initialDateRange.start.month}/${initialDateRange.start.year}`;
    // }

    if(time <= initialTimeRange.start) {
        let [startStr,endStr,dateStr] = getFormattedSlotValues(initialTimeRange.start,initialTimeRange.end);
         slotInfo = {
             startTime: startStr,
             endTime: endStr,
             date: dateStr
         }   


    }
}

function addSlot() {
    let errLabel = document.getElementById('err-text');

    if(Object.keys(slotInfo).length) {
        console.log(slotInfo);
        slotsInfo.push(slotInfo);
        errLabel.innerHTML = '';
        slotInfo = {};
        closeModal();
        return;
    }

    errLabel.innerHTML = 'Invalid time selected!!';
}

function getTimeStr(time) {
    let timeStr = '';
    if(time%1 !== 0) {
        let str = String(time);
        let hour = parseInt(str.split('.')[0]);

        if(hour === 24) {
            hour = 0;
        }else if(hour > 24) {
            hour = hour - 24;
        }

        hour = (hour.length === 1)?`0${hour}`:hour;
        let minutes = parseInt(str.split('.')[1]);
        let ratio = 100/minutes;
        minutes = String(60/ratio);
        minutes = (minutes.length === 1)?`${minutes}0`:minutes;
        timeStr = `${hour}:${minutes}`;
    }else {
        let hour = time;
        if(hour === 24) {
            hour = 0;
        }else if(hour > 24) {
            hour = hour - 24;
        }
        hour = (String(hour).length === 1)?`0${hour}`:hour;
        timeStr = `${hour}:00`;
    }
    return timeStr ;
}

function getFormattedSlotValues(startTime,endTime) {
    let currentDateObj = new Date();

    let startStr = getTimeStr(startTime);
    let endStr = getTimeStr(endTime);
    let dateStr = '';

    if(startTime <= 0 && endTime <= 0) {
        let previousDate = currentDateObj.getDate()-1;
        let month = currentDateObj.getMonth();
        let year = currentDateObj.getFullYear();
        if(!previousDate) {
            previousDate =  new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0);
            month -= 1;
            if(!month) {
                month = 12;
                year = currentDateObj.getFullYear() - 1;
            }
        }
        dateStr = `${previousDate}/${month}/${year}`;
    }else if(startTime <= 0 && endTime > 0 && endTime <= 24) {
        let previousDate = currentDateObj.getDate()-1;
        let previousMonth = currentDateObj.getMonth();
        let previousYear = currentDateObj.getFullYear();
        if(!previousDate) {
            previousDate =  new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0);
            previousMonth -= 1;
            if(!previousMonth) {
                previousMonth = 12;
                previousYear = currentDateObj.getFullYear() - 1;
            }
        }

        dateStr = `${previousDate}/${previousMonth}/${previousYear} - ${currentDateObj.getDate()}/${currentDateObj.getMonth()}/${currentDateObj.getFullYear()}`;
    }else if(startTime <= 0 && endTime > 24) {
        let previousDate = currentDateObj.getDate()-1;
        let previousMonth = currentDateObj.getMonth();
        let previousYear = currentDateObj.getFullYear();
        if(!previousDate) {
            previousDate =  new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0);
            previousMonth -= 1;
            if(!previousMonth) {
                previousMonth = 12;
                previousYear = currentDateObj.getFullYear() - 1;
            }
        }

        let futureDate = currentDateObj.getDate()+1;
        let futureMonth = currentDateObj.getMonth();
        let futureYear = currentDateObj.getFullYear();
        if(futureDate > new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0)) {
            futureDate = 1;
            futureMonth += 1;
            if(futureMonth > 12) {
                futureMonth = 1;
                futureYear = currentDateObj.getFullYear() + 1;
            }
        }

        dateStr = `${previousDate}/${previousMonth}/${previousYear} - ${futureDate}/${futureMonth}/${futureYear}`;
    }else if(startTime > 0 && startTime <= 24 && endTime > 0 && endTime <= 24) {
        let date = currentDateObj.getDate();
        let month = currentDateObj.getMonth();
        let year = currentDateObj.getFullYear();

        dateStr = `${date}/${month}/${year}`;
    }else if(startTime <= 24 && endTime > 24) {
        let futureDate = currentDateObj.getDate()+1;
        let futureMonth = currentDateObj.getMonth();
        let futureYear = currentDateObj.getFullYear();
        if(futureDate > new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0)) {
            futureDate = 1;
            futureMonth += 1;
            if(futureMonth > 12) {
                futureMonth = 1;
                futureYear = currentDateObj.getFullYear() + 1;
            }
        }

        dateStr = `${currentDateObj.getDate()}/${currentDateObj.getMonth()}/${currentDateObj.getFullYear()} - ${futureDate}/${futureMonth}/${futureYear}`;
    }else if(startTime > 24 && endTime > 24) {
        let futureDate = currentDateObj.getDate()+1;
        let futureMonth = currentDateObj.getMonth();
        let futureYear = currentDateObj.getFullYear();
        if(futureDate > new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0)) {
            futureDate = 1;
            futureMonth += 1;
            if(futureMonth > 12) {
                futureMonth = 1;
                futureYear = currentDateObj.getFullYear() + 1;
            }
        }

        dateStr = `${futureDate}/${futureMonth}/${futureYear}`;
    }

    return [startStr,endStr,dateStr];
}

/*-----------Map Logic----------*/

function renderMap() {
    d3.json(
        'https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json',
        function (json) {

            d3.selectAll('g').remove()

            countriesGroup = svg.append('g')
                .attr('class','country')
            
            countries = countriesGroup
                .selectAll('path')
                .data(json.features)
                .enter()
                .append('path')
                .attr('d',path)
            ;

            markers = svg.append('g')
                .attr('class','marker')
            

            marker = markers
                .selectAll('circle')
                .data(addedCities)
                .enter()
                .append('circle')
                .attr('cy',d => projection(d.coordinates)[1])
                .attr('cx',d => projection(d.coordinates)[0])
                .attr("r", "4px")
                .attr('class',d => {
                    if(d.selected) {
                        return "marker-selected";
                    }
                    return "marker-unselect";
                })
                .on('click',(d) => {handleCitySelection(d,'map')})
            ;

            labels = svg.append('g')
                .attr('class','name-labels')
                .selectAll('text')
                .data(addedCities)
                .enter()
            
            labels
                .append('text')
                .attr('y',d => projection(d.coordinates)[1])
                .attr('x',d => projection(d.coordinates)[0]+15)
                .text(d => getTime(d.zoneStr)[0] + ' ' + getTime(d.zoneStr)[1].toUpperCase())
                .style('font-size',10)
                .style('fill',d => {
                    if(d.selected) {
                        return '#a0ce46';
                    }

                    return 'grey';
                })
                .attr('class','time')
            
            labels
                .append('text')
                .attr('y',d => projection(d.coordinates)[1])
                .attr('x',d => projection(d.coordinates)[0]+15)
                .text(d => d.name)
                .style('font-size',8)
                .style('fill',d => {
                    if(d.selected) {
                        return '#a0ce46';
                    }

                    return 'grey';
                })
                .attr('dy','1.5em')
                .attr('class','city')
            
            labels
                .append('text')
                .attr('y',d => projection(d.coordinates)[1])
                .attr('x',d => projection(d.coordinates)[0]+15)
                .text(d => d.country)
                .style('font-size',8)
                .style('fill','grey')
                .attr('dy','3em')
                .attr('class','city')
        }
    );
}

/*----------Range------------*/

function renderRange() {

    let rangeSection = document.getElementById('range-section');
    let scrollValue = (rangeSection.scrollWidth/2)-750;
    rangeSection.scrollLeft = scrollValue;

    let currentDateObj = new Date();
    let minutes = currentDateObj.getMinutes();
    let initialTime = (minutes >= 30)? currentDateObj.getHours()+1: currentDateObj.getHours();
    initialTimeRange = {
        start: initialTime,
        end: initialTime+1
    }
    let date = currentDateObj.getDate();
    let month = currentDateObj.getMonth();
    let year = currentDateObj.getFullYear();

    initialDateRange = {
        start: {
            date,
            month,
            year
        },
        end: {
            date,
            month,
            year
        }
    }
    $( function() {
        $( "#slider-range" ).slider({
          range: true,
          min: -24,
          max: 48,
          step: 0.25,
          values: [ initialTime, initialTime+1 ],
          slide: function( event, ui ) {
            console.log(`${ui.values[0]} ${ui.values[1]}`);
            initialTimeRange = {
                start: ui.values[0],
                end: ui.values[1]
            }
          } 
        });
    });
}

/*----------Initialize--------*/

function main() {
    renderHeader();
    renderMap();
    renderRange();
}
main();