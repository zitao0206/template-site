// 灌入几条示例商品，方便第一次打开就有东西看
// 用法：npm run seed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const demo = [
  {
    title: "北欧风格陶瓷马克杯",
    description: "极简白瓷，300ml，可进洗碗机与微波炉。",
    price: 8900,
    stock: 12,
    imageUrl: null,
    status: "PUBLISHED",
  },
  {
    title: "纯棉牛津纺衬衫",
    description: "透气挺括，商务休闲两用，多色可选。",
    price: 25900,
    stock: 0,
    imageUrl: null,
    status: "PUBLISHED",
  },
  {
    title: "手工植鞣皮钱包",
    description: "头层牛皮，越用越亮，6 卡位。",
    price: 45900,
    stock: 35,
    imageUrl: null,
    status: "PUBLISHED",
  },
  {
    title: "（草稿）机械键盘 87 键",
    description: "还在完善文案，暂不上架。",
    price: 39900,
    stock: 30,
    imageUrl: null,
    status: "DRAFT",
  },
];

async function main() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log(`已有 ${count} 条商品，跳过 seed。`);
    return;
  }
  await prisma.product.createMany({ data: demo });
  console.log(`已写入 ${demo.length} 条示例商品。`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
