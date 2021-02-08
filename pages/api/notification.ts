import { NextApiResponse, NextApiRequest } from 'next'
import enablePublicAccess from '@cors'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name },
    method,
  } = req

  switch (method) {
    case 'POST':
      // Get data from your database
      console.log(req.body)
      res.status(200).json({ name: `Recieved` })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
