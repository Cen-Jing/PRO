"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Globe = dynamic(() => import('@/components/ui/globe').then(mod => mod.World), {
  ssr: false,
  loading: () => <div className="w-full h-[100vh] md:h-[100vh] " />
});

// 定义统一的颜色方案
const COLORS = {
  primary: "#3498db",    // 主要连接线颜色 - 蓝色
  secondary: "#2ecc71",  // 次要连接线颜色 - 绿色
  accent: "#e74c3c",     // 强调色 - 红色
  highlight: "#f1c40f",  // 高亮色 - 黄色
  purple: "#9b59b6",     // 紫色
  orange: "#e67e22",     // 橙色
  teal: "#1abc9c",       // 青色
  pink: "#e84393",       // 粉色
};

const sampleData = [
  // 亚洲区域
  {
    order: 1,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    startColor: COLORS.primary,
    endColor: COLORS.secondary,
  },
  {
    order: 2,
    startLat: 31.2304,
    startLng: 121.4737,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    startColor: COLORS.secondary,
    endColor: COLORS.primary,
  },
  // 欧洲区域
  {
    order: 3,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.2,
    startColor: COLORS.purple,
    endColor: COLORS.teal,
  },
  {
    order: 4,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 52.5200,
    endLng: 13.4050,
    arcAlt: 0.4,
    startColor: COLORS.teal,
    endColor: COLORS.purple,
  },
  // 美洲区域
  {
    order: 5,
    startLat: 40.7128,
    startLng: -74.0060,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.3,
    startColor: COLORS.orange,
    endColor: COLORS.pink,
  },
  {
    order: 6,
    startLat: 40.7128,
    startLng: -74.0060,
    endLat: 19.4326,
    endLng: -99.1332,
    arcAlt: 0.1,
    startColor: COLORS.pink,
    endColor: COLORS.orange,
  },
  // 大洋洲区域
  {
    order: 7,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: -41.2866,
    endLng: 174.7756,
    arcAlt: 0.2,
    startColor: COLORS.highlight,
    endColor: COLORS.highlight,  // 相同颜色
  },
  // 非洲区域
  {
    order: 8,
    startLat: 30.0444,
    startLng: 31.2357,
    endLat: -33.9249,
    endLng: 18.4241,
    arcAlt: 0.2,
    startColor: COLORS.accent,
    endColor: COLORS.accent,  // 相同颜色
  },
  // 跨洲际连接
  {
    order: 9,
    startLat: 40.7128,
    startLng: -74.0060,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    startColor: COLORS.purple,
    endColor: COLORS.teal,
  },
  {
    order: 10,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    startColor: COLORS.teal,
    endColor: COLORS.purple,
  },
  // 新增巴西城市连接
  {
    order: 11,
    startLat: -23.5505,
    startLng: -46.6333,
    endLat: -3.1190,
    endLng: -60.0217,
    arcAlt: 0.4,
    startColor: COLORS.orange,
    endColor: COLORS.pink,
  },
  {
    order: 12,
    startLat: -23.5505,
    startLng: -46.6333,
    endLat: -30.0346,
    endLng: -51.2177,
    arcAlt: 0.1,
    startColor: COLORS.pink,
    endColor: COLORS.orange,
  },
  // 新增加拿大城市连接
  {
    order: 13,
    startLat: 43.6532,
    startLng: -79.3832,
    endLat: 49.2827,
    endLng: -123.1207,
    arcAlt: 0.4,
    startColor: COLORS.highlight,
    endColor: COLORS.accent,
  },
  {
    order: 14,
    startLat: 43.6532,
    startLng: -79.3832,
    endLat: 45.5017,
    endLng: -73.5673,
    arcAlt: 0.2,
    startColor: COLORS.accent,
    endColor: COLORS.highlight,
  },
  // 新增跨洲际长距离连接
  {
    order: 15,
    startLat: -23.5505,
    startLng: -46.6333,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    startColor: COLORS.primary,
    endColor: COLORS.secondary,
  },
  {
    order: 16,
    startLat: 43.6532,
    startLng: -79.3832,
    endLat: 30.0444,
    endLng: 31.2357,
    arcAlt: 0.5,
    startColor: COLORS.secondary,
    endColor: COLORS.primary,
  }
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-[1000px] h-[100vh] md:h-[100vh] bg-white" />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full h-[100vh] md:h-[100vh] max-w-[1000px] mx-auto px-4 z-100">
        <Globe
          globeConfig={{
            pointSize: 0.6,
            globeColor: "rgba(6, 32, 86, 0.1)",
            showAtmosphere: true,
            atmosphereColor: "rgba(0,0,0,0.5)",
            atmosphereAltitude: 0.1,
            emissive: "rgba(6, 32, 86, 0.4)",
            emissiveIntensity: 0.2,
            shininess: 0.9,
            polygonColor: "rgba(255,255,255,0.9)",
            ambientLight: "#38bdf8",
            ambientLightIntensity: 0.8,
            directionalLeftLight: "#ffffff",
            directionalLeftLightIntensity: 1.2,
            directionalTopLight: "#ffffff",
            directionalTopLightIntensity: 1.0,
            pointLight: "#ffffff",
            pointLightIntensity: 1.2,
            arcTime: 2000,
            arcLength: 0.85,
            rings: 1,
            maxRings: 1,
            initialPosition: { lat: 22.3193, lng: 114.1694 },
            autoRotate: true,
            autoRotateSpeed: 0.5,
          }}
          data={sampleData.map(arc => ({
            ...arc,
            arcAlt: arc.arcAlt * 0.8
          }))}
        />
      </div>
    </main>
  );
}
