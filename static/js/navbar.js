function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

    

function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken",csrftoken);
    }

}
});


const tabs = document.querySelectorAll('.tab');
var base_body = document.getElementById('base-body')
// var type='medkit'
tabs.forEach(clickedTab =>{
	clickedTab.addEventListener('click', () =>{
		tabs.forEach(tab => {
			tab.classList.remove('active');
		});
		clickedTab.classList.add('active');
        // type = clickedTab.dataset.type;
     
	});
});
var typeik=''
function type(typesend){
	if (typesend=='user'){
        typeik=typesend
		$.get('accounts/login',function(data){
		
			base_body.innerHTML=data
		
		})

	}
	if (typesend=='medkit'){
        typeik=typesend
		$.get('add',function(data){
		
			base_body.innerHTML=data
		
		})
	}
	if (typesend=='list'){
		typeik=typesend
		$.get('/list/turn',function(data){
			base_body.innerHTML=data
		
		})
	}
    if (typesend=='book'){
		typeik=typesend
		$.get('/book/list',function(data){
			base_body.innerHTML=data
		
		})
	}
    if (typesend=='add_all_turn'){
		typeik=typesend
		$.get('/turn/doctor',function(data){
			base_body.innerHTML=data
		
		})
	}
	if (typesend=='setting'){
		typeik=typesend
		$.get('/turn/setting',function(data){
			base_body.innerHTML=data
		
		})
	}
    
	

}

// var timeinput = document.getElementById('timeinput')
function date_select(value){
	var timeoption = document.getElementById('timeoption')

    while(timeoption.hasChildNodes()){
        timeoption.removeChild(timeoption.firstChild);
        }
    $.post('/avilabletime',{
        id:value,
    },function(data){
        for(time in data['mylst']){
            timeoption.add( new Option(data['mylst'][time],data['ids'][time]))
        }
        
        
    })
   
}

function login(){
var username = document.getElementById('username').value
var password = document.getElementById('password').value

$.post('/accounts/login',{
	username:username,
	password:password,
},function(data){
	if(data['user']=='valid'){
		window.location=window.location
	}
	else{
		alert('نام کاربری یا رمز عبور اشتباه است')
	}
}

)}

type('medkit')