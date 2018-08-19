let velocidade = 0
let ligado = false
input.onButtonPressed(Button.AB, () => {
    ligado = !(ligado)
    if (ligado) {
        basic.showIcon(IconNames.Yes)
    } else {
        velocidade = 70
        basic.clearScreen()
    }
})
ligado = false
velocidade = 180
basic.showIcon(IconNames.Target)
basic.pause(2000)
velocidade = 70
basic.clearScreen()
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
    pins.servoWritePin(AnalogPin.P0, velocidade)
    pins.servoWritePin(AnalogPin.P1, velocidade)
})
