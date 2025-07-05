const teacherList = [
  "Juliana Boiarski",
  "Niki Lattig",
  "Katie Owens",
  "Sally Ruffing",
  "Eric Bell",
  "John Riggs",
  "Jayne West-McLinn",
  "Sara Hofinger",
  "Rachel Palmer",
  "Kevin Wellington",
  "Adam Bidwell",
  "Lauren Braemer",
  "Kelsey Cowles",
  "Rae Cunningham",
  "Angelo Forte",
  "Hilary Fought",
  "Rachel Keller",
  "Nicole Markley",
  "Brian Rawlins",
  "Julie Rickert",
  "Kim Stamolis",
  "Melissa Watts",
  "Alyx Wulff",
  "Pam Worth",
  "Dana Brown",
  "Miriam Alonso-Bartels",
  "Wei Fischetti",
  "Eric Howard",
  "Meghan Lawrence",
  "Jennifer Meyers",
  "Jill Morris",
  "Jeffrey Tackett",
  "Katherine Adams",
  "Michael Armelie",
  "Patricia Bergstrom",
  "Shane Borden",
  "Emily Burke",
  "James Desenberg",
  "Brad Gmerek",
  "Melissa Gmerek",
  "Kyle Heinlen",
  "Kristen Horne",
  "Cheryl Hutton",
  "Cami Kowalski",
  "Michael Limbird",
  "Robby Mays",
  "Kevin Moody",
  "Emily Santille",
  "Erin Broadhurst",
  "Emily Johnson",
  "Alyssa Schott",
  "Andrew Rice",
  "Matt Smith",
  "Jeremy Witt",
  "David Fabb",
  "Ted Wierzbicki",
  "Heather Arnold",
  "Colleen Baker",
  "Jarrod Crocker",
  "Zarah Forquer",
  "Brian Gerber",
  "Courtney Goodwin",
  "Doug Grieble",
  "Jenny Kieffer",
  "Tom Nees",
  "Caryn Riggs",
  "Chris Simpkins",
  "Erin Tarloff",
  "Katherine Ulring",
  "Noor Alghussain",
  "Doug Allen",
  "Michael Bleh",
  "Lisa Cady",
  "Shannon Cochran",
  "Todd DelBoccio",
  "Scott Dempsey",
  "Katelin Rich",
  "Austin Rings",
  "Mark VanKirk",
  "Becky Waller",
  "Mehgan Wong",
  "Sasha Buckingham",
  "Denise Buergel",
  "Erik Burkhardt",
  "Kate Carney",
  "Adrianne Dee",
  "Jeffery Feathers",
  "Katie Gierach",
  "Tyler Ison",
  "Adam McCardle",
  "Kirk McLinn",
  "Kelly McPeak",
  "Marie O’Brien",
  "Kaitlyn O’Mara",
  "Sabra Qualls",
  "Candra Warburton",
  "Larry Willoughby",
  "Katherine Winkel",
  "Justin Riley"
];

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxcrXGV7oh9S5mXDTAOyuMdMF2NNJqV5MNAOUqna8tES1c-8BFFUiVAWlofY483T9KB/exec";
const form = document.forms["submit-to-google-sheet"];
const TEACHER_NAME_INPUT = document.getElementById("teacher-name-input");
const EMAIL_INPUT = document.getElementById("email-input");
const PR_INPUT = document.getElementById("prioritize-relationships-input");
const CC_INPUT = document.getElementById("clear-communication-input");
const DD_INPUT = document.getElementById("diverse-design-input");
const FC_INPUT = document.getElementById("facilitate-collaboration-input");
const MR_INPUT = document.getElementById("meaningful-reflection-input");
const TI_INPUT = document.getElementById("targeted-intervention-input");
const ADMIN_NAME_INPUT = document.getElementById("admin-name-input");
const COMMENT_INPUT = document.getElementById("comment-input");

function clearForm() {
  form.reset();
  retrieveAdminName();
}

function getDateString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  // if (dd < 10) dd = '0' + dd;
  // if (mm < 10) mm = '0' + mm;
  return mm + "/" + dd + "/" + yyyy;
}

function saveAdminName() {
  if (ADMIN_NAME_INPUT.value !== "") {
    localStorage.setItem("adminName", ADMIN_NAME_INPUT.value);
  }
}

function retrieveAdminName() {
  if (localStorage.getItem("adminName") !== null) {
    ADMIN_NAME_INPUT.value = localStorage.getItem("adminName");
  }
}

window.onload = retrieveAdminName();

function getEmailBody() {
  let result = TEACHER_NAME_INPUT.value + ",%0D%0A%0D%0A";
  result +=
    "You have the following feedback from " +
    ADMIN_NAME_INPUT.value +
    "'s classroom walkthrough on " +
    getDateString() +
    ".%0D%0A%0D%0A";
  if (PR_INPUT.value != "") {
    result += "Prioritize Relationships: " + PR_INPUT.value + "%0D%0A%0D%0A";
  }
  if (CC_INPUT.value != "") {
    result += "Clear Communication: " + CC_INPUT.value + "%0D%0A%0D%0A";
  }
  if (DD_INPUT.value != "") {
    result += "Diverse Design: " + DD_INPUT.value + "%0D%0A%0D%0A";
  }
  if (FC_INPUT.value != "") {
    result += "Facilitate Collaboration: " + FC_INPUT.value + "%0D%0A%0D%0A";
  }
  if (MR_INPUT.value != "") {
    result += "Meaningful Reflection: " + MR_INPUT.value + "%0D%0A%0D%0A";
  }
  if (TI_INPUT.value != "") {
    result += "Targeted Intervention: " + TI_INPUT.value + "%0D%0A%0D%0A";
  }
  if (COMMENT_INPUT.value != "") {
    result += "Additional Comments: " + COMMENT_INPUT.value + "%0D%0A%0D%0A";
  }
  return result;
}

form.addEventListener("submit", (e) => {
  $("#working-alert").show();
  document.getElementById("send-button").disabled = true;
  e.preventDefault();
  const myHeaders = {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST'};
  const myRequest = new Request(scriptURL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*"
    },
    mode: 'no-cors',
    cache: 'default',
    body: new FormData(form)
  });
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // $(".collapse").collapse("hide");
      $("#working-alert").hide();
      $("#success-alert")
        .show()
        .fadeTo(2000, 500)
        .slideUp(500, function () {
          $("#success-alert").slideUp(500);
        });
      document.getElementById("send-button").disabled = false;
      window.open(
        "mailto:" +
          EMAIL_INPUT.value +
          "?subject=Admin Walkthrough Feedback " +
          getDateString() +
          "&body=" +
          getEmailBody()
      );
      clearForm();
    })
    .catch((error) => {
      $("#warning-alert")
        .show()
        .fadeTo(2000, 500)
        .slideUp(500, function () {
          $("#warning-alert").slideUp(500);
        });
      document.getElementById("send-button").disabled = false;
    });
});
$(document).ready(function () {
  $("#working-alert").hide();
  $("#success-alert").hide();
  $("#warning-alert").hide();
});

// autocomplete email code
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (
        arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML =
          "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's name and email:*/
        b.innerHTML +=
          "<input type='hidden' name='" +
          arr[i] +
          "' value='" +
          arr[i].replace(" ","_") + "@hboe.org" +
          "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].name;
          document.getElementById("email-input").value =
            this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      } else if (
        /*check if the LAST NAME starts with the same letters as the text field value:*/
        arr[i]
          .substr(arr[i].indexOf(" ") + 1, val.length)
          .toUpperCase() == val.toUpperCase()
      ) {
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = arr[i].substr(0, arr[i].indexOf(" ") + 1);
        b.innerHTML +=
          "<strong>" +
          arr[i].substr(arr[i].indexOf(" ") + 1, val.length) +
          "</strong>";
        b.innerHTML += arr[i].substr(
          arr[i].indexOf(" ") + 1 + val.length
        );
        /*insert a input field that will hold the current array item's name and email:*/
        b.innerHTML +=
          "<input type='hidden' name='" +
          arr[i] +
          "' value='" +
          arr[i].replace(" ","_") + "@hboe.org" +
          "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].name;
          document.getElementById("email-input").value =
            this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
autocomplete(document.getElementById("teacher-name-input"), teacherList);
