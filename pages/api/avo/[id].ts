import { NextApiRequest, NextApiResponse } from 'next'
import DB from '@database'
import enablePublicAccess from '@cors'
import mercadopago from 'mercadopago'

const AvoDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Generally, you would not want this in your apps.
    // See more in 'cors.js'
    await enablePublicAccess(req, res)

    const db = new DB()
    const avoId = req.query.id as string

    let avo = await db.getById(avoId)

    const globalAny: any = global

    // SDK de Mercado Pago

    // Agrega credenciales
    mercadopago.configure({
      access_token: '',
      integrator_id: '',
    })

    // Crea un objeto de preferencia
    let externalReference = 'fercc1097@gmail.com'
    let preference = {}
    if (avo) {
      preference = {
        items: [
          {
            title: avo.name,
            description: 'Dispositivo móvil de Tienda e-commerce',
            id: 1234,
            unit_price: 100,
            quantity: 1,
            picture_url: `https://tiendamp-4jcsp68gu.vercel.app/api/avo${avo.image}`,
          },
        ],
        external_reference: externalReference,
        payment_methods: {
          installments: 6,
          excluded_payment_types: [{ id: 'atm' }],
          excluded_payment_methods: [{ id: 'amex' }],
        },

        payer: {
          name: 'Lalo',
          surname: 'Landa',
          email: 'test_user_81131286@testuser.com',
          phone: {
            area_code: '52',
            number: 5549737300,
          },
          address: {
            street_name: 'Insurgentes Sur',
            street_number: 1602,
            zip_code: '03940',
          },
        },
        notification_url:
          'https://tiendamp-4jcsp68gu.vercel.app/api/notification',
        back_urls: {
          success: `https://tiendamp-4jcsp68gu.vercel.app/payment/${externalReference}`,
          pending: 'https://tiendamp-4jcsp68gu.vercel.app/payment/pending',
          failure: 'https://tiendamp-4jcsp68gu.vercel.app/payment/failure',
        },
        auto_return: 'approved',
      }
    }

    let pago = await mercadopago.preferences
      .create(preference)
      .then(function (response: TMPResponse) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        globalAny.paymentLink = response.body.init_point
        console.log('>>>', response.body)
        return true
      })
      .catch(function (error: any) {
        console.log(error)
      })

    const paymentlink = globalAny.paymentLink
    // console.log(paymentlink)
    // console.log('>>>', product)
    // product.push(paymentlink)
    console.log(avo)
    if (avo) {
      avo.paymentlink = paymentlink
    }
    // Notice: We're using Next.JS response helpers here :)
    // https://nextjs.org/docs/api-routes/response-helpers
    res.status(200).json({ avo, paymentlink })
  } catch (e) {
    console.error(e)
    res.status(404).end()
  }
}

export default AvoDetail
