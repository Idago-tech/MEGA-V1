<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=TRC-ESPORT&fontSize=72&fontColor=fff&animation=twinkling&fontAlignY=32&desc=Bot%20de%20WhatsApp%20de%20alto%20rendimiento&descAlignY=55&descSize=20" width="100%"/>

**Más de 250 comandos • Multiplataforma • Multibase de datos • Arquitectura de plugins**

[Instalación](#instalación) · [Configuración](#configuración) · [Despliegue](#despliegue) · [Plugins](#sistema-de-plugins)

*Despliega en tu plataforma preferida*
</div>

---

## 📑 Índice

- [Características](#características)
- [Requisitos](#requisitos)
- [Inicio rápido](#inicio-rápido)
- [Obtener tu ID de sesión](#obtener-tu-id-de-sesión)
- [Configuración](#configuración)
- [Instalación](#instalación)
- [Despliegue](#despliegue)
  - [Termux](#termux-android)
  - [VPS / Linux](#vps--servidor-linux)
  - [Windows WSL](#windows-wsl)
  - [Replit](#replit)
  - [Heroku](#heroku)
  - [Render](#render)
  - [Railway](#railway)
  - [Koyeb](#koyeb)
  - [Fly.io](#flyio)
  - [Dockerfile](#dockerfile)
  - [Paneles de Discord](#paneles-de-discord-pterodactyl)
- [Sistemas de almacenamiento](#sistemas-de-almacenamiento)
- [Variables de entorno](#variables-de-entorno)
- [Scripts de npm](#scripts-de-npm)

---

## 🚀 Características

| Característica | Descripción |
| :--- | :--- |
| **Plugins automáticos** | Coloca un archivo `.ts` en `plugins/`. Se carga automáticamente sin registro. |
| **Más de 250 comandos** | Gestión de grupos, privacidad, moderación, diversión, IA, multimedia, utilidades. |
| **5 bases de datos** | MongoDB, PostgreSQL, MySQL, SQLite o archivos JSON. |
| **Protección de grupos** | Anti-spam, filtro de malas palabras, detección de enlaces, anti-abuso de etiquetas. |
| **Sistema de roles** | Niveles de permiso: Propietario, Sudo, Administrador y Usuario. |
| **Mensajes programados** | Programa mensajes con entrada de tiempo natural. |
| **Chatbot de IA** | Modo de conversación de IA independiente por chat. |
| **Controles de privacidad**| Gestión completa de la privacidad de WhatsApp mediante comandos. |
| **Encuestas y votaciones**| Crea encuestas con seguimiento de votos en vivo en los grupos. |
| **Difusión** | Envía mensajes masivos a todos los grupos o contactos directos a la vez. |
| **Respuesta automática** | Respuestas automáticas configurables con soporte para variables como `{name}`. |
| **Juegos** | TicTacToe y otros juegos integrados. |
| **Mensajes temporales** | Establece temporizadores por chat o predeterminados mediante comandos. |
| **Multiplataforma** | Funciona en Termux, VPS, Railway, Render, Heroku, Koyeb, Fly.io, Replit. |

---

## 💻 Requisitos

| Requisito | Versión | Notas |
| :--- | :--- | :--- |
| **Node.js** | 20.x o superior | Requerido |
| **npm** | 8.x o superior | Incluido con Node.js |
| **Git** | Reciente | Para clonar el repositorio |
| **ffmpeg** | Última | Procesamiento multimedia |
| **libvips** | Última | Procesamiento de imágenes |
| **libwebp** | Última | Creación de stickers |

> ⚠️ **Advertencia:** Usa siempre un número dedicado. Nunca uses tu número personal de WhatsApp para el bot.

---

## ⚡ Inicio rápido

```bash
git clone [https://github.com/TRC-ESPORT/ROCKY.git](https://github.com/TRC-ESPORT/ROCKY.git)
cd ROCKY
npm install
cp sample.env .env
# Edita .env y añade SESSION_ID y OWNER_NUMBER
npm run build
npm start
