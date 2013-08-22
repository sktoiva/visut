#Ladataan ggplot-plotteja varten
library(ggplot2)


miehet <- read.csv("miehet.csv", sep="\t")
naiset <- read.csv("naiset.csv", sep="\t")
alkoholi <- read.csv("alkoholin_kulutus.csv", sep=";")

naiset$sukupuoli <- "Nainen"
miehet$sukupuoli <- "Mies"

jakauma_ika <- rbind(naiset, miehet)

#Jaetaan nuoret ja aikuiset mielivaltaisesti 0-19 ja 19-  -luokkiin
jakauma_ika$nuoret <- jakauma_ika[,3]+jakauma_ika[,4]+jakauma_ika[,5]+jakauma_ika[,6]
jakauma_ika$aikuiset <- jakauma_ika$Ikaluokat.yhteensa - jakauma_ika$nuoret
#Lasketaan suhdeluku, jos tarvii
jakauma_ika$suhde <- jakauma_ika$aikuiset/jakauma_ika$Ikaluokat.yhteensa

#Piirretään kuvaaja aiheesta ggplot2:lla
ggplot(jakauma_ika, aes( x = Vuosi, y = suhde, color = sukupuoli, group=sukupuoli)) +
  geom_line()


