#Ladataan ggplot-plotteja varten ja reshape, plyr muokkausta varten
library(ggplot2)
library(reshape)
library(plyr)

miehet <- read.csv("miehet.csv", sep="\t")
naiset <- read.csv("naiset.csv", sep="\t")
alkoholi <- read.csv("alkoholin_kulutus.csv", sep=";")

#Lisätään sukupuoli ja yhdistetään dataframet
naiset$sukupuoli <- "Nainen"
miehet$sukupuoli <- "Mies"
jakauma_ika <- rbind(naiset, miehet)

#Muokataaon kolumnien otsikoista muuttujia yhteen kolumniin melt-funktiolla
jakauma.m <- melt(jakauma_ika, id.vars=c("sukupuoli", "Vuosi", "Ikaluokat.yhteensa"))

#Varmistetaan että kaikki ovat saman muotoisia
jakauma.m$variable <- ifelse(jakauma.m$variable == "X85..", "X85...120", as.character(jakauma.m$variable))

#Puristetaan "variable" kentästä ylä- ja alarajat, ldply käytössä, sillä muuten strsplit
#ei osaa palauttaa vektoria, substr poistaa "X":n
jakauma.m$min_ika <- substr(ldply(strsplit(jakauma.m$variable,split="[.]"))[,1],2,
                            stop=nchar(ldply(strsplit(jakauma.m$variable,split="[.]"))))
  
jakauma.m$max_ika <- ldply(strsplit(jakauma.m$variable,split="[.]"))[,4]

#Summataan yli sukupuolien
jakauma.agg <- aggregate( cbind(Ikaluokat.yhteensa, value) ~ Vuosi*min_ika*max_ika,
                          jakauma.m,
                          FUN = sum)


#Tehdään funktio, jolle voi syöttää ikärajan "raja", jonka avulla haluaa analysoida tuloksia

kulutus <- function(raja) {
jakauma.agg$indikaattori <- ifelse(as.numeric(jakauma.agg$min_ika) < raja, "Nuori", "Aikuinen")

#Lasketaan ryhmien koot
ikajakauma <- aggregate( value ~ Ikaluokat.yhteensa*Vuosi*indikaattori, jakauma.agg, FUN=sum)

#ja suhteellinen osuus
ikajakauma$suhde <- ikajakauma$value/ikajakauma$Ikaluokat.yhteensa

#Katsotaan kuvaajaa aiheesta, pitäisi summautua ykköseen koko ajan
ggplot(ikajakauma, aes( x = Vuosi, y = suhde, color=indikaattori, group=indikaattori)) +
  geom_line() +
  theme_bw()

#Nimetään yksinkertaisemmiksi alkoholi -dataframen kolumnit
names(alkoholi) <- c("Vuosi", "Tilastoitu", "Tilastoimaton", "Kokonais")

#Mergataan, huom. ilman optioita mergataan vain rivit jotka löytyy molemmista (nyt "Vuosi"
# on yhteinen kolumni)
alkoholi_kokonais <- merge(alkoholi, ikajakauma)

#Aiemmin suhde = aikuiset / kaikki. Raportoitu alkoholin kulutus on alkoholi / kaikki
#Haluamme alkoholi/aikuiset, joten alkoholi/kaikki / suhde  on oikea tapa laskea tämä

viimeisin_kulutus <- as.numeric(tail(subset(alkoholi_kokonais, indikaattori=="Aikuinen")["Kokonais"],1)/
  tail(subset(alkoholi_kokonais, indikaattori=="Aikuinen")["suhde"],1))

ggplot(subset(alkoholi_kokonais, indikaattori=="Aikuinen"), aes(x = Vuosi, y = Kokonais/suhde)) +
  geom_line() +
  theme_bw() +
  scale_y_continuous(breaks=c(4,5,6,7,8,9,10,11,12,13)) + 
  geom_hline(yintercept=viimeisin_kulutus, linetype="dashed") +
  ggtitle("Alkoholinkulutus täysi-ikäistä kohden") +
  ylab("Kulutus litraa per aikuinen") 

}

#Esimerkki
#kulutus(14)