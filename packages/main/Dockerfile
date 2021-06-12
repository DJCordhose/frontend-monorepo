FROM nginx:alpine

COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY proxy.conf /etc/nginx/conf.d/proxy.conf