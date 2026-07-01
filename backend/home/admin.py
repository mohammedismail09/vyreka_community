from django.contrib import admin
from .models import Event, TeamMember


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "venue", "is_live")
    list_filter = ("is_live",)
    search_fields = ("title", "venue")

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    # This controls what columns are visible in the main list view
    list_display = ('name', 'role', 'created_at')
    # Adds a search bar specifically for finding team members quickly
    search_fields = ('name', 'role')