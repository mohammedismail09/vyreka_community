import json

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods

from .models import Event


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
            "registration_link": event.registration_link,
            "is_live": event.is_live,
        }
        for event in events
    ]

    return JsonResponse({"events": data}, status=200)


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
            "registration_link": event.registration_link,
            "is_live": event.is_live,
        }
        for event in events
    ]

    return JsonResponse({"events": data}, status=200)


@csrf_exempt
@require_http_methods(["POST"])
def contact_api(request):
    try:
        data = json.loads(request.body)

        first_name = data.get("first_name", "").strip()
        last_name = data.get("last_name", "").strip()
        user_email = data.get("email", "").strip()
        mobile = data.get("mobile", "").strip() or "Not Provided"
        message_body = data.get("message", "").strip()

        if not first_name or not last_name or not user_email or not message_body:
            return JsonResponse(
                {"error": "All required fields must be filled."},
                status=400,
            )

        full_name = f"{first_name} {last_name}"

        send_mail(
            subject="Thank you for reaching out to Vyreka!",
            message=(
                f"Hi {full_name},\n\n"
                "Thank you for getting in touch with us! "
                "We have received your message and our team will get back to you shortly.\n\n"
                "Best regards,\n"
                "Team Vyreka"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )

        admin_email = "mismailahmed46@gmail.com"
        send_mail(
            subject=f"[Vyreka] New Contact Submission from {full_name}",
            message=(
                "You received a new message through the contact page form.\n\n"
                f"Name: {full_name}\n"
                f"Email: {user_email}\n"
                f"Mobile: {mobile}\n\n"
                f"Message:\n{message_body}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[admin_email],
            fail_silently=False,
        )

        return JsonResponse(
            {"message": "Your message has been sent successfully!"},
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)