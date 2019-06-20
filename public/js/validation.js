//Only charaters from a to z
function lettersOnly(username) {
  var regex = /[^a-z]/gi;
  username.value = username.value.replace(regex, "");
}

function validate(form) {
  // grab the input date
  var selectedDate = document.getElementById("form").date.value;

  console.log(selectedDate);

  // create an date object
  var today = new Date();

  //split date to individual part
  var newDate = selectedDate.split("-");

  //
  var testDate = newDate.reverse();
  // reverse the date
  var str = testDate[1] + "-" + testDate[0] + "-" + testDate[2];
  console.log(str);

  var myDate = new Date(str);
  console.log(myDate);

  //compare todays date to user's date
  if (myDate < today) {
    event.preventDefault();

    alert("Date must be in the future");
  }
}
