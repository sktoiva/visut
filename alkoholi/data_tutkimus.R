miehet <- read.csv("miehet.csv", sep="\t")
naiset <- read.csv("naiset.csv", sep="\t")
alkoholi <- read.csv("alkoholin_kulutus.csv", sep=";")

naiset$sukupuoli <- "Nainen"
miehet$sukupuoli <- "Mies"

jakauma_ika <- rbind(naiset, miehet)