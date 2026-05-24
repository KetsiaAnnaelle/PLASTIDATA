from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from email.mime.image import MIMEImage
import os

from .models import ContactMessage
from .serializers import (
    ContactMessageSerializer, 
    UserRegisterSerializer,
    MyTokenObtainPairSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.authentication import JWTAuthentication

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = []

    def post(self, request, *args, **kwargs):
        need = request.data.get('need')
        if need == 'demo' and not request.user.is_authenticated:
            return Response(
                {"detail": "Vous devez être connecté pour demander une démonstration."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return super().post(request, *args, **kwargs)


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    authentication_classes = []
    permission_classes = []

    def perform_create(self, serializer):
        user = serializer.save()
        self.send_ebook_email(user)

    def send_ebook_email(self, user):
        subject = "Votre Ebook PlastiData Gratuit !"
        company_name = user.profile.company if hasattr(user, 'profile') else 'votre usine'
        
        # Plaintext fallback body
        text_content = (
            f"Bonjour {user.first_name},\n\n"
            f"Félicitations pour votre inscription sur PlastiData !\n"
            f"Nous sommes ravis de vous accompagner dans le pilotage et l'amélioration de la performance de votre usine ({company_name}).\n\n"
            f"Veuillez trouver ci-joint votre Ebook exclusif PlastiData pour démarrer votre transition qualité.\n\n"
            f"Cordialement,\n"
            f"L'équipe PlastiData\n"
            f"https://www.plastidata.fr"
        )

        # High-quality HTML template styled with site colors (corporate blue #044776 and bright red #dc2626 accents)
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              color: #1e293b;
              background-color: #f8fafc;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }}
            .email-container {{
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
            }}
            .header-bar {{
              background-color: #ffffff;
              padding: 24px;
              text-align: center;
              border-bottom: 4px solid #dc2626; /* Site brand red accent line */
            }}
            .logo-img {{
              height: 48px;
              display: inline-block;
            }}
            .email-body {{
              padding: 40px 32px;
            }}
            .welcome-title {{
              font-size: 22px;
              font-weight: 800;
              color: #044776; /* Brand Primary Corporate Blue */
              margin-top: 0;
              margin-bottom: 20px;
            }}
            p {{
              font-size: 15px;
              line-height: 1.6;
              color: #475569;
              margin-top: 0;
              margin-bottom: 16px;
            }}
            .highlight-box {{
              background-color: #f1f5f9;
              border-left: 4px solid #044776;
              padding: 18px;
              border-radius: 8px;
              margin: 24px 0;
            }}
            .highlight-title {{
              font-size: 14px;
              font-weight: 700;
              color: #044776;
              margin-bottom: 6px;
            }}
            .highlight-item {{
              font-size: 14px;
              color: #475569;
              margin: 4px 0;
            }}
            .btn-cta {{
              display: inline-block;
              background-color: #dc2626; /* Brand Danger Red Button */
              color: #ffffff !important;
              padding: 12px 28px;
              border-radius: 999px;
              font-weight: 700;
              text-decoration: none;
              font-size: 15px;
              margin-top: 10px;
              box-shadow: 0 4px 10px rgba(220, 38, 38, 0.15);
            }}
            .email-footer {{
              background-color: #f8fafc;
              padding: 24px;
              text-align: center;
              font-size: 12px;
              color: #64748b;
              border-top: 1px solid #e2e8f0;
            }}
            .footer-links {{
              margin-top: 8px;
            }}
            .footer-link {{
              color: #dc2626;
              text-decoration: none;
              font-weight: 600;
            }}
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header-bar">
              <img src="cid:logo" alt="PlastiData Logo" class="logo-img" />
            </div>
            <div class="email-body">
              <h2 class="welcome-title">Bonjour {user.first_name},</h2>
              <p>Félicitations pour votre inscription sur <strong>PlastiData</strong> !</p>
              <p>Nous sommes extrêmement ravis de vous accompagner dans la digitalisation, le pilotage et l'amélioration continue de la performance de votre usine.</p>
              
              <div class="highlight-box">
                <div class="highlight-title">Détails de votre compte :</div>
                <div class="highlight-item"><strong>Entreprise</strong> : {company_name}</div>
                <div class="highlight-item"><strong>Email / Identifiant</strong> : {user.email}</div>
              </div>
              
              <p>Veuillez trouver ci-joint votre <strong>Ebook exclusif PlastiData</strong> au format PDF. Ce guide vous offre toutes les clés pour démarrer sereinement votre transition qualité en usine.</p>
              
              <div style="text-align: center; margin-top: 28px;">
                <a href="https://www.plastidata.fr" class="btn-cta">Accéder à la plateforme</a>
              </div>
            </div>
            <div class="email-footer">
              <div>Ce message a été envoyé automatiquement par la plateforme PlastiData.</div>
              <div class="footer-links">
                <a href="https://www.plastidata.fr" class="footer-link">www.plastidata.fr</a>
              </div>
            </div>
          </div>
        </body>
        </html>
        """

        email = EmailMultiAlternatives(
            subject,
            text_content,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )
        email.attach_alternative(html_content, "text/html")

        # 1. Attach inline brand logo via Content-ID (CID)
        logo_path = os.path.join(settings.BASE_DIR, '..', '..', 'front-end', 'public', 'img', 'logo-plastidata.png')
        if os.path.exists(logo_path):
            try:
                with open(logo_path, 'rb') as f:
                    logo_img = MIMEImage(f.read())
                    logo_img.add_header('Content-ID', '<logo>')
                    logo_img.add_header('Content-Disposition', 'inline', filename='logo-plastidata.png')
                    email.attach(logo_img)
            except Exception as e:
                print(f"Error attaching logo: {e}")

        # 2. Attach Ebook PDF if it exists on server
        ebook_path = os.path.join(settings.BASE_DIR, 'ebook-plastidata.pdf')
        if os.path.exists(ebook_path):
            email.attach_file(ebook_path)
        else:
            # Fallback inline explanation if file missing
            email.body += "\n\n(Note: Le fichier PDF de l'Ebook n'était pas disponible sur le serveur.)"

        try:
            email.send()
        except Exception as e:
            # Silent fallback to prevent signup errors if connection fails
            print(f"Error sending email: {e}")


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


from rest_framework.permissions import IsAuthenticated

class UserDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(
            {"detail": "Votre compte a été supprimé avec succès."},
            status=status.HTTP_200_OK
        )

