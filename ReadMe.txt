#Ejecutar 
docker build -t frontend-app .

## Ejecutar
docker run -d --name frontend-container -p 3000:80 frontend-app