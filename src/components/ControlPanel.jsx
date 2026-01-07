import React from 'react';

const ControlPanel = ({ onAddModule, currentMaterial, onMaterialChange, selectedModule, onRemoveModule }) => {
  return (
    <div style={{
      width: '20%',
      height: '100%',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      overflowY: 'auto',
      boxSizing: 'border-box',
      borderLeft: '1px solid #ddd'
    }}>
      <h2 style={{ margin: '0 0 20px 0' }}>家具配置器</h2>
      
      {/* 模块添加区域 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>添加模块</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => onAddModule('shelf', [0, 0, 0])}
            style={buttonStyle}
          >
            添加搁板
          </button>
          <button
            onClick={() => onAddModule('cabinet', [0, 0, 0])}
            style={buttonStyle}
          >
            添加柜子
          </button>
          <button
            onClick={() => onAddModule('connector', [0, 0, 0])}
            style={buttonStyle}
          >
            添加连接件
          </button>
          <button
            onClick={() => onAddModule('leg', [0, -0.5, 0])}
            style={buttonStyle}
          >
            添加桌腿
          </button>
        </div>
      </div>
      
      {/* 材质选择区域 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>选择材质</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['metal', 'wood', 'plastic'].map((material) => (
            <button
              key={material}
              onClick={() => onMaterialChange(material)}
              style={{
                ...buttonStyle,
                backgroundColor: currentMaterial === material ? '#4CAF50' : '#fff',
                color: currentMaterial === material ? '#fff' : '#000'
              }}
            >
              {material === 'metal' ? '金属' : material === 'wood' ? '木材' : '塑料'}
            </button>
          ))}
        </div>
      </div>
      
      {/* 选中模块操作区域 */}
      {selectedModule && (
        <div style={{ marginBottom: '20px' }}>
          <h3>选中模块操作</h3>
          <button
            onClick={onRemoveModule}
            style={{
              ...buttonStyle,
              backgroundColor: '#f44336',
              color: '#fff'
            }}
          >
            删除模块
          </button>
        </div>
      )}
      
      {/* 使用说明 */}
      <div style={{ marginTop: '30px', fontSize: '12px', color: '#666' }}>
        <h3>使用说明</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>点击3D场景中的模块进行选择</li>
          <li>使用鼠标拖拽旋转和缩放场景</li>
          <li>通过控制面板添加新模块</li>
          <li>选择不同材质自定义模块外观</li>
          <li>选中模块后可以删除</li>
        </ul>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.2s'
};

export default ControlPanel;
