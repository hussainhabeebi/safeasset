FROM nginx:alpine
COPY . /usr/share/nginx/html
RUN cat > /etc/nginx/conf.d/default.conf << 'NGINX'
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    charset utf-8;
    gzip on;
    gzip_types text/html text/css application/javascript;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    location ~* \.(css|js|png|jpg|svg|ico|woff2)$ { expires 30d; add_header Cache-Control "public, immutable"; }
    location ~* \.html$ { expires -1; add_header Cache-Control "no-cache, no-store, must-revalidate"; }
    location / { try_files $uri $uri/ /index.html; }
    error_page 404 /index.html;
}
NGINX
EXPOSE 80
