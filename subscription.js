function sendConfirmEmail() {
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;
  const subcriptionUrl = getSubscriptionUrl();

  const data = {
    email,
    location,
  };

  const btnId = "subscribe-btn";

  openLoading(btnId);

  fetch(`${subcriptionUrl}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      const status = response.status;
      switch (status) {
        case 200:
        case 409:
        case 500:
          return response.json();
        case 400:
          return {
            message: "You should input your email and location correctly!",
          };
      }
    })
    .then((data) => {
      setToastMessage(data?.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      hideLoading(btnId);
    });
}

function unsubscribeEmail() {
  const email = document.getElementById("email").value;
  const unsubcriptionUrl = getUnsubscriptionUrl();

  fetch(`${unsubcriptionUrl}/${email}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      const status = response.status;

      switch (status) {
        case 200:
          return response.json();
        case 400:
        case 404:
          return {
            message: "You should input your email to unsubscribe!",
          };
      }
    })
    .then((data) => setToastMessage(data?.message))
    .catch((error) => {
      console.error("Error:", error);
    });
}
