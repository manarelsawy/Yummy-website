let mealsData = document.getElementById('mealsData');
let searchData = document.getElementById('search');
let submitbtn ;

$(document).ready(function(){
    getMealsByName("").then(function(){
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
        $(".inner-loading-screen").fadeOut(300)


    })
})

    // ! Side Nav

    function openSideNav() {
        $(".side-nav-menu").animate({
            left: 0
        }, 500)
    
    
        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");
    
    
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    }
    
    function closeSideNav() {
        let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
        $(".side-nav-menu").animate({
            left: -boxWidth
        }, 500)
    
        $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");
    
    
        $(".links li").animate({
            top: 300
        }, 500)
    }
    
    closeSideNav()
    $(".side-nav-menu i.open-close-icon").click(() => {
        if ($(".side-nav-menu").css("left") == "0px") {
            closeSideNav()
        } else {
            openSideNav()
        }
    })

    $('.nav-bar .open-close-icon').on('click', function(){

    if($('.nav-bar').css('left') === '0px'){
        closeSideNav()
    }else{
    openSideNav()
    }

    })

// ! Display Meals

function displayMeals(arr){
    let conntainner = "";
    for(let i = 0 ; i< arr.length ; i++){
        conntainner +=`
        <div class="col-md-3">
                <div onclick='getMealDetails (${arr[i].idMeal})' class="meal position-relative overflow-hidden cursor-pointer rounded-2">
                    <img class="w-100" src="${arr[i].strMealThumb}">
                    <div class="meal-layer p-2 position-absolute d-flex align-items-center text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            
        `
    }
    mealsData .innerHTML = conntainner ;
}

getMealsByName("")

// ! Display Categories
async function getCategories(){
    searchData.innerHTML = "";
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let categoriesResponse = await response.json()
    // console.log(categoriesResponse.categories)

    displayCategories(categoriesResponse.categories)

    $(".inner-loading-screen").fadeOut(300)


}

function displayCategories(arr){
    let conntainner = "";
    for(let i = 0 ; i< arr.length ; i++){
        conntainner +=`
        <div class="col-md-3">
                <div onclick="getCategoriesMeals('${arr[i].strCategory}')" class=" meal position-relative cursor-pointer overflow-hidden rounded-2">
                    <img class="w-100" src="${arr[i].strCategoryThumb}">
                    <div class="meal-layer p-2 position-absolute text-center text-black">
                        <h3>${arr[i].strCategory}</h3>
                        <p> ${arr[i].strCategoryDescription.split("").slice(0,70).join("")}</p>
                    </div>
                </div>
            </div>
            
        `
    }
    mealsData .innerHTML = conntainner ;
}

// ! // ! Display Area
async function getArea() {
    searchData.innerHTML = "";
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areaResponse = await response.json()
    // console.log(areaResponse.meals)
    displayArea(areaResponse.meals)
    $(".inner-loading-screen").fadeOut(300)

}


function displayArea(arr){
    let conntainner = "";
    for(let i = 0 ; i< arr.length ; i++){
        conntainner +=`
        <div class="col-md-3">
                <div onclick=" getAreaMeals('${arr[i].strArea}')" class="text-center cursor-pointer rounded-2">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
            </div>
            
        `
    }
    mealsData .innerHTML = conntainner ;
}

// ! Display Ingredients
async function getIngredients() {
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchData.innerHTML = "";
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let ingredientsRespone = await response.json()
    displayIngredients(ingredientsRespone.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(300)
    
}

function displayIngredients(arr){
    let conntainner = "";
    for(let i = 0 ; i< arr.length ; i++){
        conntainner +=`
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="text-center cursor-pointer rounded-2">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p> ${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
            
        `
    }
    mealsData .innerHTML = conntainner ;
}

async function getCategoriesMeals(category) {
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let categoryResponse = await response.json()
    displayMeals(categoryResponse.meals)
    $(".inner-loading-screen").fadeOut(300)
}



async function getAreaMeals(area) {
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let areaResponse = await response.json()
    displayMeals(areaResponse.meals)
    $(".inner-loading-screen").fadeOut(300)
}

async function getIngredientsMeals(ingredients) {
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let ingredientsResponse = await response.json()
    displayMeals(ingredientsResponse.meals)
    $(".inner-loading-screen").fadeOut(300)
}

async function getMealDetails (mealID) {
    closeSideNav()
    searchData.innerHTML = "";
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let mealDetailsResponse = await response.json()
    displaMealDetails(mealDetailsResponse.meals[0])
    $(".inner-loading-screen").fadeOut(300)
    
}
function displaMealDetails(meal){
    searchData.innerHTML = "";
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

        let conntainner= `
        <div class="col-md-4">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area :</span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category :</span>${meal.strCategory}</h3>
                <h3>nkjbnkj :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>tags :</h3>

                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <a  target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a  target="_blank" href="${meal.strYoutube}" class="btn btn-danger">YouTube</a>
            </div>
        `
        mealsData.innerHTML = conntainner ;
}

function displaSearchInput(){
    let conntainner =`
    <div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="getMealsByName(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="getMealsByFristLitter(this.value)" maxlength="1" type="text" class="form-control bg-transparent text-white" placeholder="Search By Frist Litter">
            </div>
        </div>
    `
    searchData.innerHTML = conntainner
    mealsData.innerHTML = ""

}

async function getMealsByName(meal){
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    let mealResponse = await response.json();
    mealResponse.meals ? displayMeals(mealResponse.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

async function getMealsByFristLitter(litter){
    mealsData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    litter === "" ? litter = "a" : "";
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`);
    let mealResponse = await response.json();
    mealResponse.meals ? displayMeals(mealResponse.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

function displayContact(){
    let conntainner = `
    <div  class="row g-4">
                <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                    <div class="container w-75 text-center">
                        <div  class="row g-4">
                            <div class="col-md-6">
                                <input id="nameinput" onkeyup="inputValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailinput" onkeyup="inputValidation()" type="email" class="form-control" placeholder="Enter Your Email">
                                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Email not valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="phoneinput" onkeyup="inputValidation()" type="text" class="form-control" placeholder="Enter Your Phone">
                                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageinput" onkeyup="inputValidation()" type="number" class="form-control" placeholder="Enter Your Age">
                                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="passinput" onkeyup="inputValidation()" type="password" class="form-control" placeholder="Enter Your Password">
                                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="repassinput" onkeyup="inputValidation()" type="password" class="form-control" placeholder="Repassword">
                                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid repassword 
                                </div>
                            </div>
                        </div>
                        
                        <button id="submit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                </div> 
            </div>
    `
    mealsData.innerHTML = conntainner ;

    submitbtn = document.getElementById('submit')
    document.getElementById("nameinput").addEventListener("focus", function(){
        nameInputFocused = true
    })
    
    document.getElementById("emailinput").addEventListener("focus", function(){
        emailInputFocused = true
    })
    
    document.getElementById("phoneinput").addEventListener("focus", function(){
        phoneInputFocused = true
    })
    
    document.getElementById("ageinput").addEventListener("focus", function(){
        ageInputFocused = true
    })
    
    document.getElementById("passinput").addEventListener("focus", function(){
        passwordInputFocused = true
    })
    
    document.getElementById("repassinput").addEventListener("focus", function(){
        repasswordInputFocused = true
    })
    
}


let nameInputFocused = false;
let emailInputFocused = false;
let phoneInputFocused= false;
let ageInputFocused = false;
let passwordInputFocused = false;
let repasswordInputFocused = false;


function inputValidation(){
    if (nameInputFocused) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputFocused) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputFocused) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputFocused) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputFocused) {
        if (passValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputFocused) {
        if (repassValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    if(
        nameValidation()&&
        emailValidation()&&
        phoneValidation()&&
        ageValidation()&&
        passValidation()&&
        repassValidation()
    ){
        submitbtn.removeAttribute("disabled")
    }else{
        submitbtn.setAttribute("disabled",true)
    }
}


function nameValidation(){
    return  /^[a-zA-Z ]+$/.test(document.getElementById("nameinput").value)
    
}
function emailValidation(){
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailinput").value)
}
function phoneValidation(){
    return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(document.getElementById("phoneinput").value)
}
function ageValidation(){
    return /^([3-9]|[1-6][0-9])$/.test(document.getElementById("ageinput").value)
    
}
function passValidation(){
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(document.getElementById("passinput").value)
}
function repassValidation(){
    return (document.getElementById("repassinput").value) == (document.getElementById("passinput").value)
}