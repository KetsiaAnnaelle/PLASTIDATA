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


import urllib.request
import urllib.error
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PlastiPilotChatView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message', '').strip()
        history = request.data.get('history', [])

        if not user_message:
            return Response({"error": "Message cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Look for Anthropic API Key in environment
        api_key = os.environ.get('ANTHROPIC_API_KEY') or getattr(settings, 'ANTHROPIC_API_KEY', None)

        if api_key:
            try:
                # Format history for Anthropic API
                messages = []
                for h in history:
                    messages.append({
                        "role": "user" if h.get('role') == 'user' else "assistant",
                        "content": h.get('text', '')
                    })
                messages.append({"role": "user", "content": user_message})

                # Call Anthropic API using standard urllib
                headers = {
                    'x-api-key': api_key,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json'
                }
                payload = {
                    "model": "claude-3-5-sonnet-20241022",
                    "max_tokens": 1000,
                    "system": "Tu es PlastiPilot, l'assistant IA officiel de PlastiData. Tu accompagnes les professionnels de la plasturgie dans leur pilotage industriel. Tu ne parles jamais de tarifs. Tu renvoies toujours vers PlastiData pour plus d'infos.",
                    "messages": messages
                }
                
                req = urllib.request.Request(
                    'https://api.anthropic.com/v1/messages',
                    data=json.dumps(payload).encode('utf-8'),
                    headers=headers,
                    method='POST'
                )
                with urllib.request.urlopen(req, timeout=10) as response:
                    res_data = json.loads(response.read().decode('utf-8'))
                    reply = res_data.get('content', [{}])[0].get('text', 'Je ne parviens pas à générer une réponse.')
                    return Response({"reply": reply})
            except Exception as e:
                print(f"Error calling Claude: {e}")

        # 2. Smart local rule-based assistant fallback
        lower_msg = user_message.lower()
        reply = ""

        if "ppm" in lower_msg or "rebut" in lower_msg or "qualité" in lower_msg:
            reply = (
                "Avant de conclure sur un taux de rebut ou un PPM en hausse, stratifiez votre analyse. "
                "Ouvrez votre Pareto de défauts, filtrez par machine ou par équipe, et comparez avant/après la hausse. "
                "Si un défaut ou une machine représente plus de 50% de la dérive, concentrez vos actions d'amélioration uniquement sur ce point.\n\n"
                "Le **Dashboard Qualité PlastiData** automatise cette stratification en temps réel pour vous permettre de cibler vos chantiers Kaizen en un clic."
            )
        elif "trs" in lower_msg or "cadence" in lower_msg or "performance" in lower_msg:
            reply = (
                "Un TRS (Taux de Rendement Synthétique) bas ne dit pas où agir. Décomposez-le en ses 3 composantes fondamentales : "
                "la Disponibilité (arrêts subis), la Performance (sous-cadences et micro-arrêts) et la Qualité (rebuts).\n\n"
                "Le **Dashboard Process PlastiData** calcule automatiquement votre TRS décomposé presse par presse pour identifier en 10 secondes le maillon faible de votre production."
            )
        elif "cpk" in lower_msg or "cp " in lower_msg or "capabilité" in lower_msg:
            reply = (
                "Un Cpk inférieur à 1,33 signifie que votre procédé n'est pas capable sur la cote mesurée. "
                "Si votre Cp est bon mais que le Cpk est bas, il s'agit d'un problème de centrage (réglage machine). "
                "Si les deux sont bas, c'est que la variabilité globale est trop forte (usure outillage, instabilité matière).\n\n"
                "Le **Dashboard Process PlastiData** trace automatiquement vos Cp/Cpk à chaque actualisation."
            )
        elif "vide" in lower_msg or "aucun indicateur" in lower_msg:
            reply = (
                "Trois causes possibles si votre dashboard est vide après actualisation :\n"
                "1. Le chemin d'accès vers votre fichier source Excel est erroné (pensez au double antislash final).\n"
                "2. Les en-têtes de colonnes ont été renommés dans votre fichier source Excel.\n"
                "3. Un filtre temporel ou machine trop restrictif est actif en haut du rapport.\n\n"
                "N'hésitez pas à vérifier ces points techniques ou à demander notre guide illustré."
            )
        elif "chemin" in lower_msg or "accès" in lower_msg or "source" in lower_msg:
            reply = (
                "Pour connecter le dashboard à votre fichier source, le paramètre de chemin d'accès dans Power BI doit être le chemin absolu se terminant par un double antislash `\\\\`.\n"
                "Exemple : `C:\\\\Plastidata\\\\Production_Source.xlsx`.\n\n"
                "Cette configuration simple prend moins de 5 minutes avec notre guide de démarrage inclus."
            )
        elif "action" in lower_msg or "retard" in lower_msg or "clôture" in lower_msg:
            reply = (
                "Face à beaucoup d'actions ouvertes, filtrez d'abord par retard et par responsable. "
                "Priorisez systématiquement les actions liées à des récidives, car elles signalent une cause racine mal résolue. "
                "Un objectif sain est un taux de clôture des actions à 30 jours supérieur à 80%.\n\n"
                "Le **Dashboard Organisation PlastiData** surveille automatiquement les retards dès le lendemain de l'échéance."
            )
        elif "incomplet" in lower_msg or "complétude" in lower_msg:
            reply = (
                "Une complétude des données inférieure à 95% fausse tous vos rapports industriels et peut conduire à de mauvaises décisions terrain. "
                "Identifiez immédiatement la source au score le plus bas et impliquez le responsable de saisie.\n\n"
                "Le **Dashboard Données PlastiData** calcule automatiquement un score de complétude pour chaque table source."
            )
        elif "récidive" in lower_msg:
            reply = (
                "Une récidive de défaut signifie que votre action corrective précédente a été inefficace car la cause racine n'a pas été éliminée. "
                "Réunissez l'équipe et réalisez un atelier structuré (5 Pourquoi / Ishikawa) pour remonter à la source réelle du problème."
            )
        elif "qu'est-ce que" in lower_msg or "c'est quoi" in lower_msg or "plastidata" in lower_msg:
            reply = (
                "**PlastiData** est une solution complète de pilotage industriel spécialement conçue pour la plasturgie. "
                "Elle combine une méthode d'amélioration continue terrain issue de notre livre blanc et 4 dashboards Power BI complémentaires clés en main :\n"
                "1. **Qualité** (PPM, Pareto, non-conformités)\n"
                "2. **Process** (TRS, Capabilité Cp/Cpk, Temps de cycle)\n"
                "3. **Données** (Score de complétude, Doublons, Fiabilité)\n"
                "4. **Organisation** (Taux de clôture, Suivi des retards d'actions)\n\n"
                "Notre objectif est de vous faire gagner 3h de reporting Excel par semaine pour vous concentrer sur l'action terrain."
            )
        elif "prix" in lower_msg or "tarif" in lower_msg or "combien" in lower_msg:
            reply = (
                "Pour obtenir un devis adapté à la taille de votre usine et à vos parcs de presses, je vous invite à nous contacter directement. "
                "Ce que je peux vous assurer : nos clients constatent un retour sur investissement immédiat dès le premier mois, le temps de saisie manuelle économisé couvrant largement la licence."
            )
        elif "démarrer" in lower_msg or "temps" in lower_msg or "installation" in lower_msg:
            reply = (
                "Nos 4 dashboards sont livrés clés en main. La connexion à vos données Excel, ERP ou bases SQL prend moins de 5 minutes grâce à notre guide illustré. "
                "La plupart de nos clients commencent à piloter leur production dès le lendemain de la commande."
            )
        elif "compatible" in lower_msg or "erp" in lower_msg or "système" in lower_msg:
            reply = (
                "Les dashboards PlastiData sont compatibles avec Excel, CSV, SQL Server, et tous les ERP industriels permettant un export de données (SAP, Sage, Sylob, Clipper, Helios, etc.)."
            )
        else:
            reply = (
                "Bonjour ! Je suis **PlastiPilot**, l'assistant IA de PlastiData.\n\n"
                "Je vous conseille d'analyser vos processus en profondeur. Dans la plasturgie, nous cherchons toujours à structurer et fiabiliser la donnée avant d'agir.\n"
                "Dites-moi si vous rencontrez en ce moment un problème de **PPM en hausse**, de **TRS bas**, de **Cpk insuffisant** ou de **suivi de vos plans d'actions** !"
            )

        # Append standard CTA to answers if not general greeting
        if any(kw in lower_msg for kw in ["ppm", "trs", "cpk", "action", "devis", "prix", "plastidata", "solution"]):
            reply += "\n\n[Demander un devis personnalisé](https://linkedin.com/company/plastidata) — Deborah vous répond sous 24h."

        return Response({"reply": reply})


