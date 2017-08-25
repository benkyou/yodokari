var overall = 0;
var correct = 1;

var type = $(location).attr('hash');
var type = type.substring(1, type.length);
var API = "https://benkyou.today/yokodari/lists/" + type + ".json";

$(document).prop('title', 'yokodari — ' + type);
$('#content-header').text('Study your ' + type + ' skills.')

$(document).ready(function () {

    $('#invert').change(function () {
        $("#character").text(new_letter());
    });

    $("#text-input").on("submit", function (e) {
        e.preventDefault();
    });

    $(document).keyup(function (e) {
        if ($("#text-input") && (e.keyCode === 13) && $("#text-input").val() != "") {
            check_response()
        }
    });

    $(".modal").click(function () {
        $(this).fadeOut(1000);
    });

    $(document).click(function () {
        $("#text-input").focus()
    });
});

function swap(json) {
    var ret = {};
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
}

function check_response() {
    var checked = $('#invert').is(":checked");
    var character = $('#character').text();
    var content = $('#text-input').val();

    var jsonContent = $.getJSON(API, function (jsonContent) {

        if (checked == true) {
            var jsonContent = Object.keys(jsonContent).reduce(function (obj, key) {
                obj[jsonContent[key]] = key;
                return obj;
            }, {});
        }

        if (jsonContent[character] == content) {
            correct++;
            $(".correct").stop(!0, !0).fadeIn(100).delay(800).fadeOut(100)
        } else {
            $(".wrong").stop(!0, !0).fadeIn(100).delay(800).fadeOut(100)
        }
    });

    overall++; 

    $("#correct").text(correct);
    $("#overall").text(overall);
    $("#character").text(new_letter());

}

function new_letter() {
    var checked = $('#invert').is(":checked");

    var result;
    var count = 0;

    $.getJSON(API, function (jsonContent) {
        for (var prop in jsonContent)
            if (Math.random() < 1 / ++count)
                if (checked == true) {
                    result = jsonContent[prop];
                } else {
                    result = prop;
                }

        $('#text-input').val('');

        $("#character").text(result);
        return;
    });
    
}

new_letter();
$('.modal').toggle(0);
