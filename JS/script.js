"use strict"

 var map;

$(document).ready(function() {
    //Definisco una mappa
    map = new ol.map(
        {
            target:"map",/* l'id dell'oggetto html */
            layers:[//gli indichiamo quali livelli deve avere questa mappa, gli dirempo che il primoi livello è la mappa globale
                //Definisco il livello base(tile vuol dire esseri?)(/mappa globale completa)
                new ol.layers.Tile({ source: new ol.source.OSM()}) //Sorgente di mappa globale, quella più grande
            ],
            //Caratteristiche visive (zoom,centro, ...) della mappa visualizzata
            //Centro = dove la mappa si concentra,mi fa vedere prima l'europa, o america o spagna
            view:new ol.view(
                {zoom:4}
            )
        });


});