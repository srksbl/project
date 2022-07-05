/**
 * Function to call delete api after confrim
 * @param {strinf} id
 */
const deleteRecord = (id) => {
  Swal.fire({
    title: "Do you want to delete this?",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      callDeletApi(id);
    }
  });
};

/**
 * Function to hit delete api on server to delete record
 * @param {string} id
 */
const callDeletApi = (id) => {
  axios
    .delete(`${BASE_URL}/contacts/${id}`)
    .then(function (res) {
      Swal.fire("Deleted!", "", "success");
      loadAllContactsList();
    })
    .catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    });

  setTimeout(() => {
    document.querySelector("#show-records-list-alert").innerHTML = null;
  }, 5000);
};
