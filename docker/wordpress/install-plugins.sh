#!/bin/bash

# Wait for WordPress to be ready
sleep 10

# Install and activate Pods Framework
wp plugin install pods --activate --allow-root

# Install and activate REST API
wp plugin install rest-api --activate --allow-root

# Install and activate WP REST API Menus
wp plugin install wp-rest-api-v2-menus --activate --allow-root

# Set permalink structure
wp rewrite structure '/%postname%/' --allow-root 