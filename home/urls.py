from django.urls import path
from . import views

urlpatterns = [
    path("api/events/", views.events_api, name="events_api"),
    path("api/events/homepage/", views.homepage_events_api, name="homepage_events_api"),
    path("api/contact/", views.contact_api, name="contact_api"),
]