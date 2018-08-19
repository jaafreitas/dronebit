let DT = 0
let ET = 0
let DF = 0
let EF = 0
let tras_frente = 0
let horario_anti_horario = 0
let velocidade = 0
let esquerda_direita = 0
let ligado = false
input.onButtonPressed(Button.AB, () => {
    if (ligado) {
        ligado = false
        velocidade = 0
    } else {
        ligado = true
        velocidade = 50
    }
    esquerda_direita = 0
    horario_anti_horario = 0
    tras_frente = 0
})
radio.setGroup(1)
velocidade = 0
esquerda_direita = 0
tras_frente = 0
horario_anti_horario = 0
ligado = false
basic.forever(() => {
    if (ligado) {
        if (input.buttonIsPressed(Button.A)) {
            horario_anti_horario = input.acceleration(Dimension.X) / 50
        } else if (input.buttonIsPressed(Button.B)) {
            velocidade = 50 - input.acceleration(Dimension.Y) / 50
        } else {
            tras_frente = input.acceleration(Dimension.Y) / 50
            esquerda_direita = input.acceleration(Dimension.X) / 50
        }
        EF = velocidade + esquerda_direita + tras_frente + horario_anti_horario
        DF = velocidade - esquerda_direita + tras_frente - horario_anti_horario
        ET = velocidade + esquerda_direita - tras_frente - horario_anti_horario
        DT = velocidade - esquerda_direita - tras_frente + horario_anti_horario
        led.plotBrightness(0, 0, pins.map(
        EF,
        10,
        90,
        10,
        255
        ))
        led.plotBrightness(4, 0, pins.map(
        DF,
        10,
        90,
        10,
        255
        ))
        led.plotBrightness(0, 4, pins.map(
        ET,
        10,
        90,
        10,
        255
        ))
        led.plotBrightness(4, 4, pins.map(
        DT,
        10,
        90,
        10,
        255
        ))
        radio.sendValue("ON", 1)
    } else {
        basic.clearScreen()
        radio.sendValue("ON", 0)
    }
    radio.sendValue("V", velocidade)
    radio.sendValue("ED", esquerda_direita)
    radio.sendValue("TF", tras_frente)
    radio.sendValue("HAH", horario_anti_horario)
})
