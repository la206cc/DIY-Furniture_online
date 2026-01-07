import React, { useRef } from 'react';

const FurnitureModule = ({ id, type, position, rotation, material, isSelected, onSelect, onUpdate, onRemove, onConnectionPointClick, isDragging, dimensions }) => {
  const ref = useRef();

  // 材质配置
  const materials = {
    metal: { color: '#888888', metalness: 0.6, roughness: 0.4 },
    wood: { color: '#8B4513', metalness: 0.1, roughness: 0.8 },
    plastic: { color: '#4682B4', metalness: 0, roughness: 0.5 }
  };

  // 将mm转换为3D场景单位（1单位=1m）
  const getSize = () => {
    if (dimensions) {
      // 将mm转换为m（除以1000）
      return [
        dimensions.width / 1000,
        dimensions.height / 1000,
        dimensions.depth / 1000
      ];
    }
    return [1, 1, 1];
  };

  const size = getSize();
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
      {/* 控制点中间的box - 尺寸随柜子变化 */}
      <mesh>
        <boxGeometry args={[size[0] * 0.5, size[1] * 0.5, size[2] * 0.5]} />
        <meshStandardMaterial color="#888888" metalness={0.6} roughness={0.4} />
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
        <mesh 
          key={index} 
          position={pos}
          onClick={(e) => handleConnectionPointClick(e, connectionDirections[index])}
        >
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial 
            color={isSelected ? '#FF0000' : '#00FF00'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FurnitureModule;
