// https://www.themealdb.com/api/json/v1/1/filter.php?i=

let inputEl = document.getElementById('user-input');
let searchButton = document.getElementById('search');

function getMainIngredient () {
// get user input
let userInput = inputEl.value.trim();
 // If user input is empty -> alert
if (!userInput) {
    // Replace with the basic dialog window jQuery ui
    alert('You need to fill out the City name!');
    return;
  }
// Save userInput to the LocalStorage
//saveToLocalStorage(userInput);
// // Function to save user input LocalStorage
// function saveToLocalStorage(ingredient) {
//     // let's retrieves the item named 'user-input' from the local storage and 
//     // assign it to the history variable.
//     let history = localStorage.getItem('user-input');
//     // If key exist
//     if (history) {  
//     // Do JSON.parse  and assigns it back to the history variable.
//     history = JSON.parse(history);
//     // then push ingredient value to history array
//     history.push(ingredient);
//     // If history already existed - update the local storage 
//     // by stringifying the updated history array 
//     localStorage.setItem('user-input', JSON.stringify(history));
//     } else {
//     // If there was no existing history creates a new array containing only the current ingredient
//     localStorage.setItem('user-input', JSON.stringify([ingredient]));
//   }
// }
// URL request to the themealdb.com
let requestUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput;
console.log(requestUrl)
// Do fetch to requestUrl
fetch(requestUrl)
// If requestUrl is accepted and we get response do json()
.then(function(response) {
    return response.json();
})
// then manage the response (response = data)
.then(function (data) {
    console.log(data);
});

};

// EventListener for the search buttton
searchButton.addEventListener('click', getMainIngredient);