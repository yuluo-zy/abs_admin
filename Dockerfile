FROM nginx:latest
COPY dist/  /usr/share/nginx/html/
MAINTAINER yuluoluo<liyu@espressif.com>
COPY default.conf /etc/nginx/conf.d/default.conf
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
EXPOSE 80
