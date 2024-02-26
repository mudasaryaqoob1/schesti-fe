import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';

const data = [
  { name: 'Takeoff', value: 25 },
  { name: 'Estimate Project', value: 32 },
  { name: 'Invoices ', value: 36 },
  { name: 'Scheduled Project', value: 16 },
  { name: 'Meeting', value: 18 },
] as const;


function renderFillColor(name: string) {
  if (name === 'Takeoff') {
    return '#001556';
  }
  else if (name === 'Estimate Project') {
    return "#7F56D9";
  }
  else if (name === 'Invoices ') {
    return "#36B37E";
  }
  else if (name === 'Scheduled Project') {
    return "#EF9F28";
  }
  else {
    return "#B58905";
  }
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={renderFillColor(payload.name)}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={renderFillColor(payload.name)}

      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={renderFillColor(payload.name)}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={renderFillColor(payload.name)} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function ProjectsReport() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: undefined, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={500} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data as unknown as any[]}
        cx={200}
        cy={200}
        innerRadius={120}
        outerRadius={160}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
