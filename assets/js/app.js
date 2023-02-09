var cl = console.log;

let baseUrl = `https://jsonplaceholder.typicode.com/posts`;

const postContainer = document.getElementById('postContainer');
const postForm = document.getElementById("postForm");
const titleControl = document.getElementById("title");
const contentControl = document.getElementById("content")

// GET >> to grt data from database
// POST >> to create/send new data in data base
// DELETE >> to delete/remove data from database
// PATCH >> to update data in DB

// myflipcart.com/api >> Base API Url
// myFlipcart.com/api/products
// myFlipcart.com/api/products/123
// myFlipcart.com/api/users
// myFlipcart.com/api/users/5

const templating = (arr) =>{
    let result = '';
    arr.forEach(post => {
        result += `
            <div class="card mb-4">
                <div class="card-header">
                    <h3>${post.title}</h3>
                </div>
                <div class="card-body">
                    <p>${post.body}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>
        `
    });
    postContainer.innerHTML = result;
};

const makeApiCall = (methodName,apiUrl,body) => {
    let xhr = new XMLHttpRequest();
    xhr.open(methodName,apiUrl);
    xhr.onload = function () {
        if (xhr.status === 200) {
            cl(xhr.readyState)
            let data = JSON.parse(xhr.response);
            templating(data)
        }else if(xhr.status === 201){
            cl(xhr.response)
        }
    } 
    xhr.send(JSON.stringify(body))
}

const onPostSubmit = (eve) =>{
    eve.preventDefault();
    let obj = {
        title : titleControl.value,
        body : contentControl.value,
        userId: Math.ceil(Math.random() * 10)
    }
    cl(obj)
    postForm.reset();
  makeApiCall("POST", baseUrl, obj)
}

makeApiCall('GET' , baseUrl, null)

postForm.addEventListener("submit", onPostSubmit)