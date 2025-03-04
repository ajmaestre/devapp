# Usa la imagen oficial de Nginx
FROM nginx:latest

# Copia los archivos del proyecto a la carpeta de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80 para servir el sitio
EXPOSE 80

# No es necesario un CMD porque Nginx ya se ejecuta por defecto
