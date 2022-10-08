FROM nginx:latest
COPY dist/  /usr/share/nginx/html/
MAINTAINER yuluoluo<liyu@espressif.com>
COPY default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /usr/local/nginx/cert/
COPY .ssh/starespcom.key /usr/local/nginx/cert/
COPY .ssh/starespcom.pem /usr/local/nginx/cert/
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
