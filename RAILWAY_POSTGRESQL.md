# Railway PostgreSQL 数据库配置指南

本项目支持在 Railway 上使用 PostgreSQL 数据库。以下是详细的配置步骤。

## 1. 在 Railway 上创建 PostgreSQL 数据库

1. 登录 Railway 控制台
2. 点击 "New Project"
3. 选择 "Database" 类型
4. 选择 "PostgreSQL"
5. Railway 会自动创建数据库并提供连接信息

## 2. 获取数据库连接信息

创建数据库后，Railway 会提供以下环境变量：
- `DATABASE_URL`: 完整的数据库连接字符串
- `PGHOST`: 数据库主机地址
- `PGPORT`: 数据库端口
- `PGUSER`: 数据库用户名
- `PGPASSWORD`: 数据库密码
- `PGDATABASE`: 数据库名称

## 3. 配置后端服务环境变量

在后端服务的环境变量设置中，添加以下变量：

```bash
# 使用 Railway 提供的 DATABASE_URL
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# 或者手动配置各个参数
PGHOST=your-railway-host
PGPORT=5432
PGUSER=your-username
PGPASSWORD=your-password
PGDATABASE=your-database
```

## 4. 数据库迁移和种子数据

Railway 会在部署时自动运行以下脚本：
1. `server/migrate.sh`: 数据库迁移和种子数据
2. `server/start.sh`: 启动服务脚本

## 5. 手动运行数据库操作

如果需要手动运行数据库操作，可以使用 Railway 的 shell 功能：

```bash
# 进入 Railway shell
# 运行数据库迁移
npx prisma migrate deploy

# 运行种子数据
npx prisma db seed

# 生成 Prisma Client
npx prisma generate
```

## 6. 注意事项

1. **数据库连接**: 确保 `DATABASE_URL` 环境变量正确配置
2. **迁移文件**: Prisma 迁移文件位于 `prisma/migrations/` 目录
3. **种子数据**: 种子数据脚本位于 `prisma/seed.js`
4. **生产环境**: 在生产环境中，确保 `NODE_ENV=production`

## 7. 故障排除

### 连接问题
如果遇到数据库连接问题，请检查：
1. `DATABASE_URL` 是否正确
2. 网络连接是否正常
3. 数据库服务是否正常运行

### 迁移问题
如果迁移失败，请检查：
1. 迁移文件是否完整
2. 数据库权限是否正确
3. 是否有冲突的迁移版本

### 种子数据问题
如果种子数据失败，请检查：
1. `prisma/seed.js` 脚本是否正确
2. 数据库中是否已存在相同数据
3. 外键约束是否正确配置