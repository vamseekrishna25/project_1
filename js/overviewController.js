angular.module("Myapp").controller("overview_controller",function(){
    $("document").ready(function(){
 var ovcount = 0;
    $("#ob").click(function () {
        if (ovcount == 0) {
            $('#overviewPannel').css({
                'height': '260px',
                'transition': 'height 2s linear'
            });
            $(this).addClass("transup");
            $("#ovcaret").css({
                'transform':'rotate(180deg)'
            });
            ovcount++;
        } else if (ovcount % 2 == 0) {
            $('#overviewPannel').css({
                'height': '260px',
                'transition': 'height 2s linear'
            });
            $(this).removeClass('transdown').addClass('transup');
             $("#ovcaret").css({
                'transform':'rotate(180deg)'
            });
            ovcount++;
        } else if (ovcount % 2 != 0) {
            $('#overviewPannel').css({
                'height': '0px',
                'transition': 'height 2s linear'
            });
            $(this).removeClass('transup').addClass('transdown');
             $("#ovcaret").css({
                'transform':'rotate(0deg)'
            });
            ovcount++;
        }
    });
});
});


