import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Sky } from '@react-three/drei';
import FurnitureModule from './FurnitureModule';
import ControlPanel from './ControlPanel';

const FurnitureConfigurator = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentMaterial, setCurrentMaterial] = useState('metal');

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

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <div style={{ width: '80%', height: '100%' }}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <OrbitControls enablePan enableZoom enableRotate />
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <Grid args={[10, 10]} />
          
          {modules.map(module => (
            <FurnitureModule
              key={module.id}
              id={module.id}
              type={module.type}
              position={module.position}
              rotation={module.rotation}
              material={module.material}
              isSelected={selectedModule === module.id}
              onSelect={() => setSelectedModule(module.id)}
              onUpdate={updates => updateModule(module.id, updates)}
              onRemove={() => removeModule(module.id)}
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
      />
    </div>
  );
};

export default FurnitureConfigurator;
