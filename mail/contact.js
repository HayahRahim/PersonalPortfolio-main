$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbz1bbDZhCy8PA5xYX6KAnzfFod3Bxv-97u0u2ZIjTQHoummAakxOs2CbZPtBEa3d0TIow/exec",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                // cache: false,
                success: function (response) {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function (err) {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});


$("#submit-form").submit((e)=>{
    e.preventDefault()
    $.ajax({
        url:"https://script.google.com/macros/s/AKfycbykAHpTuf_JtDAvqZitQKZc5e_TquhKtBB3HkHi1OA4XvFxZji_BDmoFVSKDniBy1Pm/exec",
        data:$("#submit-form").serialize(),
        method:"post",
        success:function (response){
            alert("Form submitted successfully")
            window.location.reload()
            //window.location.href="https://google.com"
        },
        error:function (err){
            alert("Something Error")

        }
    })
})

function validateName(){

  var nameField = document.getElementById('contact-name').value;

  if(nameField.length == 0){

      nameError.innerHTML="Name is required";

      return false;

  }

  if(!nameField.match(/^[A-Za-z]*\s{1}[A-Za-z]+$/) ){
      nameError.innerHTML="Write fullname";

      return false;
  }else{
      nameError.innerHTML='<i class="fa-solid fa-check"></i>';
      return true;
  
  }
  

}
function validateEmail(){

  var emailField = document.getElementById('contact-email').value;
  
  if(emailField.length==0)
  {
      emailError.innerHTML="Email is required";
      return false;
  }

 if(!emailField.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
  emailError.innerHTML="invalid email";
  return false;
}else{
  emailError.innerHTML='<i class="fa-solid fa-check"></i>';
  return true;
}
}
function validateSubject(){

  var subjField = document.getElementById('contact-subject').value;

  var required =30;

  var left = required- subjField.length;

  if(left > 0){
      subjError.innerHTML = left + 'more characters required';
  return false;
  }else{
      subjError.innerHTML ='<i class="fa-solid fa-check"></i>';
      return true;
  }
  

}
function validateMessage(){

  var msgField = document.getElementById('contact-message').value;

  var required =50;

  var left = required- msgField.length;

  if(left > 0){
      msgError.innerHTML = left + 'more characters required';
  return false;
  }else{
      msgError.innerHTML ='<i class="fa-solid fa-check"></i>';
      return true;
  }
  

}
function validateForm()
{
if(!validateName() || !validatePhone() || !validateEmail()||!validateMessage()){

    submitError.innerHTML="Please fix these error to sumbit ";
    return false;    
}

}