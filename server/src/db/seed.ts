import { faker } from '@faker-js/faker'
import { AppDataSource } from '../data-source'

import { Item } from '../items/entities/item.entity'

function generateFakeItem(): Item {
  const item = new Item()
  item.name = faker.commerce.productName()
  item.type = faker.commerce.department()
  item.size = faker.helpers.arrayElement(['P', 'M', 'G', 'GG'])
  item.color = faker.color.human()
  item.quantity = faker.number.int({ min: 1, max: 100 })
  item.status = faker.helpers.arrayElement(['success', 'error'])
  return item
}


async function seed() {
  await AppDataSource.initialize()


  const itemRepo = AppDataSource.getRepository(Item)
    
  await itemRepo.clear() 

  const items: Item[] = Array.from({ length: 200 }, generateFakeItem)

  await itemRepo.save(items)

  console.log(`${items.length} Items Seeded.`)
  await AppDataSource.destroy()
}

seed().catch((err) => {
  console.error('seed (Error):', err)
  process.exit(1)
})
