$('document').ready(function(){
    var lbcount = 0;
    $("#lb").click(function () {
        if (lbcount == 0) {
            $('#Legend_tab').css({
               'display':'initial'
            });
            $(this).css({
                'transform':'translate(350px,-139.3px) rotate(270deg)'
            });
            $("#lbcaret").css({
                'transform':'rotate(180deg)'
            });
            lbcount++;
        } else if (lbcount % 2 == 0) {
             $('#Legend_tab').css({
               'display':'initial'
            });
            $(this).css({
                'transform':'translate(350px,-139.3px) rotate(270deg)'
            });
             $("#lbcaret").css({
                'transform':'rotate(180deg)'
            });
            lbcount++;
        } else if (lbcount % 2 != 0) {
             $('#Legend_tab').css({
               'display':'none'
            });
            $(this).css({
                'transform':'translate(0px,0px) rotate(270deg)'
            });
             $("#lbcaret").css({
                'transform':'rotate(0deg)'
            });
            lbcount++;
        }
    });
});
