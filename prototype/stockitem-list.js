$(document).ready(function() {

    // Sample data for Inventory list (in a real application, this would be fetched from a server)
    const sampleInventoryData = [
        { itemCode: 'I0001', itemName: 'Chicken wing', quantityAvailable: 50, quantityFloating: 5 },
        { itemCode: 'I0002', itemName: 'Whole chicken', quantityAvailable: 40, quantityFloating: 4 },
        { itemCode: 'I0003', itemName: 'Chicken fillet', quantityAvailable: 60, quantityFloating: 6 },
        { itemCode: 'I0004', itemName: 'Chicken organ', quantityAvailable: 30, quantityFloating: 3 }
    ];

    // Sample data for Stock list (in a real application, this would be fetched from a server)
    const sampleStockData = [
        { grnNo: 'DO001', status: 'DRAFT', createdDate: '10/04/2023', hasGRN: false },
        { grnNo: 'DO002', status: 'QC_PENDING', createdDate: '09/04/2023', hasGRN: false },
        { grnNo: 'DO003', status: 'COMPLETE', createdDate: '08/04/2023', hasGRN: true }
    ];

    // Populate the DO list
    function populateStockList(data) {
        const list = $('#stock tbody');
        list.empty();

        data.forEach(obj => {
            let btnGRN = '';
            if (obj.hasGRN) {
                btnGRN = '<button type="button" class="btn btn-outline-secondary btn-sm ims-btn-link" data-url="stockitem-grn.html"><i class="fas fa-eye"></i> View GRN</button>';
            } else if (obj.status !== 'DRAFT') {
                btnGRN = '<button type="button" class="btn btn-outline-secondary btn-sm ims-btn-link" data-url="stockitem-grn.html"><i class="fas fa-plus-square"></i> Create GRN</button>';
            }

            const row = `
                <tr>
                    <td>${obj.grnNo}</td>
                    <td>${obj.createdDate}</td>
                    <td>${btnGRN}</td>
                    <td><button type="button" class="btn btn-secondary btn-sm ims-btn-link" data-url="stockitem-entry.html"><i class="fas fa-edit"></i> Edit</button></td>
                    <td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Delete</button></td>
                </tr>
            `;
            list.append(row);
        });
    }

    // Populate the Inventory list
    function populateInventoryList(data) {
        const list = $('#inventory tbody');
        list.empty();

        data.forEach(obj => {
            const row = `
                <tr>
                    <td>${obj.itemCode}</td>
                    <td>${obj.itemName}</td>
                    <td style="text-align: right;">${obj.quantityAvailable} / ${obj.quantityAvailable + obj.quantityFloating}</td>
                </tr>
            `;
            list.append(row);
        });
    }

    // Initial population of the Stock and Inventory lists
    populateInventoryList(sampleInventoryData);
    populateStockList(sampleStockData);
});
