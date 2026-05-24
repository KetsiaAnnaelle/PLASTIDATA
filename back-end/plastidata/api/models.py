from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    company = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.username}'s Profile ({self.company})"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    need = models.CharField(max_length=100) # 'guide', 'demo', 'conference', 'other'
    selected_dashboards = models.JSONField(default=list, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.company}) - {self.need}"
