import React from "react";
import Box from "@material-ui/core/Box/Box";

import { gamedata } from "../../../scripts/logic/gamedata";

import Piles from "./Piles";
import PileForm from "./PileForm";

export default class PlayArea extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewPile = this.handleNewPile.bind(this);
    this.pileFormChange = this.pileFormChange.bind(this);

    this.state = {
      piles: gamedata.state.piles,
      pileFormOpen: false
    };
  }

  componentDidMount() {
    gamedata.addEventListener("new-pile", this.handleNewPile);
    gamedata.addEventListener("pile-form-change", this.pileFormChange);
  }

  componentWillUnmount() {
    gamedata.removeEventListener("new-pile", this.handleNewPile);
    gamedata.removeEventListener("pile-form-change", this.pileFormChange);
  }

  pileFormChange(event) {
    this.setState({
      pileFormOpen: event.open
    });
  }

  handleNewPile() {
    this.setState({
      piles: gamedata.state.piles
    });
  }

  render() {
    console.log(this.state);
    return (
      <Box p={3}>
        <Piles piles={this.state.piles} />
        {this.state.pileFormOpen && <PileForm />}
      </Box>
    );
  }
}

// export default function PlayArea(props) {
//   function onDrop(data) {
//     console.log(data);
//   }

//   const [pileName, setPileName] = React.useState("");
//   const [piles, setPiles] = React.useState(gamedata.state.piles);

//   function textFieldChange(event) {
//     setPileName(event.target.value);
//   }

//   function makePile() {
//     const data = {
//       makePile: {
//         client: get_client_id(),
//         pileData: {
//           name: pileName
//         }
//       }
//     };

//     connection.sendMessage(data);
//   }

//   function handleNewPile() {}

//   //   return (
//   //     <Box p={3}>
//   //       <Draggable>
//   //         <Chip color="primary" label={"a pile"} size="medium"></Chip>
//   //       </Draggable>

//   //       <Draggable>
//   //         <DragDroppable type="pile" data={"Hello world"}>
//   //           <Chip color="primary" label={"a pile"} size="medium"></Chip>
//   //         </DragDroppable>
//   //       </Draggable>

//   //       <DragDroppable type="pile" data={"Hello world"}>
//   //         <Chip color="primary" label={"a pile"} size="medium"></Chip>
//   //       </DragDroppable>

//   //       <DragDroppable type="pile" data={"Hello world"}>
//   //         <Chip color="primary" label={"a pile"} size="medium"></Chip>
//   //       </DragDroppable>

//   //       <DragDroppable type="pile" data={"Hello world"}>
//   //         <Chip color="primary" label={"a pile"} size="medium"></Chip>
//   //       </DragDroppable>

//   //       <Droppable types={["pile"]} onDrop={onDrop.bind(this)}>
//   //         <div>Hello world 1</div>
//   //       </Droppable>

//   //       <Droppable types={["pile"]} onDrop={onDrop.bind(this)}>
//   //         <div>Hello world 2</div>
//   //       </Droppable>

//   //       <Droppable types={["pile"]} onDrop={onDrop.bind(this)}>
//   //         <div>Hello world 3</div>
//   //       </Droppable>
//   //     </Box>
//   //   );
// }
