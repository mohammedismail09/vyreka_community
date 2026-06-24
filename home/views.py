
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .models import Event

def homepage(request):
    return render(request, 'home/index.html')

def about(request):
    return render(request, "home/about.html")

def contact(request):
    return render(request, "home/contact.html")

def partnership(request):
    return render(request, "home/partnership.html")

def team(request):
    return render(request, "home/team.html")

# MAKE SURE THIS IS EXACTLY 'events' (not events_page)
def events(request):
    db_events = Event.objects.all()
    return render(request, 'home/events.html', {'events': db_events})

def contact(request):
    if request.method == 'POST':
        # Safely extract POST data using the HTML element names
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        user_email = request.POST.get('email')
        mobile = request.POST.get('mobile', 'Not Provided')
        message_body = request.POST.get('message')
        
        full_name = f"{first_name} {last_name}"

        # 1. Dispatch Response/Thank You email to the User
        send_mail(
            subject="Thank you for reaching out to Vyreka!",
            message=f"Hi {full_name},\n\nThank you for getting in touch with us! We have received your message and our team will get back to you shortly.\n\nBest regards,\nTeam Vyreka",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )

        # 2. Dispatch submission record logs to the Admin core team
        admin_email = 'mismailahmed46@gmail.com'
        send_mail(
            subject=f"[Vyreka] New Contact Submission from {full_name}",
            message=f"You received a new message through the contact page form.\n\n"
                    f"Name: {full_name}\n"
                    f"Email: {user_email}\n"
                    f"Mobile: {mobile}\n\n"
                    f"Message:\n{message_body}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[admin_email],
            fail_silently=False,
        )

        # Pass a confirmation feedback message to display inside your view template
        messages.success(request, "Your message has been sent successfully!")
        return redirect('contact')

    return render(request, 'home/contact.html')