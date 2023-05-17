"use strict"

 var map;

$(document).ready(async function() {
    let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city=Fossano");//Interrogare un webservices https://www.openstreetmap.org/#map=13/44.6233/7.6420

    let cordsPAC = await busta.json();

   console.log(cordsPAC)

    let cords = [parseFloat(cordsPAC[0].lon), parseFloat(cordsPAC[0].lat)];


    map = new ol.Map(
        {
            target:"map",// l'id dell'oggetto html //
            layers:[//gli indichiamo quali livelli deve avere questa mappa, gli dirempo che il primoi livello è la mappa globale
                //Definisco il livello base(tile vuol dire esseri?)(/mappa globale completa)
                new ol.layer.Tile({ source: new ol.source.OSM()}) //Sorgente di mappa globale, quella più grande
            ],
            //Caratteristiche visive (zoom,centro, ...) della mappa visualizzata
            //Centro = dove la mappa si concentra,mi fa vedere prima l'europa, o america o spagna
            view:new ol.View(
                {
                //Array di float,lo richiede(longitudine, latitudine)
                center : ol.proj.fromLonLat(cords),//Funzione libreria che trasforma l'array di float in oggetto particolare
                zoom:4
            }
            )
        });
        


});