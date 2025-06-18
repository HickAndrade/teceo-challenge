import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Item } from './items/entities/item.entity';

const isTs = __filename.endsWith('.ts');

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Item],
  migrations: [isTs ? 'src/migrations/*.ts' : 'dist/db/migrations/*.js'],
  synchronize: false,
});
