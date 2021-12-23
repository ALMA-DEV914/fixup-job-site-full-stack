//function to caete a job post
async function newPostHandler(event) {
  event.preventDefault();
  //declare all variables of inputs
  const title = document.querySelector("input[name=job-title]").value.trim();
  const description = document
    .querySelector("textarea[name=description-input")
    .value.trim();
  const salary = document.querySelector("input[name=salary-input").value.trim();
  const zip_code = document
    .querySelector("input[name=location-input")
    .value.trim();
  const payment_method = document
    .querySelector("input[name=payment-input")
    .value.trim();
  const category_name = document.querySelector(".category-name").value.trim();
  const job_image = document.querySelector('input[type="file"]');
  console.log(job_image);
  // const username = document.querySelector(".username-input").value.trim();
  //if not a user bring them into login section
  if (!auth_token) {
    alert("Please login or signup to create post.");
  } else {
    //if user then ask them to input the data
    if (
      title &&
      category_name &&
      description &&
      salary &&
      zip_code &&
      payment_method
      // username
    ) {
      //validate their inputs
      const response = await fetch(`/api/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${auth_token}`,
        },
        //collect the inputs
        body: JSON.stringify({
          title,
          category_name,
          description,
          salary,
          zip_code,
          payment_method,
          // username,
        }),
      });

      if (response.ok) {
        json = await response.json();
        console.log(json);
        const formData = new FormData();
        formData.append("file", job_image.files[0]);
        const img_response = await fetch(`api/jobs/${json.id}/image`, {
          method: "POST",
          headers: {
            Authorization: "bearer " + auth_token,
          },
          body: formData,
        });
        if (img_response.ok) {
          console.log("image upload success");
          document.location.replace(`/dashboard?auth_token=${auth_token}`);
        } else {
          alert("image upload failed");
        }
      } else {
        alert(response.statusText);
      }
    }
  }
}

//delete post from client to API
const deletePostHandler = async (event) => {
  event.preventDefault();
  //declare the variables of id to be deleted
  const deletePostId = event.target.getAttribute("data-id");
  console.log("called delete of " + deletePostId);
  if (deletePostId) {
    const response = await fetch("/api/jobs/" + deletePostId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + auth_token,
      },
    });
    //remove the token after deletion from the data
    if (response.ok) {
      document.location.replace("/dashboard?auth_token=" + auth_token);
    } else {
      alert(
        "Failed to delete post. " + response.status + ": " + response.statusText
      );
    }
  }
};

//add event listeners to take the actions
document
  .querySelector(".submit-post")
  .addEventListener("click", newPostHandler);

const deleteButtons = document.querySelectorAll(".delete-job");
deleteButtons.forEach((el) => el.addEventListener("click", deletePostHandler));

const avg = (arr) => {
  const sum = arr.reduce((acc, cur) => acc + cur);
  const average = sum / arr.length;
  console.log(average);
  return average;
};

// const arr1 = [1, 2, 4, 1, 8];
// const arr2 = [7, 3, 6, 7, 10];
// avg(arr1);
// avg(arr2);
