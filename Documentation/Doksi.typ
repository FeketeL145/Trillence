#set text(
  font: "Arial",
  size: 13pt,
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
Gábor feladata volt a dokumentáció szerkezetének létrehozása, a kiinduló UI design megtervezése, és a Frontend logika első verzióinak a létrehozása. Továbbá segítséget nyújtott a Trello menedzselésében és naprakészentartásában.

== Fekete László
László feladata volt létrehozni a végleges felhasználói felületet, ebbe beleértve a komplexebb logikát és a különböző komponenseket is.
A feladatkörébe még beletartozott a branding létrehozása is, ezen belül a grafikák és a logók elkészítése.
== Takács Krisztián
Krisztián feladata volt az Adatbázis megtervezése, és ennek vezérlése a Backend szerverrel.
Több végpontot hozott létre amelyek szilárd alapot fektettek le a projekt többi részének a megoldásához, továbbá dolgozott a felhasználói felület logikáján is, a zenelejátszó és a lejátszási listák az ő nevéhez köthetőek.

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
A GitHub egy olyan platform, amely lehetővé teszi a fejlesztők számára, hogy hatékonyan együttműködjenek különböző szoftverfejlesztési projektekben. Alapja a Git elosztott verziókezelő rendszer, amely lehetővé teszi a fejlesztők számára, hogy nyomon kövessék a kódbázis változásait, és könnyen együtt dolgozzanak rajta. A GitHubon keresztül a fejlesztők tárolhatják, kezelhetik és megoszthatják kódjaikat, valamint nyomon követhetik a változtatásokat. A fejlesztés megkövetelte, hogy használjuk az eszközt.

== Bootstrap CSS - FontAwesome Icons
A Bootstrap egy ingyenes és nyílt forráskódú CSS keretrendszer, melyet reszponzív frontend webfejlesztéshez terveztek. A projekt HTML, CSS és opcionálisan JavaScript alapú tervezési sablonokat kínál tipográfiához, űrlapokhoz, gombokhoz, navigációhoz és más felületi komponensekhez. Azért választottuk, mivel a bootstrap az egyik legelterjedtebb és legkönyebben használható keretrendszer manapség.

== MySql

A MySQL egy népszerű, nyílt forráskódú relációs adatbázis-kezelő rendszer, melyet gyakran használnak dinamikus webhelyek szolgáltatására. Az SQL egy programozók által használt nyelv, amely lehetővé teszi relációs adatbázisok létrehozását, módosítását, adatok lekérdezését és a felhasználói hozzáférés szabályozását. A relációs adatbázisok az adatokat egy vagy több táblába szervezik, ahol az adatok kapcsolatban lehetnek egymással, ami segíti az adatok strukturálását, és kezelését.

== Npm

Az npm egy olyan csomagkezelő rendszer a JavaScript programozási nyelvhez.
A kliens segítségével lehetőség van a csomagok keresésére, telepítésére és frissítésére, a csomagok könnyen böngészhetők és kereshetők az npm weboldalán keresztül, így a fejlesztők gyorsan és hatékonyan megtalálhatják a számukra megfelelő modulokat és eszközöket.

#pagebreak()



= A Program

== A Program leírása
A Trillence egy új Zenestreaming platform, amelyet arra terveztünk, hogy egy diszkrét és ingyenes zenelejátszási megoldást kínáljon a felhasználóinknak. Az oldal akár regisztráció nélkül is elérhető. 

A szolgáltatásunk szerves részét képezi egy folyamatosan bővülő zenei könyvtár, melyben mindig elérhetőek az előadók legfrissebb művei. Ennek érdekében elkötelezettek vagyunk abban, hogy a legújabb zenei trendekkel és kiadványokkal mindig lépést tartva frissítsük és gazdagítsuk repertoárunkat.

== Deploy platform és Publikáció

=== Linux otthoni szerver
A weboldalunkat egy saját futtatású Linux ubuntu alapú szerverre deploy-oltuk (publikáltuk), ami a Cloudflare Zero trust tunnel-el lett kifordítva az internet felé a biztonságos adatáramlás érdekében.
Ezen a linux szerveren futtatjuk az Adatbázisunkat, a Backend szervert és a Frontend-et is.
Az alábbi linkkel elérhető az oldalunk megtekintésre:

 #align(top + center,[
  #link("https://trillence.quatrohosting.net")[
  trillence.quatrohosting.net]
])
=== Cloudflare - Zero trust tunnel és Domain

A Cloudflare zero trust Tunnel egy biztonságos megoldást kínált nekünk. Az erőforrásaink elérhetők anélkül, hogy nyilvánosan routolható IP-címeket kellene használni. Ezt a Cloudflared teszi biztonságossá, amely lehetővé teszi, hogy a Cloudflare saját szerverein keresztül továbbítsa a tartalmunkat, egy proxy-val védett DNS-en át.

#pagebreak()

= Tájékozódás az oldalon belül

== Főoldal

#align(center)[
  Ezt az oldalt a nem bejelentkezett felhasználók is megtekinthetik és lejátszathatnak zenéket is. A főoldalon a felhasználó megtalálhatja az összes zenét egy listában.
]

#image("./images/Homepage-trillence.png")
#grid(
  columns: (1fr, 1fr),
  align(left + horizon)[
    A zenék lejátszhatók a "Play" ikonra kattintva, mely megjeleníti az oldal alján a zenelejátszót. Ha a felhasználó be van jelentkezve, akkor a létrehozott lejátszási listákba is hozzáadhatja a zeneszámot az "Add" ikonra való kattintással.
  ],
  align(left + horizon)[
    #image("./images/singlesong.png")
  ]
)

#grid(
  columns: (1fr, 1fr),
  align(left + horizon)[
    #image("./images/Homepage-songs.png")
  ],
  align(left + horizon)[
    A felhasználói élmény javítása érdekében csak 16 számot jelenítünk meg oldalanként. A felhasználó a "Load more songs" gombra kattintva érheti el a többi zeneszámot.
  ]
)

#grid(
  columns: (1fr, 1fr),
  align(left + horizon)[
    Bal oldalt megtalálható a navigációs menü, amellyel navigálhatunk az oldalon belül. Mobiltelefonon ez a navigációs menü egy hamburgermenü-vé alakul, amelynek a megnyomásakor el lehet érni a menüpontokat.
  ],
  align(right)[
    #image("./images/navbar.png", height: 45%)
  ]
)
//EBBEN VANNAK MEGFOGALMAZÁSI HIBÁK!!!!
== Zenelejátszó
A zenelejátszó a weboldal alján található.Ha a felhasználó számítógépen használja az weboldalt akkor az alsó sáv bal oldalán Az album borító, a zenecíme és az előadó neve található. 
#linebreak()
Középen találhatók a zenelejátszó iránytó gombjai, amelyek a következők balról jobbra haladva:
#linebreak()
#grid(
  columns: (1fr, 1fr),
  align(left)[
    Zene Visszaléptetése
    #linebreak()
    Zene visszatekerése 10 másodperccel
    #linebreak()
    Zene elindítása/megállítása
    #linebreak()
    Zene előretekerése 10 másodperccel
    #linebreak()
    Zene átugrása
  ],
  align(right + horizon)[
    #image("./images/musicplayerbuttons.png")
  ]
)
Ez alatt található, hogy a felhasználó a zenében jelenleg hanyadik percnél és másodpercnél jár, ettől jobbra pedig egy sávval vizuálisan is megjelenítve, ha a felhasználó erre rákattint a zenét arra a pontra lépteti, és ettől az elemtől jobbra található a zene teljes hossza is.



#grid(
  columns: (1fr,1fr),
  align(left)[
A sávnak a jobboldalán található a némító gomb és a hangerő szabályzó. A némító gomb ikonja vizuálisan is jelzi a zenelejátszó jelenlegi hangerejét.
  ],
  align(center + horizon)[
    #image("./Images/volumebutton.png")
  ]
)
#linebreak()

#grid(
  columns: (1fr,1fr),
  align(left + horizon)[
Ha a felhasználó telefonon nyitja meg akkor az alsó sávon a baloldali elemek változatlanok maradnak, viszont a jobboldalon már csak a zene elindítását/leállítására való gomb található. A többi elem eléréséhez a zenesávra kattintva érhetó el. Ahol megtalálható az összes gomb amely a számítógépen is megtalálható
  ], align(center + horizon)[

#image("./Images/Phoneplayer.png", height: 40%)
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
== Navigációs menü

A navigációs menü tartalma változik attól függően hogy a felhasználó be van jelentkezve illetve rendelkezik admin felhasználói jogosultsággal.
],
  align(center + horizon)[
    #image("./Images/navbar.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Kezdőlap

A "Home"-ra kattintva lehet elérni a kezdőlapot. Ezen az oldalon található az összes elérhető zene.
],
  align(center + horizon)[
    #image("./Images/Homepage-Songs.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Kereső

A "Search"-re kattintva lehet elérni a keresőoldalt. Az oldalon zenékre lehet keresni, amelyekre rákattintva lehet elindítani, vagy egy lejátszási listához hozzáadni a zenét.
],
  align(center + horizon)[
    #image("./Images/search.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Lejátszási lista

A lejetszási listát csak bejelentkezett felhasználók tekinthetik meg, mivel magukhoz a felhasználóhoz vannak hozzákötve az általuk létrehozott lejátszási listák, tehát a felhasználók egymás lejátszási listáit nem láthatják.
A zenelistákat a "Playlist" menüponttal lehet elérni. Felül egyszerűen lehet létrehozni lejátszási listát. A "New playlist name"-be beírja a felhasználó a lejátszási lista nevét és a jobboldalon rákattint a "Create Playlist"-re, amely azonnal megjelenik.
A lejátszási lista nevére kattintva a rákattintott lejátszási lista oldalára kerül.
],
  align(center + horizon)[
    #image("./Images/playlists.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
Felül megtalálható a lejátszási lista neve és a műveleti gombok.
A "Play"-re kattintva elindulnak a lejátszási listában található zenék. A "Rename"-re kattintva megváltoztatható a lejátszási lista neve, a "Delete"-el pedig törölhető a lejátszási lista.
Ez a menüsor alatt található meg az összes lejátszási listában található zene. Amik törölhetők is a "Delete" gombbal.
A lejátszási listába a zenéket a kezdő, vagy a keresőlapon található zenéknél a + jelre kattintva, adhatjuk hozzá.
],
  align(center + horizon)[
    #image("./Images/singleplaylist.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
== Saját Profil

A "My Profile" menüpontra kattintva érhető el a felhasználó oldala. Felül egy szöveg köszönti a felhasználót. Ebben a menüben érhető el a felhasználó beállításának megváltoztatása, a profil neve és jelszava
],
  align(center + horizon)[
    #image("./Images/profilesettings.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Jelszó módosítása

A "Change password"-re kattintva az oldal átírányítja a felhasználót a "Reset Passowrd" oldalra, ahol először meg kell adnia a jelenleg jelszót és a kívánt jelszót, amelyet szintén meg kell erősíteni. A "Change password"-el elmenti a változtatásokat, és a felhasználó jelszava módosul. Az új jelszóra szintén vonatkoznak a jelszó formai szabályai: A jelszónak minimum 8 karaktert kell tartalmaznia, illetve tartalmaznia kell kis és nagybetűt, számot, és egy speciális karaktert is.
],
  align(center + horizon)[
    #image("./Images/resetpassword.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Profilnév módosítása

A "Change username" menüponttal a weboldal átirányítja a felhasználót a "Change username" oldalra ahol ha a felhasználó beírja a kívánt új felhasználó nevet. 
],
  align(center + horizon)[
    #image("./Images/changeusername.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
== Admin panel

Az admin panelt csak az adminisztrátori jogosultsággal rendelkező felhasználók használhatják. 
#linebreak()
Az első menüpontban megváltoztatható a megadott felhasználónak ,a felhasználó neve.
#linebreak()
Az azt követő menüpontban megváltoztatható egy felhasználónak a jelszava.
#linebreak()
Még lentebb törölhető a megadott felhasználó a felhasználónév megadásával.
#linebreak()
Az utolsó előtti menüpont pedig adminisztrátori jogosultságot ad annak a felhasználónak amely a megadott email-el regisztrált.
#linebreak()
Az utolsó menüpont a backend szerver zene adatainak beolvasására, és feltöltésére szolgál az adatbázisban.
],
  align(center + horizon)[
    #image("./Images/adminpage.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
    
== SpotDL

Ez a menüpont csak adminisztrátor jogosultsággal rendelkező felhasználók számára elérhető. A projektbe integráltunk egy nyílt forráskódú projektet, amivel megkönnyebbült a zenék megfelelő formátumban való letöltése, és tesztelése.
],
  align(center + horizon)[
    #image("./Images/spotdl.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
== Bejelentkezés

A "Sign In" menüpontal érhető el a weboldal bejelentkező felülete ahol a felhasználó a beregisztrált felhasználó nevével és jelszavával jelentkezhet be. Amint a felhasználó bejelentkezett, onnantól elérhető számára a "Playlists" és a "My Profile" menüpontok. Ha a felhasználónak adminisztrátori jogai vannak, akkor elérhető lesz számára még a az "Admin panel" és a "SpotDl" menü.
],
  align(center + horizon)[
    #image("./Images/login.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Elfelejtett jelszó

Ha a felhasználó elfelejti a jelszavát, akkor a "Password" bemeneti mező alatt találhatja a "Forgot password?" gombot, amelyre rákattintva átirányítja egy újabb lapra, ahol a felhasználó email címét megadja, és a "reset password" gombra kattintva a felhasználó kap az email címére egy "reset token"-t amelyet a "Reset token" bemeneti mezőbe bemásolva, és az új jelszót megadva, megváltoztathatja a jelszavát.
],
  align(center + horizon)[
    #image("./Images/forgotpassword.png")
  ]
)
== Regisztráció
Ha a felhasználó fel kíván regisztrálni akkor a "Sign in" menüpontban az oldal alján találhatja a "Sign up" elemre kattintva elérheti a regisztrációs oldalt.
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Regisztráció menete és követelményei

 A regisztrációs oldalon a felhasználónak meg kell adnia egy felhasználó nevet (Username), az email címét, és a jelszavát (Password), amelyet meg is kell erősítenie. A jelszónak minimum 8 karaktert kell tartalmaznia, illetve tartalmaznia kell kis és nagybetűt, számot, és egy speciális karaktert is.
 ],
  align(center + horizon)[
    #image("./Images/register.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== E-mail megerősítés
Amint a felhasználó rákattint a "Sign up" gombra, a megadott email címre amelyet a felhasználó megadott érkezik egy email, amely tartalmazza a megerősítő kódot, ami az email cím hitelesítéséhez szükséges.
],
  align(center + horizon)[
    #image("./Images/email.png")
  ]
)
== Kijelentkezés
A "Sign Out" gombra kattintva a felhasználó kijelentkezik és átirányítódik a főoldalra.


#pagebreak()
= Backend
A backenden tesztelésében és a végpontok elérésében a swagger segített:
#grid(
  columns: (1fr,1fr),
  align(left)[
== authorization végpont:
=== register
A felhasználó nevét, jelszavát, emailjét megkapva legenerál egy hat számjegyű kódot, majd elküldi emailben. Ezzel a kóddal tudja regisztáláskor a felhasználó magát érvényesíteni.

=== AssignRole
Az email címet és a jogosultságot megkapva hozzárendeli a megadott felhasználó jogosultságát.

=== Login
A felhasználónevet és jelszót megkapva engedélyezi a bejelentkezést.

=== Change Username
A régi és új felhasználónevet megkapva módosítja a felhasználónevet.

=== Change Password
A felhasználónevet, régi és új jelszót megkapva módosítja a felhasználó jelszavát.

=== send-reset-email
Az email címet megkapva elküldi a jelszó cseréjéhez szükséges emailt.

=== reset-password
Az email címet, új jelszót és visszaállítási tokent megkapva lehetővé teszi a jelszó kicserélését.

=== delete-user
A felhasználónevet megkapva törli a megadott felhasználót.

=== is-admin
A felhasználónevet megkapva ellenőrzi a megadott felhasználó jogosultsági szintét.
],
  align(center + horizon)[
    #image("./Images/auth.png")
  ]
)

== Backend végpontok:
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Általános CRUD végpontok
Az adatbázisban lévő összes táblára készült végpont, melyek az adatok létehozására, törlésére, módosítására, lekérdezésére alkalmasok, de mivel ezek nagyrészt ugyanazok ezért ezeket nem írnánk le részletesebben, viszont felsoroljuk a létező végpontokat:#linebreak()
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
],
  align(center + horizon)[
    #image("./Images/generalendpoints1.png")
  ]
)
#pagebreak()
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Albumimage
A megadott albumnév alapján streameli az album képet.
],
  align(center + horizon)[
    #image("./Images/backend1.png")
  ]
)
#grid(
  columns: (1fr,1fr),
  align(left)[
=== Connection
==== allsongdetails
Lekéri az összes zenét, és a hozzátartozó adatokat.
==== songdetailsbyid/Id
Lekéri a megadott zene azonosítója alapján a megadott zene összes adatát.
==== songdetailsbyname/songName
Lekéri a megadott zene neve alapján a megadott zene összes adatát.
==== allplaylistdetails
Lekéri az összes lejátszási listának az összes adatát.
==== allplaylistdetailsbyid/id
Lekéri a megadott lejátszási lista azonosítója alapján a lista összes adatát.
==== allplaylistdetailsbyusername/username
Lekéri a megadott lejátszási lista azonosítója alapján a lista összes adatát.

=== Metadata
Ez a metódus a felhasználó zene mappájából feltölti az összes .mp3 fájlt, és annak adatait az adatbázisba, illetve létrehozza az album képfájlokat.

=== Musicstreaming
==== current
Az alapértelmezett listából lejátssza az első számot, vagy azt, ahol a lejátszás éppen tart.
==== current/details
Lekéri a jelenleg lejátszott zenének az adatait.
==== next
Eggyel megemeli a currentIndex értékét, ezzel streamelve a következő zenét a zenei listából.
==== previous
Eggyel csökkenti a currentIndex értékét, ezzel streamelve az előző zenét a zenei listából.
==== playlist/playlistid/current
A megadott lejátszási listából lejátsza az első számot, vagy azt, ahol a lejátszás éppen tart.
==== currentplaylist/playlistid/details
Lekéri a jelenleg lejátszott lejátszási listában lévő zenének az adatait.
==== playlist/playlistid/next
Lejátssza a megadott lejátszási lista következő zenéjét.
==== playlist/playlistid/previous
Lejátssza a megadott lejátszási lista előző zenéjét.
==== stream
Egy zene bekérésével streameli a megadott zenét.

],
  align(center + horizon)[
    #image("./Images/backend3.png")
  ]
)

#pagebreak()

= Forrásjegyzék


#linebreak()
== Visual Studio 2022
https://learn.microsoft.com/hu-hu/visualstudio/windows/?view=vs-2022&preserve-view=true
#linebreak()
== ASP.NET Core Web API
https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0&WT.mc_id=dotnet-35129-website
#linebreak()
https://www.w3schools.com/asp/default.ASP
#linebreak()
== ReactJS
https://react.dev/learn
#linebreak()
https://www.w3schools.com/react/default.asp
#linebreak()
== Typst
https://typst.app/docs/
#linebreak()
== NPM
https://docs.npmjs.com/about-npm
#linebreak()
== Bootstrap
https://getbootstrap.com/docs/5.3/getting-started/introduction/