from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/events/", views.events_api, name="events_api"),
    path("api/events/homepage/", views.homepage_events_api, name="homepage_events_api"),
    path('api/team/', views.team_list_api, name='team_list_api'),
    path("api/contact/", views.contact_api, name="contact_api"),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
