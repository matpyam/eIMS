$(document).ready(function() {

    // Handle form submission
    $("form").submit(function(e) {
        e.preventDefault();
        
        // Collect form data
        var formData = {
            staffNo: $("#staffNo").val(),
            staffName: $("#staffName").val(),
            fullName: $("#fullName").val(),
            password: $("#password").val(),
            email: $("#email").val(),
            role: $("#role").val()
        };

        // In a real application, you would send this data to a server
        console.log("Form data:", formData);

        alert("User submitted successfully!");

        window.location.href = "user-list.html";
    });
});
