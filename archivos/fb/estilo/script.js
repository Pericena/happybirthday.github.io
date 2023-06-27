function mostrarNotificacion() {
  if ('Notification' in window && window.Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        var notification = new Notification('Título de la notificación', {
          body: 'Contenido de la notificación',
          icon: 'ruta-a-icono.png'
        });

        notification.onclick = function() {
          // Acción a realizar al hacer clic en la notificación
        };
      }
    });
  }
}
