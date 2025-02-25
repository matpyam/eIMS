$(document).ready(function() {
    // Sample data (in a real application, this would be fetched from a server)
    const sampleData = [
        { grnNo: "DO001", status: "QC_PENDING", createdOn: "2023-04-10" },
        { grnNo: "DO002", status: "COMPLETE", createdOn: "2023-04-09" },
        { grnNo: "DO003", status: "QC_PENDING", createdOn: "2023-04-08" }
    ];

    // Populate the DO list
    function populateList(data) {
        const list = $("table tbody");
        list.empty();

        data.forEach(grn => {
            const row = `
                <tr>
                    <td>${grn.grnNo}</td>
                    <td>${grn.status}</td>
                    <td>${grn.createdOn}</td>
                </tr>
            `;
            list.append(row);
        });
    }

    // Initial population of the DO list
    populateList(sampleData);
});