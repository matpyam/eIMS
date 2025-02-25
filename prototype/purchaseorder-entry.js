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

// Initialize customer dropdown
const sampleCustomerData = [
    { customerCode: "C0001", name: "KL Food Supplies Sdn Bhd", description: "Frozen Chicken Wing, a popular product, known for its quality and freshness. It is maintained under optimal conditions to ensure its frozen state is preserved. Often used in various culinary applications, it is a versatile ingredient cherished by chefs and home cooks alike.", address: "No. 1, Jalan 2/1, Taman Industri Selesa Jaya, 43300 Seri Kembangan, Selangor Darul Ehsan.", email: "info@klfood.com", phoneNo: "03-8948 1234" },
    { customerCode: "C0002", name: "Penang Food Distributors Sdn Bhd", description: "A whole bird offering excellent flavor and versatility. Perfect for roasting or slow-cooking, ensuring tender and juicy results. Stored under optimal conditions to maintain freshness and quality. A staple in many traditional and gourmet recipes, valued for its rich taste.", address: "No. 23, Lebuh Nipah, 11900 Bayan Lepas, Pulau Pinang.", email: "sales@penangfood.com", phoneNo: "04-644 1111" },
    { customerCode: "C0003", name: "Sabah Food Supplies Sdn Bhd", description: "Boneless fillets ideal for quick cooking methods. Known for its tenderness and subtle flavor, making it perfect for grills, stir-fries, and more. Maintained in a frozen state to lock in freshness and nutritional benefits. A favorite among health-conscious consumers.", address: "No. 12, Lorong Lintas Plaza, 88300 Kota Kinabalu, Sabah.", email: "info@sabahfood.com", phoneNo: "088-488 123" }
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

    $("#customerCode").append("<option value='' selected>Choose a customer</option>");
    $.each(sampleCustomerData, function(index, customer) {
        $("#customerCode").append("<option value='" + customer.customerCode + "'>" + customer.name + "</option>");
    });
    $("#customerCode").change(function() {
        var customerCode = $(this).val();
        var customer = sampleCustomerData.find(s => s.customerCode === customerCode);
        $("#customerName").val(customer.name);
        $("#customerAddress").val(customer.address);
        $("#customerPhone").val(customer.phoneNo);
        $("#customerEmail").val(customer.email);
    });

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
        alert("Purchase Order submitted successfully!");
    });
    
    populateItemCodeDropdown();
});

