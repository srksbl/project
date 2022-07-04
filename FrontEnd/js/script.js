/**
 * Function to create new record
 * @param {*} event 
 */
const createNewRecord = (event) => {
    event.preventDefault();
    
    const firstName = document.querySelector('#first_name').value;
    const lastName = document.querySelector('#last_name').value;
    const mobile = document.querySelector('#mobile').value;

    const isValid = validateForm(firstName, lastName, mobile);
    if(isValid) {
        // create record by axios
        const data = {
            "first_name": firstName,
            "last_name": lastName,
            "mobile": mobile
        }
        createRecordByAPI(data);
    }

}

/**
 * Function to validate create record form
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} mobile 
 * @returns boolean
 */
const validateForm = (firstName, lastName, mobile) => {
    // write validation code here
    return true;
}

/**
 * Function to make API post call to create new crecord
 * @param {object} data 
 * @returns null
 */
const createRecordByAPI = (data) => {
    // hit axios with post request or call API
    axios.post("http://localhost:3000/contacts", data)
    .then( function(response) {
        document.getElementById("response-msg").innerHTML = `
            <div class="alert alert-success" role="alert">
                <i class="fa-solid fa-info-circle"></i> Record successfully created!
            </div>
        `;
        loadAllContactsList();
    })
    .catch( (error) => {
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
}

/**
 * Function to fetch all records
 */
const loadAllContactsList = () => {
    axios.get("http://localhost:3000/contacts")
    .then( (response) => {
        console.log(response.data);

        let html = "";
        response.data.forEach(element => {
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
                            <button type="button" class="btn btn-danger btn-sm card-link">
                                <i class="fa-solid fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        });

        document.getElementById("show-rcords-list").innerHTML = html;

    })
    .catch( (error) => {
        alert(error.message);
    });
}