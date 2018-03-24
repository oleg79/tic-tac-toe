FROM php:7.2-fpm

RUN rm /etc/apt/preferences.d/no-debian-php

RUN apt-get update -y \
  && apt-get install -y \
    libxml2-dev \
  && apt-get clean -y \
  && docker-php-ext-install soap
