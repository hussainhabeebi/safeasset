FROM nginx:alpine

# Copy site files
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css

# Nginx config for SPA-like static serving with security headers + gzip
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;
    charset utf-8;

    gzip on;
    gzip_types text/html text/css application/javascript application/json;
    gzip_min_length 1024;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()";

    # Cache static assets
    location ~* \.(css|js|woff2|png|jpg|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # HTML no-cache for instant updates
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    error_page 404 /index.html;
}
EOF

EXPOSE 80
