from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200, help_text="Enter the event title.")
    date = models.DateTimeField(help_text="Select the date and time of the event.")
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Optional breakdown text.",
    )
    venue = models.CharField(
        max_length=250,
        blank=True,
        null=True,
        help_text="Leave blank to automatically show 'TBA'.",
    )
    registration_link = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Paste the external URL (Luma, Unstop, Govao.ai, etc.)",
    )
    is_live = models.BooleanField(
        default=False,
        help_text="Check if this event is currently active/live.",
    )

    def __str__(self):
        return self.title

from django.db import models

class TeamMember(models.Model):
    name = models.CharField(max_length=100, help_text="Enter the team member's full name.")
    role = models.CharField(max_length=100, help_text="Enter the team member's role or position.")
    tag = models.CharField(max_length=200, blank=True, null=True, help_text="A short title or designation (e.g., 'Lead Developer').")
    bio = models.TextField(blank=True, null=True, help_text="A brief biography or description of the team member.")
    image_url = models.CharField(max_length=500, blank=True, null=True, help_text="e.g., /team/ismail.jpeg")
    linkedin_url = models.URLField(max_length=300, blank=True, null=True)
    x_url = models.URLField(max_length=300, blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.role}"