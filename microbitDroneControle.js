let velocidade_max = 0
let tras_frente = 0
let horario_anti_horario = 0
let esquerda_direita = 0
let velocidade_min = 0
let ligado = false
let velocidade = 0
input.onButtonPressed(Button.AB, () => {
    if (ligado) {
        ligado = false
        velocidade = 0
    } else {
        ligado = true
        velocidade = 100
    }
    esquerda_direita = 0
    horario_anti_horario = 0
    tras_frente = 0
})
radio.setGroup(1)
velocidade_min = 50
velocidade_max = 200
esquerda_direita = 0
horario_anti_horario = 0
tras_frente = 0
ligado = false
velocidade = 0
basic.forever(() => {
    if (ligado) {
        // viro horário e anti-horário
        if (input.buttonIsPressed(Button.A)) {
            horario_anti_horario = input.acceleration(Dimension.X) / 10
        } else if (input.buttonIsPressed(Button.B)) {
            velocidade = 100 - input.acceleration(Dimension.Y) / 10
        } else {
            tras_frente = input.acceleration(Dimension.Y) / 10
            esquerda_direita = input.acceleration(Dimension.X) / 10
        }
    }
    radio.sendValue("V", velocidade)
    radio.sendValue("ED", esquerda_direita)
    radio.sendValue("TF", tras_frente)
    radio.sendValue("HAH", horario_anti_horario)
    led.plotBrightness(0, 0, velocidade + esquerda_direita + tras_frente + horario_anti_horario)
    led.plotBrightness(4, 0, velocidade - esquerda_direita + tras_frente - horario_anti_horario)
    led.plotBrightness(0, 4, velocidade + esquerda_direita - tras_frente - horario_anti_horario)
    led.plotBrightness(4, 4, velocidade - esquerda_direita - tras_frente + horario_anti_horario)
    basic.pause(100)
})
