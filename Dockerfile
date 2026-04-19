# Usa la imagen oficial de Nginx
# Hi there, i'm Alexander
FROM nginx:latest

# Copiar el archivo de configuración personalizado a Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copia los archivos del proyecto a la carpeta de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80 para servir el sitio
EXPOSE 80

