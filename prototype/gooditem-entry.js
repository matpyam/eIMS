$(document).ready(function() {

    // Handle form submission
    $("form").submit(function(e) {
        e.preventDefault();
        
        // Collect form data
        var formData = {
            itemCode: $("#itemCode").val(),
            name: $("#name").val(),
            description: $("#description").val(),
            image: $("#image").val()
        };

        // In a real application, you would send this data to a server
        console.log("Form data:", formData);

        alert("Goods submitted successfully!");

        window.location.href = "gooditem-list.html";
    });
});