from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'), 
    path('about-us', views.about, name='about-us'), 
    path('contact-us', views.contact, name='contact'), 
    path('events', views.events, name='events'), 
    path('partnership', views.partnership, name='partnership'), 
    path('team', views.team, name='team'), 
]