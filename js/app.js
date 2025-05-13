
//this JS code is a practise of what I learnt about shopping card using Vanilla JS
//it's not OOP programing & is based on what I learnt in this course.
//variables
const courses = document.querySelector("#courses-list"),
      shoppinCardContent = document.querySelector("#card-content tbody"),
      clearCardBtn = document.querySelector("#clear-card")


//eventListeners
addEventListener()
function eventListeners(){

    courses.addEventListener("click", buyCourse)

    //remove courses from card 
    shoppinCardContent.addEventListener("click", removeCourse)

}


//functions

//add course to the card fuction
function buyCourse(e){
    e.preventDefault()
    //using delegation for access to the selected course
    if(e.target.classList.contains("add-to-card")){
        //access to the card div with parentElement
        const course = e.target.parentElement.parentElement

        //read values of the selected course
        getCourseInfo(course)
    }
}

//this function gets the course info that selected by user from DOM
function getCourseInfo(course){
    //course info 
    const courseInfo = {
        Image : course.querySelector("img").src,
        title : course.querySelector("h4").textContent,
        price : course.querySelector("span").textContent,
        id : course.querySelector("a")[1].getAttribute("data-id")
    }

    //adding the course to the card
    addToCard(courseInfo)

    saveToStorage(cInfo)

}


//this function adds the selected courses to the shopping card
function addToCard(cInfo){
    //create <li> tag
    let row = document.querySelector("tr")

    //build HTML template
    row.innerHTML = `
        <tr>
            <td>
                <img src = "${cInfo.image}" width = "100px">
            </td>
            <td>${cInfo.title}</td>
            <td>${cInfo.price}</td>
            <td> 
                <a class = "remove" href = "#" data-id = ${cInfo}">X</a>
            </td>
        </tr>
    
    `

    shoppinCardContent.appendChild(row)
}

//this function removes items from our shopping basket
function removeCourse(){

}

//this function saves the information to the local storage
function saveToStorage(cInfo){
    //gets previous data from our localStorage
    let courses = getFromStorage()

    //add the new course to the array that we get from
    courses.push(cInfo)

    localStorage.getItem("course",JSON.stringify(courses))
}  

//this function gets info from local storage

function getFromStorage(){
    let courses;
    //boolian to check if there exists any data before in LS
    if (localStorage.getItem("courses")) {
        //because data is saved as a string & we should return it as an array:
        courses = JSON.parse(localStorage.getItem("courses"))
    }else {
        courses = []
        
    }
    return courses
}