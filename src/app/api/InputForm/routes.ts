import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Insert into database
    const user = await prisma.users.create({
      data: {
        email: body.email,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();

    // Insert into database
    const user = await prisma.input_form.findFirst({
      where: {
        user_id: body.email,
      },
    });

    if (!user) NextResponse.json({ success: false, user }, { status: 404 });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("No Such User:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: NextRequest) {
//   try {
//     const body = await req.json();

//     // Insert into database
//     const user = await prisma.input_form.delete({
//       where: {
//         user_id: body.email,
//       },
//     });

//     return NextResponse.json({ success: true, user }, { status: 200 });
//   } catch (error) {
//     console.error("No Such User:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
