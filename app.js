const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['8', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowSI = addKeyword(['1', 'aceptaacuerdo', 'aceptaacuerdo']).addAnswer(
    [
        '🗓️Horario de atención: Lunes a Viernes 7:00-18:00, Sábados 08:00-12:00 Hora Colombia.',
        'En un momento será transferido a uno de nuestros agentes 😊',
    


    ],
    null,
    null,
    [flowSecundario]
)

const flowNO = addKeyword(['2', 'tuto']).addAnswer(
    [
        '😥 lo sentimos no dudes en escribirnos.',
       
    ],
    null,
    null,
    [flowSecundario]
)


const flowPrincipal = addKeyword(['hola', 'buenos dias', 'buenas tardes' , 'buenas noches', 'Hola','Buenas dias','Buenas tardes','Buenas Noches'])
    .addAnswer('¡bienvenido a contabilidadmasfinanzas!👋')
    .addAnswer(
        [
            'Acepta la política de tratamiento de datos personales?😊',
            'Según  la ley 1581 de 2012 de protección de datos personales.',

            '1 *SI*',
            '2 *NO*',
        ],
        null,
        null,
        [flowSI, flowNO]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
