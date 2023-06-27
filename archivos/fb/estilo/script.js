function closeAlert() {
  document.getElementById("myAlert").style.display = "none";
}

// Lógica para mostrar la alerta
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    document.getElementById("myAlert").style.display = "block";
  }, 500);
});