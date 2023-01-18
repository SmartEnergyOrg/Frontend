![120393305](https://user-images.githubusercontent.com/38434237/212727884-4746ef79-9726-4618-8a16-37bde6750281.png)
# Smart Energy Dashboard
In dit document zal een korte achtergrond van het project uitgelegd worden. Ook zal namens het projetgroep een dankwoord geuit worden aan alle betrokken partijen.

## Link naar de handleiding
Via de link hieronder zal er verwezen worden naar de installatie-handleiding van de Webapplicatie:

[Handleiding webapplicatie](https://github.com/SmartEnergyOrg/Frontend/blob/main/MANUAL.md)

## Achtergrond
Een belangrijke reden voor de ontwikkeling van dit systeem, is dat er een energietransitie van fossiele brandstof naar duurzame energie plaatsvind. Eén voorbeeld van duurzame energie is via zonne-energie via zonnepanelen.
Het gevolg hiervan is dat een gebruiker energie ontvangt van meerdere bronnen. Dit systeem is bedoeld om deze energietransitie te ondersteunen.

## Dankwoord
Namens het projectgroep, willen we onze contactpersoon Arno Broeders bedanken voor onze samenwerking tijdens het project. Ook willen onze begeleiders Remo van der Heijden en Jan Montizaan bedanken bij het ondersteunen van het ontwikkelingsproces.

## Betrokken partijen
Hierin worden betrokken partijen op een rij gezet en geven alle personen aan die bij het project betrokken waren.

### Ontwikkelaars
|Xin|Sylvester|Marcello|Jens|Mick|Joost|
|----|----|----|----|----|----|

### Projectbegeleiders
|Remo van der Heijden|Jan Montizaan|
|----|----|

### Product Owner
|Arno Broeders|
|----|

# Project setup

## Variabele

Voeg alle variabele van ```sample.env``` toe aan je eigen ```.env``` bestand.

## Docker setup

Op Windows 10/11 Home:
1. Installeer WSL: [WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install)
2. Herstart je apparaat en voer het volgende powershell command uit:

```
WSL -l
```

3. Indien Windows niet automatisch ee nstandaard distro (Ubuntu) heeft geinstalleerd kan je deze handmatig [installeren vanuit de Microsoft Store.](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV?hl=en-us&gl=US)
4. Instaleer [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) en zet Ubuntu als standaard.
5. Installeer [Docker](https://www.docker.com/)
6. Herstart apparaat
7. Open Docker-Desktop, open settings en ga naar: `Resources > WSL Integration` Druk op `Enable integration with my default WSL distro` en druk op opslaan.
8. Open Windows Terminal of Ubuntu and controleer of het command `docker` werkt.

Indien op Linux, Mac of Windows 10/11 Pro
If you are on Linux, Mac or Windows 10/11 Pro:

1. Installleer [Docker](https://www.docker.com/)
2. Controleer of het command `docker` werkt.

## Deployment

1. Navigeer naar de repo in een terminal of in de CLI van je IDE.
2. Kopieer en plak 'sample.env' en hernoem het naar `.env`
3. Bewerk het '.env' bestand zodat deze je gewenste waarden bevat.
4. Voer 'docker-compose build' uit.
5. Voer 'docker-compose up -d' uit om de containers op de achtergrond uit te voeren.
6. Voer 'docker-compose down' uit om de containers te stoppen en te verwijderen.

## Code conventions

- Er worden geen strikte conventieregels toegepast in frontend-projecten. De meeste componenten en boilerplate worden automatisch gegenereerd.
- Er mogen geen ongebruikte variabelen zijn.
- Gebruik altijd puntkomma's (;) aan het einde van een statement.
- Gebruik dubbele aanhalingstekens.
- Er mogen geen ongebruikte functies zijn.
- Wanneer je een ESLint Ignore-verklaring gebruikt, voeg dan een uitleg toe.

### What happens when code is committed that does not follow the code conventions?

When code is committed that contains linting errors it will fail whilst running in the pipeline.
Your pull request will fail and can therefor not be pr'd back to dev or main.

Wanneer code wordt gecommit die fouten bevat, zal het mislukken door de testen in de CI/CD ontwikkelstraat.
Je pull request zal mislukken en kan daarom niet worden gemerged met de betreffende branch.

## Afspraken Git en Github

- Push niet direct naar Dev of Main.
- Als je klaar bent met een branch maak je een pull request aan van je gepushte branch.
- Elk pull request heeft minstens één code review nodig.
- Gebruik alleen `feature` en `bug-fix` branches.
- Doe je code-reviews serieus.
- Zorg ervoor dat je geen grote commits maakt, maar code opdeelt in meerdere commits.
