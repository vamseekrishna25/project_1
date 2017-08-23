angular.module("Myapp").controller("module_controller",function(){
    $('document').ready(function(){

     var mbcount = 0;
    $("#mb").click(function () {
        if (mbcount == 0) {
            $('#Modules_tab').css({
                'width': '220px'
            });
            $(this).css({
                'transform': ' translate(-205px,0px) rotate(270deg)'
            });
            $("#module_caret").css({
                'transform':'rotate(180deg)'
            });
            mbcount++;
        } else if (mbcount % 2 == 0) {
            $('#Modules_tab').css({
                'width': '220px'
            });
            $(this).css({
                'transform': ' translate(-205px,0px) rotate(270deg)'
            });
            $("#module_caret").css({
                'transform':'rotate(180deg)'
            });
            mbcount++;
        } else if (mbcount % 2 != 0) {
            $('#Modules_tab').css({
                'width': '0px'
            });
            $(this).css({
                'transform': ' translate(0px,0px) rotate(270deg)'
            });
            $("#module_caret").css({
                'transform':'rotate(0deg)'
            });
            mbcount++;
        }
    });

    setTimeout(function () {
         $("#accordion").accordion({
             collapsible: true
             , active: false
             , header: "div.wrap > h3"
         });
        $.each(modules_data, function (index, value) {
       $("#accordion > #"+index).hide();

             $("#c"+index).click(function(){
	         if ($(this).is(':checked')) {
            $("#accordion > #"+index).show();
             }
                 else{
                  $("#accordion > #"+index).hide();
                 }
           });
        });



     }, 1000);
    var modules_data;
    $.getJSON('data/config.json', function (data) {
         modules_data = (data.modules);
        var module_length = modules_data.length;
        var inHTML = "";

        $.each(modules_data, function (index, value) {
            var newItem = "<div class=wrap id ="+index+"><h3>"+ value.Name + "</h3><div><p>" + value.Data + "</p></div></div>";
            inHTML += newItem;
        });

        $("#accordion").html(inHTML);
    });

});

});
