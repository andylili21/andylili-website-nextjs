---
title: CSS Grid与Flexbox：何时使用哪种布局
date: 2024-03-15
excerpt: 深入比较CSS Grid和Flexbox，帮助你做出正确的布局选择。
image: https://zh-hans.react.dev/images/home/community/react_conf_hallway.webp
tags:
  - CSS
  - 前端
  - Web设计
readingTime: 6
featured: false
---

## CSS Grid vs Flexbox

在现代CSS布局中，Grid和Flexbox是最强大的两个工具。了解它们的区别和适用场景对于前端开发至关重要。

### Flexbox - 一维布局

Flexbox 适合用于一维布局（行或列）：

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**适用场景：**
- 导航栏
- 工具栏
- 单行或单列布局
- 内容分布

### CSS Grid - 二维布局

Grid 适合用于二维布局（行和列同时控制）：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

**适用场景：**
- 整体页面布局
- 卡片网格
- 复杂的二维布局
- 响应式设计

### 何时使用 Flexbox

1. **一维布局** - 只需要控制行或列
2. **内容驱动** - 布局由内容大小决定
3. **分布对齐** - 需要精确控制间距和对齐

### 何时使用 Grid

1. **二维布局** - 需要同时控制行和列
2. **布局驱动** - 需要精确控制网格结构
3. **重叠元素** - 需要元素重叠放置

### 实际案例

#### 使用 Flexbox 的导航栏

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}
```

#### 使用 Grid 的卡片布局

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### 组合使用

实际项目中，Grid 和 Flexbox 经常组合使用：

```css
/* Grid 控制整体布局 */
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}

/* Flexbox 控制内部元素 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## 浏览器兼容性

- **Flexbox** - 所有现代浏览器都支持
- **Grid** - IE11 需要前缀，现代浏览器完全支持

## 总结

选择 Flexbox 还是 Grid 取决于具体需求：

- **一维布局用 Flexbox**
- **二维布局用 Grid**
- **可以组合使用**

掌握这两种布局工具，你可以轻松应对各种布局需求。
