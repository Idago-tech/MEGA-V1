<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=TRC-ESPORT&fontSize=72&fontColor=fff&animation=twinkling&fontAlignY=32&desc=Bot%20de%20WhatsApp%20de%20alto%20rendimiento&descAlignY=55&descSize=20" width="100%"/>
Más de 250 comandos. Multiplataforma. Multibase de datos. Arquitectura de plugins.
Instalación · Configuración de sesión · Configuración · Despliegue · Plugins
Despliega en tu plataforma preferida
</div>
Índice
 * Características
 * Requisitos
 * Inicio rápido
 * Obtener tu ID de sesión
 * Configuración
 * Instalación
 * Despliegue
   * Termux
   * VPS / Linux
   * Windows WSL
   * Replit
   * Heroku
   * Render
   * Railway
   * Koyeb
   * Fly.io
   * Dockerfile
   * Paneles de Discord
 * Sistemas de almacenamiento
 * Variables de entorno
 * Scripts de npm
 * Sistema de plugins
 * Solución de problemas
 * Contribución
Características
| Característica | Descripción |
|---|---|
| Plugins automáticos | Coloca un archivo .ts en plugins/. Se carga automáticamente sin registro. |
| Más de 250 comandos | Gestión de grupos, privacidad, moderación, diversión, IA, multimedia, utilidades. |
| 5 bases de datos | MongoDB, PostgreSQL, MySQL, SQLite o archivos JSON. |
| Protección de grupos | Anti-spam, filtro de malas palabras, detección de enlaces, anti-abuso de etiquetas. |
| Sistema de roles | Niveles de permiso: Propietario, Sudo, Administrador y Usuario. |
| Mensajes programados | Programa mensajes con entrada de tiempo natural. |
| Chatbot de IA | Modo de conversación de IA independiente por chat. |
| Controles de privacidad | Gestión completa de la privacidad de WhatsApp mediante comandos. |
| Encuestas y votaciones | Crea encuestas con seguimiento de votos en vivo en los grupos. |
| Difusión | Envía mensajes masivos a todos los grupos o contactos directos a la vez. |
| Respuesta automática | Respuestas automáticas configurables con soporte para variables como {name}. |
| Juegos | TicTacToe y otros juegos integrados. |
| Mensajes temporales | Establece temporizadores por chat o predeterminados mediante comandos. |
| Multiplataforma | Funciona en Termux, VPS, Railway, Render, Heroku, Koyeb, Fly.io, Replit. |
Requisitos
| Requisito | Versión | Notas |
|---|---|---|
| Node.js | 20.x o superior | Requerido |
| npm | 8.x o superior | Incluido con Node.js |
| Git | Reciente | Para clonar el repositorio |
| ffmpeg | Última | Procesamiento multimedia |
| libvips | Última | Procesamiento de imágenes |
| libwebp | Última | Creación de stickers |
> Usa siempre un número dedicado. Nunca uses tu número personal de WhatsApp para el bot.
> 
Inicio rápido
git clone https://github.com/TRC-ESPORT/ROCKY.git
cd ROCKY
npm install
cp sample.env .env
# Edita .env y añade SESSION_ID y OWNER_NUMBER
npm run build
npm start

Obtener tu ID de sesión
El bot usa un ID de sesión para conectar a WhatsApp sin escanear un código QR en cada inicio. Genéralo una vez y pégalo en el archivo .env.
Paso 1: Abre el generador de sesiones
> https://mega-pairing.onrender.com
> 
Paso 2: Genera tu sesión
Opción A: Código de emparejamiento (Recomendado)
 * Ingresa el número de WhatsApp de tu bot con código de país.
 * Haz clic en Generar código de emparejamiento.
 * Aparece un código de 8 caracteres.
 * En tu teléfono abre WhatsApp, ve al menú, selecciona Dispositivos vinculados, luego Vincular un dispositivo y elige Vincular con el número de teléfono.
 * Ingresa el código para crear la sesión.
 * Copia el ID de sesión que muestra la página.
Opción B: Código QR
 * Haz clic en la pestaña Código QR.
 * Escanea el código QR con tu WhatsApp.
 * Copia el ID de sesión que aparece.
Paso 3: Añade el ID a .env
SESSION_ID=TRC-ESPORT/ROCKY_xxxxxxxxxxxxxxxxxxxxxxxx

Alternativa: Emparejamiento por terminal
Deja SESSION_ID vacío y configura:
PAIRING_NUMBER=584120000000

> El bot imprime un código de 8 caracteres en la terminal al iniciar. Vincúlalo en WhatsApp en menos de 60 segundos.
> 
Configuración
Copia sample.env a .env:
cp sample.env .env

# REQUERIDO (elige uno)
SESSION_ID=TRC-ESPORT/ROCKY_tu_id_aqui
# O
PAIRING_NUMBER=584120000000

# REQUERIDO
OWNER_NUMBER=584120000000        # Sin el signo +

# IDENTIDAD DEL BOT
BOT_NAME=ROCKY
BOT_OWNER=TRC-ESPORT
PACKNAME=ROCKY

# COMPORTAMIENTO
PREFIXES=.,!,/                   # Separados por comas
COMMAND_MODE=public              # public o private
TIMEZONE=America/Caracas

# CLAVES API OPCIONALES
REMOVEBG_KEY=                    # https://remove.bg/api
GIPHY_API_KEY=                   # https://developers.giphy.com

# RENDIMIENTO
PORT=5000
MAX_STORE_MESSAGES=50

# BASE DE DATOS (vacío = archivos JSON)
MONGO_URL=
POSTGRES_URL=
MYSQL_URL=
DB_URL=                          # SQLite: ./data/baileys.db

Instalación
Instalación manual
# 1. Clonar
git clone https://github.com/TRC-ESPORT/ROCKY.git
cd ROCKY

# 2. Instalar dependencias
npm install

# 3. Configurar
cp sample.env .env
nano .env

# 4. Construir TypeScript
npm run build

# 5. Iniciar
npm start

Instalador de una línea para VPS
sudo bash <(curl -fsSL https://raw.githubusercontent.com/TRC-ESPORT/ROCKY/main/lib/install.sh)

> Esto instala Node.js 20, ffmpeg, libvips, libwebp, PM2, clona el repositorio, lo compila y configura los archivos de datos.
> 
# Después de instalar:
nano /root/ROCKY/.env
cd /root/ROCKY && pm2 start dist/index.js --name rocky
pm2 save && pm2 startup

Despliegue
Termux (Android)
# Actualizar paquetes
pkg update && pkg upgrade -y

# Instalar proot-distro
pkg install proot-distro -y
proot-distro install ubuntu
proot-distro login ubuntu

# Dentro de Ubuntu, instalar dependencias
apt update && apt upgrade -y
apt install -y git ffmpeg build-essential libvips-dev webp nodejs npm curl

# Clonar y configurar
git clone https://github.com/TRC-ESPORT/ROCKY.git
cd ROCKY
npm install
cp sample.env .env && nano .env
npm run build && npm start

Mantener activo al cerrar Termux:
apt install tmux -y

tmux new -s rocky
npm start

# Desconectar:     Ctrl+B y luego D
# Reconectar:      tmux attach -t rocky
# Listar:          tmux ls
# Matar sesión:    tmux kill-session -t rocky

VPS / Servidor Linux
Instalación de una línea:
sudo bash <(curl -fsSL https://raw.githubusercontent.com/TRC-ESPORT/ROCKY/main/lib/install.sh)

Manual:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git ffmpeg libvips-dev libwebp-dev build-essential

git clone https://github.com/TRC-ESPORT/ROCKY.git
cd ROCKY
npm install
cp sample.env .env && nano .env
npm run build

# Mantener activo con PM2
npm install -g pm2
pm2 start dist/index.js --name rocky
pm2 save && pm2 startup

Comandos de PM2:
| Comando | Descripción |
|---|---|
| pm2 logs rocky | Ver registros en vivo |
| pm2 restart rocky | Reiniciar bot |
| pm2 stop rocky | Detener bot |
| pm2 status | Ver estado |
Windows (WSL)
# En la terminal de Ubuntu WSL
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git ffmpeg libvips-dev libwebp-dev build-essential

git clone https://github.com/TRC-ESPORT/ROCKY.git
cd ROCKY
npm install
cp sample.env .env && nano .env
npm run build && npm start

Replit
El repositorio incluye .replit y replit.nix preconfigurados.
 * Ve a replit.com. Crea un Repl e importa desde GitHub.
 * Pega: https://github.com/TRC-ESPORT/ROCKY
 * Abre la pestaña Secrets y añade:
   | Clave | Valor |
   |---|---|
   | SESSION_ID | TRC-ESPORT/ROCKY_tu_id |
   | OWNER_NUMBER | 584120000000 |
 * Haz clic en Run.
> Las instancias gratuitas de Replit se suspenden por inactividad. Usa UptimeRobot para hacer ping a la URL de tu Replit cada 5 minutos y mantenerlo activo. El despliegue en producción usa npm run start:optimized.
> 
Heroku
El repositorio incluye heroku.yml y app.json para despliegue con Docker.
Despliegue de una línea:
bash <(curl -s https://raw.githubusercontent.com/TRC-ESPORT/ROCKY/main/lib/heroku.sh)

Manual:
heroku login
heroku create nombre-de-tu-bot
heroku stack:set container

heroku config:set SESSION_ID=TRC-ESPORT/ROCKY_tu_id
heroku config:set OWNER_NUMBER=584120000000
heroku config:set MONGO_URL=tu_url_de_mongodb

git push heroku main
heroku ps:scale web=1
heroku logs --tail

> El sistema de archivos de Heroku es temporal. Pierdes los datos locales al reiniciar. Usa MongoDB o PostgreSQL para almacenamiento persistente.
> 
Render
El repositorio incluye render.yaml para un despliegue rápido.
 * Haz un fork de este repositorio.
 * Ve a render.com. Selecciona New, luego Blueprint y conecta tu fork.
 * Render lee render.yaml automáticamente.
 * Configura las variables de entorno en el panel:
   * SESSION_ID
   * OWNER_NUMBER
 * Despliega.
> Render usa Docker y ejecuta npm run start:optimized. Usa una base de datos externa para almacenamiento persistente en el plan gratuito.
> 
Railway
 * Haz un fork de este repositorio.
 * Ve a railway.app. Selecciona New Project y luego Deploy from GitHub Repo.
 * Elige tu fork.
 * En la pestaña Variables, añade:
   | Clave | Valor |
   |---|---|
   | SESSION_ID | TRC-ESPORT/ROCKY_tu_id |
   | OWNER_NUMBER | 584120000000 |
 * Railway compila a través de Dockerfile y despliega de inmediato.
Koyeb
El repositorio incluye koyeb.json con el puerto 5000 preconfigurado.
 * Haz un fork de este repositorio.
 * Ve a app.koyeb.com. Selecciona Create App y luego GitHub.
 * Elige tu fork. Koyeb lee koyeb.json.
 * Configura SESSION_ID y OWNER_NUMBER en las variables de entorno.
 * Despliega.
Fly.io
El repositorio incluye fly.toml preconfigurado.
Despliegue de una línea:
bash <(curl -s https://raw.githubusercontent.com/TRC-ESPORT/ROCKY/main/lib/fly.sh)

Manual:
curl -L https://fly.io/install.sh | sh
fly auth login

fly launch --no-deploy
fly secrets set SESSION_ID=TRC-ESPORT/ROCKY_tu_id
fly secrets set OWNER_NUMBER=584120000000
fly deploy

fly logs

Dockerfile
El repositorio incluye un Dockerfile.
# Construir imagen
docker build -t rocky .

# Ejecutar
docker run -d \
  -e SESSION_ID=TRC-ESPORT/ROCKY_tu_id \
  -e OWNER_NUMBER=584120000000 \
  -p 5000:5000 \
  --name rocky \
  rocky

# Ver registros
docker logs -f rocky

Paneles de Discord (Pterodactyl)
 * Crea un servidor con un egg de Node.js 20 o superior.
 * Configura el comando de inicio:
   npm install && npm run build && npm start

 * Sube los archivos por SFTP o el administrador de archivos.
 * Añade las variables de entorno en la pestaña de inicio: SESSION_ID, OWNER_NUMBER.
 * Inicia el servidor.
Sistemas de almacenamiento
Configura una URL de base de datos en .env. Si dejas todas vacías, el bot usa almacenamiento en archivos JSON por defecto.
| Sistema | Uso ideal |
|---|---|
| Archivos JSON | Local, Termux |
| MongoDB | Nube |
| PostgreSQL | Nube / VPS |
| MySQL | Nube / VPS |
| SQLite | VPS sin base de datos externa |
# MongoDB
MONGO_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/rocky

# PostgreSQL
POSTGRES_URL=postgresql://usuario:contraseña@host:5432/rocky

# MySQL
MYSQL_URL=mysql://usuario:contraseña@host:3306/rocky

# SQLite
DB_URL=./data/baileys.db

Variables de entorno
| Variable | Requerido | Por defecto | Descripción |
|---|---|---|---|
| SESSION_ID | Sí (elige uno) | — | Desde mega-pairing.onrender.com |
| PAIRING_NUMBER | Sí (elige uno) | — | Número para emparejar por terminal |
| OWNER_NUMBER | Sí | 584120000000 | Tu número, sin el + |
| BOT_NAME | No | ROCKY | Nombre del bot |
| BOT_OWNER | No | TRC-ESPORT | Nombre del creador |
| PACKNAME | No | ROCKY | Nombre del paquete de stickers |
| PREFIXES | No | .,!,/,# | Prefijos separados por comas |
| COMMAND_MODE | No | public | public o private |
| TIMEZONE | No | America/Caracas | Tu zona horaria |
| PORT | No | 5000 | Puerto HTTP |
| MAX_STORE_MESSAGES | No | 20 | Mensajes guardados por chat |
| CLEANUP_INTERVAL | No | 3600000 | Limpieza temporal en ms |
Scripts de npm
| Script | Descripción |
|---|---|
| npm start | Inicia el bot |
| npm run start:optimized | Inicia con límite de 512MB de memoria |
| npm run start:fresh | Borra archivos de datos y luego inicia |
| npm run build | Compila TypeScript a dist/ |
| npm run rebuild | Limpia y recompila |
| npm run clean | Elimina la carpeta dist/ |
| npm run dev | Modo desarrollo con reinicio automático |
| npm run setup | Compila e inicializa archivos de datos |
