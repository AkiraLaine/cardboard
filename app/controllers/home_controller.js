$(function(){
    $.get("/api/user", function(user){
        console.log(user)
        if(user.length !== 0){
            $(".modal-trigger").addClass("hidden")
            $(".profile").removeClass("hidden").children("a").text(user.github.username)
            $(".logout").removeClass("hidden")
        }
    })
    
    $.get("/api/cards", function(cards){
        for(var i in cards){
            $(".grid").append('<div class="card"><div class="card-image"><img src="' + cards[i].url + '"><div class="card-content"><p>' + cards[i].title + '</p></div></div>')
        }
        $('.grid').masonry({
            itemSelector: '.card',
            columnWidth: 200
        });
    })
})