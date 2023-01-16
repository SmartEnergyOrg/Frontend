![120393305](https://user-images.githubusercontent.com/38434237/212727884-4746ef79-9726-4618-8a16-37bde6750281.png)
# Installatiehandleiding webapplicatie

### Ontwikkelaars
Studenten
|Xin|Silvester|Marcello|Jens|Mick|Joost|
|----|----|----|----|----|----|

Projectbegeleiders
|Remo van der Heijden|Jan Montizaan|
|----|----|

## Introductie
<div id="#Introduction">
  <p>In opdracht van het Lectoraat Smart Energie, hebben studenten van de opleiding Informatica een energiemanagementsysteem ontwikkeld waarin gebruikers via een dashboard inzicht krijgen over hun energieverbruik. </p>
</div>

## Versie
|Versie|Datum|
|----|----|
|1.0|16 januari 2023|

## Achtergrond
Een belangrijke reden voor de ontwikkeling van dit systeem, is dat er een energietransitie van fossiele brandstof naar duurzame energie plaatsvind. Eén voorbeeld van duurzame energie is via zonne-energie via zonnepanelen.
Het gevolg hiervan is dat een gebruiker energie ontvangt van meerdere bronnen. Dit systeem is bedoeld om deze energietransitie te ondersteunen.

### Dankwoord
Namens het projectgroep, willen we onze contactpersoon Arno Broeders bedanken voor onze samenwerking tijdens het project. Ook willen onze begeleiders Remo van der Heijden en Jan Montizaan bedanken bij het ondersteunen van het ontwikkelingsproces.

## Installatie

Voordat de webapplicatie geïnstalleerd wordt, is belangrijk dat de bijbehorende API ook geïnstalleerd moeten worden. 
Anders faalt het installatiescript voor de webapplicatie.

Om de API te installeren, klik op de link hieronder en volg alle instructies op.

[1. Installatie API](https://github.com/SmartEnergyOrg/Backend/blob/feature-documentation/README.md)

Voor het installeren van de webapplicatie moet allereerst de code gedownload worden van github.

1. Klik op de groene knop **Code** en druk op **Download ZIP** om alle code in een ZIP-map te downloaden.
![Voorbeeld2](https://user-images.githubusercontent.com/38434237/212754451-fb8f6ec8-4269-41a2-8dc3-31a1f116a8c3.png)

2. Sla het ZIP-bestand op het apparaat. _Bij voorkeur de root folder_ en pak het ZIP-bestand uit.

3. Open **cmd** of een **terminal** binnen het apparaat.

4. Binnen de terminal, navigeer naar de Inner Frontend folder van de applicatie door de onderstaande commando in te voeren:

Direct vanuit de root folder
```
cd ./Frontend/Frontend
```

of als **cmd** of een **terminal** geopend is vanuit de uiterste Frontend folder
```
cd ./Frontend
```

5. Voer het installatiescript van de webapplicatie uit door de onderstaande commando in te voeren in de terminal of cmd.

```
./install.sh
```
Deze installatie script zorgt ervoor dat de webapplicatie geïnstalleerd wordt met de bijbehorende afhankelijkheden.
**Let op!** Als de API nog niet geïnstalleerd is, dan zal het script een foutmelding geven om dat wel te doen.

Als het installatiescript succesvol is uitgevoerd, dan is de webapplicatie via de url hieronder te gebruiken.

```
http://localhost:4200
```

Door naar de bovenstaande url te navigeren, zal de browser een leeg dashboard krijgen.
De applicatie is succesvol geïnstalleerd.
![Dashboard](https://user-images.githubusercontent.com/38434237/212761676-222472e7-3286-42f5-a175-200a6d75eb96.png)

## Korte opstart
De applicatie bied de mogelijkheid om een widget toe te voegen en het weer van een plaats te weergeven.
Navigeer naar deze url, om het widgetbeheer pagina te zien.

```
http://localhost:4200/settings
```

De instellingspagina zal via deze url dit scherm te zien krijgen.

![Schermafbeelding 2023-01-16 210048](https://user-images.githubusercontent.com/38434237/212757903-d9c79f55-303b-471c-bb9a-ad7783cffb85.png)

### Weer instellen

1. Vanuit de settingspagina, druk op de **Weather-settings** om het weer van de woonplaats in te voeren.
![SettingWeather](https://user-images.githubusercontent.com/38434237/212761205-ad902e8b-ae9a-433c-bd17-075ac07deb3c.png)

2. Voer de naam van de stad in het _zoekterm_ veld.

3. Druk op de **Zoek** knop om alle stadresultaten te zien.
![Opties](https://user-images.githubusercontent.com/38434237/212758699-1015476c-cf68-4a06-9719-408a00aeb684.png)

4. Kies de juiste stad in het rechterlijst.

5. Druk op de **bevestig** knop om de weer instelling op te slaan.

6. Het weer van de plaats is te zien op de navigatiebalk rechtsboven.
![Het weer](https://user-images.githubusercontent.com/38434237/212762395-d1a50c5a-430a-4ab9-9836-2fa8e347f348.png)

### Widget toevoegen

1. Vanuit de settingspagina, druk op **Create** Widget om het widget toevoegscherm te krijgen.
![SettingWidget](https://user-images.githubusercontent.com/38434237/212761154-4a468d8b-3754-4f67-9576-3f187e304c07.png)

2. Voer alle velden in.
![fORM 1](https://user-images.githubusercontent.com/38434237/212761023-3150b17e-fe2b-48ea-896c-c74730d05c78.png)

3. Druk op de **Add Query** knop om een query toe te voegen en alle andere velden.
![Form2](https://user-images.githubusercontent.com/38434237/212761036-a66f9998-57ee-41f0-b374-38da33574ef6.png)

4. Druk op de **Save** knop om de widget op te slaan.

5. De widget verschijnt op het dashboard.

