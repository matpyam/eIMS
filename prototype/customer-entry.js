$(document).ready(function() {

    // Handle form submission
    $("form").submit(function(e) {
        e.preventDefault();
        
        // Collect form data
        var formData = {
            customerCode: $("#customerCode").val(),
            name: $("#name").val(),
            description: $("#description").val(),
            address: $("#address").val(),
            email: $("#email").val(),
            phoneNo: $("#phoneNo").val()
        };

        // In a real application, you would send this data to a server
        console.log("Form data:", formData);

        alert("Customer submitted successfully!");

        window.location.href = "customer-list.html";
    });
});