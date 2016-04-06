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
        console.log(cards)
        for(var i in cards){
            $(".grid").append('<div class="card"><div class="card-image"><img src="' + cards[i].url + '" onerror="src=\'https://unsplash.it/700/525/?random\'"></div><div class="card-content"><p>' + cards[i].title + '</p><a href="' + cards[i].postedBy + '">' + cards[i].postedBy + '</a></div></div>')
        }
       var $grid = $('.grid').imagesLoaded(function() {
          $grid.masonry({
            itemSelector: '.card',
            columnWidth: 200,
          }); 
        });
        $("img").on("click", openModal)
        centerGrid()
    })
    
    function openModal(e){
        $("#imageModal .modal-content").empty()
        $("#imageModal").openModal();
        $("#imageModal .modal-content").append("<img src='" + $(this).attr("src") + "' />" )
        $("#imageModal .modal-content").append("<p class='flow-text'>" + $(this).parents(".card").find("p").text() + "</p><a href='" + $(this).parents(".card").find("a").attr("href") + "'>" +  $(this).parents(".card").find("a").text() + "</a>")
    }
    
    function centerGrid(){
        $(".grid").css("margin-left", ($(window).width() - $(".grid").width()) / 2 + "px")
    }
})