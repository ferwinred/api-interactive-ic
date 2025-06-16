module.exports = {

  apps: [{

    name: "tu-api-nest",  // Nombre de tu aplicación

    script: "dist/main.js",  // Punto de entrada (ajusta si usas otro)

    instances: "max",  // Usa todos los núcleos CPU

    autorestart: true,

    watch: false,

    env: {

      NODE_ENV: "production",

      PORT: 3000  // Puerto donde corre tu API

    }

  }]

}
