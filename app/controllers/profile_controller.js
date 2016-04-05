$(function(){
    $.get("/api/user", function(user){
        $("#profile").text(user.github.username);
        for(var i in user.cards){
            $(".grid").append('<div class="card"><div class="card-image"><img src="' + user.cards[i].url + '" /><div class="card-content"><p>' + user.cards[i].title + '</p></div></div>')
        }
        setTimeout(function(){
            $('.grid').masonry({
                itemSelector: '.card',
                columnWidth: 200
            });
        }, 300);
        centerGrid()
    })
    
    function centerGrid(){
        $(".grid").css("margin-left", ($(window).width() - $(".grid").width()) / 2 + "px")
    }
    
    $("#submit").on("click", function(){
        var data = {title: $("#title").val(), url: $("#url").val()};
        console.log(data)
        $.post("/api/profile/new", data);
        $.post("/api/cards/", data)
    })
    
    $(window).on("resize", centerGrid)
})

