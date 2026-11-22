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


class TeamMember(models.Model):
    name = models.CharField(max_length=100, help_text="Enter the team member's full name.")
    role = models.CharField(max_length=100, help_text="Enter the team member's role or position.")
    tag = models.CharField(max_length=200, blank=True, null=True, help_text="A short title or designation (e.g., 'Lead Developer').")
    bio = models.TextField(blank=True, null=True, help_text="A brief biography or description of the team member.")
    image_url = models.CharField(max_length=500, blank=True, null=True, help_text="e.g., /team/ismail.jpeg or external image URL")
    linkedin_url = models.URLField(max_length=300, blank=True, null=True)
    x_url = models.URLField(max_length=300, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.role}"

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
    poster = models.ImageField(
        upload_to="vyreka/events/",
        blank=True,
        null=True,
        help_text="Upload event poster image.",
    )
    poster_url = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Optional external poster URL fallback.",
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

    @property
    def resolved_poster_url(self):
        if self.poster:
            return self.poster.url
        return self.poster_url or ""

    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    title = models.CharField(
        max_length=200,
        blank=True,
        help_text="Caption or event name (auto-fills from filename if left blank).",
    )
    image = models.ImageField(
        upload_to="vyreka/gallery/",
        blank=True,
        null=True,
        help_text="Upload photo directly from your device.",
    )
    image_url = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Optional external URL fallback.",
    )
    event_date = models.DateField(blank=True, null=True, help_text="Optional date of the event.")
    featured_on_home = models.BooleanField(
        default=False,
        help_text="Show in 'The Vyreka Journey' section on the homepage.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-event_date", "-created_at"]

    @property
    def resolved_url(self):
        if self.image:
            return self.image.url
        return self.image_url or ""

    def __str__(self):
        return self.title or f"Photo #{self.id}"

class ContactSubmission(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=30, blank=True, null=True)
    message = models.TextField()
    is_resolved = models.BooleanField(
        default=False,
        help_text="Mark as resolved once replied to.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"