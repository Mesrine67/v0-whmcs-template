#!/bin/bash

echo "🚀 Configuration des variables d'environnement Vercel pour HebergTonServ"
echo "=================================================================="

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé. Installation..."
    npm i -g vercel
fi

# Se connecter à Vercel
echo "🔐 Connexion à Vercel..."
vercel login

# Lier le projet
echo "🔗 Liaison du projet..."
vercel link

echo "⚙️  Configuration des variables d'environnement..."

# Variables WHMCS Core
vercel env add WHMCS_URL production
vercel env add WHMCS_API_IDENTIFIER production
vercel env add WHMCS_API_SECRET production

# Variables de sécurité
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production
vercel env add ENCRYPTION_KEY production

# Variables Email
vercel env add SMTP_HOST production
vercel env add SMTP_PORT production
vercel env add SMTP_USER production
vercel env add SMTP_PASSWORD production
vercel env add SMTP_FROM production

# Variables de paiement
vercel env add STRIPE_PUBLIC_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add PAYPAL_CLIENT_ID production
vercel env add PAYPAL_CLIENT_SECRET production

# Variables Analytics
vercel env add GOOGLE_ANALYTICS_ID production
vercel env add GOOGLE_TAG_MANAGER_ID production
vercel env add FACEBOOK_PIXEL_ID production

# Variables de monitoring
vercel env add SENTRY_DSN production
vercel env add SENTRY_ORG production
vercel env add SENTRY_PROJECT production

# Variables de base de données (optionnel)
vercel env add DATABASE_URL production
vercel env add REDIS_URL production

# Variables de stockage
vercel env add CLOUDINARY_CLOUD_NAME production
vercel env add CLOUDINARY_API_KEY production
vercel env add CLOUDINARY_API_SECRET production

# Variables de chat/support
vercel env add CRISP_WEBSITE_ID production
vercel env add INTERCOM_APP_ID production

echo "✅ Configuration terminée!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Configurez vos domaines personnalisés dans Vercel"
echo "2. Activez les fonctions Edge si nécessaire"
echo "3. Configurez les redirections dans vercel.json"
echo "4. Testez le déploiement avec: vercel --prod"
echo ""
echo "🔧 Variables configurées:"
echo "- WHMCS Integration"
echo "- Authentication & Security"
echo "- Email Services"
echo "- Payment Gateways"
echo "- Analytics & Monitoring"
echo "- Database & Storage"
echo "- Support Chat"
