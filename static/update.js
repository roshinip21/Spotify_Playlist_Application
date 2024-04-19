function check() {
  const email = document.querySelector('input[name=email]');
  const confirm = document.querySelector('input[name=email2]');
  if (confirm.value === email.value) {
   document.getElementById("message3").innerHTML = "";
   return true;
 } else {
   document.getElementById("message3").innerHTML = "Emails must match!";
   return false;
 }
}
/* function verifyPassword() {
  var pw = document.getElementById("pswd").value;
  //check empty password field
  if(pw == "") {
     document.getElementById("message").innerHTML = "**Fill the password please!";
     return false;
  }

 //minimum password length validation
 if(pw.length < 8) {
     document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";
     return false;
  }
//maximum length of password validation
  if(pw.length > 15) {
     document.getElementById("message").innerHTML = "**Password length must not exceed 15 characters";
     return false;
  }
} */
function check2()
{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear(); //2021
  today = yyyy + '-' + mm + '-' + dd;
  var formdob = document.getElementById("dob").value; //dd-mm-yyyy
  if(formdob >= today)
  {
     document.getElementById("message2").innerHTML = "Invalid date of birth";
     return false;
  }
  else
  {
     document.getElementById("message2").innerHTML = "";
     return true;
  }
}
function ageCalculator() {
    var userinput = document.getElementById("dob").value;
    var dob = new Date(userinput);

    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);

    if(age<13)
    {
      document.getElementById("message2").innerHTML = "You must be older than 13 years";
      return false;
    }
    else {
      document.getElementById("message2").innerHTML = "";
      return true;
    }
}
function validateForm(form)
{
  var check_email = check();
  var check_dob = check2();
  var check_age = ageCalculator();
  if (check_email == true && check_dob == true && check_age == true)
    return true;
  else
    return false;
}

var file = document.getElementById('upload');
file.onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'jpg':
    case 'bmp':
    case 'png':
    case 'tif':
      alert('Allowed');
      break;
    default:
      alert('Not allowed');
      this.value = '';
  }
};

function validateUpdateForm(form)
{
  var check_dob = check2();
  var check_age = ageCalculator();
  if (check_dob == true && check_age == true)
    return true;
  else
    return false;
}
