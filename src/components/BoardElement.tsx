import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IIssue } from "../types";

interface IBoardEl {
  card: IIssue;
  index: any
}

const BoardElement: FC<IBoardEl> = ({ card, index }) => {
  const created_date = Math.ceil((new Date().getTime() - new Date(card.created_at.split('T')[0]).getTime()) / (1000 * 3600 * 24))
  return (
    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="item">
            <b >{card.title}</b>
            <p >{card.id.toString().slice(card.id.toString().length - 4, card.id.toString().length)} | opened {created_date} {created_date === 1 ? ' day ago' : 'days ago'}  </p>
            <p >{card.user.login} | Comments: {card.comments}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default BoardElement;
