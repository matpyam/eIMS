$(document).ready(function() {
    const sampleData = [
        { supplierCode: "S0001", name: "Selangor Fresh Mart Sdn Bhd", description: "Fresh produce including fruits, vegetables, and meat products. Our products are sourced from local farmers and suppliers to ensure freshness and quality.", address: "No. 15, Jalan Industri USJ 1/1, Taman Perindustrian USJ 1, 47600 Subang Jaya, Selangor.", email: "enquiry@selangorfreshmart.com", phoneNo: "03-8023 1234" },
        { supplierCode: "S0002", name: "Penang Frozen Food Sdn Bhd", description: "Frozen food products including fish, prawns, and chicken parts. Our products are sourced from local fishermen and suppliers to ensure freshness and quality.", address: "No. 10, Tingkat Kikik 1, 11900 Bayan Lepas, Pulau Pinang.", email: "sales@penangfrozenfood.com", phoneNo: "04-641 1111" }
    ];

    function populateList(data) {
        const list = $("table tbody");
        list.empty();

        data.forEach(obj => {
            const row = `
                <tr>
                    <td>${obj.supplierCode}</td>
                    <td>${obj.name}</td>
                    <td>${obj.description}</td>
                    <td>${obj.address}</td>
                    <td>${obj.email}</td>
                    <td>${obj.phoneNo}</td>
                </tr>
            `;
            list.append(row);
        });
    }

    populateList(sampleData);
});