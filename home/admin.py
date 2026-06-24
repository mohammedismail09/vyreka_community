from django.contrib import admin
from .models import Event

# Register your models here.


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    # Change 'date_text' to 'date' here
    list_display = ('title', 'date', 'venue', 'is_live')
    list_filter = ('is_live',)
    search_fields = ('title', 'venue')