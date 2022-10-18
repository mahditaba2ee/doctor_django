from re import X
from django.http import HttpResponse, JsonResponse
from .models import TurnItemsModel

def phonechange(requset):
    turn = TurnItemsModel.objects.filter(mobile=requset.POST['phone']).exists()
    if turn:
        return JsonResponse({'phone':"invalid"})
    return JsonResponse({'phone':"valid"})
    
def NatinalCodeChange(request):
    if checknatinalcode(request.POST['nationalcode'] =='valid'):
        turn = TurnItemsModel.objects.filter(nationcode=request.POST['nationalcode']).exists()
        if turn:
            return JsonResponse({'nationalcode':'invalid'})
        return JsonResponse({'nationalcode':'valid'})
    return JsonResponse({'nationalcode':'invalid'})



def checknatinalcode(nationalcode):
    try:
        if nationalcode=='0000000000' or  nationalcode=='1111111111' or  nationalcode=='2222222222' or  nationalcode=='3333333333' or  nationalcode=='4444444444' or  nationalcode=='5555555555' or  nationalcode=='6666666666' or  nationalcode=='7777777777' or  nationalcode=='8888888888'or  nationalcode=='9999999999':
            return 'invalid'

        x=10
        codesum=0
        for code in nationalcode[0:9]:
            codesum += int(code)*x
            print(codesum)
            x=x-1
        codesum = 11- (codesum % 11)
        print(codesum)
        print(nationalcode[9])
        if codesum==int(nationalcode[9]):
            return 'valid'
        return 'invalid'
    except:
        return 'invalid'