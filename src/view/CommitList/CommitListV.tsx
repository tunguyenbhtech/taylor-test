import Container from 'react-bootstrap/Container';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Commit } from 'src/domain/commit';
import { LinkHeader } from 'src/infra/api/interfaces';

const StyledContainer = styled(Container)`
    flex: 1;
`;

const StyledH2 = styled.h2`
    font-size: 30px;
`;

interface Props {
    commits: Commit[];
    pageInfo?: LinkHeader;
}

const CommitListV: FC<Props> = (): JSX.Element => {
    return (
        <StyledContainer className="py-3 d-flex">
            <div className="d-flex flex-column" style={{ flex: 1 }}>
                <div className="py-3">
                    <StyledH2>{`Commits`}</StyledH2>
                </div>
            </div>
        </StyledContainer>
    );
};

export default CommitListV;
