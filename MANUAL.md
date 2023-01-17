![120393305](https://user-images.githubusercontent.com/38434237/212727884-4746ef79-9726-4618-8a16-37bde6750281.png)
# Installatiehandleiding webapplicatie Smart Energy

## Ontwikkelaars
Studenten
|Xin|Silvester|Marcello|Jens|Mick|Joost|
|----|----|----|----|----|----|

#### Projectbegeleiders
|Remo van der Heijden|Jan Montizaan|
|----|----|

### Versie
|Versie|Datum|
|----|----|
|1.0|16 januari 2023|

## Inhoudsopgave

<ol>
  <li><a href="#Introduction">Introductie</a></li>
  <li><a href="#Installation">Installatie</a></li>
  <li><a href="#OpenApp">Openen van de API</a></li>
  <li><a href="#VerdereStappen">Verdere stappen</a></li>
</ol>

## Introductie
<div id="#Introduction">
  <p>In opdracht van het Lectoraat Smart Energie, hebben studenten van de opleiding Informatica een energiemanagementsysteem ontwikkeld waarin gebruikers via een dashboard inzicht krijgen over hun energieverbruik. </p>
</div>

Voordat de webapplicatie geïnstalleerd wordt, is belangrijk dat de bijbehorende API ook geïnstalleerd moeten worden. 
Anders faalt het installatiescript voor de webapplicatie.

Om de API te installeren, klik op de link hieronder en volg alle instructies op.

[1. Installatie API](https://github.com/SmartEnergyOrg/Backend/blob/feature-documentation/README.md)

## Installatie
Voor het installeren van de webapplicatie moet allereerst de code gedownload worden van github.

1. Klik op de groene knop **Code** en druk op **Download ZIP** om alle code in een ZIP-map te downloaden.
![Voorbeeld2](https://user-images.githubusercontent.com/38434237/212754451-fb8f6ec8-4269-41a2-8dc3-31a1f116a8c3.png)

2. Sla het ZIP-bestand op het apparaat. _Bij voorkeur de root folder_ en pak het ZIP-bestand uit.

3. Open **cmd** of een **terminal** binnen het apparaat.

4. Binnen de terminal, navigeer naar de Inner Frontend-main folder.

5. Voer het installatiescript van de webapplicatie uit door de onderstaande commando in te voeren in de terminal of soortgelijke editor.

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

#### Het weer instellen

1. Vanuit de settingspagina, druk op de **Weather-settings** om het weer van de woonplaats in te voeren.
![SettingWeather](https://user-images.githubusercontent.com/38434237/212761205-ad902e8b-ae9a-433c-bd17-075ac07deb3c.png)

2. Voer de naam van de stad in het _zoekterm_ veld.

3. Druk op de **Zoek** knop om alle stadresultaten te zien.
![Opties](https://user-images.githubusercontent.com/38434237/212758699-1015476c-cf68-4a06-9719-408a00aeb684.png)

4. Kies de juiste stad in het rechterlijst.

5. Druk op de **bevestig** knop om de weer instelling op te slaan.

6. Het weer van de plaats is te zien op de navigatiebalk rechtsboven.
![Dashboard](https://user-images.githubusercontent.com/38434237/213002857-597c6bbf-b13e-48ef-8d87-1d0dc36e76b2.png)

#### Widget toevoegen

1. Vanuit de settingspagina, druk op **Create** Widget om het widget toevoegscherm te krijgen.
![SettingWidget](https://user-images.githubusercontent.com/38434237/212761154-4a468d8b-3754-4f67-9576-3f187e304c07.png)

2. Voer alle velden in.
![Creatie 11](https://user-images.githubusercontent.com/38434237/213003748-0f8f656c-6c61-4b80-8da6-6a4cd699ed3f.png)

3. Druk op de **Add Query** knop om een query toe te voegen en alle andere velden.
![Form widget create](https://user-images.githubusercontent.com/38434237/213003895-c4df1e35-4cb8-4720-b168-a4276a2ebd96.png)

4. Druk op de **Save** knop om de widget op te slaan.

5. De widget verschijnt op het dashboard.

