from django.urls import path, include
from rest_framework.routers import DefaultRouter

from react_allauth.crud import views

router = DefaultRouter()
router.register(r"crud", views.CrudViewSet, basename="crud")

urlpatterns = [path("", include(router.urls))]
