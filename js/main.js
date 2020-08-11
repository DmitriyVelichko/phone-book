$("#register").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize() + '&register=true' + '&ajax=true';
    $.ajax({
        method: 'post',
        data: data,
        success: function (data) {
            let returnedRegister = JSON.parse(data);
            $('.error').html(returnedRegister.error).attr("hidden", false);
            if(returnedRegister.book){
                window.location.href = '/book/';
                window.location.redirect;
            }
        }
    });
});

$("#auth").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize() + '&auth=true' + '&ajax=true';
    $.ajax({
        method: 'post',
        data: data,
        success: function (data) {
            let returnedAuth = JSON.parse(data);
            $('.error').html(returnedAuth.error).attr("hidden", false);
            if(returnedAuth.book){
                window.location.href = '/book/';
                window.location.redirect;
            }
        }
    });
});

