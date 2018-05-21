var currentTab = 0; // Current tab is set to be the first tab (0)

showTab(currentTab); // Display the crurrent tab


function showModal() {
  document.getElementById('myModal2').style.display = "block";
}

function submitForm(){
      //Call the API

      // alert( "" );
      // event.preventDefault();
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("surveyProgressbarContainer").style.display = "none";

      document.getElementById("regForm").innerHTML = '<div class="col-lg-12"><div class="row"><label for="usrSecondName" style="font-weight: 400; color: #898992; font-size: 20px;text-align: justify;text-align-last: center;">Survey Form Submitted. Thank you!</label></div></div>';
}

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0 || n == 1) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("surveyProgressbar").style.width = "2%";
    document.getElementById("surveyProgressbar").innerHTML = "";
    if(n == 1){
      document.getElementById("nextBtn").style.display = "inline";
      
      //setupCompanyTurnoverSlider($(".ex6-0"));
      //setupCompanyEstablishmentSlider($(".ex6-00"));
      window.dispatchEvent(new Event('resize'));
    }
  } else {
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "inline";
    
    if(n == 2){
      //setupCompanyGrowthSlider($(".ex6-1"));
      window.dispatchEvent(new Event('resize'));
    }
    var z = (currentTab -1)*20;

    $('#surveyProgressbar').each(function(){
      $(this).width(z+"%");
      //$(this).html(z+"%");
    });

    // document.getElementById("surveyProgressbar").style.width = z+"%";
    // document.getElementById("surveyProgressbar").innerHTML = z+"% Complete";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }

  $('html, body').animate({scrollTop: '0px'}, 200, 'linear');
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:

  if (n == 1 && !validateForm()) return false;
  
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    submitForm();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    var type = $(y[i]).attr('type');

    if(type == "text"){
     //console.log("input text- " + y[i].value.length);

    }

    if(type == "radio"){
      var s = $("input[name=medium]:checked");
      if(s.length == 0) {

      }
      
      $("input[name=medium]:checked").val();
    }

    
  }

  return valid; // return the valid status
}
