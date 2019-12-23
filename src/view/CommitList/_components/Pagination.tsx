// @flow
import React, { useCallback, useMemo } from 'react';

import Button from 'react-bootstrap/Button';
import { Colors } from 'src/assets';
import RCPagination from 'rc-pagination';
import Row from 'react-bootstrap/Row';
import en_US_localeInfo from 'rc-pagination/lib/locale/en_US';
import styled from 'styled-components';

interface Props {
    canPreviousPage: boolean;
    canNextPage: boolean;
    gotoPage: Function;
    hideOnSinglePage?: boolean;
    locale?: Record<string, any>;
    // onPrev?: Function,
    // onNext?: Function,
    pageCount: number;
    pageIndex: number;
    // pageOptions?: Object,
    pageSize: number;
    // pageSizeOptions?: Array<number>,
    setPageSize: Function;
}

const StyledRow = styled(Row)`
    li {
        list-style-type: none;
        outline: none;
    }

    .pagination-item {
        color: ${Colors.blueCurious};
    }

    .active-item {
        color: ${Colors.greyEmpress};
        border: 1px solid ${Colors.lightGrey};
        border-radius: 4px;
        cursor: auto;
    }
`;

const StyledButton = styled(Button)`
    padding-top: 0.1rem !important;
    padding-bottom: 0.1rem !important;
    box-shadow: none !important;
    outline: none !important;
    &.btn-primary {
        background-color: ${Colors.blueCurious};
        border-color: ${Colors.blueCurious};
    }
`;

const StyledItem = styled.div`
    cursor: pointer;
    color: ${Colors.blueEndeavour};
    padding-top: 0.1rem !important;
    padding-bottom: 0.1rem !important;
`;

const PageItem = ({
    active,
    className = '',
    children,
}: {
    active?: boolean;
    className?: string;
    children: React.ReactNode;
}): JSX.Element => {
    const activeClass = active ? 'active-item' : 'pagination-item';

    return (
        <StyledItem className={`${className} px-2 ${activeClass}`}>
            {children}
        </StyledItem>
    );
};

const PaginationGroup = ({
    canPreviousPage,
    canNextPage,
    gotoPage,
    hideOnSinglePage = true,
    locale = en_US_localeInfo,
    // onPrev,
    // onNext,
    pageIndex,
    pageSize,
    // pageOptions,
    pageCount,
    setPageSize,
}: // pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
Props): JSX.Element => {
    const currentPage = pageIndex + 1;
    const total = pageCount * pageSize;

    const onChangePage = useCallback<(current: number) => void>(
        current => {
            const page = current ? Number(current) - 1 : 0;
            gotoPage(page);
        },
        [gotoPage],
    );

    const _renderItem = useCallback<
        (
            current: number,
            type: string,
            element: React.ReactNode,
        ) => React.ReactNode
    >(
        (current, type, element) => {
            if (type === 'page') {
                return (
                    <PageItem active={current === currentPage}>
                        {current}
                    </PageItem>
                );
            }
            return element;
        },
        [currentPage],
    );

    const _PrevIcon = useMemo(
        () => (
            <StyledButton
                className="px-1 mr-1"
                disabled={!canPreviousPage}
                variant={canPreviousPage ? 'primary' : 'outline-dark'}
            >
                {`Prev`}
            </StyledButton>
        ),
        [canPreviousPage],
    );

    const _NextIcon = useMemo(
        () => (
            <StyledButton
                className="px-1 ml-1"
                disabled={!canNextPage}
                variant={canNextPage ? 'primary' : 'outline-dark'}
            >
                {`Next`}
            </StyledButton>
        ),
        [canNextPage],
    );

    return (
        <StyledRow className="mx-0">
            <RCPagination
                className="d-flex flex-row pl-1"
                current={currentPage}
                hideOnSinglePage={hideOnSinglePage}
                itemRender={_renderItem}
                locale={locale}
                nextIcon={_NextIcon}
                pageSize={pageSize}
                prevIcon={_PrevIcon}
                total={total}
                onChange={onChangePage}
            />
        </StyledRow>
    );
};

export default PaginationGroup;
