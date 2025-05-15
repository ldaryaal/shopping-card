
//this JS code is a practise of what I learnt about shopping card using Vanilla JS
//it's not OOP programing & is based on what I learnt in this course.
//variables
const courses = document.querySelector("#courses-list"),
      shoppinCardContent = document.querySelector("#card-content tbody"),
      clearCardBtn = document.querySelector("#clear-card")


//eventListeners
eventListeners()
function eventListeners(){

    courses.addEventListener("click", buyCourse)

    //remove courses from card 
    shoppinCardContent.addEventListener("click", removeCourse)

    //remove all courses from card
    clearCardBtn.addEventListener("click", clearCard)

    //show  courses from storage when browser loaded
    document.addEventListener("DOMContentLoaded", showCoursesOnLoad)

    

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
        image : course.querySelector("img").src,
        title : course.querySelector("h4").textContent,
        price : course.querySelector("span").textContent,
        id : course.querySelectorAll("a")[1].getAttribute("data-id")
    }

    //adding the course to the card
    addToCard(courseInfo)

    saveToStorage(courseInfo)

}


//this function adds the selected courses to the shopping card
function addToCard(cInfo){
    //create <li> tag
    let row = document.createElement("tr")

    //build HTML template
    row.innerHTML = `
        
            <td>
                <img src = "${cInfo.image}" width = "100px">
            </td>
            <td>${cInfo.title}</td>
            <td>${cInfo.price}</td>
            <td> 
                <a class = "remove" href = "#" data-id = ${cInfo}">X</a>
            </td>
        
    
    `

    shoppinCardContent.appendChild(row)
}


//this function saves the information to the local storage
function saveToStorage(cInfo){
    //gets previous data from our localStorage
    let courses = getFromStorage()
    
    //add the new course to the array that we get from
    courses.push(cInfo)

    localStorage.setItem("courses",JSON.stringify(courses))
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

//this function removes items from our shopping basket
function removeCourse(e){
    let course , courseId;
    //this if will delete the course from DOM/not LS
    if (e.target.classList.contains("remove")){
        course = e.target.parentElement.parentElement
        courseId = e.target.getAttribute("data-id")
        course.remove()
    }

    //remove course from Local storage
    removeCourseLS(courseId)

}

//this function will remove the course from local storage/ after it deleted from DOM
function removeCourseLS(id){
    let courseLS = getFromStorage()
    courseLS.forEach(function(course, index) {
        if (course.id === id){
            courseLS.splice(index , 1)

        }  
    });
    localStorage.setItem("courses", JSON.stringify(courseLS))
}


//remove all courses from DOM
function clearCard(){
    while (shoppinCardContent.firstChild) {
        shoppinCardContent.firstChild.remove()
        
    }

    //now it's time to clear the local storage!
    clearCardLS()
}

// this function clears card from LS
function clearCardLS(){
    localStorage.clear()
    //it's a risky code but since we only want to store shopping card data in LS, it's fine!

}

// this function shows the courses in the shopping card from LS even after refreshing or closing & re-opening the page
function showCoursesOnLoad(){
    let coursesLS = getFromStorage();

    //add courses into the card 
    coursesLS.forEach(function(cInfo) {
        // creating <li> tag 
        let row = document.createElement("tr")

        //building HTML template
        row.innerHTML = `
            
                <td>
                    <img src = '${cInfo.image}' width ="100px">
                </td>
                <td> ${cInfo.title}</td>
                <td> ${cInfo.price}</td>
                <td>
                    <a class = "remove" href = "#" data-id = "${cInfo.id}">X</a>
                </td>
            
        
        `
        shoppinCardContent.appendChild(row)
        
    });
}

