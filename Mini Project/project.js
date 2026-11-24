
// Get HTML Elements

const form = document.getElementById("student-form");

const cardBox = document.getElementById("card-box");

const resetBtn = document.getElementById("reset-btn");


// Generate ID Card

form.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();

    // Get values from input fields

    const name = document.getElementById("name").value.trim();

    const roll = document.getElementById("roll").value.trim();

    const course = document.getElementById("course").value.trim();

    const year = document.getElementById("year").value;

    const email = document.getElementById("email").value.trim();


    // Display details on ID Card

    document.getElementById("display-name").innerText = name;

    document.getElementById("display-roll").innerText = roll;

    document.getElementById("display-course").innerText = course;

    document.getElementById("display-year").innerText = year;

    document.getElementById("display-email").innerText = email;


    // Generate Automatic Initials

    const initials = name.substring(0, 2).toUpperCase();

    document.getElementById("avatar").innerText = initials;


    // Show ID Card

    cardBox.style.display = "block";

});


// Reset Form

resetBtn.addEventListener("click", function() {

    form.reset();

    cardBox.style.display = "none";

});
