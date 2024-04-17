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

= Fejlesztői környezet bemutatása

== Visual Studio 2022

A Visual Studio egy hatékony fejlesztői eszköz, amellyel a teljes fejlesztési ciklust egy helyen végezheti el. A Visual Studio egy átfogó integrált fejlesztőkörnyezet (IDE), amellyel kódot írhat, szerkeszthet, hibakeresést végezhet és építhet, majd telepítheti az alkalmazást. A kódszerkesztésen és hibakeresésen túl a Visual Studio tartalmaz fordítókat, kódkiegészítő eszközöket, forráskód-ellenőrzést, bővítményeket és még számos olyan funkciót, amelyek a szoftverfejlesztési folyamat minden szakaszát javítják.

== Visual Studio Code



== MySQL - phpmyadmin

#pagebreak()

= Feladatkörök

== Bodnár István Gábor

== Fekete László

== Takács Krisztián

#pagebreak()

= Használt technológiák

== ReactJS

== Bootstrap CSS - FontAwesome Icons

== ASP.NET WebAPI

== Github

#pagebreak()

= Deploy platform

== Linux otthoni szerver

=== Cloudflare - Zero trust tunnel és Domain

#pagebreak()

= A Program

== A Program leírása

== A Program működése

#pagebreak()

= Tájékozódás az oldalon belül

== Főoldal

=== Zenelista

=== Lejátszó

== Keresés

=== Keresőmező

=== Keresési eredmények

== Bejelentkezés

=== Bejelentkezés menete

=== Elfelejtett jelszó

=== Átirányítás a Regisztrációs oldalra

== Regisztráció

=== Regisztráció menete és követelményei

=== E-mail megerősítés

== Kijelentkezés

== Lejátszási listák

=== Lejátszási listák kezelése

== SpotDL

=== SpotDL Használata

== Saját Profil

=== Profilnév módosítása

=== Jelszó módosítása

=== Összes lejátszási lista törlése

=== Profil törlése 

#pagebreak()

= Tesztelés

=== nUnit tesztek

=== ReactJS JEST tesztek

=== Lighthouse teljesítmény eredmények





