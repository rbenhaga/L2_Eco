# RevP2 Backend API

Production-ready Node.js/Express backend for Stripe subscription management.

## 🚀 Features

- ✅ **Stripe Checkout** integration for subscriptions
- ✅ **Webhook handling** for automatic subscription updates
- ✅ **SQLite database** for subscription storage
- ✅ **Security** (Helmet, CORS, Rate limiting)
- ✅ **RESTful API** for subscription verification

---

## 📦 Installation

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
STRIPE_SECRET_KEY=sk_test_...        # From Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_...     # From Stripe Webhooks
STRIPE_PRICE_ID=price_...           # Your 9€/month price ID
FRONTEND_URL=http://localhost:5173  # Your frontend URL
```

### 3. Test locally

```bash
npm run dev
```

Server starts on `http://localhost:3001`

---

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Create Checkout Session
```http
POST /api/create-checkout-session
Content-Type: application/json

{
  "userId": "firebase_user_uid"
}

Response:
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### Get Subscription
```http
GET /api/subscription/:userId

Response:
{
  "tier": "premium",
  "status": "active",
  "currentPeriodEnd": "2026-02-08T20:00:00.000Z"
}
```

### Stripe Webhook
```http
POST /api/webhook
Content-Type: application/json
Stripe-Signature: <signature>
```

---

## 🔧 Stripe Configuration

### 1. Create Product & Price

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. **Create Product**:
   - Name: `RevP2 Premium`
   - Description: `Accès illimité aux cours L2 Économie`
3. **Add Price**:
   - Model: `Recurring`
   - Billing period: `Monthly`
   - Price: `9.00 EUR`
4. **Copy the Price ID** (starts with `price_...`)
5. Add to `.env`: `STRIPE_PRICE_ID=price_...`

### 2. Configure Webhooks

1. Go to [Dashboard > Webhooks](https://dashboard.stripe.com/test/webhooks)
2. **Add endpoint**: `https://your-domain.com/api/webhook`
3. **Select events**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. **Copy the signing secret** (`whsec_...`)
5. Add to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 🌐 Deployment (VPS)

### Option A: PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start server
pm2 start server.js --name "revp2-api"

# Save PM2 config
pm2 save

# Auto-start on server reboot
pm2 startup
```

**Useful PM2 commands:**
```bash
pm2 logs revp2-api    # View logs
pm2 restart revp2-api # Restart
pm2 stop revp2-api    # Stop
pm2 delete revp2-api  # Remove
```

### Option B: Systemd

Create `/etc/systemd/system/revp2-api.service`:
```ini
[Unit]
Description=RevP2 Backend API  
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/backend
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable & start:
```bash
sudo systemctl enable revp2-api
sudo systemctl start revp2-api
```

### Nginx Reverse Proxy

Add to your Nginx config:
```nginx
location /api {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## 🧪 Testing

### Test with Stripe CLI (local webhooks)

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/webhook

# Test checkout
curl -X POST http://localhost:3001/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"userId": "test_user_123"}'
```

### Test Cards

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 9995` | ❌ Declined |

---

## 📊 Database Schema

```sql
CREATE TABLE subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free',
  status TEXT DEFAULT 'inactive',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  current_period_end INTEGER,
  created_at INTEGER,
  updated_at INTEGER
);
```

**Migrations**: Database auto-creates on first start.

---

## 🔐 Security Checklist

- [x] Helmet.js for HTTP headers
- [x] CORS with origin whitelist
- [x] Rate limiting (100 req/15min)
- [x] Stripe signature verification
- [x] SQL injection protection (prepared statements)
- [x] Environment variables for secrets
- [ ] HTTPS in production (reverse proxy)
- [ ] Input validation middleware

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3001` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | `whsec_...` |
| `STRIPE_PRICE_ID` | Price ID for 9€/month | `price_...` |
| `FRONTEND_URL` | Frontend URL (CORS) | `https://revp2.com` |
| `DATABASE_PATH` | SQLite file path | `./database/subscriptions.db` |

---

## 🐛 Troubleshooting

### Webhook signature verification fails
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Ensure webhook endpoint is publicly accessible
- Verify Stripe CLI is forwarding to correct port

### Database errors
- Check write permissions on `./database/` folder
- Ensure SQLite is installed (`npm install better-sqlite3`)

### CORS errors
- Update `FRONTEND_URL` in `.env`
- Check frontend is making requests to correct API URL

---

## 📚 Next Steps

1. **Production Keys**: Replace test keys with live keys in production
2. **Monitoring**: Add logging (Winston, Sentry)
3. **Backup**: Setup automated DB backups
4. **Scaling**: Move to PostgreSQL if >10k users

---

## 🤝 Support

Questions? Check:
- [Stripe Docs](https://stripe.com/docs)
- [Express.js Guide](https://expressjs.com/)
- Backend logs: `pm2 logs revp2-api`
