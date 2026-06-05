FROM nginx:alpine

COPY . /usr/share/nginx/html

RUN cat > /etc/nginx/conf.d/default.conf << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    charset utf-8;

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 1024;

    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    location ~* \.(css|js|png|jpg|jpeg|svg|ico|woff2|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    error_page 404 /index.html;
}
NGINX

EXPOSE 80
