PROYECTO https://miaplicacionweb.vercel.app/
(http://localhost:3001/)
---------------------------------------------------------------------------------
INICIALIZAR BACKEND CON:

$env:NODE_SKIP_PLATFORM_CHECK=1 -->(cada vez q cerramos la consola del backend) 
node app.js
---------------------------------------------------------------------------------
INICIAR FRONTEND CON:

$env:NODE_SKIP_PLATFORM_CHECK=1 -->(cada vez q cerramos la consola del frontend) 
npm start
---------------------------------------------------------------------------------
GITHUB(stage,commit y push)

cd C:\Users\MULTI\source\repos\MiAplicacionWeb
git add .
git commit -m "Mensaje que describe los cambios realizados"
----
git checkout -b <nombre-de-la-rama>
git push origin <nombre-de-la-rama>
---------------------------------------------------------------------------------
ubicacion correcta:
cd..

Confirma la rama actual:
git branch
(presionar q para salir)

Asegúrate de estar en la rama donde quieres subir los cambios. Si no, cámbiala con:
git checkout master
(rama:master)

Agrega los cambios:
git add .

Realiza un commit:
git commit -m "cambio"

Sube los cambios al repositorio:
git push origin master
(rama:master)
-------------------------------------------------------------------------------------
Para iniciar el frontend y backend simultáneamente desde la raíz:
npm start

Para solo iniciar el frontend:
npm run start-frontend

Para solo iniciar el backend:
npm run start-backend

Para compilar el frontend (cuando quieras desplegarlo en producción):
npm run build-frontend