import Container from 'react-bootstrap/Container';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    flex: 1;
`;

const StyledH2 = styled.h2`
    font-size: 30px;
`;

const CommitListV = (): JSX.Element => {
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
