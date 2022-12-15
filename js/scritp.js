// initialize array
const alarmList = [];
const displayList = [];

//calling currentTime function repeatly every second
function repeat() {
  setTimeout(() => {
    currentTime();
  }, 1000);
}

// function for calculating the current time
let currentTime = function () {
  // getting span form span tag form html as object
  const clock = document.getElementById("clock");
  let today = new Date();
  // calculating time period
  let period = today.getHours() >= 12 ? "PM" : "AM";
  //inserting zero if current number/time is less 10
  let tempHours =
    today.getHours() <= 9 ? "0" + today.getHours() : today.getHours();
  let tempMin =
    today.getMinutes() <= 9 ? "0" + today.getMinutes() : today.getMinutes();
  let currentSecond =
    today.getSeconds() > 9 ? today.getSeconds() : "0" + today.getSeconds();
  // making current timer as 12 hourse based
  let currentHours = today.getHours() > 12 ? today.getHours() - 12 : tempHours;
  //appending the : b/w hh:mm:ss
  let time =
    currentHours + " : " + tempMin + " : " + currentSecond + " " + period;
  //changing inner span to the current time
  clock.innerHTML = time;
  repeat();
};

//adding even listener to the add alarm button
const clockSubmit = document
  .getElementById("submitClock")
  .addEventListener("click", setAlarm);

// function to display user set alarm
function displayAlarms() {
  const alarm_list = document.getElementById("alarm_list");
  alarm_list.innerHTML = "";
  //iterating over displayList array to display the user set alarm list
  displayList.forEach((time, index) => {
    const temp = "" + time;
    // added to  span tag
    alarm_list.innerHTML += ` <div class="inner_alarm_list_container">
        <h3 > ${temp.substring(0, 24)}</h3>
        <button onClick={handleDelete(${index})} type="submit" id='deleteAlarm'>Delete</button>`;
  });
}

//function to set alarm it calls when the add alarm button is clicked
function setAlarm(e) {
  // preventing default form reload on every button click
  e.preventDefault();
  // fetching input tag value
  const alarmObject = document.getElementById("time_id");
  alarm = alarmObject.value;
  alarmObject.value = "";
  if (alarm) {
    // location based standard time
    const current = new Date();
    // converting input value to standart time
    const alarmTime = new Date(alarm);
    // if current time less than the user set alarm time then, alerting the user to set right time and date
    if (alarmTime > current) {
      // adding user set alarm time to displayList array for displaying the list
      displayList.push(alarmTime);
      // sorting the list
      displayList.sort();
      // calculating the total time out in miliseconds
      const timeout = alarmTime.getTime() - current.getTime();
      //calling display function
      displayAlarms();
      // adding time out time in alarmlist array
      alarmList.push(timeout);
      // sorting the array
      alarmList.sort();
      // calling timeoutfunction to give alert when the time out is complete
      timeoutfucntion(alarmList[0]);
      // alerting the user that alarm is set successfullys
      alert("Alarm set : )");
    } else {
      // if user enter the invalid input
      alert("Invalid Input : (");
    }
  }
}

// delete list function
function handleDelete(index) {
  displayList.splice(index, 1);
  displayAlarms();
}

// this function call it's seft after every one second
// until the time out is Zero
function timeoutfucntion(timeout) {
  setTimeout(() => {
    //checking is displayList have any value in it or not
    if (displayList.length > 0) {
      // then removeing first element
      displayList.shift();
      // after removing calling updated displayAlarm function
      displayAlarms();
    }
    // removing first element form the alarmList array
    alarmList.shift();
    if (alarmList.length > 0) {
      // calling it's until alarmList have element in it
      timeoutfucntion(alarmList[0]);
    }
    // alerting user that alarm time complete
    alert("Times up");
  }, timeout);
}

//calling to currentTime function
currentTime();
