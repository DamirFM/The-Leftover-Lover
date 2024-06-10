// https://www.themealdb.com/api/json/v1/1/filter.php?i=

let inputEl = document.getElementById('user-input');
let searchButton = document.getElementById('search');
let recipeCard = document.getElementById('recipe-display');
let recipeImage = document.getElementById('recipe-figure');
let recipeTitle = document.getElementById('recipe-title');
let historyList = document.getElementById('historyBar');
let prevButton = document.querySelector('.prev');
let nextButton = document.querySelector('.next');

let currentIndex = 0;
let dataMeals = [];


// Function to input the ingredient into MealDB and return Recipe cards

function getMainIngredient() {
    
    displaySearchHistory();
    // get user input
    let userInput = inputEl.value.trim();
    // If user input is empty -> alert
    if (!userInput) {
        // Replace with the basic dialog window jQuery ui
        console.log('You need to fill out the ingredient name!');
        // alert('You need to fill out the ingredient name!');
        let hero = document.getElementById('hero');
        let notification = document.createElement('div');
        notification.setAttribute("class", "notification")
        notification.textContent = 'You need to fill out the ingredient name!'
        let btnEl = document.createElement("button");
        btnEl.setAttribute("class", "delete")
        notification.appendChild(btnEl);
        hero.appendChild(notification);

        btnEl.addEventListener('click', function () {
            notification.remove();
        });
        return;
    }

    // Save userInput to the LocalStorage
    saveToLocalStorage(userInput);
    // Function to save user input LocalStorage
    function saveToLocalStorage(ingredient) {

        // let's retrieves the item named 'user-input' from the local storage and 
        // assign it to the history variable.
        let history = localStorage.getItem('user-input');

        // If key exist
        if (history) {
            // Do JSON.parse  and assigns it back to the history variable.
            history = JSON.parse(history);

            // then push ingredient value to history array
            history.push(ingredient);
            // updates the history variable.
            if (history.length > 10) {
                history = history.slice(-10);
            }
            // If history already existed - update the local storage 
            // by stringifying the updated history array 
            localStorage.setItem('user-input', JSON.stringify(history));
            console.log(JSON.stringify(history));
        } else {
            // If there was no existing history creates a new array containing only the current ingredient
            localStorage.setItem('user-input', JSON.stringify([ingredient]));
        }
    }



    // URL request to the themealdb.com for Recipe Generation
    let requestUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;
    console.log(requestUrl)
    // Do fetch to requestUrl
    fetch(requestUrl)
        // If requestUrl is accepted and we get response do json()
        .then(function (response) {
            return response.json();
        })
        // then manage the response (response = data)
        .then(function (data) {
            // Assign the fetched data to dataMeals array
            dataMeals = data.meals;
            // if fetched data is empty 
            if (dataMeals === null) {
                let hero = document.getElementById('hero');
                let notification = document.createElement('div');
                notification.setAttribute("class", "notification")
                notification.textContent = 'Sorry,wrong ingredient name!'
                let btnEl = document.createElement("button");
                btnEl.setAttribute("class", "delete")
                notification.appendChild(btnEl);
                hero.appendChild(notification);

                btnEl.addEventListener('click', function () {
                    notification.remove();

                });
                // Replace with the basic dialog window jQuery ui
                console.log('Sorry,wrong ingredient name!');
                return;

            } else if (dataMeals.length === 0) {

                console.log('You need to fill out the ingredient name!');
            }

            // function for display Recipe
            function displayRecipe(index) {
                // Clear previous content
                recipeCard.innerHTML = "";
                // retrieve the meal object at the specified index within 
                // the dataMeals array and assign it to the currentMeal variable.
                let currentMeal = dataMeals[index];

                // Generate Recipe Card Image
                recipeImage.innerHTML = '';
                let cardImg = document.createElement("img");
                cardImg.classList = "is-rounded";
                cardImg.src = currentMeal.strMealThumb;
                recipeImage.appendChild(cardImg);

                // Generate Recipe Card Title
                recipeTitle.innerHTML = '';
                let cardTitle = document.createElement("h5");
                cardTitle.textContent = currentMeal.strMeal;
                recipeTitle.appendChild(cardTitle);

                // Generate Recipe Card Instructions
                recipeCard.innerHTML = '';
                let cardParagraph = document.createElement("ul");
                cardParagraph.textContent = currentMeal.strInstructions;
                cardParagraph.classList = 'content recipe-instructions';
                recipeCard.appendChild(cardParagraph);
            }

            // URL request to the themealdb.com for Cycling through recipes
            let requestUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;
            console.log(requestUrl)
            // Do fetch to requestUrl
            fetch(requestUrl)
                // If requestUrl is accepted and we get response do json()
                .then(function (response) {
                    return response.json();
                })
                // then manage the response (response = data)
                .then(function (data) {
                    // Assign the fetched data to dataMeals array
                    dataMeals = data.meals;
                    // if fetched data is empty 
                    if (dataMeals.length === 0) {
                        // Replace with the basic dialog window jQuery ui
                        alert('No recipes found!');
                        return;
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
        });

}

// Function to search Youtube for the ingredient and return 4 videos
function getYoutubeData() {
    // let pkyoutubeApiKey = 'AIzaSyD6Duo2s9r4Tj57LH9OVooXotyYLkHzChI';
    let mcyoutubeApiKey = 'AIzaSyAOyV1zNyuCA9Jp91CeZtyRmQSmhKZEAts';
    let userInput = "recipe" + "ingredient" + inputEl.value.trim();

    // URL request to the youtube api + keyword recipe + ingriedient
    let youtubeRequestUrl = "https://www.googleapis.com/youtube/v3/search?q=" + userInput + "&key=" + mcyoutubeApiKey;
    console.log(youtubeRequestUrl)
    // Do fetch to requestUrl
    fetch(youtubeRequestUrl)
        // If requestUrl is accepted and we get response do json()
        .then(function (response) {
            return response.json();
        })
        // then manage the response (response = data)
        .then(function (data) {
            console.log(data);

            // GENERATE VIDEOS FROM INGREDIENT SEARCH //

            // Video 0 //
            let videoSpotZero = document.getElementById('video-embed-zero');
            let videoZeroDefault = document.getElementById('video-zero')
            videoZeroDefault.remove();
            let videoZero = document.createElement("iframe");
            videoZero.setAttribute("id", "video-zero");
            videoZero.setAttribute("src", "https://www.youtube.com/embed/" + data.items[0].id.videoId)
            videoSpotZero.appendChild(videoZero);

            // Video 1 //
            let videoSpotOne = document.getElementById('video-embed-one');
            let videoOneDefault = document.getElementById('video-one')
            videoOneDefault.remove();
            let videoOne = document.createElement("iframe");
            videoOne.setAttribute("id", "video-one");
            videoOne.setAttribute("src", "https://www.youtube.com/embed/" + data.items[1].id.videoId)
            videoSpotOne.appendChild(videoOne);

            // Video 2 //
            let videoSpotTwo = document.getElementById('video-embed-two');
            let videoTwoDefault = document.getElementById('video-two')
            videoTwoDefault.remove();
            let videoTwo = document.createElement("iframe");
            videoTwo.setAttribute("id", "video-two");
            videoTwo.setAttribute("src", "https://www.youtube.com/embed/" + data.items[2].id.videoId)
            videoSpotTwo.appendChild(videoTwo);

            // Video 3 //
            let videoSpotThree = document.getElementById('video-embed-three');
            let videoThreeDefault = document.getElementById('video-three')
            videoThreeDefault.remove();
            let videoThree = document.createElement("iframe");
            videoThree.setAttribute("id", "video-three");
            videoThree.setAttribute("src", "https://www.youtube.com/embed/" + data.items[3].id.videoId)
            videoSpotThree.appendChild(videoThree);
        });
}

// Function to display search history from local storage
function displaySearchHistory() {
    // Declaration of the displaySearchHistory() function.
    let history = localStorage.getItem('user-input');
    // Retrieve the item named 'user-input' 
    // from the local storage and assigns it to the history variable
    if (history) {
        // If history exists, it parses the data 
        history = JSON.parse(history);
        // Let's clears the existing content of the historyList element 
        // to avoid duplicating the search history.
        historyList.textContent = "";
        // Loop for each history element in the history array
        history.forEach(ingredient => {
            // Create li element and button element
            let liEl = document.createElement("li");
            let btnEl = document.createElement("button");
            // Assign ingredient value to the button element
            btnEl.textContent = ingredient;
            // Assign the class to the button element

            btnEl.classList = 'button is-light is-normal is-success is-rounded my-1';

            // Let's add EventListener to every each new button element
            btnEl.addEventListener('click', function () {
                inputEl.value = ingredient; // Set input value to the clicked ingredient
                getMainIngredient(); // Call getApi function for the clicked ingredient
                getYoutubeData();
            });
            // Append button element to the li element
            liEl.appendChild(btnEl);
            // Append li element to the history element
            historyList.appendChild(liEl);
        });
    }
}

// EventListener for the search buttton
searchButton.addEventListener('click', getMainIngredient);
//EventListener for youtube data
searchButton.addEventListener('click', getYoutubeData);
