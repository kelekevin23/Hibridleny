var allatok;
var szoveg = "";
$(function () {


    allatok = jSonBeolvasas("adatok.json", "allatlista");
    const GRA1A = jSonBeolvasas("GRA1A.json", "tanulok");
    const GRA1B = jSonBeolvasas("GRA1B.json", "tanulok");
    osztalyKivalaszto();
    Nyomtatas();
    Mentes();
    $("#nyomtat").click(() => {


        switch (tablazatTorol()) {
            case "GRA1A":

                tablazatKiir(GRA1A);
                break;
            case "GRA1B":
                tablazatKiir(GRA1B);
                break;
            default :

                alert("Ez az osztály még nincs felvéve!");
                break;
        }

    });
    
     $(".menu").click(function () {
        $(".menu ul li").fadeToggle(1000);
    });

});

function allatSorsol() {
    var visszaTomb = [];
    var random;
    var i = 0;
    while (visszaTomb.length !== 3) {
        random = Math.floor(Math.random() * allatok.length);
        if (!(visszaTomb.includes(allatok[random]))) {
            visszaTomb.push(allatok[random]);
        }
        i++;
    }
    return visszaTomb;
}

function osztalyKivalaszto() {
    var elem = "";
    var osztalyTomb = ["GRA1A.json", "GRA1B.json", "GRA2A.json", "NSZFA.json"];
    var value = "";
    $("main").append('<div class="osztalyok">Válassz osztályt! <select name="osztalyok" id="osztalyok"> </select><button id="nyomtat">Nyomtat</button></div>');
    osztalyTomb.forEach((index) => {
        value = index.replace(".json", "");
        elem = '<option value="' + value + '">' + value + '</option>';
        $("#osztalyok").append(elem);
    });

}


function jSonBeolvasas(fajl, mit) {

    var visszaTomb = [];
    $.ajax({url: fajl, success: function (result) {

            const tomb = result[mit];
            result[mit].forEach((ertek) => {
                visszaTomb.push(ertek);
            });

        }});
    return visszaTomb;

}

function tablazatFeltolt(value, index) {
    tanuloAllatai = allatSorsol();
    szoveg += value + " " + tanuloAllatai[0] + " " + tanuloAllatai[1] + " " + tanuloAllatai[2] + "\n";
    $("#tablazat").append('<tr><td id="' + index + '">' + value + '</td><td>' + tanuloAllatai[0] + '</td><td>' + tanuloAllatai[1] + '</td><td>' + tanuloAllatai[2] + '</td></tr>');
}

function tablazatTorol() {
    var osztaly = $("#osztalyok option:selected").text();
    $("#tablazat").remove();
    $("main").append('<table id="tablazat"></table>');
    $("#tablazat").append('<caption>' + osztaly + '</caption>');
    return osztaly;
}

function tablazatFormazasok() {
    for (var i = 0; i < $("#tablazat tr").length; i++) {
        if (i % 2 !== 0) {
            $("#tablazat tr").eq(i).addClass("feher");
        } else {
            $("#tablazat tr").eq(i).addClass("szurke");
        }


    }
}

function tablazatKiir(tomb) {
    tablazatTorol();
    szoveg = "";
    tomb.forEach((value, index) => {
        tablazatFeltolt(value, index);
    });
    tablazatFormazasok();
}

function mentes() {
    if (szoveg !== "") {
        console.log(szoveg);
        //var textToWrite = szoveg;
        var fajl = new Blob([szoveg], {type: 'text'});
        var fajlNeve = "allatok.txt";
        
        var link = document.createElement("a");
        link.download = fajlNeve;
        if (window.webkitURL !== null)
        {
            link.href = window.webkitURL.createObjectURL(fajl);
        }
        link.click();
        
        szoveg = "";
        alert("Sikeresen letöltötted a táblázat adatait!");
    } else {
        alert("Nincs mit menteni!");
        

    }
}

function Nyomtatas(){
        
    $("#nyomtatas").click(function (){
        window.print();
    });
    

}

function Mentes(){
    $("#mentes").click( mentes);
}