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



var validname=false
validphone=false
validcode=false

function namechange(value){
    var helpname=document.getElementById('helpname')
    if(value.length<3){
        helpname.style.color='#dc2f55'
        alert('نام صحیح نمیباشد');
        return
    }

        let char = new RegExp("[\u0600-\u06FF]");

        if (char.test(value) === true) {
            helpname.style.color='#808097'

        validname=true
        }

        else {
            validname=false

            helpname.style.color='#dc2f55'
            alert('لطفا نام خود را به صورت فارسی وارد نمایید')

        }


}

function phonechange(value){
    var helplable = document.getElementById('helplable')

    if(value.length==11){
        $.post('/phone/change/value',{
            phone:value,
        },function(data){
            if(data['phone']=='invalid'){
                helplable.style.color='#dc2f55'
                validphone=false

                alert('شماره تماس وارد شده قیلا ثبت نام نموده است')
            }
            else{
                helplable.style.color='#808097'
                validphone=true
            }
        })
    }
    else{
        validphone=false

        helplable.style.color='#dc2f55'
        alert('شماره تماس را به صورت 11 رقمی وارد نمایید :09121234567')
    }
}


function nationalcodechange(value){
    var helfnationalcode = document.getElementById('helfnationalcode')

    var mylist=new Array()
    var x=10
    if(value.length==10){
        if(value=='0000000000' || value=='1111111111'|| value=='2222222222'|| value=='3333333333'
        || value=='4444444444'|| value=='9999999999'|| value=='6666666666'|| value=='7777777777'
        || value=='8888888888'|| value=='8888888888'){
            alert('کدملی نامعتبر است')
            validcode=false

        helfnationalcode.style.color='#dc2f55'
        }
    for (v in value){
        var y = value[v]*x
        x=x-1
        mylist[v]=y
    }
    var code=0
    for (char in mylist.slice(0,9)){
        code = code + mylist[char]
        code = code % 11
       
        
    }
    if(value[9]==(11-code)){
        $.post('natinalcode/change/value',{
            nationalcode:value,
        },function(data){
            if(data['nationalcode']=='valid'){
                validcode=true
                helfnationalcode.style.color='#808097'

            }
            else{
                validcode=false
                alert('کد ملی وارد شده یا نامعتبر می باشد یا قبلا با کد ملی شما نوبت گرفته شده است')
                helfnationalcode.style.color='#dc2f55'

            }
        })
    }
    else{

        alert('کدملی نامعتبر است')
        validcode=false

        helfnationalcode.style.color='#dc2f55'

    }
    }
    else{
        validcode=false

        alert('کد ملی 10رقمی را وارد نمایید')
    }
}







function sumbit(){
    var  help= document.getElementById('help')

    if(validname && validphone && validcode){
        var date=document.getElementById('date').value
        var time=document.getElementById('timeoption').value
        var fullname=document.getElementById('fullname').value
        var phone=document.getElementById('phone').value
        var nationalcode =document.getElementById('nationalcode').value
        $.post('/add',{
            time:time,
            nationcode:nationalcode,
            mobile:phone,
            name:fullname,
        },function(data){
            help.style.display='block'
            help.innerHTML='نویت شما در سامانه ثبت شد لطفا ۱۰ دقیقه قبل از وقت در مطب حاضر شوید'


        })
    }
    else{

        help.style.display='block'
    }


    }
    