import { useEffect, useRef } from "react";
import styled from "styled-components";
const Item = ({ item, numOwned, click, index }) => {
  const focusref = useRef(null);

  useEffect(() => {
    if (index === 0) {
      focusref.current.focus();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper onClick={click} ref={focusref}>
      <Frame>
        <Name>{item.name}</Name>
        <Detail>{`Cost: ${item.cost} cookie(s). Produces ${item.value} cookies/second`}</Detail>
      </Frame>
      <BigNumber>{numOwned}</BigNumber>
    </Wrapper>
  );
};
export default Item;

const Wrapper = styled.button`
  display: flex;
  min-width: 40vw;
  justify-content: space-between;
  border-left: transparent;
  border-top: transparent;
  border-right: transparent;
  border-bottom: 1px solid white;
  padding: 10px;
  background-color: transparent;
`;

const Frame = styled.a`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  text-align: left;
  color: white;
  margin-bottom: 5px;
`;

const Detail = styled.p`
  color: #c7c9c8;
  font-size: 15px;
`;

const BigNumber = styled.p`
  display: flex;
  font-size: 30px;
  margin-top: 5px;
  color: white;
`;
