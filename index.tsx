import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from './drizzle/schema'

const connectionString = process.env.DATABASE_URL || ''

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

// 빌드 타임이나 실행 시점에 안전하게 호출할 수 있는 함수로 래핑합니다.
export const getAllUsers = async () => {
  if (!connectionString) {
    console.warn("DATABASE_URL이 설정되지 않았습니다.");
    return [];
  }
  return await db.select().from(users);
};

export { db };
