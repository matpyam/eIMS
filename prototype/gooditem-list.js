$(document).ready(function() {
    const sampleData = [
        { itemCode: "I0001", name: "Chicken wing", description: "Frozen Chicken Wing, a popular product, known for its quality and freshness. It is maintained under optimal conditions to ensure its frozen state is preserved. Often used in various culinary applications, it is a versatile ingredient cherished by chefs and home cooks alike.", image: "frozen-chicken-wing.jpg" },
        { itemCode: "I0002", name: "Whole chicken", description: "A whole bird offering excellent flavor and versatility. Perfect for roasting or slow-cooking, ensuring tender and juicy results. Stored under optimal conditions to maintain freshness and quality. A staple in many traditional and gourmet recipes, valued for its rich taste.", image: "frozen-whole-chicken.jpg" },
        { itemCode: "I0003", name: "Chicken fillet", description: "Boneless fillets ideal for quick cooking methods. Known for its tenderness and subtle flavor, making it perfect for grills, stir-fries, and more. Maintained in a frozen state to lock in freshness and nutritional benefits. A favorite among health-conscious consumers.", image: "frozen-chicken-fillet.jpg" },
        { itemCode: "I0004", name: "Chicken organ", description: "Includes essential parts like liver and heart, prized for their rich flavor and nutrients. Often used in traditional dishes and gourmet recipes. Carefully preserved to maintain quality and taste. An economical and flavorful choice for a variety of meals.", image: "frozen-chicken-organ.jpg" },
    ];

    function populateList(data) {
        const list = $("table tbody");
        list.empty();

        data.forEach(obj => {
            const row = `
                <tr>
                    <td>${obj.itemCode}</td>
                    <td>${obj.name}</td>
                    <td>${obj.description}</td>
                    <td><img src="${obj.image}" width="100" height="100"></td>
                </tr>
            `;
            list.append(row);
        });
    }

    populateList(sampleData);
});