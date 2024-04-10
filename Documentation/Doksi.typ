#set text(
  font: "Arial",
  size: 10pt,
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
  *Dokumentáció*
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