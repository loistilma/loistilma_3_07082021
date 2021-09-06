$(function(){
    $("input[name=optionsRadios]").on("click", function() {
        if ($("input[type=radio]#option4").is(":checked"))

        $( 'input[name=othertext]' ).show();
        else 

        $( 'input[name=othertext]' ).hide();

    });
}); 