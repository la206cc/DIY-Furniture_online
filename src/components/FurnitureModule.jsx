import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

const FurnitureModule = ({ id, type, position, rotation, material, isSelected, onSelect, onUpdate, onRemove }) => {
  const ref = useRef();
  const [boxRef] = useBox(() => ({
    mass: 0,
    position,
    rotation
  }));

  // 材质配置
  const materials = {
    metal: { color: '#C0C0C0', metalness: 0.8, roughness: 0.2 },
    wood: { color: '#8B4513', metalness: 0.1, roughness: 0.8 },
    plastic: { color: '#4682B4', metalness: 0, roughness: 0.5 }
  };

  // 模块尺寸配置
  const moduleSizes = {
    shelf: [1, 0.1, 1],
    cabinet: [1, 1, 1],
    connector: [0.2, 0.2, 0.2],
    leg: [0.1, 1, 0.1]
  };

  const size = moduleSizes[type] || [1, 1, 1];
  const materialProps = materials[material] || materials.metal;

  // 鼠标交互
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect();
  };

  const handleDrag = (e) => {
    // 拖拽逻辑可以在这里实现
  };

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerMove={handleDrag}
    >
      <mesh
        ref={boxRef}
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
      {/* 添加连接点可视化 */}
      {type !== 'connector' && [
        [size[0] / 2 + 0.1, 0, 0],
        [-size[0] / 2 - 0.1, 0, 0],
        [0, size[1] / 2 + 0.1, 0],
        [0, -size[1] / 2 - 0.1, 0],
        [0, 0, size[2] / 2 + 0.1],
        [0, 0, -size[2] / 2 - 0.1]
      ].map((pos, index) => (
        <mesh key={index} position={pos}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color={isSelected ? '#FF0000' : '#00FF00'} />
        </mesh>
      ))}
    </group>
  );
};

export default FurnitureModule;
