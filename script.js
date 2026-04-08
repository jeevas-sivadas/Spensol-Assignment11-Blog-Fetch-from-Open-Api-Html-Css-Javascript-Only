const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
const getBtn = document.querySelector("#getBtn");
const blogContainer = document.querySelector(".blog-container");

const API_GET = "https://test.spensol.com/posts/?skip=0&limit=100";

function renderBlogs(data) {
  const posts = Array.isArray(data.posts)
    ? data.posts
    : Array.isArray(data)
      ? data
      : [];

  if (!posts.length) {
    blogContainer.innerHTML = "<p>No blogs found</p>";
    return;
  }

  blogContainer.innerHTML = posts
    .map(
      (post) => `
        <div class="card">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <p><strong>ID:</strong> ${post.id}</p>
          <p><strong>Created:</strong> ${new Date(post.created_at).toLocaleString()}</p>

          <div class="card-buttons">
            <button type="button" class="edit-btn btn btn-edit">Edit</button>
            <button type="button" class="delete-btn btn btn-delete">Delete</button>
          </div>
        </div>
      `,
    )
    .join("");
}

async function getBlogs() {
  blogContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(API_GET);

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await response.json();
    renderBlogs(data);
  } catch (error) {
    console.error(error);
    blogContainer.innerHTML = "<p>Failed to load blogs</p>";
  }
}

getBtn.addEventListener("click", getBlogs);
