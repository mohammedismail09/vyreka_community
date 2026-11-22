import json
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from .models import Event, TeamMember, GalleryImage, ContactSubmission


@require_GET
def events_api(request):
    events = Event.objects.all().order_by("date")

    data = [
        {
            "id": event.id,
            "title": event.title,
            "date": event.date.isoformat(),
            "description": event.description,
            "venue": event.venue or "TBA",
            "poster_url": event.resolved_poster_url,
            "registration_link": event.registration_link,
            "is_live": event.is_live,
        }
        for event in events
    ]

    return JsonResponse({"events": data}, status=200)


@require_GET
def gallery_api(request):
    images = GalleryImage.objects.all()
    data = [
        {
            "id": img.id,
            "title": img.title or f"Vyreka Moment #{img.id}",
            "image_url": img.resolved_url,
            "event_date": img.event_date.isoformat() if img.event_date else None,
            "featured_on_home": img.featured_on_home,
        }
        for img in images
        if img.resolved_url
    ]
    return JsonResponse({"images": data}, status=200)


@require_GET
def homepage_events_api(request):
    events = Event.objects.all().order_by("-date")[:6]

    data = [
        {
            "id": event.id,
            "title": event.title,
            "date": event.date.isoformat(),
            "description": event.description,
            "venue": event.venue or "TBA",
            "poster_url": event.resolved_poster_url,
            "registration_link": event.registration_link,
            "is_live": event.is_live,
        }
        for event in events
    ]

    return JsonResponse({"events": data}, status=200)


@require_GET
def team_list_api(request):
    members = TeamMember.objects.all().order_by("id")

    data = [
        {
            "id": member.id,
            "name": member.name,
            "role": member.role,
            "tag": member.tag or "",
            "bio": member.bio or "",
            "image_url": member.image_url or "",
            "linkedin_url": member.linkedin_url or "",
            "x_url": member.x_url or "",
        }
        for member in members
    ]

    return JsonResponse(data, safe=False)


@csrf_exempt
@never_cache
@require_POST
def contact_api(request):
    request.session.modified = False

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)

    first_name = (payload.get("first_name") or "").strip()
    last_name = (payload.get("last_name") or "").strip()
    email = (payload.get("email") or "").strip()
    mobile = (payload.get("mobile") or "").strip()
    message = (payload.get("message") or "").strip()

    if not first_name or not last_name or not email or not message:
        return JsonResponse(
            {"error": "First name, last name, email, and message are required."},
            status=400,
        )

    submission = ContactSubmission.objects.create(
        first_name=first_name,
        last_name=last_name,
        email=email,
        mobile=mobile or None,
        message=message,
    )

    # Optional SMTP email forwarding (only runs if SMTP backend & credentials exist)
    email_backend = getattr(settings, "EMAIL_BACKEND", "")
    if "smtp" in email_backend.lower() and getattr(settings, "EMAIL_HOST_USER", ""):
        try:
            send_mail(
                subject=f"[Vyreka] New Contact Submission from {first_name} {last_name}",
                message=(
                    f"Name: {first_name} {last_name}\n"
                    f"Email: {email}\n"
                    f"Mobile: {mobile or 'Not Provided'}\n\n"
                    f"Message:\n{message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=["mismailahmed46@gmail.com", "vyrekaedtech@gmail.com"],
                fail_silently=True,
            )
        except Exception:
            pass

    return JsonResponse(
        {
            "id": submission.id,
            "message": "Your message has been sent successfully! Our team will get back to you within 24 hours.",
        },
        status=201,
    )