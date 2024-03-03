import React, { useContext, useMemo } from 'react';
import { ConfigProvider, Table } from 'antd';
import { DrawHistoryContext, ScaleContext } from '../../context';
import { DrawHistoryContextProps } from '../../context/DrawHistoryContext';
import { useDraw } from '@/app/hooks';
import moment from 'moment';
import { DrawInterface } from '../../types';
import { ScaleDataContextProps } from '../../context/ScaleContext';

interface DrawTableHistory {
  projectName: string;
  pageLabel: string;
  comment: string | number;
  author: string;
  date: Date;
  status: string;
  color: string;
  layer: string;
  space: string;
}

interface Props {
  searchProjectName: string;
}

const DrawHistoryTable: React.FC<Props> = ({ searchProjectName }) => {
  const { scaleData } = useContext(ScaleContext) as ScaleDataContextProps;
  const { getProjectAndCommentNameForTable } = useDraw();
  const { drawHistory } = useContext(
    DrawHistoryContext
  ) as DrawHistoryContextProps;

  const dataSource = useMemo(() => {
    if (drawHistory && scaleData) {
      const tableData = Object.entries(drawHistory).flatMap(
        ([pageNumber, pageData]) => {
          const payload: DrawTableHistory[] = [];
          Object.entries(pageData).forEach(([drawName, drawData]) => {
            if (drawData.length) {
              const tablePayload = drawData.map((data: any) => {
                const { projectName, comment } =
                  getProjectAndCommentNameForTable(
                    drawName as keyof DrawInterface,
                    data.points,
                    data.depth || 0,
                    scaleData[pageNumber.toString()]
                  );

                return {
                  projectName,
                  pageLabel: pageNumber,
                  comment,
                  author: 'User',
                  date: data.dateTime,
                  status: '---',
                  color: data.stroke,
                  layer: '---',
                  space: '---',
                };
              });

              payload.push(...tablePayload);
            }
          });
          return payload;
        }
      );

      tableData.sort(
        (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
      );

      return tableData.filter(({ projectName = '' }) =>
        projectName.includes(searchProjectName)
      );
    }
    return [];
  }, [drawHistory, searchProjectName, scaleData]);

  return (
    <ConfigProvider theme={{ components: { Table: { headerBg: '#F9F5FF' } } }}>
      <Table
        pagination={false}
        columns={[
          {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
          },
          {
            title: 'Page Label',
            dataIndex: 'pageLabel',
            key: 'pageLabel',
          },
          {
            title: 'Comment',
            dataIndex: 'comment',
          },
          {
            title: 'Author',
            dataIndex: 'author',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            render: (value) => {
              return <>{moment(value).format('MMMM Do YYYY, h:mm:ss a')}</>;
            },
          },
          {
            title: 'Status',
            dataIndex: 'status',
          },
          {
            title: 'Color',
            dataIndex: 'color',
            render: (value) => (
              <div style={{ height: 20, width: 20, background: value }} />
            ),
          },
          {
            title: 'Layer',
            dataIndex: 'layer',
          },
          {
            title: 'Space',
            dataIndex: 'space',
          },
        ]}
        dataSource={dataSource}
        size="small"
      />
    </ConfigProvider>
  );
};

export default DrawHistoryTable;
