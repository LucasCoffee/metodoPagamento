const express = require("express");
const MercadoPago = require("mercadopago");
const pagamentos = []

const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-6193188769208476-013109-496528b85e570e5cf2baaf05762e8bdc-1105893680"
});

app.get("/", (req, res) => {
    res.send("Ola mundo")
});

app.post("/not", (req, res) => {

    console.log(req.query);
    res.send("OK")

});

app.get("/pagar", async (req, res) => {

    const requestKey = "" + Date.now();
    const emailDopagador = "lucasfcaje12@gmail.com"

    const dados = {
        items: [
            item = {
                id: requestKey,
                title: "Quadro do Max Verstappen",
                quantity: 1,
                currency_id: "BRL",
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email: emailDopagador,
        },
        external_reference: requestKey
    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados);

        console.log(pagamento);
    
        return res.redirect(pagamento.body.init_point);
    } catch (error) {
        return res.send(error.message)
    }
});

app.listen(3001, (req, res) => {
    console.log("SERVER ON")
});