# Nginx Configuration for AI API Security

This configuration adds additional protection layers at the nginx level.

## Complete nginx server block example

```nginx
# Rate limiting zones (add to http block, outside server)
limit_req_zone $binary_remote_addr zone=ai_limit:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=ai_burst:10m rate=30r/h;

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL configuration (use certbot/letsencrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend (React build)
    location / {
        root /var/www/revp2/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # ==========================================
    # AI API PROTECTION (CRITICAL)
    # ==========================================
    
    location /api/ai/ {
        # STRICT IP WHITELISTING - Only localhost
        allow 127.0.0.1;
        allow ::1;
        deny all;
        
        # Rate limiting (prevents abuse even from localhost)
        limit_req zone=ai_limit burst=5 nodelay;
        limit_req zone=ai_burst burst=10;
        
        # Timeout settings (prevent long-running attacks)
        proxy_read_timeout 30s;
        proxy_connect_timeout 10s;
        
        # Proxy to Node.js backend
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        
        # Important headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Disable buffering for real-time responses
        proxy_buffering off;
    }

    # ==========================================
    # Other API endpoints (less strict)
    # ==========================================
    
    location /api/ {
        # More permissive for other APIs (Stripe, etc.)
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Key Security Features

### 1. **IP Whitelisting** (Most Important)
```nginx
location /api/ai/ {
    allow 127.0.0.1;  # localhost IPv4
    allow ::1;         # localhost IPv6
    deny all;          # Block everything else
}
```

Since your frontend and backend are on the same server, external IPs **cannot** access `/api/ai/*` at all.

### 2. **Rate Limiting**
```nginx
limit_req zone=ai_limit burst=5 nodelay;   # 10 req/min with 5 burst
limit_req zone=ai_burst burst=10;          # 30 req/hour with 10 burst
```

Even localhost is rate-limited to prevent runaway scripts.

### 3. **Timeout Protection**
```nginx
proxy_read_timeout 30s;
proxy_connect_timeout 10s;
```

Prevents slow-loris attacks and hanging connections.

## Testing the Configuration

### 1. Test nginx config syntax
```bash
sudo nginx -t
```

### 2. Reload nginx
```bash
sudo systemctl reload nginx
```

### 3. Test from external IP (should be blocked)
```bash
# From another machine
curl https://yourdomain.com/api/ai/health
# Should return: 403 Forbidden
```

### 4. Test from localhost (should work)
```bash
# On the VPS
curl http://localhost:3001/api/ai/health
# Should return: {"status":"healthy",...}
```

### 5. Test rate limiting
```bash
# On the VPS, run 20 times quickly
for i in {1..20}; do curl http://localhost:3001/api/ai/health; done
# After 10-15 requests, should see: 503 Service Temporarily Unavailable
```

## Advanced: Geo-blocking (Optional)

If you want to block entire countries:

```nginx
# Install GeoIP module
sudo apt-get install libnginx-mod-http-geoip

# In http block
geoip_country /usr/share/GeoIP/GeoIP.dat;

# In server block, before location /api/ai/
location /api/ai/ {
    # Allow only specific countries (example: France)
    if ($geoip_country_code !~ ^(FR|BE|CH)$) {
        return 403;
    }
    
    # ... rest of config
}
```

## Monitoring & Alerts

### 1. Monitor failed requests
```bash
# Watch nginx error log for denied IPs
sudo tail -f /var/log/nginx/error.log | grep "access forbidden"
```

### 2. Count AI requests per hour
```bash
sudo grep "POST /api/ai/chat" /var/log/nginx/access.log | tail -1000 | wc -l
```

### 3. Alert on suspicious activity
Add to cron (every 5 minutes):
```bash
*/5 * * * * [ $(sudo grep "access forbidden" /var/log/nginx/error.log | grep "/api/ai/" | tail -100 | wc -l) -gt 50 ] && echo "AI API under attack!" | mail -s "Security Alert" admin@yourdomain.com
```

## Fail2Ban Integration (Highly Recommended)

Automatically ban IPs that try to access AI endpoints:

### /etc/fail2ban/filter.d/nginx-ai-abuse.conf
```ini
[Definition]
failregex = ^<HOST> .* "(GET|POST) /api/ai/.*" 403
ignoreregex =
```

### /etc/fail2ban/jail.local
```ini
[nginx-ai-abuse]
enabled = true
port = http,https
filter = nginx-ai-abuse
logpath = /var/log/nginx/access.log
maxretry = 3
bantime = 86400  # 24 hours
findtime = 600   # 10 minutes
```

Restart fail2ban:
```bash
sudo systemctl restart fail2ban
```

## Summary of Protection Layers

| Layer | Protection | Bypass Difficulty |
|-------|------------|-------------------|
| **Nginx IP whitelist** | Blocks all external IPs | ⭐⭐⭐⭐⭐ Impossible (unless VPS hacked) |
| **Internal API key** | Validates frontend ↔ backend | ⭐⭐⭐⭐ Very hard (need source code) |
| **Firebase Auth** | Validates user identity | ⭐⭐⭐⭐ Very hard (need valid Firebase account) |
| **Rate limiting (nginx)** | Prevents spam | ⭐⭐⭐ Hard (need to wait between requests) |
| **Rate limiting (app)** | User quotas, cooldowns | ⭐⭐⭐ Hard (tracked in database) |
| **Origin verification** | Checks request source | ⭐⭐ Medium (can be spoofed) |
| **Fail2Ban** | Auto-bans attackers | ⭐⭐⭐⭐ Very hard (IP gets banned) |

**Combined**: Nearly impossible to abuse without full VPS access. 🔒
