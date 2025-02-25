$(document).ready(function() {
    const sampleData = [
        { staffNo: "U0001", staffName: "Admin", fullName: "Admin", password: "password", email: "admin@example.com", role: "ADMIN" },
        { staffNo: "U0002", staffName: "Inventory Manager", fullName: "Inventory Manager", password: "password", email: "inventorymanager@example.com", role: "INVENTORYMANAGER" },
        { staffNo: "U0003", staffName: "Manifester", fullName: "Manifester", password: "password", email: "manifester@example.com", role: "MANIFESTER" }
    ];

    function populateList(data) {
        const list = $("table tbody");
        list.empty();

        data.forEach(obj => {
            const row = `
                <tr>
                    <td>${obj.staffNo}</td>
                    <td>${obj.staffName}</td>
                    <td>${obj.fullName}</td>
                    <td>${obj.password}</td>
                    <td>${obj.email}</td>
                    <td>${obj.role}</td>
                </tr>
            `;
            list.append(row);
        });
    }

    populateList(sampleData);
});
