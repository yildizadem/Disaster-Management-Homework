from django.shortcuts import render, redirect
import json


# Create your views here.
def home(request):
    return render(request, "index.html")


def map(request):
    if request.method == "POST":
        return render(request, "map.html", {"konteynerId": request.POST["konteynerId"], "title": "Harita Görünümü"})
    return render(request, "map.html", {"title": "Harita Görünümü"})


def list(request):
    title = "Liste Görünümü"
    return render(request, "list.html", locals())
