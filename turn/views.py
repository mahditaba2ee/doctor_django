from ast import Delete
import imp
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from .models import TurnModel,TurnItemsModel
import nptime
import datetime
import time
import datetime as dt
from .forms import TurnForm
from django.contrib.auth import authenticate

# Create your views here.
class HomeView(View):
    def get(self,request):
        return render(request,'turn/home.html')



class TurnView(View):
    def get(self,request):
        return render(request,'turn/add_all_turn.html')
    def post(self,request):
        frm = TurnForm(request.POST)
        if frm.is_valid():
            cd =frm.cleaned_data
            print('9'*90)
            print(type(cd['date']))
            # return HttpResponse(type(cd['date']))
            if  TurnModel.objects.filter(date=cd['date']).exists():
                return HttpResponse('تاریخ قبلا ثبت شده است')
            turn = TurnModel.objects.create(date=cd['date'],from_time=cd['from_time'],to_time=cd['to_time'])
            from_time=turn.from_time
            x=0
            while True:
                a = nptime.nptime(from_time.hour,from_time.minute,from_time.second)
                TurnItemsModel.objects.create(Turn=turn,from_time=from_time,to_time=a+datetime.timedelta(minutes=10))
                from_time=a+datetime.timedelta(minutes=10)
                x=x+1
                if from_time>=turn.to_time:
                    break 
            return HttpResponse('تاریخ و نوبت ها ثبت ثبت شد')

        # turn = TurnModel.objects.get(date=datetime.date.today())
        # # return HttpResponse(turn)
      
        # return render(request,'turn/turn.html')

class TurnAddView(View):
    def get(self,request):
        turns=TurnModel.objects.all()
        return render(request,'turn/add_turn.html',{'turns':turns})
    def post(self,request):
        turnitem = TurnItemsModel.objects.get(id=request.POST['time'])
        turnitem.avilable=True
        turnitem.nationcode=request.POST['nationcode']
        turnitem.mobile=request.POST['mobile']
        turnitem.name=request.POST['name']

        turnitem.save()
        return HttpResponse('ثبت شد')

class AvilableTimeView(View):
    def post(self,request):

        turn = TurnModel.objects.get(id=request.POST['id'])
        TurnItems = TurnItemsModel.objects.filter(Turn=turn,avilable=False)
        mylst=[]
        ids=[]
        for t in TurnItems:
            mylst.append(t.from_time)
            ids.append(t.id)
        return JsonResponse({'mylst':mylst,'ids':ids})

class ListTurnView(View):
    def get(self,request):
        turns = TurnItemsModel.objects.filter(avilable=True)
        return render(request,'turn/list_turn.html',{'turns':turns})
    def post(self,request):
        pass

class BookListView(View):
    def get(self,request):
        return render(request,'turn/book.html')
        

class TrunSettingView(View):
    def get(self,request):
        turns =  TurnModel.objects.all()
        return render(request,'turn/turnsetting.html',{"turns":turns})

class TrunDeleteView(View):
    def post(self,request):
        id =request.POST['id']
        try:
            turn = TurnModel.objects.get(id=id)
            turn.delete()
            return JsonResponse({'delete':'ok'})

        except:
            return JsonResponse({'delete':id})

class TrunAddAllView(View):
    def post(self,request):
        cd = request.POST
        TurnModel.objects.create(date=cd['date'],from_time=cd['from_time'],to_time=cd['to_time'])
        return HttpResponse('yews')
        