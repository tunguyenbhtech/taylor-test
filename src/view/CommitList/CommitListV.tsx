import Container from 'react-bootstrap/Container';
import React, { FC } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import CommitTable from './_components/CommitTable';

const StyledContainer = styled(Container)`
    flex: 1;
`;

const StyledH2 = styled.h2`
    font-size: 30px;
`;

const CommitListV: FC = (): JSX.Element => {
    return (
        <StyledContainer className="py-3 d-flex">
            <Card className="px-4 pt-3 w-100">
                <Card.Header>
                    <StyledH2>{`Commits`}</StyledH2>
                </Card.Header>

                <Card.Body>
                    <CommitTable />
                </Card.Body>
            </Card>
        </StyledContainer>
    );
};

export default CommitListV;
