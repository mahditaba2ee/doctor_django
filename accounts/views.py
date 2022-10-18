from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login
# Create your views here.
class LoginView(View):
    def get(self,request):
        return render(request,'accounts/login.html')

    def post(self,request):
        username,password = request.POST['username'],request.POST['password']
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({'user':'valid'})
        return JsonResponse({'user':'invalid'})
        