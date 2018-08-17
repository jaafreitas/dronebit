let ligado = false
let velocidade = 0
input.onButtonPressed(Button.A, () => {
    velocidade = 70
})
input.onButtonPressed(Button.AB, () => {
    ligado = true
})
velocidade = 180
basic.forever(() => {
    if (ligado) {
        velocidade = pins.map(
        input.acceleration(Dimension.Y),
        -1023,
        1023,
        70,
        180
        )
    }
    pins.servoWritePin(AnalogPin.P1, velocidade)
})
