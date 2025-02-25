$(document).ready(function () {

    $("button.ims-btn-link").click(function () {
        const url = $(this).data("url") || '';
        if (url) {
            window.location.href = url;
        }
    });

});