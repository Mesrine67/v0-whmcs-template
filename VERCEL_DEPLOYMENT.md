# 🚀 Déploiement Vercel - HebergTonServ

## Configuration des Variables d'Environnement

### 📋 Variables Obligatoires

\`\`\`bash
# WHMCS Configuration
WHMCS_URL=https://votre-domaine.com/whmcs
WHMCS_API_IDENTIFIER=votre_api_identifier
WHMCS_API_SECRET=votre_api_secret

# Next.js & Auth
NEXTAUTH_URL=https://votre-domaine.vercel.app
NEXTAUTH_SECRET=votre_secret_nextauth_aleatoire_32_caracteres
JWT_SECRET=votre_jwt_secret_tres_long_et_aleatoire
ENCRYPTION_KEY=votre_cle_de_chiffrement_32_caracteres

# Email Configuration
SMTP_HOST=smtp.votre-domaine.com
SMTP_PORT=587
SMTP_USER=noreply@votre-domaine.com
SMTP_PASSWORD=votre_mot_de_passe_smtp
\`\`\`

### 💳 Variables Paiement (Optionnelles)

\`\`\`bash
STRIPE_PUBLIC_KEY=pk_live_xxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
PAYPAL_CLIENT_ID=votre_paypal_client_id
PAYPAL_CLIENT_SECRET=votre_paypal_client_secret
\`\`\`

### 📊 Variables Analytics (Optionnelles)

\`\`\`bash
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
TRUSTPILOT_BUSINESS_ID=votre_business_id
SENTRY_DSN=https://xxxxxxxxxx@sentry.io/xxxxxxxxxx
\`\`\`

## 🛠️ Commandes de Déploiement

### Installation Vercel CLI
\`\`\`bash
npm i -g vercel
vercel login
\`\`\`

### Déploiement Initial
\`\`\`bash
vercel --prod
\`\`\`

### Configuration des Variables
\`\`\`bash
# Méthode 1: Via CLI
vercel env add WHMCS_URL production
vercel env add WHMCS_API_IDENTIFIER production
vercel env add WHMCS_API_SECRET production

# Méthode 2: Via Dashboard
# https://vercel.com/dashboard -> Projet -> Settings -> Environment Variables
\`\`\`

### Mise à jour
\`\`\`bash
vercel --prod
\`\`\`

## 🔧 Configuration Domaine Personnalisé

1. **Ajouter le domaine** dans Vercel Dashboard
2. **Configurer les DNS** :
   \`\`\`
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   \`\`\`
3. **Mettre à jour NEXTAUTH_URL** avec le nouveau domaine

## 📈 Optimisations Vercel

### Edge Functions
- API routes optimisées pour Edge Runtime
- Réponses plus rapides (< 100ms)
- Cache automatique des réponses statiques

### Analytics
- Activez Vercel Analytics dans le dashboard
- Monitoring des performances en temps réel
- Métriques Core Web Vitals

### Security Headers
- Configuration automatique via `vercel.json`
- Protection XSS, CSRF, Clickjacking
- Headers de sécurité optimaux

## 🚨 Checklist Pré-Déploiement

- [ ] Variables d'environnement configurées
- [ ] WHMCS API testée et fonctionnelle
- [ ] Domaine personnalisé configuré
- [ ] SSL/TLS activé
- [ ] Analytics configurées
- [ ] Monitoring d'erreurs (Sentry)
- [ ] Tests de performance effectués
