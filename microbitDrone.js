let velocidade_max = 0
let velocidade_min = 0
let horario_anti_horario = 0
let tras_frente = 0
let esquerda_direita = 0
let ligado = false
let velocidade = 0
radio.onDataPacketReceived( ({ receivedString: variavel, receivedNumber: valor }) =>  {
    if (variavel == "V") {
        velocidade = valor
    } else if (variavel == "ED") {
        esquerda_direita = valor
    } else if (variavel == "TF") {
        tras_frente = valor
    } else if (variavel == "HAH") {
        horario_anti_horario = valor
    }
    led.plotBrightness(0, 0, velocidade + esquerda_direita + tras_frente + horario_anti_horario)
    led.plotBrightness(4, 0, velocidade - esquerda_direita + tras_frente - horario_anti_horario)
    led.plotBrightness(0, 4, velocidade + esquerda_direita - tras_frente - horario_anti_horario)
    led.plotBrightness(4, 4, velocidade - esquerda_direita - tras_frente + horario_anti_horario)
})
radio.setGroup(1)
ligado = false
velocidade = 0
velocidade_min = 50
velocidade_max = 200
esquerda_direita = 0
horario_anti_horario = 0
tras_frente = 0
