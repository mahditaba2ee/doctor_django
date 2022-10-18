function delete_turn(btn){
    if(confirm('تاریخ حذف شود؟ اخطار!! در صورت حذف تاریخ تمامی نوبت های گرفته شده در تاریخ ح‌ف شده از بین می رود')){
    $.post('turn/delete',{
        id:btn.dataset.id
    },function(data){
        if(data['delete']=='ok'){
        document.getElementById(btn.dataset.id).style.display='none'

        }  
        
     })
    }
}


function setting_turn(btn){    
$.get('/turn/doctor',function(data){
    
    var base_body = document.getElementById('frm')

        base_body.innerHTML=data
        var datefrm = document.getElementById('date')
        var t = new Date(btn.dataset.dateturn)
        t.toDateString()
        alert(typeof(t))
    })
}