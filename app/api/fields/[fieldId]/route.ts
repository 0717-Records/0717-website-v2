import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  fieldId: string;
}

export const PUT = async (request: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    throw new NextResponse('Please log in first!', {
      status: 400,
      statusText: 'NO_CURRENT_USER',
    });

  const { fieldId: id } = params;
  const data = await request.json();
  try {
    const updatedSection = await prisma.field.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedSection);
  } catch (error: any) {
    throw new Error(`Failed to update section with ID ${id}. Error: ${error.message}`);
  }
};
