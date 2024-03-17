import React, { useContext, useEffect, useMemo } from 'react';
import { ConfigProvider, Table } from 'antd';
import {
  DrawHistoryContext,
  ReportDataContext,
  ScaleContext,
} from '../../context';
import { DrawHistoryContextProps } from '../../context/DrawHistoryContext';
import { useDraw } from '@/app/hooks';
import moment from 'moment';
import { DrawInterface } from '../../types';
import { ScaleDataContextProps } from '../../context/ScaleContext';
import { EditableText } from '@/app/component/EditableText';
import {
  ReportDataContextProps,
  ReportDataInterface,
} from '../../context/ReportDataContext';

interface Props {
  searchProjectName: string;
}

const DrawHistoryTable: React.FC<Props> = ({ searchProjectName }) => {
  const { scaleData } = useContext(ScaleContext) as ScaleDataContextProps;
  const { getProjectAndCommentNameForTable, groupDataForTable } = useDraw();
  const { drawHistory } = useContext(
    DrawHistoryContext
  ) as DrawHistoryContextProps;
  const { reportData, handleReportData, updateProjectNameInReportData } =
    useContext(ReportDataContext) as ReportDataContextProps;

  useEffect(() => {
    if (drawHistory) {
      const tableData = Object.entries(drawHistory).flatMap(
        ([pageNumber, pageData]) => {
          const payload: ReportDataInterface[] = [];
          Object.entries(pageData).forEach(([drawName, drawData]) => {
            if (drawData.length) {
              const tablePayload = drawData.map((data: any) => {
                const { projectName, comment } =
                  getProjectAndCommentNameForTable(
                    drawName as keyof DrawInterface,
                    data.points,
                    data.depth || 0,
                    scaleData
                      ? scaleData[pageNumber.toString()]
                      : { scale: `1"=1"`, precision: '1' }
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
                  type: drawName,
                  config: {
                    ...data,
                  },
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

      handleReportData(tableData);
    }
  }, [drawHistory, searchProjectName, scaleData]);

  const dataSource = useMemo(() => {
    return groupDataForTable(reportData).filter(({ projectName = '' }) =>
      projectName.includes(searchProjectName)
    );
  }, [reportData, groupDataForTable, searchProjectName]);

  return (
    <ConfigProvider theme={{ components: { Table: { headerBg: '#F9F5FF' } } }}>
      <Table
        pagination={false}
        dataSource={dataSource}
        size="small"
        columns={[
          {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (value, record) => {
              return !record?.date ? (
                <div>{value}</div>
              ) : (
                <EditableText
                  initialText={value}
                  onPressEnter={(text) => {
                    const { date, pageLabel } = record;
                    updateProjectNameInReportData(date, pageLabel, text);
                  }}
                />
              );
            },
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
              return (
                <>
                  {value ? moment(value).format('MMMM Do YYYY, h:mm:ss a') : ''}
                </>
              );
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
      />
    </ConfigProvider>
  );
};

export default DrawHistoryTable;
