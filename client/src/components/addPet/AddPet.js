import "./addPet.css";
import AddPetForm from "./AddPetForm";

export default function Pets({ currentUser }) {
  return (
    <>
      <a href="#demo-modal" className="addPetButton">
        Add new pet
      </a>
      <AddPetForm currentUser={currentUser} id="demo-modal" />
    </>
  );
}
