FROM wordpress:latest

# Install required PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Install and activate required plugins
COPY ./docker/wordpress/install-plugins.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/install-plugins.sh

# Set up WordPress configuration
COPY ./docker/wordpress/wp-config.php /var/www/html/
COPY ./docker/wordpress/php.ini /usr/local/etc/php/conf.d/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
