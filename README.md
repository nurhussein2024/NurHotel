# NurHotel - Backend API for Coworking Space Booking Platform

## Projektbeskrivning
NurHotel är en backend-applikation för en bokningsplattform för coworking space. Plattformen tillåter användare att registrera sig, logga in, och boka arbetsplatser eller konferensrum. Administratörer har rättigheter att hantera rum, användare och bokningar.

## Funktionalitet
1. **Autentisering och Auktorisering**: 
   - Användare kan registrera sig och logga in via API:et.
   - JWT används för att autentisera och skydda rutter.
   - Endast administratörer kan hantera rum och användare.

2. **Rumshantering**:
   - Skapa, uppdatera och ta bort rum (admin).
   - Visa alla rum.

3. **Bokningar**:
   - Användare kan boka rum (arbetsplats eller konferensrum).
   - Skapa, uppdatera och ta bort bokningar.
   - Kontroll av tillgänglighet för rummen innan bokning.

4. **Notifieringar i realtid**:
   - Skicka realtidsnotifieringar när en bokning skapas, uppdateras eller tas bort.

## Teknologi
- **Backend**: Node.js med Express.js
- **Databas**: MongoDB
- **Autentisering**: JWT och bcrypt
- **Caching**: Redis för att optimera hantering av ofta efterfrågade data
- **Realtidskommunikation**: Socket.IO (WebSocket) för notifieringar
- **Miljövariabler**: dotenv för hantering av konfiguration och känsliga uppgifter (t.ex., JWT secret)

## Installation
### Förutsättningar
- Node.js (version 14 eller högre)
- MongoDB

### Steg för att köra lokalt
1. Klona detta repo till din lokala maskin:
   ```bash
   

