from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    ContactMessageCreateView,
    UserRegisterView,
    MyTokenObtainPairView,
    UserDeleteView
)

urlpatterns = [
    path('contact/', ContactMessageCreateView.as_view(), name='contact_message_create'),
    path('register/', UserRegisterView.as_view(), name='user_register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/delete/', UserDeleteView.as_view(), name='user_delete'),
]
