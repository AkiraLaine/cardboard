$(function(){
    var cards = [];
    
    $.get("/api/user", function(user){
        $("#profile").text(user.github.username);
        cards = user.cards;
        for(var i in user.cards){
            $(".grid").append('<div class="card"><div class="card-image"><img src="' + user.cards[i].url + '" /><span class="card-title"><i class="material-icons delete" key="' + i + '">delete</i></span></div><div class="card-content"><p>' + user.cards[i].title + '</p></div></div>')
        }
        setTimeout(function(){
            $('.grid').masonry({
                itemSelector: '.card',
                columnWidth: 200
            });
        }, 300);
        $(".delete").on("click", deleteCard)
        centerGrid()
    })
    
    function centerGrid(){
        $(".grid").css("margin-left", ($(window).width() - $(".grid").width()) / 2 + "px")
    }
    
    function deleteCard(){
        var key = $(this).attr("key");
        var data = cards[key];
        console.log(data)
        $.post("/api/profile/delete", data)
        $.post("/api/cards/delete", data)
    }
    
    $("#submit").on("click", function(){
        var data = {title: $("#title").val(), url: $("#url").val()};
        console.log(data)
        $.post("/api/profile/new", data);
        $.post("/api/cards/", data)
    })
    
    $(window).on("resize", centerGrid)
})

