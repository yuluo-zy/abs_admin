FROM nginx:latest
COPY build/  /usr/share/nginx/html/
MAINTAINER yuluoluo<liyu@espressif.com>
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
EXPOSE 80
