/**
 * Function to create new record
 * @param {*} event
 */
const createNewRecord = (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#first_name").value;
  const lastName = document.querySelector("#last_name").value;
  const mobile = document.querySelector("#mobile").value;

  const isValid = validateForm(firstName, lastName, mobile);
  if (isValid) {
    // create record by axios
    const data = {
      first_name: firstName,
      last_name: lastName,
      mobile: mobile,
    };
    createRecordByAPI(data);
  }
};

/**
 * Function to validate create record form
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} mobile
 * @returns boolean
 */
const validateForm = (firstName, lastName, mobile) => {
  removedAlreadyPlacesErrorState();
  // write validation code here
  var isValid = true;

  if (firstName == "") {
    isValid = false;
    document.querySelector("#first_name_error").innerText =
      "This is required field!";
  }

  if (lastName == "") {
    isValid = false;
    document.querySelector("#last_name_error").innerText =
      "This is required field!";
  }

  if (mobile == "") {
    isValid = false;
    document.querySelector("#mobile_error").innerText =
      "This is required field!";
  } else if (!/^[0-9]+$/.test(mobile)) {
    isValid = false;
    document.querySelector("#mobile_error").innerText =
      "Mobile number must be digits!";
  } else if (mobile.length != 10) {
    isValid = false;
    document.querySelector("#mobile_error").innerText =
      "Mobile number must be 10 digits!";
  }

  // return flag to check in calling place
  return isValid;
};

/**
 * Function to removed displayed error in next time
 */
const removedAlreadyPlacesErrorState = () => {
  document.querySelector("#first_name_error").innerText = null;
  document.querySelector("#last_name_error").innerText = null;
  document.querySelector("#mobile_error").innerText = null;
};

/**
 * Function to make API post call to create new crecord
 * @param {object} data
 * @returns null
 */
const createRecordByAPI = (data) => {
  // hit axios with post request or call API
  axios
    .post("http://localhost:3000/contacts", data)
    .then(function (response) {
      document.getElementById("response-msg").innerHTML = `
            <div class="alert alert-success" role="alert">
                <i class="fa-solid fa-info-circle"></i> Record successfully created!
            </div>
        `;

      loadAllContactsList();
      clearAllInputFields();
    })
    .catch((error) => {
      document.getElementById("response-msg").innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="fa-solid fa-info-circle"></i> ${error.message}
            </div>
        `;
    });

  // to hide alert after 5 seconds
  setTimeout(() => {
    document.getElementById("response-msg").innerHTML = null;
  }, 5000);
};

/**
 * Function to fetch all records
 */
const loadAllContactsList = () => {
  axios
    .get("http://localhost:3000/contacts")
    .then((response) => {
      console.log(response.data);

      let html = "";
      response.data.forEach((element) => {
        html += `
            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <h5 class="card-title">${element.first_name} ${element.last_name}</h5>
                        </div>
                        <div class="col-sm-6 text-custom-grey">
                            <h6 class="text-custom-grey">3 days ago</h6>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <small><i class="fa-solid fa-phone text-primary"></i> ${element.mobile}</small>
                        </div>
                        <div class="col-sm-6 text-custom-grey">
                            <button type="button" class="btn btn-info btn-sm card-link">
                                <i class="fa-solid fa-edit"></i> Edit
                            </button>
                            <button type="button" class="btn btn-danger btn-sm card-link" onclick='deleteRecord(${element.id})'>
                                <i class="fa-solid fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
      });

      document.getElementById("show-rcords-list").innerHTML = html;
    })
    .catch((error) => {
      alert(error.message);
    });
};

/**
 * Function to clear input field after new record created successfully
 */
const clearAllInputFields = () => {
  document.getElementById("first_name").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("mobile").value = "";
};

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
  axios.delete(`http://localhost:3000/contacts/${id}`)
    .then(function (res) {
        Swal.fire("Deleted!", "", "success");
        loadAllContactsList();
    })
    .catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
        });
    });

  setTimeout(() => {
    document.querySelector("#show-records-list-alert").innerHTML = null;
  }, 5000);
};
