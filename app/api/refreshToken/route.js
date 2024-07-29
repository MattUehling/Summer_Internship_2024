/*Author: Matt Uehling
* Purpose: creates the refresh token because some dude *cough* brad *cough* said it was neccesary 
*/
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function POST(req) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json({ message: 'Refresh token required' }, { status: 401 });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;

    const storedRefreshToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedRefreshToken) {
      return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }

    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
  }
}
