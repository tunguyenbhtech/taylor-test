import * as R from 'ramda';

import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import { APP_CONFIG } from 'src/constants';
import { Commit } from 'src/domain/commit';
import { CommitActions } from 'src/state/_actions';
import { CommitRedux } from 'src/state/reducers';
import { LinkHeader } from 'src/infra/api/interfaces';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';

// connect redux
const useConnect = () => {
    // mapState
    const commits = useSelector(
        R.pipe(
            CommitRedux.getReducerState,
            CommitRedux.selectors.getCommitList,
        ),
    );
    const pageInfo = useSelector(
        R.pipe(
            CommitRedux.getReducerState,
            CommitRedux.selectors.getCommitListPageInfo,
        ),
    );

    const mapState = {
        commits,
        pageInfo,
    };

    // mapDispatch
    const dispatch = useDispatch();

    const mapDispatch = useMemo(
        () => ({
            getRepoCommits: (page?: number) =>
                dispatch(
                    CommitActions.getRepoCommits(page, {
                        thunk: true,
                    }),
                ),
        }),
        [dispatch],
    );

    return {
        ...mapState,
        ...mapDispatch,
    };
};

const CommitTable: FC = (): JSX.Element => {
    const { commits: data, pageInfo, getRepoCommits } = useConnect();

    // fetch commit list
    useEffect(() => {
        getRepoCommits();
    }, [getRepoCommits]);

    const controlledPageCount = useMemo<number>(() => {
        if (!pageInfo) return 0;

        // get last page number from pageInfo
        const last = pageInfo.last?.page;

        return last ? Number(last) : 0;
    }, [pageInfo]);

    const COLUMNS = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'author.date',
                Cell: ({ cell: { value } }: any) => {
                    return format(new Date(value), APP_CONFIG.dateFormat);
                },
            },
            {
                Header: 'Message',
                accessor: 'message',
                Cell: ({ cell: { value } }: any) => {
                    // link to specific invoice page
                    return value;
                },
            },
            {
                Header: 'Author',
                accessor: 'author.name',
                Cell: ({ cell: { value } }: any) => value || '-',
            },
        ],
        [],
    );

    const {
        className,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // pagination props
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: COLUMNS,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: APP_CONFIG.QUERY_PAGE_SIZE,
            },
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination,
    );

    return (
        <div>
            <div className="d-flex" style={{ flex: 1 }}>
                <Table borderless responsive {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(
                            (row: any, i: number) =>
                                prepareRow(row) || (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell: any) => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ),
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default CommitTable;
