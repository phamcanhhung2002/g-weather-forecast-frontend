function openLoading(btnId) {
  const btn = document.getElementById(btnId);
  btn.disabled = true;

  const loading = btn.getElementsByTagName("span")[0];
  loading.classList.add("spinner-border");
}

function hideLoading(btnId) {
  const btn = document.getElementById(btnId);
  btn.disabled = false;
  const loading = btn.getElementsByTagName("span")[0];
  loading.classList.remove("spinner-border");
}
