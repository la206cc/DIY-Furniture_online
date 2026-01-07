import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Sky } from '@react-three/drei';
import FurnitureModule from './FurnitureModule';
import ControlPanel from './ControlPanel';

// 定义初始状态
const initialModules = [
  {
    id: 1,
    type: 'cabinet',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    material: 'metal'
  }
];

const FurnitureConfigurator = () => {
  // 初始状态：添加一个基础柜子组件
  const [modules, setModules] = useState(initialModules);
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentMaterial, setCurrentMaterial] = useState('metal');
  const [selectedComponentType, setSelectedComponentType] = useState('shelf');
  // 用于区分点击和拖动的状态
  const [isDragging, setIsDragging] = useState(false);
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });

  // 处理鼠标按下事件
  const handleMouseDown = (e) => {
    setMouseStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
  };

  // 处理鼠标移动事件
  const handleMouseMove = (e) => {
    if (isDragging) return;
    
    const deltaX = Math.abs(e.clientX - mouseStart.x);
    const deltaY = Math.abs(e.clientY - mouseStart.y);
    // 如果鼠标移动超过5像素，视为拖动
    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }
  };

  const addModule = (type, position) => {
    const newModule = {
      id: Date.now(),
      type,
      position,
      rotation: [0, 0, 0],
      material: currentMaterial
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (id, updates) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, ...updates } : module
    ));
  };

  const removeModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  // 恢复到初始状态
  const resetToInitialState = () => {
    setModules(initialModules);
    setSelectedModule(null);
  };

  // 取消物体选择
  const handleDeselect = () => {
    if (!isDragging) {
      setSelectedModule(null);
    }
  };

  // 3D空间中的连接点点击处理
  const handleConnectionPointClick = (baseModuleId, direction) => {
    if (isDragging) return;
    
    const baseModule = modules.find(m => m.id === baseModuleId);
    if (!baseModule) return;

    // 根据基础模块和方向计算新模块的位置
    const size = {
      shelf: [1, 0.1, 1],
      cabinet: [1, 1, 1],
      connector: [0.2, 0.2, 0.2],
      leg: [0.1, 1, 0.1]
    }[baseModule.type] || [1, 1, 1];

    let newPosition = [...baseModule.position];
    const newModuleSize = {
      shelf: [1, 0.1, 1],
      cabinet: [1, 1, 1],
      connector: [0.2, 0.2, 0.2],
      leg: [0.1, 1, 0.1]
    }[selectedComponentType] || [1, 1, 1];

    // 根据方向计算新位置
    switch (direction) {
      case 'right':
        newPosition[0] = baseModule.position[0] + size[0] / 2 + newModuleSize[0] / 2;
        break;
      case 'left':
        newPosition[0] = baseModule.position[0] - size[0] / 2 - newModuleSize[0] / 2;
        break;
      case 'top':
        newPosition[1] = baseModule.position[1] + size[1] / 2 + newModuleSize[1] / 2;
        break;
      case 'bottom':
        newPosition[1] = baseModule.position[1] - size[1] / 2 - newModuleSize[1] / 2;
        break;
      case 'front':
        newPosition[2] = baseModule.position[2] + size[2] / 2 + newModuleSize[2] / 2;
        break;
      case 'back':
        newPosition[2] = baseModule.position[2] - size[2] / 2 - newModuleSize[2] / 2;
        break;
      default:
        return;
    }

    addModule(selectedComponentType, newPosition);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <div 
        style={{ width: '80%', height: '100%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <OrbitControls enablePan enableZoom enableRotate />
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <Grid args={[10, 10]} />
          
          {/* 背景平面，用于接收点击事件取消物体选择 */}
          <mesh
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={handleDeselect}
          >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial 
              color="transparent" 
              transparent
              opacity={0}
              depthTest={false}
            />
          </mesh>
          
          {modules.map(module => (
            <FurnitureModule
              key={module.id}
              id={module.id}
              type={module.type}
              position={module.position}
              rotation={module.rotation}
              material={module.material}
              isSelected={selectedModule === module.id}
              onSelect={() => !isDragging && setSelectedModule(module.id)}
              onUpdate={updates => updateModule(module.id, updates)}
              onRemove={() => removeModule(module.id)}
              onConnectionPointClick={(direction) => handleConnectionPointClick(module.id, direction)}
              isDragging={isDragging}
            />
          ))}
        </Canvas>
      </div>
      <ControlPanel
        onAddModule={addModule}
        currentMaterial={currentMaterial}
        onMaterialChange={setCurrentMaterial}
        selectedModule={selectedModule}
        onRemoveModule={() => selectedModule && removeModule(selectedModule)}
        selectedComponentType={selectedComponentType}
        onComponentTypeChange={setSelectedComponentType}
        onReset={resetToInitialState}
      />
    </div>
  );
};

export default FurnitureConfigurator;
