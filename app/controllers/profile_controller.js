$(function(){
    var cards = [];
    
    $.get("/api/user", function(user){
        $("#profile").text(user.github.username);
        cards = user.cards;
        for(var i in user.cards){
            $(".grid").append('<div class="card"><div class="card-image"><img src="' + user.cards[i].url + '" onerror="src=\'https://unsplash.it/700/525/?random\'"/><span class="card-title"><i class="material-icons delete" key="' + i + '">delete</i></span></div><div class="card-content"><p>' + user.cards[i].title + '</p></div></div>')
        }
        var $grid = $('.grid').imagesLoaded(function() {
          $grid.masonry({
            itemSelector: '.card',
            columnWidth: 200,
          }); 
        });
        $("img").on("click", openModal)
        $(".delete").on("click", deleteCard)
        centerGrid()
    })
    
    function openModal(){
        $("#imageModal .modal-content").empty()
        $("#imageModal").openModal();
        $("#imageModal .modal-content").append("<img src='" + $(this).attr("src") + "' />" )
        $("#imageModal .modal-content").append("<p class='flow-text'>" + $(this).parents(".card").find("p").text() + "</p><a href='" + $(this).parents(".card").find("a").attr("href") + "'>" +  $(this).parents(".card").find("a").text() + "</a>")
    }
    
    function centerGrid(){
        $(".grid").css("margin-left", ($(window).width() - $(".grid").width()) / 2 + "px")
    }
    
    function deleteCard(){
        var key = $(this).attr("key");
        var data = cards[key];
        console.log(data)
        $.post("/api/profile/delete", data)
        $.post("/api/cards/delete", data)
        Materialize.toast("Card removed! Refreshing page...", 4000);
        setTimeout(function(){
            window.location.reload();
        }, 2000);
    }
    
    $("#submit").on("click", function(){
        var data = {title: $("#title").val(), url: $("#url").val()};
        $("#modal1").closeModal();
        $.post("/api/profile/new", data);
        $.post("/api/cards/", data)
        Materialize.toast("Card added! Refreshing page...", 4000);
        setTimeout(function(){
            window.location.reload();
        }, 2000);
    })
    
    $(window).on("resize", centerGrid)
})

