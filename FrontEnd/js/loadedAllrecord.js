/**
 * Function to fetch all records
 */
const loadAllContactsList = () => {
    axios.get(`${BASE_URL}/contacts`)
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
      });
  };