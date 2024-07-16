from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from react_allauth.crud.models import Something
from react_allauth.crud.serializers import SomethingSerializer


class CrudViewSet(ModelViewSet):
    queryset = Something.objects.all()
    serializer_class = SomethingSerializer
    permission_classes = [IsAuthenticated]
