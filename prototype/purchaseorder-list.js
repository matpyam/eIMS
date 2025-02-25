$(document).ready(function() {

    const sampleData = [
        { poNo: "PO001", createdDate: "20/03/2023", customerCode: "C0001", customerName: "KL Food Supplies Sdn Bhd", purchasingType: "SIMPLE", status: "DRAFT", totalPrice: 5000.00 },
        { poNo: "PO002", createdDate: "19/03/2023", customerCode: "C0002", customerName: "Penang Food Distributors Sdn Bhd", purchasingType: "BLANKET", status: "PENDING", totalPrice: 10000.00 },
        { poNo: "PO003", createdDate: "18/03/2023", customerCode: "C0003", customerName: "Sabah Food Supplies Sdn Bhd", purchasingType: "SIMPLE", status: "COMPLETE", totalPrice: 20000.00 }
    ];

    function populateList(data) {
        const list = $("table tbody");
        list.empty();

        data.forEach(obj => {
            const row = `
                <tr>
                    <td>${obj.poNo}</td>
                    <td>${obj.createdDate}</td>
                    <td>${obj.customerCode}</td>
                    <td>${obj.customerName}</td>
                    <td>${obj.purchasingType}</td>
                    <td>${obj.status}</td>
                    <td>${obj.totalPrice}</td>
                    <td><button type="button" class="btn btn-secondary btn-sm ims-btn-link" data-url="purchaseorder-entry.html"><i class="fas fa-edit"></i> Edit</button></td>
                </tr>
            `;
            list.append(row);
        });
    }

    populateList(sampleData);
});