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
                zoom:15
            }
            )
        });
        //Intercettare il click sulla mappa
        map.on("click",function(event){
            //evento ha una proprietà pixel
            //forEachFeatureAtPixel: da pixel -> a maker
            let marker = map.forEachFeatureAtPixel(evento.pixel, feature => feature);//questa funzione vede che cosa ho cliccato sulla mappa(la mappa è vista come un'immagine)
            /* 
                il 2 parametro  corrisponde a scrivere (feature)=>{return feature}
                oppure
                function (feature){
                    return feature;
                }

                il 2 parametro (evento.pixel, funzione richiamata per ogni feature trovata) infatti la funzione iniziale si chiama FOREACHfeacture, per ogni e posso scremarle in base ai pixel o qualsiasi altro, cioè scremare significa prendere i pixel di ogni feature;
            /* 
            */

            if(marker){//Controllo se esiste

                    //MANCA UNA PARTE
                    
            }

        });

        let layer = aggiungiLayer(map,"IMG/Marker.png");
        aggiungiMarker(layer,"Fossano",cords[1],cords[0]);
        


});

//Creazione di un nuovo layer
function aggiungiLayer(mappa, pathImg){
    let layer = new ol.layer.Vector({//Vettore per orientare un oggetto
        //il sorgente delLo strato visivo che si vuole aggiungere(es altra mappa)
        source:new ol.source.Vector(),//Nuovo sorgente vuoto che possiamo usare dinamicamente sul js,
        //permette di Specificare delle caratteristiche grafiche del layer 
        style:new ol.style.Style({//Oggetto json in cui indichiamo un'icona sul layer
            image: new ol.style.Icon({//ICONA
                //Cordinate dell'icona/immagine rispetto alle cordinate del punto
                anchor:[0.5, 1], //x = 0.5 y = 1
                src: pathImg //"../IMG/Marker.pgn"//PERCORSO RISPETTO AL JS
            })
        })



    });
    mappa.addLayer(layer);
    return layer;
}
//ciò serve quando vado sulla funzione e tengo il mouse sopra, compare una finestra in cui mi spiego i campi che devo mettere i cosa servono
/**
 * Agggiunge un nuovo marker in un layer
 * @param {*} layer strato visivo in cui aggiungiamo il marker
 * @param {*} nome  Testo da visualizzare 
 * @param {*} lat:float  Latitudine
 * @param {*} lon:float  Longitudine
 */
function aggiungiMarker(layer,nome,lat,lon){
    let punto = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([lon,lat])));//Da qua prendo le cordinate del punto in cui voglio mettere il marker
    let marker = new ol.Feature(punto);
    marker.name = nome;

    //Inserisce nel layer scelto il marker
    layer.getSource().addFeature(marker);
}