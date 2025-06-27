#!/bin/bash

# Script de configuration des variables d'environnement Vercel
# Exécuter : chmod +x vercel-env-setup.sh && ./vercel-env-setup.sh

echo "🚀 Configuration des variables d'environnement Vercel pour HebergTonServ"
echo "=================================================================="

# Variables WHMCS Core
echo "📋 Configuration WHMCS..."
vercel env add WHMCS_URL production
vercel env add WHMCS_API_IDENTIFIER production
vercel env add WHMCS_API_SECRET production

# Variables de sécurité
echo "🔐 Configuration sécurité..."
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production
vercel env add ENCRYPTION_KEY production

# Variables email
echo "📧 Configuration email..."
vercel env add SMTP_HOST production
vercel env add SMTP_PORT production
vercel env add SMTP_USER production
vercel env add SMTP_PASSWORD production

# Variables paiement
echo "💳 Configuration paiements..."
vercel env add STRIPE_PUBLIC_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add PAYPAL_CLIENT_ID production
vercel env add PAYPAL_CLIENT_SECRET production

# Variables analytics
echo "📊 Configuration analytics..."
vercel env add GOOGLE_ANALYTICS_ID production
vercel env add TRUSTPILOT_BUSINESS_ID production
vercel env add SENTRY_DSN production

# Variables IA (optionnel)
echo "🤖 Configuration IA..."
vercel env add OPENAI_API_KEY production
vercel env add ANTHROPIC_API_KEY production

echo "✅ Configuration terminée ! Vérifiez vos variables sur https://vercel.com/dashboard"
