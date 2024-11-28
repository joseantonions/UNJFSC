require("dotenv").config()
let nombre;
let apellidos;
let telefono;

const { createBot, createProvider, createFlow, addKeyword, EVENTS, CoreClass } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const { whiskeysockets } = require('@whiskeysockets/baileys')
const path = require("path")
const fs = require("fs")

const menuPath = path.join(__dirname, "mensajes", "menu.txt")//__dirname = direccion actual
const menu = fs.readFileSync(menuPath, "utf8") //leer archivo fs=cadena d etexto
// termina txt

const { delay } = require('@whiskeysockets/baileys')
const { Console } = require("console")

const flowSecundario = addKeyword(['Salir', 'salir', 'x']).addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"],
        null,
        async (ctx, { flowDynamic, endFlow }) => {
            return endFlow();
        }
    )

const flowReactualizacion = addKeyword(EVENTS.ACTION)
    .addAnswer(["Requisitos a presentar son:","📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS", "📑 ANEXO 02", "📄 DERECHO DE TRAMITE (S/1.00)", "🧾 DERECHO DE CURSO (S/80.00)"])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowReserva = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO AL DECANO DE SU FACULTAD', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 DERECHO DE RESERVA (S/50 .00) DENTRO DE LOS 30 DÍAS DE INICIO DE CLASES', '🧾 DERECHO DE RESERVA (S/70 .00) DENTRO DE LOS 60 DÍAS DE INICIO DE CLASES', '🧾 DERECHO DE RESERVA (S/100 .00) DENTRO DE LOS 90 DÍAS DE INICIO DE CLASES', '🧾 FICHA DE MATRICULA'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowCestudio = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A DECANO DE LA FACULTAD', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 DERECHO DE CURSO (S/20.00)', '👤 FOTO TAMAÑO CARNET'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowCEgresado = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS\n⚠️ *NOTA:* _Indicar el formato de entrega de la constancia en 📄físico o 📧digital😊💪', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/5.00)', '🧾 DERECHO DE CURSO (S/30.00)', '👤 FOTO TAMAÑO CARNET'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowCTercioSuperior = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS\n⚠️ *NOTA:* _Indicar el formato de entrega de la constancia en 📄físico o 📧digital😊💪', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/5.00)', '🧾 DERECHO DE CURSO (S/15.00)', '👤 FOTO TAMAÑO CARNET'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowCPMatricula = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS\n⚠️ *NOTA:* _Indicar el formato de entrega de la constancia en 📄físico o 📧digital😊💪', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 DERECHO DE CURSO (S/20.00)', '👤 FOTO TAMAÑO CARNET'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowCOmerito = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS\n⚠️ *NOTA:* _Indicar el formato de entrega de la constancia en 📄físico o 📧digital😊💪', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 DERECHO DE CURSO (S/15.00)', '👤 FOTO TAMAÑO CARNET'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowCEstudioPre = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/5.00)', '🧾 DERECHO DE CURSO (S/15.00) POR CICLO', '🧾 DERECHO DE HOLOGRAMA (S/5.00)', '👤 FOTO EN FÍSICO TAMAÑO CARNET 1 (UNO)'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowRecordAcademico = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 DERECHO DE CURSO (S/15.00)'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowRecorEconomico = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 DERECHO DE CONSTANCIA (S/15.00)'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowDevolucionDinero = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE ECONOMIA Y CONTABILIDAD', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 RECIBO DE DEVOLUCIÓN'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowRectificacioMatricula = addKeyword(EVENTS.ACTION)
    .addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE REGISTROS Y ASUNTOS ACADÉMICOS', '📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/1.00)', '🧾 DERECHO DE RECTIFICACION (S/15.00)'])
    .addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
    .addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);


const flowVerExpediente = addKeyword(EVENTS.ACTION)
    .addAnswer(['Aqui puedes ver su expediente', '🚀 https://app.unjfsc.edu.pe/tramites/'])
    .addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);

const flowConsultar = addKeyword(EVENTS.ACTION)
    .addAnswer('Un asesor estará disponible a partir de las 3:00 pm ⏰. Puede llamar al número 992 752 193 📲 para resolver sus dudas.🤔')
    .addAnswer(["Gracias por tu comprensión y paciencia! Hasta pronto 💙✨👋"]);

const flowCIngreso = addKeyword(EVENTS.ACTION)
.addAnswer(['Requisitos a presentar son:', '📝 FUT DIRIGIDO A OFICINA DE ADMISIÓN CENTRAL\n⚠️ *NOTA:* _Indicar el examen de admisión y carrera profesional de ingreso😊💪', '\n📑 ANEXO 02', '📄 DERECHO DE TRAMITE (S/5.00)', '🧾 DERECHO DE CONSTANCIA DE INGRESO DE ADMISIÓN (S/65.00)', '👤 FOTO EN FÍSICO TAMAÑO CARNET 2 (DOS)', '🔹 COPIA DE DNI'])
.addAnswer(['Aqui puedes ver los tributos a pagar ', '✨ https://unjfsc.edu.pe/download/tributos-bn-v3/'])
.addAnswer(['Listo para enviar tu expediente por facilita ','🚀 https://facilita.gob.pe/t/4528 👈'])
.addAnswer(["Muchas gracias por contactarte con ORAA🤖!", "Hasta pronto 👋"]);


const flowMenu = addKeyword(EVENTS.WELCOME).addAnswer(
    ["¡Hola!", "\n!Bienvenido/a a la Oficina de Registros y Asuntos Academicos¡ Soy ORAA, tu asesor virtual 🤖 Lun-Vie (8:00:4:00)", "💡 Comunicarte que para cualquier procedimiento deberás adjuntar:\n🚀FUT - https://unjfsc.edu.pe/download/formato-unico-de-tramite/ \n🚀Anexo 2 - https://unjfsc.edu.pe/download/anexo-n-2-de-la-directiva-de-tramites-virtuales/","\nCon finalidad de brindarte una atención personalizada, por favor indícame ¿Cuál es tu nombre?"],
    { capture: true },
    async (ctx, ctxFn) => {
        const nombre = ctx.body
        console.log(nombre)
        ctxFn.flowDynamic("🙌 Muchas gracias, " + nombre + "\nCuentame... ¿Que proceso administrativo deseas realizar con nosotros?")
    }
)
    .addAnswer(
        menu,
        { capture: true },
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
            if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "0"].includes(ctx.body)) {
                return fallBack(
                    "Respuesta no valida, por favor selecciona una de las opciones."
                );
            }
            switch (ctx.body) {
                case "1":
                    console.log("flowReactualizacion")
                    return gotoFlow(flowReactualizacion)
                case "2":
                    console.log("flowReserva")
                    return gotoFlow(flowReserva);
                case "3":
                    console.log("flowCestudio")
                    return gotoFlow(flowCestudio);
                case "4":
                    console.log("flowCEgresado")
                    return gotoFlow(flowCEgresado);
                case "5":
                    console.log("flowCTercioSuperior")
                    return gotoFlow(flowCTercioSuperior);
                case "6":
                    console.log("flowCPMatricula")
                    return gotoFlow(flowCPMatricula);
                case "7":
                    console.log("flowCOmerito")
                    return gotoFlow(flowCOmerito);
                case "8":
                    console.log("flowCEstudioPre")
                    return gotoFlow(flowCEstudioPre);
                case "9":
                    console.log("flowRecordAcademico")
                    return gotoFlow(flowRecordAcademico);
                case "10":
                    console.log("flowRecorEconomico")
                    return gotoFlow(flowRecorEconomico);
                case "11":
                    console.log("flowDevolucionDinero")
                    return gotoFlow(flowDevolucionDinero);
                case "12":
                    console.log("flowRectificacioMatricula")
                    return gotoFlow(flowRectificacioMatricula);
                case "13":
                    console.log("flowVerExpediente")
                    return gotoFlow(flowVerExpediente);
                case "14":
                        console.log("flowConsultar")
                        return gotoFlow(flowConsultar);
                case "15":
                        console.log("flowCIngreso")
                        return gotoFlow(flowCIngreso);
                case "0":
                    return await flowDynamic("Saliendo... Gracias por utilizar nuestros servicios");
            }
        }
    );


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowMenu])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

