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

            // Retrieve stored admin credentials from localStorage
            const storedAdminEmail = localStorage.getItem("adminEmail") || "admin@example.com";
            const storedAdminPassword = localStorage.getItem("adminPassword") || "securepassword123";

            if (email === storedAdminEmail && password === storedAdminPassword) {
                // Set login status in localStorage
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "home.html"; // Redirect to home page
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    // Logout Functionality
    const logoutBtns = document.querySelectorAll(".logout-btn");
    logoutBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn"); // Clear login status
            alert("You have been logged out.");
            window.location.href = "index.html"; // Redirect to login page
        });
    });

    // Simulate User Role (Admin or Member)
    const isAdmin = localStorage.getItem("isLoggedIn") === "true";

    // Show upload buttons only if user is an admin
    const uploadButtons = document.querySelectorAll(".uploadBtn");
    if (isAdmin) {
        uploadButtons.forEach(button => button.classList.remove("hidden"));
    }

    // Sidebar Toggle Functionality
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".content");
    const toggleButton = document.getElementById("sidebarToggle");

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            sidebar.classList.toggle("active");
            document.body.classList.toggle("sidebar-open"); // Helps in styling if needed
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
        loadBlogs(); // Refresh blog list
    }

    // Initialize blog posts
    loadBlogs();

    if (addBlogBtn) {
        addBlogBtn.addEventListener("click", function () {
            const email = prompt("Enter your email:");
            const password = prompt("Enter your password:");

            const storedAdminEmail = localStorage.getItem("adminEmail") || "admin@example.com";
            const storedAdminPassword = localStorage.getItem("adminPassword") || "securepassword123";

            if (email === storedAdminEmail && password === storedAdminPassword) {
                const blogTitle = prompt("Enter the blog title:");
                const blogContent = prompt("Enter the blog content:");
                if (blogTitle && blogContent) {
                    saveBlog(blogTitle, blogContent, "Admin");
                }
            } else {
                alert("You are not allowed to add a blog. Only admins can post.");
            }
        });
    }
});
