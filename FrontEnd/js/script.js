const BASE_URL = "http://localhost:3000";

/**
 * Function to fetch all records
 */
const loadAllContactsList = () => {
  axios
    .get(`${BASE_URL}/contacts`)
    .then((response) => {

      let html = "";

      if(response.data.length > 0) {
        response.data.forEach((element) => {
          html += `
              <div class="card mb-2">
                  <div class="card-body">
                      <div class="row">
                          <div class="col-sm-6">
                              <h5 class="card-title">${element.first_name} ${element.last_name}</h5>
                          </div>
                          <div class="col-sm-6 text-custom-grey">
                              <h6 class="text-custom-grey">${ moment(element.created_at).fromNow() }</h6>
                          </div>
                      </div>
  
                      <div class="row">
                          <div class="col-sm-6">
                              <small><i class="fa-solid fa-phone text-primary"></i> ${element.mobile}</small>
                          </div>
                          <div class="col-sm-6 text-custom-grey">
                              <button type="button" class="btn btn-info btn-sm card-link" onclick='editRecord(${JSON.stringify(element)})' >
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
      } else {
        html = `
        <div class="alert alert-danger" role="alert">
          <i class='fa fa-info-circle'></i> No record found!
        </div>`;
      }

      document.getElementById("show-rcords-list").innerHTML = html;
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
        });
    });
};


const loadAddForm = () => {
  document.getElementById("show-form").innerHTML = `
    <form id="createRecord" onsubmit="createNewRecord(event)">
      <div class="mb-3">
          <input type="text" class="form-control" id="first_name" placeholder="First Name" />
          <span class="error" id="first_name_error"></span>
      </div>
      <div class="mb-3">
          <input type="text" class="form-control" id="last_name" placeholder="Last Name" />
          <span class="error" id="last_name_error"></span>
      </div>
      <div class="mb-3">
          <input type="text" class="form-control" id="mobile" placeholder="Contact Number" />
          <span class="error" id="mobile_error"></span>
      </div>
      <button type="submit" class="btn btn-primary"><i class="fa-solid fa-save"></i> Save</button>
      <button type="button" onclick="clearAllInputFields()" class="btn btn-light">Reset</button>
    </form>
  `;
}


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
      created_at: Date.now()
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
    .post(`${BASE_URL}/contacts`, data)
    .then(function (response) {
      // when record is created successfully
      Swal.fire("Record successfully created!", "", "success");
      loadAllContactsList();
      clearAllInputFields();
    })
    .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
      });
    });
};


/**
 * Function to clear input field after new record created successfully
 */
const clearAllInputFields = () => {
  document.getElementById("createRecord").reset();
};


/**
 * Function to confirm deleted record
 * @param {string} id 
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
  axios.delete(`${BASE_URL}/contacts/${id}`)
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
};


/**
 * Function to display edit record filled form
 * @param {object} selectedRecordData 
 */
const editRecord = (selectedRecordData) => {
  console.log(selectedRecordData);
}
