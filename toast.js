const toastLiveExample = document.getElementById("toast");

const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

function setToastMessage(message) {
  document.getElementById("toast-body").innerHTML = message;
  toastBootstrap.show();
}
