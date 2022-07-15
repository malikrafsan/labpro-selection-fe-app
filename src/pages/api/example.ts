import type { NextApiRequest, NextApiResponse } from 'next'
import { IExampleAPI } from '../../interfaces';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IExampleAPI>
) {
  res.status(200).json({
    name: 'Malik Akbar',
    email: 'malik@example.com',
    password: '12345678',
  })
}
