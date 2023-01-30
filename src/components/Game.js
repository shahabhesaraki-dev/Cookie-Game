import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const handleClick = (cost, id) => {
    if (numCookies >= cost) {
      setNumCookies(numCookies - cost);
      setPurchasedItems({
        ...purchasedItems,
        [id]: purchasedItems[id] + 1,
      });
    } else {
      window.alert("You can not afford to buy this item.");
    }
  };

  const calculateCookiesPerTick = (purchasedItems) => {
    if (purchasedItems.cursor !== 0) {
      setNumCookies(
        numCookies +
          purchasedItems.cursor +
          purchasedItems.grandma * 10 +
          purchasedItems.farm * 80
      );
    }

    if (purchasedItems.grandma !== 0) {
      setNumCookies(
        numCookies +
          purchasedItems.grandma * 10 +
          purchasedItems.cursor +
          purchasedItems.farm * 80
      );
    }

    if (purchasedItems.farm !== 0) {
      setNumCookies(
        numCookies +
          purchasedItems.farm * 80 +
          purchasedItems.grandma * 10 +
          purchasedItems.cursor
      );
    }
  };

  useInterval(() => {
    calculateCookiesPerTick(purchasedItems);
  }, 1000);

  useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker`;
    return () => {
      document.title = `Cookie Clicker`;
    };
  }, [numCookies]);

  useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === "Space") {
        setNumCookies(numCookies + 1);
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [numCookies]);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>
            {purchasedItems.cursor +
              purchasedItems.grandma * 10 +
              purchasedItems.farm * 80}
          </strong>{" "}
          cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              item={item}
              numOwned={purchasedItems[item.id]}
              click={() => handleClick(item.cost, item.id)}
              index={index}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  @media (max-width: 700px) {
    margin-top: 150px;
  }
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 700px) {
    align-items: center;
    padding-right: 0px;
  }
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
