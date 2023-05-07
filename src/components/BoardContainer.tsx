import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { IBoard } from "../types/index";
import "../App.css";
import { useSelector } from "react-redux";
import { useGetIssueByRequestQuery } from "../store/issue/issue.api";
import { getRepoNotation } from "../store/repo/repo.api"
import Board from "./Board";
import Message from "./Message";
import Link from "./Link";

const BoardContainer = () => {
  const issue = useSelector(
    (state: { issueApi: any; query: {} }) => state.query
  ) as { query: string };
  // console.log(issue);

  let { data, isError, isLoading } = useGetIssueByRequestQuery(issue.query);
  let githubIssueResponse = data;
  if (issue.query === '') {
    isError = true;
  }
  // console.log(data);

  const toDo = data?.filter((i) => i.state === "open" && i.assignee === null);
  const inProgress = data?.filter((i) => i.state === "open" && i.assignee);
  const done = data?.filter((i) => i.state === "closed");

  const [formatedIssueResponse, setFormatedIssueResponse] = useState({
    boards:
      [
        {
          id: "board-1",
          title: "To Do",
          cards: toDo,
        },
        {
          id: "board-2",
          title: "In Progress",
          cards: inProgress,
        },
        {
          id: "board-3",
          title: "Done",
          cards: done,
        },
      ] || [],
  });

  useEffect(() => {
    setFormatedIssueResponse({
      boards: [
        {
          id: "board-1",
          title: "To Do",
          cards: data?.filter((i) => i.state === "open" && i.assignee === null),
        },
        {
          id: "board-2",
          title: "In Progress",
          cards: data?.filter((i) => i.state === "open" && i.assignee),
        },
        {
          id: "board-3",
          title: "Done",
          cards: data?.filter((i) => i.state === "closed"),
        },
      ],
    });
    document.querySelector('.ant-input-suffix')?.remove()
  }, [data]);
  //const [data, setData] = useState(initialData);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const startBoard = formatedIssueResponse.boards.find(
      (b) => b.id === source.droppableId
    ) as IBoard;

    const endBoard = formatedIssueResponse.boards.find(
      (b) => b.id === destination.droppableId
    ) as IBoard;

    if (startBoard === endBoard) {

      const newCards = Array.from(startBoard.cards);
      const card = newCards.find((c) => c.id.toString() === draggableId);
      if (!card) return;
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, card);
      const newBoard = { ...startBoard, cards: newCards };
      const newGithubIssueResponse = {
        ...data,
        boards: formatedIssueResponse.boards.map((b) => (b.id === newBoard.id ? newBoard : b)),
      };
      setFormatedIssueResponse(newGithubIssueResponse);
    }
    else {
      const startCards = Array.from(startBoard.cards);
      const card = startCards.find((c) => c.id.toString() === draggableId);
      if (!card) return;
      startCards.splice(source.index, 1);
      const newStartBoard = { ...startBoard, cards: startCards };
      const endCards = Array.from(endBoard.cards);
      endCards.splice(destination.index, 0, card);
      const newEndBoard = { ...endBoard, cards: endCards };
      const newGithubIssueResponse = {
        ...data,
        boards: formatedIssueResponse.boards.map((b) => {
          if (b.id === newStartBoard.id) return newStartBoard;
          if (b.id === newEndBoard.id) return newEndBoard;
          return b;
        }),
      };
      setFormatedIssueResponse(newGithubIssueResponse);
    }
  };

  // console.log(formatedIssueResponse);
  const repo_url =
    formatedIssueResponse &&
    formatedIssueResponse.boards &&
    formatedIssueResponse.boards[0] &&
    formatedIssueResponse.boards[0].cards &&
    formatedIssueResponse.boards[0].cards[0] &&
    formatedIssueResponse.boards[0].cards[0].repository_url;

  const [stargazers, setStargazers] = useState('');
  getRepoNotation(issue.query).then((value) => setStargazers(value['stargazers_count']));


  const lint_tmp = "https://github.com/";
  return (
    <>
      {!githubIssueResponse ? (
        <Message text="Write link in input same as https://github.com/user_name/repo_name or user_name/repo_name" />
      ) : isError ? (
        <Message text="or empty field or try something else" />
      ) : isLoading ? (
        <Message text="Loading" />
      ) : (
        <>
          <div className="links">
            <div>
              <Link
                href={lint_tmp + repo_url?.split("/")[4]}
                text={repo_url?.split("/")[4] || ""}
              />
              {" > "}
              <Link
                href={
                  lint_tmp +
                  repo_url?.split("/")[4] +
                  "/" +
                  repo_url?.split("/")[5]
                }
                text={repo_url?.split("/")[5] || ''}
              />
            </div>
            <div>
              {'⭐ ' + stargazers + ' stars'}
            </div>

          </div>
          <div className="board-list">
            <DragDropContext onDragEnd={handleDragEnd}>
              {formatedIssueResponse.boards.map((board) => (
                <div>
                  <p className="boardTitle">{board.title}</p>
                  <Board id={board.id} cards={board.cards} title={''} />
                </div>
              ))}
            </DragDropContext>
          </div>
        </>
      )}
    </>
  );
};

export default BoardContainer;
