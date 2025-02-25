$(document).ready(function() {
    const sampleData = [
        { companyCode: "C0001", name: "KL Food Supplies Sdn Bhd", description: "Frozen Chicken Wing, a popular product, known for its quality and freshness. It is maintained under optimal conditions to ensure its frozen state is preserved. Often used in various culinary applications, it is a versatile ingredient cherished by chefs and home cooks alike.", address: "No. 1, Jalan 2/1, Taman Industri Selesa Jaya, 43300 Seri Kembangan, Selangor Darul Ehsan.", email: "info@klfood.com", phoneNo: "03-8948 1234" },
        { companyCode: "C0002", name: "Penang Food Distributors Sdn Bhd", description: "A whole bird offering excellent flavor and versatility. Perfect for roasting or slow-cooking, ensuring tender and juicy results. Stored under optimal conditions to maintain freshness and quality. A staple in many traditional and gourmet recipes, valued for its rich taste.", address: "No. 23, Lebuh Nipah, 11900 Bayan Lepas, Pulau Pinang.", email: "sales@penangfood.com", phoneNo: "04-644 1111" },
        { companyCode: "C0003", name: "Sabah Food Supplies Sdn Bhd", description: "Boneless fillets ideal for quick cooking methods. Known for its tenderness and subtle flavor, making it perfect for grills, stir-fries, and more. Maintained in a frozen state to lock in freshness and nutritional benefits. A favorite among health-conscious consumers.", address: "No. 12, Lorong Lintas Plaza, 88300 Kota Kinabalu, Sabah.", email: "info@sabahfood.com", phoneNo: "088-488 123" }
    ];

    function populateList(data) {
        const list = $("table tbody");
        list.empty();

        data.forEach(obj => {
            const row = `
                <tr>
                    <td>${obj.companyCode}</td>
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