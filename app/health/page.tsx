import { getHealth } from "@/src/services/health";

export const dynamic = "force-dynamic";

export default async function Health() {
  const health = await getHealth();
  return <pre>{JSON.stringify(health, null, 2)}</pre>;
}
