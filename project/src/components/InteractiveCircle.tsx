import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departments } from '../data';

export function InteractiveCircle() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [energyParticles, setEnergyParticles] = useState<Array<{id: number, angle: number, progress: number}>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const radius = isMobile ? 130 : 220;
  const centerX = isMobile ? 180 : 300;
  const centerY = isMobile ? 180 : 300;
  const iconRadius = isMobile ? 30 : 45;

  const angleStep = (2 * Math.PI) / departments.length;
  const hoverActiveIndex = hoveredIndex !== null ? hoveredIndex : clickedIndex;

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyParticles(prev => {
        const newParticles = [...prev]
          .map(p => ({ ...p, progress: p.progress + 0.015 }))
          .filter(p => p.progress < 1);

        if (Math.random() > 0.5) {
          const departmentIndex = Math.floor(Math.random() * departments.length);
          const departmentAngle = departmentIndex * angleStep - Math.PI / 2;
          newParticles.push({
            id: Date.now() + Math.random(),
            angle: departmentAngle,
            progress: 0
          });
        }

        return newParticles;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [angleStep]);

  const svgSize = isMobile ? 360 : 600;

  return (
    <div className="flex justify-center overflow-hidden px-4">
      <div className="relative" style={{ width: `${svgSize}px`, height: `${svgSize}px`, maxWidth: '100%' }}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="absolute inset-0"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="energyGradient">
              <stop offset="0%" stopColor="#ca8a04" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.3"/>
            </radialGradient>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#ca8a04" stopOpacity="0.6">
                <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite" />
                <animate attributeName="stop-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>

          <circle
            cx={centerX}
            cy={centerY}
            r={isMobile ? 50 : 90}
            fill="white"
            stroke="#1e3a8a"
            strokeWidth="2"
            opacity="1"
          />

          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="1"
            opacity="0.2"
          />

          {energyParticles.map(particle => {
            const distance = 50 + (radius - 50) * particle.progress;
            const x = centerX + distance * Math.cos(particle.angle);
            const y = centerY + distance * Math.sin(particle.angle);
            const opacity = 1 - particle.progress;

            return (
              <circle
                key={particle.id}
                cx={x}
                cy={y}
                r="3"
                fill="#ca8a04"
                opacity={opacity}
                filter="url(#glow)"
              />
            );
          })}

          {departments.map((_dept, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const isActive = hoverActiveIndex === index;
            const gradientId = `pulseGradient-${index}`;
            const delay = (index * 0.15).toFixed(2);

            return (
              <g key={index}>
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#ca8a04" stopOpacity="0">
                      <animate
                        attributeName="offset"
                        values="0;1;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${delay}s`}
                      />
                      <animate
                        attributeName="stop-opacity"
                        values="0;0.9;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${delay}s`}
                      />
                    </stop>
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke={isActive ? '#ca8a04' : '#1e3a8a'}
                  strokeWidth={isActive ? '2.5' : '1'}
                  opacity={isActive ? '0.9' : '0.3'}
                  className="transition-all duration-300"
                  filter={isActive ? 'url(#strongGlow)' : ''}
                />

                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke={`url(#${gradientId})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                <circle
                  cx={x}
                  cy={y}
                  r={iconRadius}
                  fill={isActive ? '#1e3a8a' : 'white'}
                  stroke={isActive ? '#ca8a04' : '#1e3a8a'}
                  strokeWidth="2"
                  className="transition-all duration-300 cursor-pointer"
                  filter={isActive ? 'url(#glow)' : ''}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
                />
              </g>
            );
          })}
        </svg>

        {departments.map((dept, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const isActive = hoverActiveIndex === index;

          return (
            <div
              key={index}
              className="absolute transition-all duration-300 cursor-pointer"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
            >
              {dept.imageUrl ? (
                <img
                  src={dept.imageUrl}
                  alt={dept.name}
                  className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} object-cover rounded-full transition-all duration-300 ${
                    isActive ? 'scale-125 brightness-110' : ''
                  }`}
                />
              ) : (
                <div
                  className={`${isMobile ? 'text-3xl' : 'text-5xl'} transition-all duration-300 ${
                    isActive ? 'text-yellow-600 scale-125' : 'text-blue-900'
                  }`}
                >
                  {dept.icon}
                </div>
              )}
            </div>
          );
        })}

        <div
          className="absolute flex items-center justify-center cursor-default"
          style={{
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '100px' : '180px',
            height: isMobile ? '100px' : '180px'
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 shadow-lg"></div>
            <div className="absolute inset-2 rounded-full bg-white shadow-xl"></div>

            <div className="relative z-10">
              <div
                className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-700 tracking-wide`}
              >
                Ясна
              </div>
            </div>
          </div>
        </div>

      </div>

      {clickedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => {
            setClickedIndex(null);
          }}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl relative animate-scale-in ${isMobile ? 'w-full max-w-sm' : 'w-full max-w-md'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${isMobile ? 'p-6' : 'p-8'} relative`}>
              <button
                onClick={() => {
                  setClickedIndex(null);
                }}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {departments[clickedIndex].imageUrl && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={departments[clickedIndex].imageUrl}
                    alt={departments[clickedIndex].name}
                    className={`${isMobile ? 'w-20 h-20' : 'w-24 h-24'} object-cover rounded-full border-4 border-blue-100 shadow-lg`}
                  />
                </div>
              )}

              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-900 mb-4 text-center`}>
                {departments[clickedIndex].name}
              </h3>

              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-700 leading-relaxed mb-4 text-center`}>
                {departments[clickedIndex].shortDescription}
              </p>

              <div className="mb-6 text-center">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                  {departments[clickedIndex].formats}
                </p>
              </div>

              {departments[clickedIndex].detailsUrl && (
                <Link
                  to={departments[clickedIndex].detailsUrl}
                  className={`block w-full ${isMobile ? 'py-3 text-sm' : 'py-4 text-base'} bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg text-center mb-4`}
                >
                  Подробнее о направлении
                </Link>
              )}

              <button
                onClick={() => {
                  const form = document.getElementById('application');
                  if (form) {
                    setClickedIndex(null);
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`w-full text-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 hover:text-blue-900 transition-colors duration-200`}
              >
                Уже определились? Оставить заявку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
