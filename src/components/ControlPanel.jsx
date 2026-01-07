import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const ControlPanel = ({ onAddModule, currentMaterial, onMaterialChange, selectedModule, onRemoveModule, selectedComponentType, onComponentTypeChange, onReset }) => {
  // 材质颜色配置
  const materialColors = {
    metal: '#C0C0C0',
    wood: '#8B4513',
    plastic: '#4682B4'
  };

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
      
      {/* 柜子预览模型 */}
      <div style={{ 
        marginBottom: '20px',
        height: '150px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #ddd'
      }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[2, 2, 2]} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <mesh rotation={[0.5, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={materialColors[currentMaterial]} />
          </mesh>
        </Canvas>
      </div>
      
      {/* 一键恢复按钮 */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={onReset}
          style={{
            ...buttonStyle,
            backgroundColor: '#2196F3',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          一键恢复到初始状态
        </button>
      </div>
      
      {/* 组件类型选择 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>选择组件类型</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { type: 'cabinet', label: '柜子' }
          ].map(({ type, label }) => (
            <button
              key={type}
              onClick={() => onComponentTypeChange(type)}
              style={{
                ...buttonStyle,
                backgroundColor: selectedComponentType === type ? '#4CAF50' : '#fff',
                color: selectedComponentType === type ? '#fff' : '#000'
              }}
            >
              {label}
            </button>
          ))}
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
          <li>在左侧选择要添加的组件类型</li>
          <li>点击3D场景中组件上的绿色连接点添加新组件</li>
          <li>使用鼠标拖拽旋转和缩放场景</li>
          <li>选择不同材质自定义模块外观</li>
          <li>点击模块可以选中，然后删除</li>
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
