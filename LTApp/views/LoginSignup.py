from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from LTApp.models import *
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class LogIn(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'username': user.username,
            'locationintial':UserData.objects.get(user=user).location,
            'token': token.key,
        })





class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],validated_data['password'])
        return user


    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')




class SignUp(APIView):

    authentication_classes = ()
    permission_classes = ()
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                contactinfo = request.data["contactinfo"]
                location = request.data["location"].upper()
                user = serializer.save()
                if user:
                    userdata = UserData.objects.create(user=user, location=location,contactInfo=contactinfo)
                    userdata.save()
                    context={
                        "created":True,
                    }
                    return Response(context, status=200)
            except Exception as e:
                return Response(str(e), status=300)
        else:
            context = {
                "created": False,
                "error":serializer.errors,
            }
            return Response(context, status=300)






