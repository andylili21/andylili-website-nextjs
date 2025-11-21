'use client';

/**
 * CyberTruck 样式系统测试组件
 * 用于验证新的拉丝不锈钢金属质感样式
 */
export default function StyleTest() {
  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* 标题区 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-inter font-bold text-steel-white mb-4">
          CyberTruck IVI 样式系统测试
        </h1>
        <p className="text-steel-gray font-inter">
          拉丝不锈钢金属质感 + 简洁黑白灰配色
        </p>
      </div>

      {/* 色彩系统展示 */}
      <section className="cyber-card p-6">
        <h2 className="text-2xl font-inter font-semibold text-steel-bright mb-6">
          色彩系统
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-full h-24 bg-steel-black border border-steel-silver/20 rounded-steel mb-2"></div>
            <p className="text-sm text-steel-gray font-inter">深空黑 #0A0A0A</p>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-steel-dark border border-steel-silver/20 rounded-steel mb-2"></div>
            <p className="text-sm text-steel-gray font-inter">磨砂黑 #1A1A1A</p>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-steel-silver border border-steel-silver/20 rounded-steel mb-2"></div>
            <p className="text-sm text-steel-black font-inter">拉丝银 #C0C0C0</p>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-steel-bright border border-steel-silver/20 rounded-steel mb-2"></div>
            <p className="text-sm text-steel-black font-inter">亮银 #E8E8E8</p>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-steel-gray border border-steel-silver/20 rounded-steel mb-2"></div>
            <p className="text-sm text-steel-white font-inter">中性灰 #808080</p>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-steel-white border border-steel-silver/20 rounded-steel mb-2"></div>
            <p className="text-sm text-steel-black font-inter">纯白 #FFFFFF</p>
          </div>
        </div>
      </section>

      {/* 按钮样式展示 */}
      <section className="cyber-card p-6">
        <h2 className="text-2xl font-inter font-semibold text-steel-bright mb-6">
          按钮系统
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="metal-button px-6 py-3 rounded-steel font-inter font-medium text-steel-white">
            金属按钮
          </button>
          <button className="metal-button px-6 py-3 rounded-steel font-inter font-medium text-steel-white">
            悬停测试
          </button>
          <button className="brushed-steel px-6 py-3 rounded-steel font-inter font-medium text-steel-white border border-steel-silver/30">
            拉丝纹理
          </button>
        </div>
      </section>

      {/* 卡片样式展示 */}
      <section>
        <h2 className="text-2xl font-inter font-semibold text-steel-bright mb-6">
          卡片系统
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="cyber-card p-6">
            <h3 className="text-xl font-inter font-semibold text-steel-white mb-3">
              简洁卡片
            </h3>
            <p className="text-steel-gray font-inter mb-4">
              采用磨砂黑背景，拉丝银边框，顶部金属高光线，悬停时向上浮动5px。
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-steel-dark border border-steel-silver/30 rounded-steel text-sm text-steel-white/80 font-inter">
                标签1
              </span>
              <span className="px-3 py-1 bg-steel-dark border border-steel-silver/30 rounded-steel text-sm text-steel-white/80 font-inter">
                标签2
              </span>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-steel">
            <h3 className="text-xl font-inter font-semibold text-steel-white mb-3">
              磨砂玻璃卡片
            </h3>
            <p className="text-steel-gray font-inter mb-4">
              高斯模糊16px，半透明黑色背景，轻微光线漫射效果。
            </p>
            <div className="text-sm font-roboto-mono text-steel-silver">
              backdrop-filter: blur(16px)
            </div>
          </div>
        </div>
      </section>

      {/* 输入框展示 */}
      <section className="cyber-card p-6">
        <h2 className="text-2xl font-inter font-semibold text-steel-bright mb-6">
          表单元素
        </h2>
        <div className="space-y-4 max-w-md">
          <input 
            type="text" 
            placeholder="简洁输入框" 
            className="cyber-input w-full px-4 py-3 rounded-steel font-inter"
          />
          <textarea 
            placeholder="文本区域" 
            className="cyber-input w-full px-4 py-3 rounded-steel font-inter resize-none"
            rows={4}
          />
        </div>
      </section>

      {/* 字体系统展示 */}
      <section className="cyber-card p-6">
        <h2 className="text-2xl font-inter font-semibold text-steel-bright mb-6">
          字体系统
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-steel-gray mb-2">Inter - 一级标题 (700)</p>
            <h1 className="text-4xl font-inter font-bold text-steel-white">
              CyberTruck Design System
            </h1>
          </div>
          <div>
            <p className="text-sm text-steel-gray mb-2">Inter - 正文 (400)</p>
            <p className="font-inter text-steel-white/80">
              参考 Tesla 车机界面，字体简洁清晰，避免过度装饰性字体，强调信息层级和可读性。
            </p>
          </div>
          <div>
            <p className="text-sm text-steel-gray mb-2">Roboto Mono - 数据显示 (500)</p>
            <div className="font-roboto-mono text-steel-silver">
              {'{ "status": "active", "temperature": "22.5°C", "power": "100%" }'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
