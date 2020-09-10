//GLOBAL VARIABLES

const genBtn = document.getElementById('generate');
const contentDiv = document.getElementById('content');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');

// Personal API Key for OpenWeatherMap API

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2506401d13ee6add681fea1b9fdc1518';

// Event listener to call functions to post and retrieve data

genBtn.addEventListener('click', () => {
   generateDataToPost().then(dataToPost => {
       postData('/all', dataToPost);
       getProjectData('/all');
   })

});
    
// Helper functions to generate values

function getURL() {
    return baseURL + document.querySelector('#zip').value + apiKey + '&units=metric';
}

function getDate() {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date;
}

function getFeelings() {
    return document.querySelector('#feelings').value;
}

// function to generate, gather and return the data to be posted to the server

async function generateDataToPost() {
    
    const date = getDate();
    const entry = getFeelings();
    const weather = await getWeatherData();

    const dataToPost = {
        date: date,
        entry: entry,
        weather: weather,
    }

    if (document.querySelector('#zip').value == '' 
        || document.querySelector('#feelings').value == '') {
            alert('Please fill out all fields');
    }
    return dataToPost;
}

/// function to retrieve web API data and return the relevant parts 

async function getWeatherData() {
    const url = getURL();
    const response = await fetch(url);
    try {
        const data = await response.json();
        const {temp} = data.main;
        const {description} = data.weather[0];
        const weatherObj = { temp, description };

        return weatherObj.temp + '&deg; C | ' + weatherObj.description;

    } catch (err) {
            console.log('Error occurred', err);
            alert('Something went wrong while retrieving your weather info');
        }
}

// function to post the gathered data to the server

async function postData (url, data) {
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json();
        return newData;

    } catch (err) {
        console.log('Error occurred:', err);
    }
}

// function to retrieve the data from server and to display it on the page

async function getProjectData(url) {
    
    const response = await fetch(url);
   try {
        const data = await response.json();
        const projectData = await data;

        contentDiv.innerHTML = projectData.innerObj.entry;
        tempDiv.innerHTML = projectData.innerObj.weather;
        dateDiv.innerText = projectData.innerObj.date;
   }
      catch (err) {
        console.log('Error occurred:', err);
      }
}