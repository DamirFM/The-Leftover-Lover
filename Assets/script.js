// // https://www.themealdb.com/api/json/v1/1/filter.php?i=

let inputEl = document.getElementById('user-input');
let searchButton = document.getElementById('search');
let recipeCard = document.getElementById('recipe-display');
let recipeImage = document.getElementById('recipe-image');
let prevButton = document.querySelector('.prev');
let nextButton = document.querySelector('.next');
let currentIndex = 0;
let dataMeals = [];



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

let requestUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;
console.log(requestUrl)
// Do fetch to requestUrl
fetch(requestUrl)
// If requestUrl is accepted and we get response do json()
.then(function(response) {
    return response.json();
})
// then manage the response (response = data)
.then(function (data) {
    // Assign the fetched data to dataMeals array
    dataMeals = data.meals ; 
    // if fetched data is empty 
    if (dataMeals.length === 0) {
        // Replace with the basic dialog window jQuery ui
        alert('No recipes found!');
        return;
    }
    // function for display Recipe
    function displayRecipe(index) {
        // Clear previous content
        recipeCard.innerHTML = ""; 
        // retrieve the meal object at the specified index within 
        // the dataMeals array and assign it to the currentMeal variable.
        let currentMeal = dataMeals[index];
        // Crating h5 element fot Recipe title
        let cardTitle = document.createElement('h5');
        // Assigning data from object
        cardTitle.textContent = currentMeal.strMeal;
        // Added the class name
        cardTitle.classList = 'card-title';
        // Append it to the [arent element]
        recipeCard.appendChild(cardTitle);
        // Same as h5
        let cardParagraph = document.createElement("p");
        cardParagraph.textContent = currentMeal.strInstructions;
        recipeCard.appendChild(cardParagraph);
    
        let cardImg = document.createElement("img");
        cardImg.src = currentMeal.strMealThumb;
        recipeCard.appendChild(cardImg);
    }
    
    // Navigation function throughout the dataMeals array
    function navigate(direction) {
        currentIndex = currentIndex + direction;
        if (currentIndex < 0) {
            // If currentIndex < 0 go back to the last index in the array
            currentIndex = dataMeals.length - 1;
        } else if (currentIndex > dataMeals.length - 1) {
            // Come to the last index available in the dataMeals array.
            currentIndex = 0;
        }
        // Shows currentIndex
        displayRecipe(currentIndex);
    }

    // Display the first recipe fetched
    displayRecipe(currentIndex);
    // EventListener for prevButton
    prevButton.addEventListener('click', function () {
        navigate(-1);
    });
    // EventListener for nextButton
    nextButton.addEventListener('click', function () {
        navigate(1);
    });
});


};

// EventListener for the search buttton
searchButton.addEventListener('click', getMainIngredient);


