var sampleInventoryData = [
    { itemCode: 'I0001', itemName: 'Chicken wing', quantityAvailable: 50, quantityFloating: 5 },
    { itemCode: 'I0002', itemName: 'Whole chicken', quantityAvailable: 40, quantityFloating: 4 },
    { itemCode: 'I0003', itemName: 'Chicken fillet', quantityAvailable: 60, quantityFloating: 6 },
    { itemCode: 'I0004', itemName: 'Chicken organ', quantityAvailable: 30, quantityFloating: 3 }
];

// Initialize goods dropdown
var sampleGoodsData = [
    { itemCode: "I0001", name: "Chicken wing", quantity: 100, unitPrice: 3.00 },
    { itemCode: "I0002", name: "Whole chicken", quantity: 50, unitPrice: 2.50 },
    { itemCode: "I0003", name: "Chicken fillet", quantity: 200, unitPrice: 4.00 },
    { itemCode: "I0004", name: "Chicken organ", quantity: 200, unitPrice: 5.00 }
];

function populateItemCodeDropdown() {
    $("#itemCode").append("<option value='' selected>Choose an item</option>");
    $.each(sampleGoodsData, function(index, obj) {
        $("#itemCode").append("<option value='" + obj.itemCode + "'>" + obj.name + "</option>");
    });
    $("#itemCode").change(function() {
        var itemCode = $(this).val();
        var obj = sampleGoodsData.find(obj => obj.itemCode === itemCode);
        var unitPrice = sampleGoodsData.find(obj => obj.itemCode === itemCode).unitPrice;
        var quantity = parseInt($(this).closest('tr').find('[name="quantity[]"]').val() || 0);
        var subUnitPrice = unitPrice * quantity;
        $(this).closest('tr').find('[name="unitPrice[]"]').val(unitPrice);
        $(this).closest('tr').find('.quantityAvailable').text(obj.quantityAvailable || '?');
        console.log("$(this).closest('tr').find('.quantityAvailable')", $(this).closest('tr').find('.quantityAvailable'));
        $(this).closest('tr').find('[name="subUnitPrice[]"]').val(subUnitPrice);
    });
    $('[name="quantity[]"]').change(function() {
        var itemCode =$(this).closest('tr').find('[name="itemCode[]"]').val();
        var obj = sampleGoodsData.find(obj => obj.itemCode === itemCode);
        var unitPrice = sampleGoodsData.find(obj => obj.itemCode === itemCode).unitPrice;
        var quantity = parseInt(this.value || 0);
        var subUnitPrice = unitPrice * quantity;
        $(this).closest('tr').find('[name="subUnitPrice[]"]').val(subUnitPrice);
    });
}

$(document).ready(function() {

    // Add row to goods table
    $("#addRow").click(function() {
        var newRow = `
            <tr>
                <td>
                    <select class="form-select" name="itemCode[]" id="itemCode" required>
                        <option value='' selected>Choose an item</option>
                        ${sampleGoodsData.map(obj => `<option value="${obj.itemCode}">${obj.name}</option>`).join("")}
                    </select>
                </td>
                <td><input type="number" class="form-control" name="unitPrice[]" id="unitPrice" required readonly></td>
                <td>
                <div class="input-group">
                    <input type="number" class="form-control" name="quantity[]" id="quantity" required>
                    <span class="input-group-text">/&nbsp;<span class="quantityAvailable">?</span></span>
                </div>
                </td>
                <td><input type="number" class="form-control" name="subUnitPrice[]" id="subUnitPrice" readonly></td>
                <td><button type="button" class="btn btn-danger btn-sm delete-row"><i class="fas fa-trash"></i></button></td>
            </tr>
        `;
        const domNewRow = $("#goodsTable tbody").append(newRow);
        $(domNewRow).find('[name="itemCode[]"]').change(function() {
            var itemCode = $(this).val();
            var obj = sampleInventoryData.find(obj => obj.itemCode === itemCode);
            var unitPrice = sampleGoodsData.find(obj => obj.itemCode === itemCode).unitPrice;
            var quantity = parseInt($(this).closest('tr').find('[name="quantity[]"]').val() || 0);
            var subUnitPrice = unitPrice * quantity;
            $(this).closest('tr').find('[name="unitPrice[]"]').val(unitPrice);
            $(this).closest('tr').find('.quantityAvailable').text(obj.quantityAvailable || '?');
            $(this).closest('tr').find('[name="subUnitPrice[]"]').val(parseInt(unitPrice) * obj.quantityAvailable);
            $(this).closest('tr').find('[name="subUnitPrice[]"]').val(subUnitPrice);
        });
        $(domNewRow).find('[name="quantity[]"]').change(function() {
            var itemCode =$(this).closest('tr').find('[name="itemCode[]"]').val();
            var obj = sampleGoodsData.find(obj => obj.itemCode === itemCode);
            var unitPrice = sampleGoodsData.find(obj => obj.itemCode === itemCode).unitPrice;
            var quantity = parseInt(this.value || 0);
            var subUnitPrice = unitPrice * quantity;
            $(this).closest('tr').find('[name="subUnitPrice[]"]').val(subUnitPrice);
        });
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
            customer: $("#customer").val(),
            goods: []
        };

        // Collect goods data
        $("#goodsTable tbody tr").each(function() {
            var row = $(this);
            formData.goods.push({
                itemCode: row.find("select[name='itemCode[]']").val(),
                name: row.find("input[name='name[]']").val(),
                unitPrice: row.find("input[name='unitPrice[]']").val(),
                quantity: row.find("input[name='quantity[]']").val(),
                subUnitPrice: row.find("input[name='subUnitPrice[]']").val()
            });
        });

        // In a real application, you would send this data to a server
        console.log("Form data:", formData);

        // Show success message (you can replace this with a more sophisticated notification system)
        alert("Order Request submitted successfully!");
    });
    
    populateItemCodeDropdown();
});

