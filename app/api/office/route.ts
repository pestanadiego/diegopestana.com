import { getOfficeSnapshot } from "@/app/office/snapshot";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getOfficeSnapshot());
}
