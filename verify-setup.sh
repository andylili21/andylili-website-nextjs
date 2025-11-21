#!/bin/bash

# 项目初始化验证脚本
# 用于验证项目是否正确初始化

echo "================================="
echo "🔍 项目初始化验证"
echo "================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 验证计数
PASSED=0
FAILED=0

# 验证函数
check() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
  fi
}

# 1. 检查文件结构
echo "📁 检查文件结构..."
echo ""

test -f "package.json" && echo -e "${GREEN}✓${NC} package.json 存在" || echo -e "${RED}✗${NC} package.json 不存在"
test -d "server/src" && echo -e "${GREEN}✓${NC} server/src 目录存在" || echo -e "${RED}✗${NC} server/src 目录不存在"
test -f "server/src/app.js" && echo -e "${GREEN}✓${NC} 后端入口文件存在" || echo -e "${RED}✗${NC} 后端入口文件不存在"
test -d "app/lib/api" && echo -e "${GREEN}✓${NC} API 客户端目录存在" || echo -e "${RED}✗${NC} API 客户端目录不存在"
test -f "prisma/schema.prisma" && echo -e "${GREEN}✓${NC} Prisma Schema 存在" || echo -e "${RED}✗${NC} Prisma Schema 不存在"
test -f "prisma/seed.js" && echo -e "${GREEN}✓${NC} 种子数据文件存在" || echo -e "${RED}✗${NC} 种子数据文件不存在"

echo ""

# 2. 检查环境变量
echo "🔧 检查环境变量..."
echo ""

test -f ".env.local" && echo -e "${GREEN}✓${NC} .env.local 存在" || echo -e "${YELLOW}⚠${NC} .env.local 不存在（需要创建）"
test -f "server/.env" && echo -e "${GREEN}✓${NC} server/.env 存在" || echo -e "${YELLOW}⚠${NC} server/.env 不存在（需要创建）"

echo ""

# 3. 检查后端架构文件
echo "🏗️  检查后端架构..."
echo ""

test -f "server/src/config/database.js" && echo -e "${GREEN}✓${NC} 数据库配置存在" || echo -e "${RED}✗${NC} 数据库配置缺失"
test -f "server/src/config/server.js" && echo -e "${GREEN}✓${NC} 服务器配置存在" || echo -e "${RED}✗${NC} 服务器配置缺失"
test -f "server/src/utils/response.js" && echo -e "${GREEN}✓${NC} 响应工具存在" || echo -e "${RED}✗${NC} 响应工具缺失"
test -f "server/src/middlewares/errorHandler.js" && echo -e "${GREEN}✓${NC} 错误处理中间件存在" || echo -e "${RED}✗${NC} 错误处理中间件缺失"
test -f "server/src/middlewares/validator.js" && echo -e "${GREEN}✓${NC} 验证中间件存在" || echo -e "${RED}✗${NC} 验证中间件缺失"
test -f "server/src/services/postService.js" && echo -e "${GREEN}✓${NC} 文章服务层存在" || echo -e "${RED}✗${NC} 文章服务层缺失"
test -f "server/src/controllers/postController.js" && echo -e "${GREEN}✓${NC} 文章控制器存在" || echo -e "${RED}✗${NC} 文章控制器缺失"

echo ""

# 4. 检查前端 API 客户端
echo "🌐 检查前端 API 客户端..."
echo ""

test -f "app/lib/api/client.js" && echo -e "${GREEN}✓${NC} API 客户端基础封装存在" || echo -e "${RED}✗${NC} API 客户端基础封装缺失"
test -f "app/lib/api/posts.js" && echo -e "${GREEN}✓${NC} 文章 API 方法存在" || echo -e "${RED}✗${NC} 文章 API 方法缺失"
test -f "app/lib/api/projects.js" && echo -e "${GREEN}✓${NC} 项目 API 方法存在" || echo -e "${RED}✗${NC} 项目 API 方法缺失"

echo ""

# 5. 检查文档
echo "📚 检查文档..."
echo ""

test -f "DEVELOPMENT_README.md" && echo -e "${GREEN}✓${NC} 开发文档存在" || echo -e "${YELLOW}⚠${NC} 开发文档缺失"
test -f "QUICK_START.md" && echo -e "${GREEN}✓${NC} 快速启动指南存在" || echo -e "${YELLOW}⚠${NC} 快速启动指南缺失"

echo ""
echo "================================="
echo "📊 验证总结"
echo "================================="
echo ""

# 检查关键文件数量
EXPECTED_FILES=15
FOUND_FILES=0

[ -f "server/src/app.js" ] && ((FOUND_FILES++))
[ -f "server/src/config/database.js" ] && ((FOUND_FILES++))
[ -f "server/src/utils/response.js" ] && ((FOUND_FILES++))
[ -f "server/src/middlewares/errorHandler.js" ] && ((FOUND_FILES++))
[ -f "server/src/middlewares/validator.js" ] && ((FOUND_FILES++))
[ -f "server/src/services/postService.js" ] && ((FOUND_FILES++))
[ -f "server/src/services/projectService.js" ] && ((FOUND_FILES++))
[ -f "server/src/controllers/postController.js" ] && ((FOUND_FILES++))
[ -f "server/src/controllers/projectController.js" ] && ((FOUND_FILES++))
[ -f "server/src/routes/posts.js" ] && ((FOUND_FILES++))
[ -f "server/src/routes/projects.js" ] && ((FOUND_FILES++))
[ -f "app/lib/api/client.js" ] && ((FOUND_FILES++))
[ -f "app/lib/api/posts.js" ] && ((FOUND_FILES++))
[ -f "app/lib/api/projects.js" ] && ((FOUND_FILES++))
[ -f "prisma/seed.js" ] && ((FOUND_FILES++))

echo "关键文件: $FOUND_FILES/$EXPECTED_FILES"
echo ""

if [ $FOUND_FILES -eq $EXPECTED_FILES ]; then
  echo -e "${GREEN}✓ 所有关键文件已创建${NC}"
  echo ""
  echo "🎉 项目初始化验证通过！"
  echo ""
  echo "下一步:"
  echo "  1. npm install (安装依赖)"
  echo "  2. npm run db:generate && npm run db:migrate && npm run db:seed (初始化数据库)"
  echo "  3. npm run server:dev (启动后端)"
  echo "  4. npm run dev (启动前端)"
  echo ""
  exit 0
else
  echo -e "${RED}✗ 部分文件缺失，请检查${NC}"
  echo ""
  exit 1
fi
