from rest_framework.serializers import ModelSerializer

from react_allauth.crud.models import Something


class SomethingSerializer(ModelSerializer):
    class Meta:
        model = Something
        fields = ["id"]
