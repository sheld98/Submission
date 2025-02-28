document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Redirect to login page if not logged in and trying to access restricted pages
    if (!isLoggedIn && !window.location.pathname.endsWith("index.html")) {
        alert("Log in first to access this page.");
        window.location.href = "index.html"; // Redirect to login page
        return;
    }

    // Login Form Validation
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Hardcoded admin credentials
            const adminEmail = "othienosheldon@gmail.com";
            const adminPassword = "0720973275";

            if (email === adminEmail && password === adminPassword) {
                // Set login status in localStorage
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "home.html"; // Redirect to home page
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    // Logout Functionality
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn"); // Clear login status
            alert("You have been logged out.");
            window.location.href = "index.html"; // Redirect to login page
        });
    }

    // Simulate User Role (Admin or Member)
    const isAdmin = localStorage.getItem("isLoggedIn") === "true"; // Change to true to test admin role

    // Show upload buttons only if user is an admin
    const uploadButtons = document.querySelectorAll(".uploadBtn");
    if (isAdmin && uploadButtons.length > 0) {
        uploadButtons.forEach(button => {
            button.classList.remove("hidden");
        });
    }

    // Add Blog Functionality
    const addBlogBtn = document.getElementById("addBlogBtn");
    const blogPosts = document.getElementById("blogPosts");

    // Load existing blogs from localStorage
    function loadBlogs() {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogPosts.innerHTML = blogs.length > 0 ? "" : "<p>No blog posts yet.</p>";

        blogs.forEach(blog => {
            const blogPost = document.createElement("div");
            blogPost.className = "blog-post";
            blogPost.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
                <small>Posted by: ${blog.author}</small>
            `;
            blogPosts.appendChild(blogPost);
        });
    }

    // Save a new blog to localStorage
    function saveBlog(title, content, author) {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push({ title, content, author });
        localStorage.setItem("blogs", JSON.stringify(blogs));
    }

    // Initialize blog posts
    loadBlogs();

    if (addBlogBtn) {
        addBlogBtn.addEventListener("click", function () {
            // Prompt for login
            const email = prompt("Enter your email:");
            const password = prompt("Enter your password:");

            // Hardcoded admin credentials
            const adminEmail = "othienosheldon@gmail.com";
            const adminPassword = "0720973275";

            if (email === adminEmail && password === adminPassword) {
                // Allow admin to add a blog
                const blogTitle = prompt("Enter the blog title:");
                const blogContent = prompt("Enter the blog content:");
                if (blogTitle && blogContent) {
                    saveBlog(blogTitle, blogContent, "Admin");
                    loadBlogs(); // Refresh the blog list
                }
            } else {
                // Alert normal users they are not allowed
                alert("You are not allowed to add a blog. Only admins can post.");
            }
        });
    }
});