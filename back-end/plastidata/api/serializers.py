from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'company', 'need', 'selected_dashboards', 'message', 'created_at']

class UserRegisterSerializer(serializers.ModelSerializer):
    company = serializers.CharField(max_length=255, write_only=True)
    name = serializers.CharField(max_length=255, write_only=True)


    class Meta:
        model = User
        fields = ['name', 'company', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cette adresse email est déjà utilisée.")
        return value

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        company = validated_data.pop('company')
        name = validated_data.pop('name')

        # Create user (username is email for login, first_name stores the full name)
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name
        )

        # Create user profile mapping the company name
        UserProfile.objects.create(user=user, company=company)
        return user

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Inject custom user details inside response JSON
        user = self.user
        data['user'] = {
            'name': user.first_name,
            'company': user.profile.company if hasattr(user, 'profile') else '',
            'email': user.email
        }
        return data

