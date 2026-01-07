import React, { useRef } from 'react';

const FurnitureModule = ({ id, type, position, rotation, material, isSelected, onSelect, onUpdate, onRemove, onConnectionPointClick, isDragging }) => {
  const ref = useRef();

  // 材质配置
  const materials = {
    metal: { color: '#C0C0C0', metalness: 0.8, roughness: 0.2 },
    wood: { color: '#8B4513', metalness: 0.1, roughness: 0.8 },
    plastic: { color: '#4682B4', metalness: 0, roughness: 0.5 }
  };

  // 模块尺寸配置
  const moduleSizes = {
    cabinet: [1, 1, 1]
  };

  const size = moduleSizes[type] || [1, 1, 1];
  const materialProps = materials[material] || materials.metal;

  // 连接点方向映射
  const connectionDirections = [
    'right', 'left', 'top', 'bottom', 'front', 'back'
  ];

  // 鼠标交互
  const handleClick = (e) => {
    if (isDragging) return;
    e.stopPropagation();
    onSelect();
  };

  const handleConnectionPointClick = (e, direction) => {
    if (isDragging) return;
    e.stopPropagation();
    onConnectionPointClick(direction);
  };

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={handleClick}
    >
      <mesh
        castShadow
        receiveShadow
        material={{
          ...materialProps,
          emissive: isSelected ? '#FFD700' : 'black',
          emissiveIntensity: isSelected ? 0.3 : 0
        }}
      >
        <boxGeometry args={size} />
      </mesh>
      {/* 添加连接点可视化和点击事件 */}
      {type !== 'connector' && [
        [size[0] / 2 + 0.1, 0, 0],
        [-size[0] / 2 - 0.1, 0, 0],
        [0, size[1] / 2 + 0.1, 0],
        [0, -size[1] / 2 - 0.1, 0],
        [0, 0, size[2] / 2 + 0.1],
        [0, 0, -size[2] / 2 - 0.1]
      ].map((pos, index) => (
        <group key={index} position={pos}>
          {/* 连接点 */}
          <mesh
            onClick={(e) => handleConnectionPointClick(e, connectionDirections[index])}
          >
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial 
              color={isSelected ? '#FF0000' : '#00FF00'}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* 选中时显示柜子预览模型 */}
          {isSelected && (
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={materialProps.color}
                transparent
                opacity={0.3}
                wireframe
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

export default FurnitureModule;
