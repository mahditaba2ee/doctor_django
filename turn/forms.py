from dataclasses import fields
from django import forms
from django.forms import DateInput, PasswordInput, TimeInput
from .models import TurnModel

class TurnForm(forms.ModelForm):
    class Meta:
        model=TurnModel
        fields=('date','from_time','to_time')
       
