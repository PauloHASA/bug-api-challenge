
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ErrorLogViewSet, UserViewSet, CheckViewSet, BugListCreateView

app_name = "core"

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"error-logs", ErrorLogViewSet)
router.register(r"check", CheckViewSet, basename="check")

urlpatterns = [
    path("", include(router.urls)),
    path("bugs/", BugListCreateView.as_view(), name='bug-list-create'),
]
