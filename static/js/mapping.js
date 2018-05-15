var map;
require([
        "esri/map",
        "esri/dijit/BasemapGallery",
        "esri/layers/GraphicsLayer",
        "esri/graphic",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/InfoTemplate",
        "dojo/dom",
        "dojo/on",
        "dojo/dom-style",
        "dojo/domReady!"],
    function (Map, BasemapGallery, GraphicsLayer, Graphic, Point, SimpleMarkerSymbol,
              InfoTemplate, dom, on, domStyle) {
        map = new Map("mapDiv", {
            center: [29, 41.05],
            zoom: 12,
            basemap: "topo"
        });

        var basemapGallery = new BasemapGallery({
                // Add Esri own basemaps.
                showArcGISBasemaps: true,
                // To make a relationship our maps.
                map: map
            },
            // Add basemaps div id.
            "basemapsGallery");
        // Run instance startup prototype to fill basemaps div.
        basemapGallery.startup();

        var basemapsGalleryElement = dom.byId("basemapsGallery");
        domStyle.set(basemapsGalleryElement, "display", "none");
        domStyle.set(basemapsGalleryElement, "box-shadow", "0px 0px 15px grey")
        var basemapsGalleryButtonElement = dom.byId("basemapsGalleryButton");

        on(basemapsGalleryButtonElement, "click", function (event) {
            // Get display attribute value using dojo dom-style library.
            var displayStatus = domStyle.get(basemapsGalleryElement, "display");
            if (displayStatus == "block") {
                // Change display attribute value using dojo dom-style library.
                domStyle.set(basemapsGalleryElement, "display", "none");
            } else {
                domStyle.set(basemapsGalleryElement, "display", "block");
            }
        });

        var graphicsLayer = new GraphicsLayer({
            // Layer id
            id: "myGraphicsLayer"
        });
        map.addLayer(graphicsLayer);

        var simpleMarkerSymbol = new SimpleMarkerSymbol();
        for (var index in konteynerListesi) {
            var point = new Point(konteynerListesi[index].koordinat.long, konteynerListesi[index].koordinat.lat);
            var attributes = konteynerListesi[index]
            var infoTemplate = new InfoTemplate("${isim}", "Adres: ${adres}<br>Yerleştirme Tarihi: ${koyulmaTarihi}<br>Durum: ${durum}");
            var pointGraphic = new Graphic(point, simpleMarkerSymbol, attributes, infoTemplate);
            graphicsLayer.add(pointGraphic);
        }

    });
