#set text(
  font: "Arial",
  size: 12pt,
)
#set page(
  paper: "a4"
)

#align(center + top)[
  #figure(
    grid(columns: 2, gutter: 2mm,
    [#image("./Images/mszc_logo.png",height: 100pt)],
    [#image("./Images/kk_logo.png", height: 100pt)]
    )
  )
]

#align(center + horizon, text(35pt)[*ZÁRÓDOLGOZAT*])

#align(right + bottom, text(15pt)[
  Készítették:\
  #v(2pt)
  #text(10pt)[
    Bodnár István Gábor - Fekete László - Takács Krisztián
  ]\
  #v(2pt)
  Konzulens:\
  #v(2pt)
  #text(10pt)[
    Németh Bence
  ]
])

#align(center + bottom, text(15pt)[
  #v(2pt)
  Miskolc\

  2024
])
#pagebreak()

#align(center + top, text(15pt, fill: blue)[
  Miskolci SZC Kandó Kálmán Informatikai Technikum\
  #v(2pt)
  Miskolci Szakképzési Centrum\
  #v(2pt)
  *SZOFTVERFEJLESZTŐ- ÉS TESZTELŐ SZAK*
])

#align(center + horizon, text(35pt, fill: orange)[
  *Trillence*
])
#align(center + horizon, text(20pt)[
  Zene streaming szolgáltatás
])

#align(right + bottom, text(10pt)[
  Bodnár István Gábor - Fekete László - Takács Krisztián
])

#align(center + bottom, text(15pt)[
  #v(10pt)
  2023-2024
])

#pagebreak()

#align(center + top, text(20pt)[
  Tartalomjegyzék
])

#set heading(numbering: "1.")

#show outline.entry.where(
  level: 1
): it => {
  v(12pt, weak: true)
  strong(it)
}

#outline(title: [],indent: auto)

#pagebreak()
#set page(numbering: "1")

= Feladatkörök

== Bodnár István Gábor
Dokumentáció, FrontEnd wireframe, grid rendszer, Frontend logika első verziói
== Fekete László
Ui megvalósítása, branding létrehozása, grafikák, frontend végső verziói
== Takács Krisztián
Backend, adatbázis, frontendben a zenelejátszó






#pagebreak()

= Fejlesztői környezet bemutatása

== Visual Studio 2022

A Visual Studio egy hatékony fejlesztői eszköz, amellyel a teljes fejlesztési ciklust egy helyen végezheti el. A Visual Studio egy átfogó integrált fejlesztőkörnyezet (IDE), amellyel kódot írhat, szerkeszthet, hibakeresést végezhet és építhet, majd telepítheti az alkalmazást. A kódszerkesztésen és hibakeresésen túl a Visual Studio tartalmaz fordítókat, kódkiegészítő eszközöket, forráskód-ellenőrzést, bővítményeket és még számos olyan funkciót, amelyek a szoftverfejlesztési folyamat minden szakaszát javítják.

== Visual Studio Code
A Visual Studio Code az egyik legelterjedtebb kódszerkesztő amely egy ingyenes és nyílt forráskódú, amely használható Windows, Linux és macOS operációs rendszereken. A program számos funkcionalitást kínál, beleértve a hibakeresést, szintaxis kiemelést, intelligens kódkiegészítést és beépített Git támogatást. A felhasználók testreszabhatják a kinézetet, gyorsbillentyű-kiosztást és telepíthetnek kiegészítőket további funkciókhoz és testreszabási lehetőségekhez.


== MySQL - phpmyadmin
A XAMPP egy összeállított, platformfüggetlen webszerver-szoftvercsomag.  Ez egy integrált rendszert alkot, mely lehetővé teszi webes alkalmazások készítését, tesztelését és futtatását egy csomagban.
A XAMPP részeként elérhető a phpMyAdmin is, mely egy ingyenes, nyílt forráskódú adminisztrációs eszköz a MySQL adatbázisok kezelésére. Ez a szoftver könnyen telepíthető és használható, és kiválóan alkalmas az adatbázisok intuitív adminisztrációjára.
A phpMyAdmin számos fontos funkciót kínál a felhasználóknak. Képes adatbázisok létrehozására, törlésére és módosítására, valamint táblák kezelésére, beleértve azok létrehozását, törlését és módosítását is. Emellett lehetőséget nyújt az egyes mezők módosítására, hozzáadására vagy törlésére, valamint SQL parancsok futtatására az adatbázisban.

#pagebreak()

= Használt technológiák

== ReactJS
A React egy ingyenes és nyílt forráskódú front-end JavaScript könyvtár, melynek fő célja komponenseken alapuló felhasználói felületek létrehozása, egyszerűen és gyorsan.
Az egyik fő előnye, hogy csak azokat a DOM-elemeket rendezi újra, amelyek megváltoztak, ezáltal elkerülve a változatlan elemek felesleges újratöltését. A React deklaratív nyelvezete lehetővé teszi a fejlesztők számára, hogy kifejezzék a kívánt végeredményt anélkül, hogy részletesen leírják a lépéseket, ami jelentős könnyebbséget jelent a weblap fejlesztés során.
A React hatékony eszköz a dinamikus  weblapok fejlesztéséhez, minimalizálva a felesleges munkát és támogatva a gyors és hatékony fejlesztési folyamatot.

== ASP.NET Web API
Az ASP.NET egy szerveroldali webalkalmazás-keretrendszer, amelyet dinamikus weboldalak létrehozására terveztek. A Microsoft fejlesztette ki annak érdekében, hogy lehetővé tegye a programozók számára dinamikus webhelyek, alkalmazások és szolgáltatások építését. Az API-k lehetővé teszik az alkalmazások közötti kommunikációt és az adatok megosztását, így segítve a fejlesztőket abban, hogy hatékony és skálázható alkalmazásokat hozzanak létre. 


== Github
A GitHub egy olyan platform, amely lehetővé teszi a fejlesztők számára, hogy hatékonyan együttműködjenek különböző szoftverfejlesztési projektekben. Alapja a Git elosztott verziókezelő rendszer, amely lehetővé teszi a fejlesztők számára, hogy nyomon kövessék a kódbázis változásait, és könnyen együtt dolgozzanak rajta. A GitHubon keresztül a fejlesztők tárolhatják, kezelhetik és megoszthatják kódjaikat, valamint nyomon követhetik a változtatásokat.

== Bootstrap CSS - FontAwesome Icons
A Bootstrap egy ingyenes és nyílt forráskódú CSS keretrendszer, melyet reszponzív frontend webfejlesztéshez terveztek. A projekt HTML, CSS és opcionálisan JavaScript alapú tervezési sablonokat kínál tipográfiához, űrlapokhoz, gombokhoz, navigációhoz és más felületi komponensekhez.A bootstrap az egyik legelterjedtebb frontend keretrendszer

== MySql

A MySQL egy népszerű, nyílt forráskódú relációs adatbázis-kezelő rendszer, melyet gyakran használnak dinamikus webhelyek szolgáltatására. Az SQL egy programozók által használt nyelv, amely lehetővé teszi relációs adatbázisok létrehozását, módosítását, adatok lekérdezését és a felhasználói hozzáférés szabályozását. A relációs adatbázisok az adatokat egy vagy több táblába szervezik, ahol az adatok kapcsolatban lehetnek egymással, ami segíti az adatok strukturálását, és kezelését.

== Npm

Az npm egy olyan csomagkezelő rendszer a JavaScript programozási nyelvhez.
A kliens segítségével lehetőség van a csomagok keresésére, telepítésére és frissítésére, a csomagok könnyen böngészhetők és kereshetők az npm weboldalán keresztül, így a fejlesztők gyorsan és hatékonyan megtalálhatják a számukra megfelelő modulokat és eszközöket.

#pagebreak()

= Deploy platform

== Linux otthoni szerver
Ha esetleg a helyi számítógépen való futtatással gondok lennének akkor a programnak egy működő verziója elérhető a következő weboldalon: #align(top + center,[
  #link("https://trillence.quatrohosting.net")[
  Trillence weboldal (katt link)]
])
== Cloudflare - Zero trust tunnel és Domain
//Yapp yapp yapp fogalmam sincs mit írtam le és helyes-e
A Cloudflare zero trust Tunnel egy biztonságos megoldást kínált nekünk. Az erőforrásaink elérhetők anélkül, hogy nyilvánosan routolható IP-címeket kellene használni. Az úgynevezett "Tunnel" segítségével a forgalom nem küldődik ki külső IP-címre, hanem egy könnyűsúlyú a "cloudflared" segítségével kimenő kapcsolatokat hoz létre a Cloudflare globális hálózatával. Ennek eredményeként HTTP és SSH kiszolgálók, távoli asztali számítógépek és más protokollok biztonságosan csatlakozhatnak a Cloudflare-hez. Ez lehetővé teszi az eredeti szerver számára, hogy kiszolgálja a Cloudflare-en keresztüli forgalmat, miközben védve van a Cloudflare-t megkerülő támadásokkal szemben.

#pagebreak()

= A Program

== A Program leírása
A Trillance egy új zenestreaming platform, melyet úgy terveztünk, hogy diszkrét megoldást kínáljunk az ingyenes zenehallgatásra, minimális helyigény mellett. Célunk, hogy bárhol és bármikor élvezhessék a felhasználók a kedvenc dalokat, anélkül, hogy az eszközeik túlzott terhelést jelentenének.

A szolgáltatásunk szerves részét képezi egy folyamatosan bővülő zenei könyvtár, melyben mindig elérhetőek az előadók legfrissebb művei. Ennek érdekében elkötelezettek vagyunk abban, hogy a legújabb zenei trendekkel és kiadványokkal mindig lépést tartva frissítsük és gazdagítsuk repertoárunkat.

Ennek a platformnak a segítségével szeretnénk lehetővé tenni, hogy a felhasználók könnyen és kényelmesen böngésszék és hallgassák meg a zenei tartalmakat. Az intuitív felületnek és a felhasználóbarát dizájnnak köszönhetően minden eszközön élvezhető lesz a Trillance szolgáltatása.

#pagebreak()

= Tájékozódás az oldalon belül

== Főoldal
Ez az oldalt a nem bejelentkezett felhasználók is megtekinthetik és lejátszathatnak zenéket is.
A főoldalon a felhasználó megtalálhatja az összes megtalálható zenéket. Ha lentebb görget a felhasználó és elér a látható lista végére akkor a "load more songs" gombal tud mégtöbbet betölteni illetve megjeleníteni. a weboldal alsó sávjában megtalálható a zenelejátszó, baloldalt pedig a navigációs menü. Telefonról nézve pedig a fenti sávban található hamburger menüvel érheti el a navigációs menüt

#image("./images/navbar.png", height: 50%)
//EBBEN VANNAK MEGFOGALMAZÁSI HIBÁK!!!!
== Zenelejátszó
A zenelejátszó a weboldal alján található.Ha a felhasználó számítógépen használja az weboldalt akkor az alsó sáv bal oldalán Az album borító, a zenecíme és az előadó neve található. 
#linebreak()
Középen találhatók a zenelejátszó iránytó gombjai, amelyek a következők balról jobbra haladva:
#linebreak()
Zene Visszaugrása
#linebreak()
Zenét 5mp-el visszatekerése
#linebreak()
Zene indítása/leállítása
#linebreak()
Zene 15mp előre léptetése
#linebreak()
Zene átugrása
#linebreak()
Ez alatt található hogy a felhasználó a zenében jelenleg hanyadik másodpercnél jár, ettől jobbra pedig egy sávval vizuálisan is megjelenítve, ha a felhasználó erre rákantint a zenét oda fogja ugrasztani.Ettől megint jobbra hogy mennyire hosszú a zene.
A sávnak a jobboldalán található a némító gomb és a hangerő szabályzó. A némító gomb ikonja vizuálisan is jelzi a zenelejátszó mennyire hangos.
#image("./Images/PC-songplayer.png", height: 100pt)
#linebreak()
Ha a felhasználó telefonon nyitja meg akkor az alsó sávon a baloldali elemek változatlanok maradnak, viszont a jobboldalon már csak a zene elindítását/leállítására való gomb található. A többi elem eléréséhez a zenesávra kattintva érhetó el. Ahol megtalálható az összes gomb amely a számítógépen is megtalálható
#image("./Images/Phoneplayer.png", height: 50%)
== Navigációs menü
A navigációs menü tartalma változik attól függően hogy a felhasználó bevan-e jelentkezve illetve van-e admin felhasználói jogosultsága
=== Kezdőlap
A "Home"-ra kattintva lehet elérni a kezdőlapot.Ezen az oldalon található az összes elérhető zene
=== Kereső
A "Search"-re kattintva lehet elérni a keresőoldalt. Az oldalon zenékre lehet keresni, amelyekre rákantintva lehet elindítani a zenét

//LEHET ÁTKELL ÍRNI AMINT MEGVAN A UI
=== Lejátszási lista
A lejetszási listát csak bejelentkezett felhasználók tekinthetik meg, mivel magukhoz a felhasználóhoz vannak hozzákötve az általuk létrehozott lejátszási lista, tehát a felhasználók egymás lejátszási listáit nem tekinthetik meg. 
A zenelistákat a "Playlist" menüpontal lehet elérni. Felül egyszerűen lehet létrehozni lejátszási listát. A "New playlist name"-be beírja a felhasználó a lejátszási lista nevét és a jobboldalon rákantint a "Create Playlist"-re, amely azonnal megjelenik.
A lejátszási lista nevére kattintva a rákantintott lejátszási lista oldalára kerül. Felül megtalálható a lejátszási lista neve és művelet gombok.
A "Play"-re kattintva elindul a lejátszási listában található zenék. A "Modify"-ra kattintva megváltoztatható a lejátszási lista neve, a "Delete"-el pedig törölhető a lejátszási lista.
Ez a menüsor alatt található meg az összes lejátszási listában található zene.Amik törölhetők is a "Delete" gombal.
Ettől a listától lentebb található az összes zene amiket az "Add" gombal hozzáadható a lejátszási listához

== Saját Profil
A "My Profile" menüpontra kattintva érhető el a felhasználó oldala. Felül egy szöveg köszönti a felhasználót. Ebben a menüben érhető el a felhasználó beállításának megváltoztatása, a profil neve és jelszava

=== Jelszó módosítása
A "Change password"-re kattintva az oldal átírányítja a felhasználót a "Reset Passowrd" oldalra, ahol először meg kell adnia a jelenleg jelszót és a kívánt jelszót, amelyet szintén meg kell erősíteni. A "Change password"-el elmenti a változtatásokat, és a felhasználó jelszava módosult. Az új jelszóri szintén vonatkoznak a jelszó formai szabályai: A jelszónak minimum 8 karaktert kell tartalmaznia, illetve tartalmaznia kell Kis- és nagybetűt, számot, és egy speciális karaktert is

=== Profilnév módosítása
A "Change username" menüpontal a weboldal átirányítja a felhasználót a "Change username" oldalra ahol ha a felhasználó beírja a kívánt új felhasználó nevet. 


== Admin panel
Az adminisztrátori panelt csak az adminisztrátori jogosultsággal rendelkező felhasználók számára elérhető. 
#linebreak()
Az első menüpontban Megváltoztatható a megadott felhasználónak,a felhasználó neve.
#linebreak()
Az azt követő menüpontban megváltoztatható egy felhasználónak a jelszava amelyet itt is meg kell erősíteni.
#linebreak()
Még lentebb törölhető a megadott felhasználó a felhasználónév megadásával
#linebreak()
Az oldal legalján pedig adminisztrátori jogosultságot ad annak a felhasználónak amely a megadott email-el regisztrált
#image("./images/adminpage.png")
== SpotDL
Ez a menüpontot csak az adminisztrátor jogosultsággal rendelkező felhasználók számára elérhető.A projektbe integráltunk egy nyílt forráskódú projektet, amivel megkönnyebbült a zenék megfelelő formátumban való letöltése, és tesztelése.
=== SpotDL Használata


== Bejelentkezés
A "Sign In" menüpontal érhető el a weboldal bejelentkező felülete ahol a felhasználó a beregisztrált felhasználó nevével és jelszavával jelentkezhet be. Amint a felhasználó bejelentkezett, onnantól elérhető számára a "Playlists" és a "My Profile" menüpontok. Ha a felhasználónak adminisztrátori jogai vannak, akkor elérhető lesz számára még a az "Admin panel" és a "SpotDl" menü.
=== Elfelejtett jelszó
Ha a felhasználó elfelejti a jelszavát, akkor a "Password" bemeneti mező alatt találhatja a "Forgot password?" gombot, amelyre rákantintva átirányítja egy újabb lapra, ahol a felhasználó email címét megadja, és a "reset passowrd" gombra kattintva a felhasználó kap az email címére egy "reset token"-t amelyet a "Reset token" bemeneti mezőbe bemásolva, és az új jelszót megadva, megváltoztathatja a jelszavát
== Regisztráció
Ha a felhasználó be akarna regisztrálni akkor a "Sign in" menüpontban az oldal alján találhatja a "Sign up" elemre kattintva elérheti a regisztrációs oldalt.
=== Regisztráció menete és követelményei
 A regisztrációs oldalon a felhasználónak meg kell adnia egy felhasználó nevet (Username), az Email címét, és a jelszavát (Password), amelyet meg is kell erősítenie. A jelszónak minimum 8 karaktert kell tartalmaznia, illetve tartalmaznia kell Kis- és nagybetűt, számot, és egy speciális karaktert is
=== E-mail megerősítés
Amint a felhasználó rákantint a "Sign up" gombra, a megadott email címre amelyet a felhasználó megadott érkezik egy email amely tartalmazza a megerősítő kódot
== Kijelentkezés
A "Sign Out" gombra kattintva a felhasználó kijelentkezik és a főoldalon landol


#pagebreak()
= Backend
A backenden futó folyamatokat és végpontok elérésében a swagger segített:
== authorization végpont:
=== register
Egy post metódust amely a felhasználó nevét, jelszavát, emailjét megkapva legenerál egy "register token" amelyet elküld a kért email címre

=== AssignRole
Egy post metódus amely az email címet és a jogosultságot megkapva megadja a m,egadott felhasználó jogosultságát

=== Login
Egy post metódus, mely a felhasználónevet és jelszót megkapva engedélyezi a bejelentkezést.

=== Change Username
Egy put metódus, mely a régi és új felhasználónevet megkapva lehetővé teszi a felhasználónév módosítását.

=== Change Password
Egy put metódus, mely a felhasználónevet, régi és új jelszót megkapva lehetővé teszi a jelszó módosítását.

=== send-reset-email
Egy post metódus, mely az email címet megkapva lehetővé teszi a jelszó visszaállításához szükséges visszaállító email elküldését.

=== reset-password
Egy put metódus, mely az email címet, új jelszót és visszaállítási tokent megkapva lehetővé teszi a jelszó visszaállítását.

=== delete-user
Egy delete metódus, mely a felhasználónevet megkapva lehetővé teszi a felhasználó törlését.

=== is-admin
Egy post metódus, mely a felhasználónevet megkapva lehetővé teszi ellenőrizni, hogy az adott felhasználó adminisztrátor-e. A frontend ezzel dönti el hogy mely navigációs menük jelenjenek meg

#image("./Images/auth.png")

#pagebreak()
== Backend végpont:
=== General CRUD végpontok
Az adatbázisban lévő összes táblára készült végpont, de mivel ezek nagyrészt ugyanazok ezért ezeket nem írnánk le részletesebben, de felsoroljuk a létező végpontokat:#linebreak()
Album
#linebreak()
Artist
#linebreak()
ArtistSong
#linebreak()
Playlist
#linebreak()
PlaylistSong
#linebreak()
Song
#linebreak()
User
#image("./Images/generalendpoints1.png", height: 50%)
#pagebreak()
=== Albumimage
Egy Get metódus amely segítségével lekéri a megadott mappából az összes albumképet
#image("./Images/backend1.png")

=== Connection
==== allsongdetails
Egy Get metódus, mely lekéri az összes albumot, az albumnak az előadóit, és végül az összes zenét és annak összes adatát
==== songdetailsbyid/Id
Egy Get metódus, mely lekéri a megadott zene neve alapján a megadott zene összes adatát
==== allplaylistdetails
Egy Get metódus, mely lekéri az összes playlistnek az összesadatát
==== allplaylistdetailsby/id
Egy Get metódus, mely lekéri a megadott playlistnek az összes adatát

=== Metadata
Ezt a metódust lefutattva az összes zenének a metadata automatikusa feltölti az adatbázisba Abból a mappából amelyet az appsettings.json-ben bevan állítva

=== Musicstreaming
==== current
Egy Get metódus, mely az alapértelmezett listából lejátsza az első számot
==== current/details
Egy Get metódus, mely lekéri a jelenleg lejátszott zenének az adatait
==== next
Egy Get metódus, mely a listát egyel nagyobb értéket ad
==== previous
Egy Get metódus, mely a listát egyel kissebb értéket ad

==== playlist/playlistid/current
Egy Get metódus, mely a megadott listából lejátsza az első számot
==== currentplaylist/playlistid/details
Egy Get metódus, mely lekéri a jelenleg lejátszott zenének az adatait
==== playlist/playlistid/next
Egy Get metódus, mely a listát egyel nagyobb értéket ad
==== playlist/playlistid/previous
Egy Get metódus, mely a listát egyel kissebb értéket ad

#image("./Images/backend3.png")

#pagebreak()

= Forrásjegyzék


#linebreak()
//Visual Studio 2022
https://learn.microsoft.com/hu-hu/visualstudio/windows/?view=vs-2022&preserve-view=true
#linebreak()
//.NET
https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0&WT.mc_id=dotnet-35129-website
#linebreak()
https://www.w3schools.com/asp/default.ASP
#linebreak()
//react
https://react.dev/learn
#linebreak()
https://www.w3schools.com/react/default.asp
#linebreak()
//typst
https://typst.app/docs/
#linebreak()
//NPM
https://docs.npmjs.com/about-npm
#linebreak()
//Bootstrap
https://getbootstrap.com/docs/5.3/getting-started/introduction/
