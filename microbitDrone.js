let servo_DT = 0
let DT = 0
let servo_ET = 0
let ET = 0
let servo_DF = 0
let DF = 0
let servo_EF = 0
let EF = 0
let horario_anti_horario = 0
let tras_frente = 0
let esquerda_direita = 0
let velocidade = 0
let ligado = false
radio.onDataPacketReceived( ({ receivedString: variavel, receivedNumber: valor }) =>  {
    if (variavel == "ON") {
        ligado = valor == 1
    } else if (variavel == "V") {
        velocidade = valor
    } else if (variavel == "ED") {
        esquerda_direita = valor
    } else if (variavel == "TF") {
        tras_frente = valor
    } else if (variavel == "HAH") {
        horario_anti_horario = valor
    }
    if (ligado == false) {
        velocidade = 0
        esquerda_direita = 0
        tras_frente = 0
        horario_anti_horario = 0
    }
    EF = velocidade + esquerda_direita + tras_frente + horario_anti_horario
    DF = velocidade - esquerda_direita + tras_frente - horario_anti_horario
    ET = velocidade + esquerda_direita - tras_frente - horario_anti_horario
    DT = velocidade - esquerda_direita - tras_frente + horario_anti_horario
})
function controlaLEDs()  {
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
}
input.onButtonPressed(Button.AB, () => {
    ligado = !(ligado)
    if (ligado) {
        EF = 50
        DF = 50
        ET = 50
        DT = 50
    }
})
radio.setGroup(1)
ligado = false
velocidade = 0
esquerda_direita = 0
tras_frente = 0
horario_anti_horario = 0
basic.forever(() => {
    if (ligado) {
        controlaLEDs()
        servo_EF = pins.map(
        EF,
        10,
        90,
        75,
        180
        )
        servo_DF = pins.map(
        DF,
        10,
        90,
        75,
        180
        )
        servo_ET = pins.map(
        ET,
        10,
        90,
        75,
        180
        )
        servo_DT = pins.map(
        DT,
        10,
        90,
        75,
        180
        )
    } else {
        basic.clearScreen()
        servo_EF = 70
        servo_DF = 70
        servo_ET = 70
        servo_DT = 70
    }
    robotbit.Servo(robotbit.Servos.S1, servo_EF)
    robotbit.Servo(robotbit.Servos.S2, servo_DF)
    robotbit.Servo(robotbit.Servos.S3, servo_ET)
    robotbit.Servo(robotbit.Servos.S4, servo_DT)
})
