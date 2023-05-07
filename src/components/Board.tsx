import Card from "antd/es/card/Card";
import BoardElement from "./BoardElement";
import { Droppable } from "react-beautiful-dnd";
import { FC } from "react";
import { IIssue } from "../types";

interface IBoardProps {
  id: string;
  title: string;
  cards: IIssue[] | undefined
}

const Board: FC<IBoardProps> = ({ id, cards, title }) => {
  return (
    <Card key={id} className="board" style={{ width: 300 }}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ width: 280, height: 500 }}>
            {cards?.map((card, index) => (
              <BoardElement card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
}

export default Board;
