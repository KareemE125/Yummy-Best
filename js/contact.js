const inputs = $('#contact input');

const passwordInput = $('#contact input').eq(4);
const repasswordInput = $('#contact input').eq(5);
const submitBtn = $('#contact button');


const nameRegex = /^.{3,}$/;
const emailRegex = /^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
const phoneRegex = /^(\+2)*01(1|0|2|5){1}[0-9]{8}$/;
const ageRegex = /^[1-9]{1}[0-9]{0,1}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;

const regexMap = {
    'name' : nameRegex,
    'email' : emailRegex,
    'phone' : phoneRegex,
    'age' : ageRegex,
    'password' : passwordRegex,
}

function validHandler(elem)
{
    elem.removeClass('non-valid');
    elem.addClass('valid');
    elem.next().slideUp()
    elem.parent().children('i').eq(1).fadeOut()
    elem.parent().children('i').eq(0).fadeIn()
}

function nonValidHandler(elem)
{
    elem.removeClass('valid');
    elem.addClass('non-valid');
    elem.next().slideDown()
    elem.parent().children('i').eq(0).fadeOut()
    elem.parent().children('i').eq(1).fadeIn()
}


inputs.on('input',(elem)=>
{
    const input = $(elem.target);

    if( input.attr('name') === 'repassword' || input.attr('name') === 'password' )
    {
        if( passwordInput.val() === repasswordInput.val() ){ console.log('in 1');  validHandler(repasswordInput);  }
        else{ console.log('in 2');  nonValidHandler(repasswordInput);  }
        if( input.attr('name') === 'repassword'){ return; }
    }

    if(regexMap[input.attr('name')].test(elem.target.value) ){   validHandler(input);  }
    else{   nonValidHandler(input);  }

});

submitBtn.on('click',function(){

    const checks = $('.fa-check');

    for (let i = 0; i < checks.length; i++) 
    {
        if( checks.eq(i).css('display') === 'none' ){ return; }
    }

    $('#contact form').html('<div class="text-center pt-5 justify-content-center d-flex"><div class="loader mt-5"></div></div>');
    setTimeout(() => {
        $('#contact form').html('<div class="text-center pt-5 "><h2 class="fs-1 text-success mt-5">Submit Successfully</h2></div>');
    }, 1000);

});

////////////////////// SEARCH FUNCTIONALITIES ///////////////////////////////

$('nav ul li').eq(0).on('click',()=>{
    localStorage.setItem('searchStatus','on');
    window.location = "../Yummy-Best/index.html";
});

////////////////////// ************************* ///////////////////////////////
