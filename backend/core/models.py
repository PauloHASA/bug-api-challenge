from django.db import models


class ErrorLog(models.Model):
    method = models.CharField(max_length=10)
    path = models.CharField(max_length=255)
    status_code = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.method} {self.path} {self.status_code} at {self.timestamp}"


class Bug(models.Model):
    SEVERITY_CHOICES = [
        ('LOW','Low'),
        ('MEDIUM','Medium'),
        ('HIGH','High'),
    ]
    
    title = models.CharField(max_length=120)
    description = models.TextField()
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']