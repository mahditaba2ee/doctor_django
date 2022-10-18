from email.policy import default
from pyexpat import model
from django.db import models

# Create your models here.

class TurnModel(models.Model):
    date = models.DateField()
    from_time=models.TimeField()
    to_time = models.TimeField()
    class Meta:
        ordering=('-date',)


class TurnItemsModel(models.Model):
    name = models.CharField(max_length=50,null=True)
    nationcode = models.CharField(max_length=50,null=True)
    mobile = models.CharField(max_length=11,null=True)
    Turn=models.ForeignKey(TurnModel,models.CASCADE,related_name='Turn')
    from_time=models.TimeField(null=True)
    to_time = models.TimeField(null=True)
    avilable=models.BooleanField(default=False)
