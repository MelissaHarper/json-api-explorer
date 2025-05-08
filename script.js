/** DOM Elements */

const postList =  document.getElementById("postList");
const postForm = document.getElementById("postForm");
const fetchButton = document.getElementById("fetchButton");
const loadingMessage = document.getElementById("loadingMessage");

/** Functions / Event Listeners */

// Render posts
const renderPosts = (posts) => {
    postList.innerHTML = "";
    posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
            `;
            postList.appendChild(postElement);
    });
};

 loadingMessage.style.display = 'block';

// Fetch and display posts
fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(function(response) { // get response
        const jsonResponse = response.json(); // set to json
        return jsonResponse;

    })
    .then(function(data) {
        renderPosts(data); // render json to div postList
    })
    .catch((error) => console.error("Error fetching posts:", error)) // catch error if fetch fails
    .finally(() => {
        loadingMessage.style.display = "none"
    });


// Handle form submissions
postForm.addEventListener("submit", (event) => {
    event.preventDefault(); // default action should not happen

    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, body})
    })
        .then(function(response) { 
            const jsonResponse = response.json(); // set response to json
            return jsonResponse;
        })
        .then((newPost) => {
            alert("Post submitted!");
            renderPosts([newPost]); // Optionally re-render with only new post
        })
        .catch((error) => console.error("Error submitting post:", error));
});

fetchButton.addEventListener("click", () => {
    loadingMessage.style.display = 'block';

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then(function(response){  // get response 
            const jsonResponse = response.json(); //set it to json
            return jsonResponse;
            })
        .then(function(data) { //redner json data to div postList
            renderPosts(data);
        })
        .catch((error) => console.error("Error fetching posts:", error)) // catch error if fetch fails
        .finally(()=>{
            loadingMessage.style.display = 'none';
        });

});

       