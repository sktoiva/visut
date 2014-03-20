library(stringr)
library(ggplot2)
library(data.table)

tilasto <- read.csv("kausi0910.csv", sep="\t", colClasses = "character")

tilasto$Ottelu <- as.character(tilasto$Ottelu)

tilasto <- cbind.data.frame(tilasto,str_split_fixed(string = tilasto$Ottelu, pattern = ' - ', n = 2 ))

tilasto <- cbind.data.frame(tilasto,str_split_fixed(string = tilasto$Tulos, pattern = '-', n = 2 ))

colnames(tilasto)[9:10] <- c("Joukkue1", "Joukkue2")
colnames(tilasto)[11:12] <- c("Tulos1", "Tulos2")

tilasto <- tilasto[,c("X.", "Pvm","Ottelu","Tulos", "JA.VL","Joukkue1", "Joukkue2", "Tulos1", "Tulos2")]

tilasto$Tulos1 <- as.numeric(as.character(tilasto$Tulos1))
tilasto$Tulos2 <- as.numeric(as.character(tilasto$Tulos2))
head(tilasto)

tilasto$Pisteet1 <- ifelse(tilasto$Tulos1 > tilasto$Tulos2,
                           ifelse(tilasto$JA.VL %in% c("JA", "VL"), 
                                  2, 3),
                          ifelse(tilasto$JA.VL %in% c("JA", "VL"), 
                                  1, 0))

tilasto$Pisteet2 <- 3- tilasto$Pisteet1

#For checking that Pisteet2 is ok, the summary should print only zeroes

# tilasto$Pisteet22 <- ifelse(tilasto$Tulos2 > tilasto$Tulos1,
#                            ifelse(tilasto$JA.VL %in% c("JA", "VL"), 
#                                   2, 3),
#                            ifelse(tilasto$JA.VL %in% c("JA", "VL"), 
#                                   1, 0))
# 
# summary(tilasto$Pisteet2-tilasto$Pisteet22)

head(tilasto)
tilasto$X. <- as.numeric(row.names(tilasto))

tilasto1 <- tilasto[,c("X.", "Joukkue1","Pisteet1")]
tilasto2 <- tilasto[,c("X.", "Joukkue2","Pisteet2")]

names(tilasto1) <- c("Id", "Joukkue", "Pisteet")
names(tilasto2) <- c("Id", "Joukkue", "Pisteet")

tilasto_pisteet <- rbind(tilasto1,tilasto2)
head(tilasto_pisteet)

tilasto_pisteet <- data.table(tilasto_pisteet)

tilasto_pisteet$ottelu_apuid <- 1
tilasto_pisteet[order(Id), cumulative := cumsum(Pisteet), 
                by = list(Joukkue)]
tilasto_pisteet[order(Id), count := cumsum(ottelu_apuid), 
                by = list(Joukkue)]

tilasto_pisteet[order(-cumulative), 
                place := cumsum(ottelu_apuid), by = list(count)]

#Plot the crude parallel coordinate graph

ggplot(subset(tilasto_pisteet, count %in% c(15,58)), 
       aes(x = count, y = place, group = Joukkue,
           color = Joukkue)) +
  geom_line() + theme_bw() + 
  scale_y_reverse() + scale_color_discrete(guide=F) +
  geom_text(data=subset(tilasto_pisteet, count %in% c(58)),  aes(x = count, y = place, label = Joukkue,
                                                            color = Joukkue)) 

ggplot(tilasto_pisteet, aes(x = Id, y = cumulative, group = Joukkue, color = Joukkue)) + geom_line()