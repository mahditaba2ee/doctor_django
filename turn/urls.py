
from django.urls import path
from .views import *
from .utils import phonechange,NatinalCodeChange
app_name='turn'
urlpatterns=[
    path('',HomeView.as_view(),name='home'),
    path('turn/doctor',TurnView.as_view(),name='turn'),
    path('add',TurnAddView.as_view(),name='addturn'),
    path('list/turn',ListTurnView.as_view(),name='listturn'),
    path('book/list',BookListView.as_view(),name='booklist'),
    path('turn/setting',TrunSettingView.as_view(),name='turnsetting'),
    path('turn/delete',TrunDeleteView.as_view(),name='turnsetting'),
    path('turn/add/all/',TrunAddAllView.as_view(),name='turnsetting'),


    path('avilabletime',AvilableTimeView.as_view(),name='avilabletime'),
    path('phone/change/value',phonechange,name='phonechange'),
    path('natinalcode/change/value',NatinalCodeChange,name='phonechange'),


]
