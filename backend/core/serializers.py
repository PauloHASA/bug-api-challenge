from rest_framework import serializers
from .models import ErrorLog, Bug
from django.contrib.auth.models import User


class ErrorLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ErrorLog
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class BugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bug
        fields = "__all__"
