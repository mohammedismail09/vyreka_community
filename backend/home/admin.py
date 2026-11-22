from django import forms
from django.contrib import admin, messages
from django.shortcuts import redirect, render
from django.urls import path
from .models import Event, TeamMember, GalleryImage, ContactSubmission


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "venue", "is_live")
    list_filter = ("is_live", "date")
    list_editable = ("is_live",)
    search_fields = ("title", "venue")
    ordering = ("-date",)


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "tag", "created_at")
    search_fields = ("name", "role", "tag")
    ordering = ("id",)


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            return [single_file_clean(d, initial) for d in data]
        return [single_file_clean(data, initial)]


class BulkGalleryUploadForm(forms.Form):
    title_prefix = forms.CharField(
        max_length=150,
        required=False,
        initial="Vyreka Community Event",
        help_text="Base title applied to all uploaded photos (e.g. 'AI Frontier Meetup').",
    )
    event_date = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={"type": "date"}),
    )
    featured_on_home = forms.BooleanField(
        required=False,
        initial=False,
        help_text="Check to feature these photos on the Homepage.",
    )
    photos = MultipleFileField(label="Select Photos (Hold Ctrl/Shift to select multiple)")


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("title", "event_date", "featured_on_home", "created_at")
    list_filter = ("featured_on_home", "event_date")
    list_editable = ("featured_on_home",)
    search_fields = ("title",)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "bulk-upload/",
                self.admin_site.admin_view(self.bulk_upload_view),
                name="home_galleryimage_bulk_upload",
            ),
        ]
        return custom_urls + urls

    def bulk_upload_view(self, request):
        if request.method == "POST":
            form = BulkGalleryUploadForm(request.POST, request.FILES)
            if form.is_valid():
                files = request.FILES.getlist("photos")
                prefix = form.cleaned_data["title_prefix"].strip()
                event_date = form.cleaned_data["event_date"]
                featured = form.cleaned_data["featured_on_home"]

                for idx, f in enumerate(files, start=1):
                    label = f"{prefix} #{idx}" if prefix else f.name.rsplit(".", 1)[0]
                    GalleryImage.objects.create(
                        title=label,
                        image=f,
                        event_date=event_date,
                        featured_on_home=featured,
                    )

                self.message_user(
                    request,
                    f"Successfully uploaded {len(files)} photos to the Gallery!",
                    messages.SUCCESS,
                )
                return redirect("..")
        else:
            form = BulkGalleryUploadForm()

        context = {
            **self.admin_site.each_context(request),
            "title": "Bulk Upload Gallery Photos",
            "form": form,
        }
        return render(request, "admin/bulk_gallery_upload.html", context)

from .models import Event, TeamMember, GalleryImage, ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "mobile", "is_resolved", "created_at")
    list_filter = ("is_resolved", "created_at")
    list_editable = ("is_resolved",)
    search_fields = ("first_name", "last_name", "email", "mobile", "message")
    readonly_fields = ("first_name", "last_name", "email", "mobile", "message", "created_at")
    ordering = ("-created_at",)