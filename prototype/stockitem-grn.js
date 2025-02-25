$(document).ready(function() {
    // Add row to goods table
    $("#addRow").click(function() {
        var newRow = `
            <tr>
                <td><input type="text" class="form-control" name="itemCode[]" required></td>
                <td><input type="text" class="form-control" name="description[]" required></td>
                <td><input type="number" class="form-control" name="quantityReturn[]" required></td>
                <td><input type="number" class="form-control" name="quantityReceived[]" required></td>
                <td><input type="text" class="form-control" name="reason[]" required></td>
                <td><button type="button" class="btn btn-danger btn-sm delete-row"><i class="fas fa-trash"></i></button></td>
            </tr>
        `;
        $("#goodsTable tbody").append(newRow);
    });

    // Delete row from goods table
    $(document).on("click", ".delete-row", function() {
        $(this).closest("tr").remove();
    });

    // Handle form submission
    $("#form").submit(function(e) {
        e.preventDefault();
        
        // Collect form data
        var formData = {
            grnNo: $("#grnNo").val(),
            date: $("#date").val(),
            returnedBy: $("#returnedBy").val(),
            returnTo: $("#returnTo").val(),
            status: $("#status").val(),
            goods: []
        };

        // Collect goods data
        $("#goodsTable tbody tr").each(function() {
            var row = $(this);
            formData.goods.push({
                itemCode: row.find("input[name='itemCode[]']").val(),
                description: row.find("input[name='description[]']").val(),
                quantityReturn: row.find("input[name='quantityReturn[]']").val(),
                quantityReceived: row.find("input[name='quantityReceived[]']").val(),
                unit: row.find("input[name='unit[]']").val(),
                reason: row.find("input[name='reason[]']").val()
            });
        });

        // In a real application, you would send this data to a server
        console.log("Form data:", formData);

        // Clear the form
        $("#form")[0].reset();
        $("#goodsTable tbody").html(`
            <tr>
                <td><input type="text" class="form-control" name="itemCode[]" required></td>
                <td><input type="text" class="form-control" name="description[]" required></td>
                <td><input type="number" class="form-control" name="quantityReturn[]" required></td>
                <td><input type="number" class="form-control" name="quantityReceived[]" required></td>
                <td><input type="text" class="form-control" name="reason[]" required></td>
                <td><button type="button" class="btn btn-danger btn-sm delete-row"><i class="fas fa-trash"></i></button></td>
            </tr>
        `);

        // Show success message (you can replace this with a more sophisticated notification system)
        alert("GRN submitted successfully!");
    });
});