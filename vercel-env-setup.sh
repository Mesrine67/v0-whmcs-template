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

# Variables WHMCS Core (déjà configurées)
echo "📋 Variables WHMCS Core..."
vercel env add WHMCS_URL production
vercel env add WHMCS_API_IDENTIFIER production
vercel env add WHMCS_API_SECRET production

# Base de données WHMCS (optionnel)
echo "🗄️  Variables Base de données WHMCS..."
vercel env add WHMCS_DB_HOST production
vercel env add WHMCS_DB_NAME production
vercel env add WHMCS_DB_USER production
vercel env add WHMCS_DB_PASSWORD production

# Configuration Next.js
echo "⚡ Variables Next.js..."
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production

# Configuration Email/SMTP
echo "📧 Variables Email/SMTP..."
vercel env add SMTP_HOST production
vercel env add SMTP_PORT production
vercel env add SMTP_USER production
vercel env add SMTP_PASSWORD production
vercel env add SMTP_FROM production

# Services externes Analytics
echo "📊 Variables Analytics..."
vercel env add GOOGLE_ANALYTICS_ID production
vercel env add GOOGLE_TAG_MANAGER_ID production
vercel env add FACEBOOK_PIXEL_ID production
vercel env add TRUSTPILOT_BUSINESS_ID production

# APIs pour l'analyse de sentiment
echo "🤖 Variables IA/Sentiment..."
vercel env add OPENAI_API_KEY production
vercel env add ANTHROPIC_API_KEY production

# Configuration de sécurité
echo "🔐 Variables Sécurité..."
vercel env add JWT_SECRET production
vercel env add ENCRYPTION_KEY production

# Configuration des paiements
echo "💳 Variables Paiements..."
vercel env add STRIPE_PUBLIC_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add PAYPAL_CLIENT_ID production
vercel env add PAYPAL_CLIENT_SECRET production

# Configuration de monitoring
echo "📈 Variables Monitoring..."
vercel env add SENTRY_DSN production
vercel env add SENTRY_ORG production
vercel env add SENTRY_PROJECT production

# Configuration de base de données
echo "🗃️  Variables Base de données..."
vercel env add DATABASE_URL production
vercel env add REDIS_URL production

# Configuration de stockage
echo "☁️  Variables Stockage..."
vercel env add CLOUDINARY_CLOUD_NAME production
vercel env add CLOUDINARY_API_KEY production
vercel env add CLOUDINARY_API_SECRET production

# Configuration de chat/support
echo "💬 Variables Support/Chat..."
vercel env add CRISP_WEBSITE_ID production
vercel env add INTERCOM_APP_ID production

# Configuration des notifications
echo "🔔 Variables Notifications..."
vercel env add SLACK_WEBHOOK_URL production
vercel env add DISCORD_WEBHOOK_URL production

# Configuration de l'environnement
echo "🌍 Variables Environnement..."
vercel env add NODE_ENV production
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_API_URL production

echo ""
echo "✅ Configuration terminée!"
echo ""
echo "📋 Variables configurées (Total: ~30 variables):"
echo "✓ WHMCS Core (4 variables)"
echo "✓ Next.js Auth (2 variables)"
echo "✓ Email/SMTP (5 variables)"
echo "✓ Analytics (4 variables)"
echo "✓ IA/Sentiment (2 variables)"
echo "✓ Sécurité (2 variables)"
echo "✓ Paiements (5 variables)"
echo "✓ Monitoring (3 variables)"
echo "✓ Base de données (2 variables)"
echo "✓ Stockage (3 variables)"
echo "✓ Support/Chat (2 variables)"
echo "✓ Notifications (2 variables)"
echo "✓ Environnement (3 variables)"
echo ""
echo "🚀 Prochaines étapes:"
echo "1. Exécutez ce script: chmod +x vercel-env-setup.sh && ./vercel-env-setup.sh"
echo "2. Configurez vos domaines personnalisés dans Vercel"
echo "3. Testez le déploiement avec: vercel --prod"
echo "4. Vérifiez les variables dans: vercel env ls"
echo ""
echo "⚠️  Important:"
echo "- Remplacez toutes les valeurs 'votre_xxx' par vos vraies valeurs"
echo "- Gardez vos clés API secrètes en sécurité"
echo "- Testez d'abord en mode preview avant la production"
