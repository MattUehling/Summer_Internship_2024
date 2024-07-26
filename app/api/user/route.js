import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function POST(req) {
  try {

    const { email, password } = await req.json();
    console.log('Email:', email, 'Password:', password);

    const user = await prisma.user.findFirst({
      where: { email },
    });
    console.log('User:', user);

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = password.localeCompare(user.password);
    console.log('Password Validity:', isPasswordValid);

    if (isPasswordValid != 0) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken1 = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    console.log('Refresh Token:', refreshToken1);
    const newToken = await prisma.refreshtoken.create({
      data: {
        token: 'sample-refresh-token4', // Replace with the actual token
        user: {
          connect: {
            id: 5, // Replace with the actual user ID
          },
        },
      },
    });
    console.log('New Token:', newToken);

    return NextResponse.json({ accessToken, refreshToken: refreshToken1, user: { id: user.id, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
